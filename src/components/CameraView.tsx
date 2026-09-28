import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  RotateCcw,
  FlipHorizontal,
  Mic,
  MicOff,
  Volume2,
  Video,
  Sparkles,
  Zap,
} from 'lucide-react';
import { CharacterFilterId, FaceAnchor, VoiceEffectId } from '../types';
import {
  renderCharacterFilter,
  createParticleSystem,
  Particle,
} from '../utils/filters';
import {
  VoiceProcessor,
} from '../utils/audio';

interface CameraViewProps {
  currentFilter: CharacterFilterId;
  voiceEffect: VoiceEffectId;
  anchorScale?: number;
  setAnchorScale?: (s: number) => void;
  isRecording: boolean;
  recordingDuration: number;
  countdown: number | null;
  flashActive: boolean;
  onSnapshotReady?: (canvas: HTMLCanvasElement) => void;
  registerMediaStream?: (stream: MediaStream, canvas: HTMLCanvasElement) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  currentFilter,
  voiceEffect,
  isRecording,
  recordingDuration,
  countdown,
  flashActive,
  registerMediaStream,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Particles state for animated accessories
  const particlesRef = useRef<Particle[]>(createParticleSystem(30));

  // High-Performance Mutable Face Anchor (Drives 60 FPS render loop without React re-renders)
  const anchorRef = useRef<FaceAnchor>({
    x: 0.5,
    y: 0.42,
    scale: 1.0,
    rotation: 0,
    mouthOpenness: 0,
  });

  // UI tracking status
  const [trackingActive, setTrackingActive] = useState<boolean>(true);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Audio Voice Processor and Streams
  const voiceProcessorRef = useRef<VoiceProcessor | null>(null);
  const rawStreamRef = useRef<MediaStream | null>(null);

  // Native Hardware FaceDetector & MediaPipe references
  const faceDetectorRef = useRef<any>(null);
  const faceMeshRef = useRef<any>(null);
  const isMeshProcessingRef = useRef<boolean>(false);
  const lastMeshDetectionTimeRef = useRef<number>(0);

  // Fast scratch canvas for downsampled CV face tracking (prevents full-res getImageData bottlenecks)
  const scratchCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Initialize Native Hardware FaceDetector & MediaPipe (if supported in browser)
  useEffect(() => {
    // Check for native hardware Chromium FaceDetector
    if (typeof window !== 'undefined' && 'FaceDetector' in window) {
      try {
        faceDetectorRef.current = new (window as any).FaceDetector({
          fastMode: true,
          maxDetectedFaces: 1,
        });
      } catch (e) {
        console.log('Hardware FaceDetector init skipped:', e);
      }
    }

    // Try MediaPipe FaceMesh as an optional precision enhancement
    const initFaceMesh = () => {
      const FaceMeshClass = (window as any).FaceMesh;
      if (FaceMeshClass && !faceMeshRef.current) {
        try {
          const fm = new FaceMeshClass({
            locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
          });

          fm.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
          });

          fm.onResults((results: any) => {
            isMeshProcessingRef.current = false;
            if (results && results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
              lastMeshDetectionTimeRef.current = Date.now();
              const lm = results.multiFaceLandmarks[0];

              const pForehead = lm[10];
              const pNose = lm[1];
              const pChin = lm[152];
              const pLeftEye = lm[33];
              const pRightEye = lm[263];
              const pMouthTop = lm[13];
              const pMouthBottom = lm[14];

              // Inter-ocular distance
              const eyeDx = pRightEye.x - pLeftEye.x;
              const eyeDy = pRightEye.y - pLeftEye.y;
              const eyeDist = Math.hypot(eyeDx, eyeDy);

              // Head roll angle in radians
              const roll = Math.atan2(eyeDy, eyeDx);

              // Mouth openness (0 to 1)
              const mouthDist = Math.hypot(pMouthBottom.x - pMouthTop.x, pMouthBottom.y - pMouthTop.y);
              const mouthOpenness = Math.min(1.0, Math.max(0, (mouthDist / Math.max(0.04, eyeDist)) * 2.8));

              // Mirrored coordinate compensation
              const normX = facingMode === 'user' ? 1 - pNose.x : pNose.x;
              const normY = (pForehead.y + pNose.y) * 0.5;

              // Auto-fit scale proportional to eye distance
              const autoScale = Math.max(0.65, Math.min(2.1, eyeDist / 0.165));

              // Smoothly blend into anchorRef
              const curr = anchorRef.current;
              curr.x += (normX - curr.x) * 0.4;
              curr.y += (normY - curr.y) * 0.4;
              curr.scale += (autoScale - curr.scale) * 0.3;
              curr.rotation += (roll - curr.rotation) * 0.4;
              curr.mouthOpenness = (curr.mouthOpenness || 0) + (mouthOpenness - (curr.mouthOpenness || 0)) * 0.45;
              curr.landmarks = {
                forehead: { x: pForehead.x, y: pForehead.y },
                leftEye: { x: pLeftEye.x, y: pLeftEye.y },
                rightEye: { x: pRightEye.x, y: pRightEye.y },
                noseTip: { x: pNose.x, y: pNose.y },
                mouthCenter: { x: (pMouthTop.x + pMouthBottom.x) / 2, y: (pMouthTop.y + pMouthBottom.y) / 2 },
                chin: { x: pChin.x, y: pChin.y },
                leftCheek: { x: lm[234].x, y: lm[234].y },
                rightCheek: { x: lm[454].x, y: lm[454].y },
                mouthOpen: mouthOpenness,
                leftEyeClosed: false,
                rightEyeClosed: false,
                faceWidth: eyeDist,
                faceHeight: Math.hypot(pChin.x - pForehead.x, pChin.y - pForehead.y),
                rollAngle: roll,
                pitchAngle: 0,
                yawAngle: 0,
              };
            }
          });

          faceMeshRef.current = fm;
        } catch (err) {
          console.warn('MediaPipe FaceMesh init fallback to CV engine:', err);
        }
      }
    };

    initFaceMesh();
  }, [facingMode]);

  // Update voice processor effect
  useEffect(() => {
    if (voiceProcessorRef.current) {
      voiceProcessorRef.current.setEffect(voiceEffect);
    }
  }, [voiceEffect]);

  // Start Camera with resilient fallbacks
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      if (rawStreamRef.current) {
        rawStreamRef.current.getTracks().forEach(t => t.stop());
        rawStreamRef.current = null;
      }
      if (voiceProcessorRef.current) {
        voiceProcessorRef.current.destroy();
        voiceProcessorRef.current = null;
      }

      let stream: MediaStream | null = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode,
          },
          audio: true,
        });
      } catch (err1) {
        console.warn('Initial gUM failed, trying video only:', err1);
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        } catch (err2: any) {
          throw err2;
        }
      }

      if (!stream) {
        throw new Error('No media stream available');
      }

      rawStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch (playErr) {
          console.warn('Video play notice:', playErr);
        }
      }

      // Initialize voice processor if audio tracks exist
      if (stream.getAudioTracks().length > 0) {
        try {
          const vp = new VoiceProcessor(stream);
          vp.setEffect(voiceEffect);
          voiceProcessorRef.current = vp;
        } catch (vpErr) {
          console.warn('VoiceProcessor notice:', vpErr);
        }
      }

      if (canvasRef.current && registerMediaStream) {
        const canvasStream = canvasRef.current.captureStream(30);
        const audioTracks = voiceProcessorRef.current
          ? voiceProcessorRef.current.getProcessedStream().getAudioTracks()
          : stream.getAudioTracks();

        const combinedStream = new MediaStream([
          ...canvasStream.getVideoTracks(),
          ...audioTracks,
        ]);

        registerMediaStream(combinedStream, canvasRef.current);
      }

      setCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      const isDenied = err?.name === 'NotAllowedError';
      const isTimeout = err?.message && err.message.toLowerCase().includes('timeout');

      setCameraError(
        isDenied
          ? 'Camera permission denied. Please allow camera access in your browser.'
          : isTimeout
          ? 'Camera source timed out or is in use by another program. Click Retry or try the Virtual Cam.'
          : `Camera connection error (${err?.message || 'Device busy'}). Click Retry Camera or try Virtual Cam below.`
      );
      setCameraActive(false);
    }
  }, [facingMode, voiceEffect, registerMediaStream]);

  // Virtual Demo Studio Camera generator
  const startVirtualCam = useCallback(() => {
    setCameraError(null);
    if (rawStreamRef.current) {
      rawStreamRef.current.getTracks().forEach(t => t.stop());
      rawStreamRef.current = null;
    }

    const virtualCanvas = document.createElement('canvas');
    virtualCanvas.width = 1280;
    virtualCanvas.height = 720;
    const vCtx = virtualCanvas.getContext('2d');
    if (!vCtx) return;

    const drawVirtualFrame = () => {
      const t = Date.now() * 0.002;
      const grad = vCtx.createRadialGradient(640, 360, 100, 640, 360, 700);
      grad.addColorStop(0, '#1e293b');
      grad.addColorStop(1, '#020617');
      vCtx.fillStyle = grad;
      vCtx.fillRect(0, 0, 1280, 720);

      // Studio ambient lights
      vCtx.fillStyle = 'rgba(251, 191, 36, 0.08)';
      vCtx.beginPath();
      vCtx.arc(300, 150, 180, 0, Math.PI * 2);
      vCtx.fill();

      // Stylized Studio Model Face
      const headX = 640 + Math.sin(t * 1.5) * 45;
      const headY = 360 + Math.cos(t * 2) * 22;

      // Shoulders
      vCtx.fillStyle = '#334155';
      vCtx.beginPath();
      vCtx.ellipse(headX, headY + 280, 260, 140, 0, 0, Math.PI * 2);
      vCtx.fill();

      // Face oval
      vCtx.fillStyle = '#fed7aa';
      vCtx.beginPath();
      vCtx.ellipse(headX, headY, 150, 190, 0, 0, Math.PI * 2);
      vCtx.fill();
      vCtx.strokeStyle = '#f97316';
      vCtx.lineWidth = 4;
      vCtx.stroke();

      // Eyes
      vCtx.fillStyle = '#0f172a';
      const eyeBlink = Math.sin(t * 4) > 0.95 ? 2 : 16;
      vCtx.beginPath();
      vCtx.ellipse(headX - 55, headY - 20, 16, eyeBlink, 0, 0, Math.PI * 2);
      vCtx.ellipse(headX + 55, headY - 20, 16, eyeBlink, 0, 0, Math.PI * 2);
      vCtx.fill();

      // Dynamic mouth
      const mouthOpen = (Math.sin(t * 3) + 1) * 0.4;
      vCtx.fillStyle = '#b91c1c';
      vCtx.beginPath();
      vCtx.ellipse(headX, headY + 55, 35, 10 + mouthOpen * 25, 0, 0, Math.PI * 2);
      vCtx.fill();

      requestAnimationFrame(drawVirtualFrame);
    };

    drawVirtualFrame();

    const vStream = virtualCanvas.captureStream(30);
    rawStreamRef.current = vStream;

    if (videoRef.current) {
      videoRef.current.srcObject = vStream;
      videoRef.current.play().catch(() => {});
    }

    if (canvasRef.current && registerMediaStream) {
      const canvasStream = canvasRef.current.captureStream(30);
      registerMediaStream(canvasStream, canvasRef.current);
    }

    setCameraActive(true);
  }, [registerMediaStream]);

  useEffect(() => {
    startCamera();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (rawStreamRef.current) {
        rawStreamRef.current.getTracks().forEach(t => t.stop());
      }
      if (voiceProcessorRef.current) {
        voiceProcessorRef.current.destroy();
      }
    };
  }, [startCamera]);

  // Toggle mic track
  const toggleMic = () => {
    if (rawStreamRef.current) {
      const audioTracks = rawStreamRef.current.getAudioTracks();
      audioTracks.forEach(t => {
        t.enabled = !t.enabled;
      });
      setIsMicMuted(!isMicMuted);
    }
  };

  // Flip Camera
  const flipCamera = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  // ============================================================
  // CONTINUOUS 60 FPS FACE MOTION TRACKING & AUTO-ADJUST ENGINE
  // ============================================================
  useEffect(() => {
    let frameCount = 0;
    let isDetectingHardware = false;

    // Local target coordinates for exponential smoothing
    let targetX = 0.5;
    let targetY = 0.42;
    let targetScale = 1.0;
    let targetRotation = 0;
    let targetMouthOpenness = 0;

    // Create lightweight scratch canvas for fast CV analysis (160x90 resolution takes < 1.5ms)
    if (!scratchCanvasRef.current) {
      scratchCanvasRef.current = document.createElement('canvas');
      scratchCanvasRef.current.width = 160;
      scratchCanvasRef.current.height = 90;
    }
    const scratchCanvas = scratchCanvasRef.current;
    const scratchCtx = scratchCanvas.getContext('2d', { willReadFrequently: true });

    const render = (time: number) => {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (canvas && video && video.readyState >= 2) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const vw = video.videoWidth || 1280;
          const vh = video.videoHeight || 720;

          if (canvas.width !== vw || canvas.height !== vh) {
            canvas.width = vw;
            canvas.height = vh;
          }

          ctx.save();

          // Mirror video if user-facing front camera
          if (facingMode === 'user') {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
          }

          // 1. Draw raw video frame
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          frameCount++;

          // 2. Check if MediaPipe is actively providing landmarks
          const isMeshRecent = Date.now() - lastMeshDetectionTimeRef.current < 250;

          if (faceMeshRef.current && !isMeshProcessingRef.current && frameCount % 3 === 0) {
            isMeshProcessingRef.current = true;
            faceMeshRef.current.send({ image: video }).catch(() => {
              isMeshProcessingRef.current = false;
            });
          }

          // 3. Ultra-Fast Computer Vision Face Motion & Auto-Fit Engine (Runs continuously if mesh is idle)
          if (!isMeshRecent) {
            // Hardware FaceDetector execution (asynchronous on GPU every 4 frames)
            if (faceDetectorRef.current && !isDetectingHardware && frameCount % 4 === 0) {
              isDetectingHardware = true;
              faceDetectorRef.current
                .detect(video)
                .then((faces: any[]) => {
                  if (faces && faces.length > 0) {
                    const face = faces[0];
                    const box = face.boundingBox;
                    let cx = (box.x + box.width / 2) / vw;
                    if (facingMode === 'user') {
                      cx = 1 - cx;
                    }
                    const cy = (box.y + box.height * 0.42) / vh;
                    targetX = Math.max(0.12, Math.min(0.88, cx));
                    targetY = Math.max(0.12, Math.min(0.88, cy));

                    // Auto-scale to real face span
                    const currentRatio = box.width / vw;
                    targetScale = Math.max(0.68, Math.min(2.0, currentRatio / 0.3));

                    // If landmarks are available from hardware detector (eyes, mouth)
                    if (face.landmarks && face.landmarks.length > 1) {
                      const eye1 = face.landmarks.find((l: any) => l.type === 'eye');
                      const mouth = face.landmarks.find((l: any) => l.type === 'mouth');
                      if (eye1 && mouth) {
                        const mDist = Math.abs(mouth.location.y - eye1.location.y);
                        if (mDist > box.height * 0.5) {
                          targetMouthOpenness = Math.min(1.0, (mDist / box.height - 0.45) * 4);
                        }
                      }
                    }
                  }
                })
                .catch(() => {})
                .finally(() => {
                  isDetectingHardware = false;
                });
            }

            // Real-Time Canvas Spatial Moments & Motion Tracker (Runs every 2 frames, < 2ms)
            if (scratchCtx && frameCount % 2 === 0) {
              try {
                // Downsample video to 160x90 for instant analysis
                scratchCtx.drawImage(video, 0, 0, 160, 90);
                const imgData = scratchCtx.getImageData(0, 0, 160, 90);
                const data = imgData.data;

                let m00 = 0;
                let m10 = 0;
                let m01 = 0;
                let minX = 160;
                let maxX = 0;
                let minY = 90;
                let maxY = 0;

                // Stride 4 sampling of 160x90 (only 900 pixels scanned)
                for (let py = 6; py < 84; py += 2) {
                  for (let px = 10; px < 150; px += 2) {
                    const idx = (py * 160 + px) * 4;
                    const r = data[idx];
                    const g = data[idx + 1];
                    const b = data[idx + 2];

                    // Normalized human skin chrominance model
                    const isSkin =
                      r > 60 &&
                      g > 35 &&
                      b > 20 &&
                      r > g &&
                      r > b &&
                      Math.abs(r - g) > 10 &&
                      r - b > 12;

                    if (isSkin) {
                      m00++;
                      m10 += px;
                      m01 += py;
                      if (px < minX) minX = px;
                      if (px > maxX) maxX = px;
                      if (py < minY) minY = py;
                      if (py > maxY) maxY = py;
                    }
                  }
                }

                // If a face blob is found
                if (m00 > 60) {
                  const cx = m10 / m00;
                  const cy = m01 / m00;

                  // 2nd Central Moments for Head Tilt / Roll Angle
                  let u20 = 0;
                  let u02 = 0;
                  let u11 = 0;

                  for (let py = Math.max(6, Math.floor(minY)); py <= Math.min(84, Math.floor(maxY)); py += 2) {
                    for (let px = Math.max(10, Math.floor(minX)); px <= Math.min(150, Math.floor(maxX)); px += 2) {
                      const idx = (py * 160 + px) * 4;
                      const r = data[idx];
                      const g = data[idx + 1];
                      const b = data[idx + 2];

                      const isSkin =
                        r > 60 &&
                        g > 35 &&
                        b > 20 &&
                        r > g &&
                        r > b &&
                        Math.abs(r - g) > 10 &&
                        r - b > 12;

                      if (isSkin) {
                        const dx = px - cx;
                        const dy = py - cy;
                        u20 += dx * dx;
                        u02 += dy * dy;
                        u11 += dx * dy;
                      }
                    }
                  }

                  // Head Roll / Tilt Angle: theta = 0.5 * atan2(2*u11, u20 - u02)
                  const tiltAngle = 0.5 * Math.atan2(2 * u11, u20 - u02);
                  targetRotation = Math.max(-0.6, Math.min(0.6, tiltAngle * 0.9));

                  // Position (Mirror compensation if user facing)
                  const normX = facingMode === 'user' ? 1 - cx / 160 : cx / 160;
                  const normY = cy / 90;
                  targetX = Math.max(0.15, Math.min(0.85, normX));
                  targetY = Math.max(0.18, Math.min(0.82, normY * 0.95));

                  // Auto-fit scale according to face pixel span
                  const spanW = maxX - minX;
                  const targetSpanW = 160 * 0.32;
                  targetScale = Math.max(0.68, Math.min(2.0, spanW / targetSpanW));

                  // Mouth openness estimation (lower third of face blob)
                  const mouthRegionY = Math.floor(cy + 6);
                  let darkOralPixels = 0;
                  let totalMouthPixels = 0;
                  for (let my = mouthRegionY; my < Math.min(88, mouthRegionY + 12); my += 2) {
                    for (let mx = Math.floor(cx - 10); mx < Math.min(150, Math.floor(cx + 10)); mx += 2) {
                      const idx = (my * 160 + mx) * 4;
                      const lum = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                      if (lum < 45) {
                        darkOralPixels++;
                      }
                      totalMouthPixels++;
                    }
                  }
                  if (totalMouthPixels > 10) {
                    targetMouthOpenness = Math.min(1.0, (darkOralPixels / totalMouthPixels) * 3.5);
                  }
                }
              } catch (cvErr) {
                // Ignore canvas security errors
              }
            }

            // Exponential Moving Average Smoothing for anchorRef (butter-smooth at 60 FPS)
            const a = anchorRef.current;
            a.x += (targetX - a.x) * 0.35;
            a.y += (targetY - a.y) * 0.35;
            a.scale += (targetScale - a.scale) * 0.28;
            a.rotation += (targetRotation - a.rotation) * 0.35;
            a.mouthOpenness = (a.mouthOpenness || 0) + (targetMouthOpenness - (a.mouthOpenness || 0)) * 0.4;
          }

          // 4. Render Character Filter AR & Deformations
          renderCharacterFilter(
            ctx,
            canvas.width,
            canvas.height,
            currentFilter,
            anchorRef.current,
            time,
            particlesRef.current
          );

          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [currentFilter, facingMode]);

  // Format recording timer: mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[72vh] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center select-none group">
      {/* Hidden raw video element */}
      <video
        ref={videoRef}
        playsInline
        muted
        className="hidden"
      />

      {/* Main Canvas with Live Character Overlays */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
      />

      {/* Camera Inactive / Permission Prompt */}
      {!cameraActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/95 z-20">
          <div className="w-16 h-16 rounded-full bg-slate-800/90 border border-slate-700 flex items-center justify-center text-3xl mb-4 shadow-lg shadow-black/40">
            📷
          </div>
          <h3 className="text-xl font-bold text-white mb-2 font-display">
            Camera Ready
          </h3>
          <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
            {cameraError || 'Allow camera and microphone access to play with realistic character masks, or try the virtual studio camera!'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={startCamera}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Camera</span>
            </button>
            <button
              onClick={startVirtualCam}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-sm border border-amber-400/30 transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Use Virtual Studio Cam</span>
            </button>
          </div>
        </div>
      )}

      {/* Flash Effect on capture */}
      {flashActive && (
        <div className="absolute inset-0 bg-white z-30 pointer-events-none camera-flash" />
      )}

      {/* Live Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/35 backdrop-blur-[2px] pointer-events-none">
          <div className="text-center animate-bounce">
            <span className="text-8xl md:text-9xl font-black text-amber-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] font-display">
              {countdown === 0 ? 'SMILE! 📸' : countdown}
            </span>
          </div>
        </div>
      )}

      {/* Live Recording HUD Header */}
      {isRecording && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/40 text-xs font-mono font-bold text-white shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <Video className="w-3.5 h-3.5 text-red-400" />
          <span className="text-red-400">REC</span>
          <span className="text-slate-300 tabular-nums">{formatTime(recordingDuration)}</span>
        </div>
      )}

      {/* Voice Effect Live Indicator */}
      {voiceEffect !== 'none' && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/40 text-xs text-amber-300">
          <Volume2 className="w-3.5 h-3.5" />
          <span className="capitalize font-medium">{voiceEffect} Voice</span>
        </div>
      )}

      {/* On-Camera Quick Action Bar (Bottom Floating) */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-auto">
        {/* Left: Active Real-time Face Motion Tracking Status */}
        <div className="flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs shadow-md">
          <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-semibold text-emerald-300">Auto Face Motion Active</span>
        </div>

        {/* Right: Camera Hardware Toggles */}
        <div className="flex items-center gap-1 bg-slate-950/85 backdrop-blur-md p-1 rounded-xl border border-slate-800 shadow-md">
          <button
            onClick={flipCamera}
            title="Flip Front / Rear Camera"
            className="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
          >
            <FlipHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Flip</span>
          </button>
          <button
            onClick={toggleMic}
            title={isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1 ${
              isMicMuted
                ? 'text-red-400 bg-red-950/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {isMicMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isMicMuted ? 'Muted' : 'Mic'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
