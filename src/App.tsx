import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { CameraView } from './components/CameraView';
import { FilterPicker } from './components/FilterPicker';
import { CaptureControls } from './components/CaptureControls';
import { AiTransformModal } from './components/AiTransformModal';
import { GalleryModal } from './components/GalleryModal';
import { CharacterFilterId, VoiceEffectId, CaptureItem } from './types';
import { playShutterSound, playCountdownBeep, playFanfareSound } from './utils/audio';
import { CHARACTER_FILTERS } from './utils/filters';
import { Sparkles, Camera, Film, Wand2, Info } from 'lucide-react';

const STORAGE_KEY = 'funnycam_gallery_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'camera' | 'photobooth' | 'gallery'>('camera');
  const [currentFilter, setCurrentFilter] = useState<CharacterFilterId>('tiger');
  const [voiceEffect, setVoiceEffect] = useState<VoiceEffectId>('none');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flashActive, setFlashActive] = useState<boolean>(false);

  // Video recording
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<number | null>(null);

  // Registered stream & canvas reference from CameraView
  const liveStreamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Gallery captures
  const [galleryItems, setGalleryItems] = useState<CaptureItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiSnapshotUrl, setAiSnapshotUrl] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Photo Booth Strip sequencing
  const [photoBoothRunning, setPhotoBoothRunning] = useState(false);
  const [photoBoothPrompt, setPhotoBoothPrompt] = useState<string>('');

  // Save gallery to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(galleryItems));
    } catch (err) {
      console.warn('LocalStorage limit reached or error:', err);
    }
  }, [galleryItems]);

  // Handle stream registration from CameraView
  const handleRegisterMediaStream = useCallback(
    (stream: MediaStream, canvas: HTMLCanvasElement) => {
      liveStreamRef.current = stream;
      canvasRef.current = canvas;
    },
    []
  );

  // Flash trigger utility
  const triggerFlash = () => {
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 350);
  };

  // 1. TAKE SNAPSHOT PHOTO
  const takePhotoNow = useCallback((): string | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    triggerFlash();
    playShutterSound();

    const dataUrl = canvas.toDataURL('image/png', 0.95);
    const activeFilterObj = CHARACTER_FILTERS.find(f => f.id === currentFilter);

    const newItem: CaptureItem = {
      id: `photo_${Date.now()}`,
      type: 'photo',
      url: dataUrl,
      thumbnailUrl: dataUrl,
      createdAt: Date.now(),
      filterName: activeFilterObj?.name || 'Funny Filter',
    };

    setGalleryItems(prev => [newItem, ...prev]);
    return dataUrl;
  }, [currentFilter]);

  // Handle Capture button with optional countdown timer
  const handleTakePhotoWithTimer = () => {
    if (countdown !== null || isRecording) return;

    if (timerSeconds === 0) {
      takePhotoNow();
      return;
    }

    let count = timerSeconds;
    setCountdown(count);
    playCountdownBeep(false);

    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
        playCountdownBeep(false);
      } else {
        clearInterval(interval);
        setCountdown(0);
        playCountdownBeep(true);
        setTimeout(() => {
          takePhotoNow();
          setCountdown(null);
        }, 400);
      }
    }, 1000);
  };

  // 2. VIDEO RECORDING
  const startRecording = () => {
    const stream = liveStreamRef.current;
    if (!stream) {
      alert('Camera stream is not ready for recording yet.');
      return;
    }

    recordedChunksRef.current = [];

    let mimeType = 'video/webm;codecs=vp9,opus';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'video/webm';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = '';
      }
    }

    try {
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

      recorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: mimeType || 'video/webm',
        });
        const videoUrl = URL.createObjectURL(blob);
        const canvas = canvasRef.current;
        const thumbnail = canvas ? canvas.toDataURL('image/jpeg', 0.8) : '';
        const activeFilterObj = CHARACTER_FILTERS.find(f => f.id === currentFilter);

        const newVideoItem: CaptureItem = {
          id: `video_${Date.now()}`,
          type: 'video',
          url: videoUrl,
          thumbnailUrl: thumbnail,
          createdAt: Date.now(),
          duration: recordingDuration,
          filterName: `${activeFilterObj?.name || 'Character'} Video`,
        };

        setGalleryItems(prev => [newVideoItem, ...prev]);
        setIsGalleryOpen(true);
      };

      recorder.start(250);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingDuration(0);

      recordingTimerRef.current = window.setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Error starting MediaRecorder:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
  };

  // 3. PHOTO BOOTH 3-SHOT SEQUENCE
  const startPhotoBooth = async () => {
    if (photoBoothRunning || isRecording) return;
    setPhotoBoothRunning(true);

    const poses = [
      'Pose 1: Goofy Face! 🤪',
      'Pose 2: Big Wink or Grin! 😉',
      'Pose 3: Wild Celebration! 🎉',
    ];
    const shots: string[] = [];

    for (let i = 0; i < 3; i++) {
      setPhotoBoothPrompt(poses[i]);
      for (let c = 3; c > 0; c--) {
        setCountdown(c);
        playCountdownBeep(false);
        await new Promise(r => setTimeout(r, 900));
      }
      setCountdown(0);
      playCountdownBeep(true);
      await new Promise(r => setTimeout(r, 300));

      const canvas = canvasRef.current;
      if (canvas) {
        triggerFlash();
        playShutterSound();
        shots.push(canvas.toDataURL('image/png', 0.95));
      }
      setCountdown(null);
      await new Promise(r => setTimeout(r, 600));
    }

    setPhotoBoothPrompt('Compiling Photo Strip...');

    // Generate Vertical Photo Strip Canvas
    if (shots.length === 3) {
      const stripCanvas = document.createElement('canvas');
      stripCanvas.width = 600;
      stripCanvas.height = 1500;
      const sCtx = stripCanvas.getContext('2d');

      if (sCtx) {
        // Strip Background (Retro film paper)
        sCtx.fillStyle = '#0f172a';
        sCtx.fillRect(0, 0, 600, 1500);

        // Gold border
        sCtx.strokeStyle = '#f59e0b';
        sCtx.lineWidth = 10;
        sCtx.strokeRect(15, 15, 570, 1470);

        // Header
        sCtx.fillStyle = '#f59e0b';
        sCtx.font = 'bold 30px sans-serif';
        sCtx.textAlign = 'center';
        sCtx.fillText('★ FUNNY PHOTO BOOTH ★', 300, 65);

        // Draw 3 Shots
        const loadImg = (src: string) =>
          new Promise<HTMLImageElement>(resolve => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
          });

        const [img1, img2, img3] = await Promise.all(shots.map(loadImg));
        const ph = 390;
        const pw = 520;
        const px = 40;

        sCtx.drawImage(img1, px, 90, pw, ph);
        sCtx.drawImage(img2, px, 510, pw, ph);
        sCtx.drawImage(img3, px, 930, pw, ph);

        // Frames around shots
        sCtx.strokeStyle = '#334155';
        sCtx.lineWidth = 4;
        sCtx.strokeRect(px, 90, pw, ph);
        sCtx.strokeRect(px, 510, pw, ph);
        sCtx.strokeRect(px, 930, pw, ph);

        // Footer info
        sCtx.fillStyle = '#94a3b8';
        sCtx.font = '16px monospace';
        sCtx.fillText(
          `${new Date().toLocaleDateString()} · FUNNYCAM LIVE`,
          300,
          1360
        );

        sCtx.fillStyle = '#f59e0b';
        sCtx.font = 'italic 18px sans-serif';
        sCtx.fillText('Made with hilarious character magic ✨', 300, 1400);

        const stripUrl = stripCanvas.toDataURL('image/png');
        const stripItem: CaptureItem = {
          id: `strip_${Date.now()}`,
          type: 'photo-strip',
          url: stripUrl,
          thumbnailUrl: stripUrl,
          createdAt: Date.now(),
          filterName: '3-Shot Photo Strip',
          photoStripUrls: shots,
        };

        setGalleryItems(prev => [stripItem, ...prev]);
        playFanfareSound();
        setIsGalleryOpen(true);
      }
    }

    setPhotoBoothRunning(false);
    setPhotoBoothPrompt('');
  };

  // Open AI Studio Modal with current frame
  const handleOpenAiModal = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setAiSnapshotUrl(dataUrl);
      setIsAiModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 3-Zone Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
          if (tab === 'gallery') setIsGalleryOpen(true);
          if (tab === 'photobooth') startPhotoBooth();
        }}
        galleryCount={galleryItems.length}
        onOpenAiStudio={handleOpenAiModal}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6">
        {/* Photo Booth Ongoing Prompt Banner */}
        {photoBoothRunning && (
          <div className="w-full bg-gradient-to-r from-rose-600 to-amber-500 text-slate-950 px-6 py-3 rounded-2xl shadow-xl flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2 font-display text-base md:text-lg font-black">
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>{photoBoothPrompt}</span>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-950/20 px-2.5 py-1 rounded-lg">
              3-Shot Comic Mode
            </span>
          </div>
        )}

        {/* Top: Camera Viewport with live Character AR filters */}
        <section className="w-full flex justify-center">
          <div className="w-full max-w-4xl">
            <CameraView
              currentFilter={currentFilter}
              voiceEffect={voiceEffect}
              isRecording={isRecording}
              recordingDuration={recordingDuration}
              countdown={countdown}
              flashActive={flashActive}
              registerMediaStream={handleRegisterMediaStream}
            />
          </div>
        </section>

        {/* Center: Tactile Shutter & Record Controls */}
        <section className="w-full max-w-4xl mx-auto">
          <CaptureControls
            isRecording={isRecording}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            onTakePhoto={handleTakePhotoWithTimer}
            onStartPhotoBooth={startPhotoBooth}
            timerSeconds={timerSeconds}
            setTimerSeconds={setTimerSeconds}
            isCountingDown={countdown !== null || photoBoothRunning}
            onOpenAiStudio={handleOpenAiModal}
          />
        </section>

        {/* Bottom: Filter Picker & Voice FX Matrix */}
        <section className="w-full max-w-4xl mx-auto">
          <FilterPicker
            currentFilter={currentFilter}
            onSelectFilter={setCurrentFilter}
            voiceEffect={voiceEffect}
            onSelectVoiceEffect={setVoiceEffect}
          />
        </section>
      </main>

      {/* AI Character Transformation Studio Modal */}
      <AiTransformModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        snapshotDataUrl={aiSnapshotUrl}
        onSaveToGallery={item => setGalleryItems(prev => [item, ...prev])}
      />

      {/* Media Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        items={galleryItems}
        onDeleteItem={id => {
          setGalleryItems(prev => {
            const next = prev.filter(i => i.id !== id);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch {}
            return next;
          });
        }}
        onClearAll={() => {
          setGalleryItems([]);
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {}
        }}
      />
    </div>
  );
}
