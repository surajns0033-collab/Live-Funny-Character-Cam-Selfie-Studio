// Web Audio API Sound FX and Live Mic Voice Processor
import { VoiceEffectId } from '../types';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. SOUND EFFECTS
export function playShutterSound() {
  try {
    const ctx = getAudioContext();
    const t = ctx.currentTime;

    // Click mechanical snap
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.08);

    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);

    // Follow-up mechanical shutter click
    setTimeout(() => {
      if (ctx.state === 'closed') return;
      const t2 = ctx.currentTime;
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(800, t2);
      osc2.frequency.exponentialRampToValueAtTime(80, t2 + 0.12);

      gain2.gain.setValueAtTime(0.5, t2);
      gain2.gain.exponentialRampToValueAtTime(0.01, t2 + 0.12);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(t2);
      osc2.stop(t2 + 0.13);
    }, 70);
  } catch (e) {
    console.warn('Audio play error:', e);
  }
}

export function playCountdownBeep(isFinal = false) {
  try {
    const ctx = getAudioContext();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const freq = isFinal ? 880 : 440; // High pitch for 0 / Smile!
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + (isFinal ? 0.3 : 0.15));

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + (isFinal ? 0.32 : 0.16));
  } catch (e) {
    console.warn('Countdown beep error:', e);
  }
}

export function playBoingSound() {
  try {
    const ctx = getAudioContext();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.25);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.45);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.52);
  } catch (e) {
    console.warn('Boing sound error:', e);
  }
}

export function playHonkSound() {
  try {
    const ctx = getAudioContext();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.linearRampToValueAtTime(190, t + 0.25);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.32);
  } catch (e) {
    console.warn('Honk error:', e);
  }
}

export function playSqueakSound() {
  try {
    const ctx = getAudioContext();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(2800, t + 0.1);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.22);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.26);
  } catch (e) {
    console.warn('Squeak error:', e);
  }
}

export function playFanfareSound() {
  try {
    const ctx = getAudioContext();
    const notes = [261.63, 329.63, 392.0, 523.25]; // C E G C
    notes.forEach((freq, index) => {
      const t = ctx.currentTime + index * 0.09;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + (index === 3 ? 0.5 : 0.15));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + (index === 3 ? 0.52 : 0.16));
    });
  } catch (e) {
    console.warn('Fanfare error:', e);
  }
}

// 2. LIVE VOICE PROCESSOR FOR MICROPHONE & VIDEO RECORDING
export class VoiceProcessor {
  private ctx: AudioContext;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private destNode: MediaStreamAudioDestinationNode;
  private currentEffect: VoiceEffectId = 'none';

  // Processing nodes
  private dryGain: GainNode;
  private wetGain: GainNode;
  private delayNode: DelayNode | null = null;
  private feedbackGain: GainNode | null = null;
  private modulatorOsc: OscillatorNode | null = null;
  private modulatorGain: GainNode | null = null;
  private biquadFilter: BiquadFilterNode | null = null;

  constructor(stream: MediaStream) {
    this.ctx = getAudioContext();
    this.destNode = this.ctx.createMediaStreamDestination();
    this.dryGain = this.ctx.createGain();
    this.wetGain = this.ctx.createGain();

    try {
      this.sourceNode = this.ctx.createMediaStreamSource(stream);
      this.setupGraph();
    } catch (err) {
      console.warn('Could not initialize MediaStreamSource:', err);
    }
  }

  private setupGraph() {
    if (!this.sourceNode) return;

    // Disconnect old nodes if any
    try {
      this.dryGain.disconnect();
      this.wetGain.disconnect();
    } catch {}

    // Connect dry path directly
    this.sourceNode.connect(this.dryGain);
    this.dryGain.connect(this.destNode);

    this.applyEffect(this.currentEffect);
  }

  public setEffect(effect: VoiceEffectId) {
    this.currentEffect = effect;
    this.applyEffect(effect);
  }

  private applyEffect(effect: VoiceEffectId) {
    if (!this.sourceNode) return;

    // Clean up dynamic effect nodes
    if (this.modulatorOsc) {
      try {
        this.modulatorOsc.stop();
        this.modulatorOsc.disconnect();
      } catch {}
      this.modulatorOsc = null;
    }
    if (this.modulatorGain) {
      try {
        this.modulatorGain.disconnect();
      } catch {}
      this.modulatorGain = null;
    }
    if (this.delayNode) {
      try {
        this.delayNode.disconnect();
      } catch {}
      this.delayNode = null;
    }
    if (this.feedbackGain) {
      try {
        this.feedbackGain.disconnect();
      } catch {}
      this.feedbackGain = null;
    }
    if (this.biquadFilter) {
      try {
        this.biquadFilter.disconnect();
      } catch {}
      this.biquadFilter = null;
    }

    if (effect === 'none') {
      this.dryGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.wetGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      return;
    }

    if (effect === 'chipmunk') {
      // High-pass filter + sharp harmonic boost
      this.dryGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      this.biquadFilter = this.ctx.createBiquadFilter();
      this.biquadFilter.type = 'highpass';
      this.biquadFilter.frequency.setValueAtTime(650, this.ctx.currentTime);
      this.biquadFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'peaking';
      bandpass.frequency.setValueAtTime(2400, this.ctx.currentTime);
      bandpass.gain.setValueAtTime(14, this.ctx.currentTime);

      this.wetGain.gain.setValueAtTime(1.2, this.ctx.currentTime);

      this.sourceNode.connect(this.biquadFilter);
      this.biquadFilter.connect(bandpass);
      bandpass.connect(this.wetGain);
      this.wetGain.connect(this.destNode);
    } else if (effect === 'robot') {
      // Ring modulation
      this.dryGain.gain.setValueAtTime(0.1, this.ctx.currentTime);

      this.modulatorOsc = this.ctx.createOscillator();
      this.modulatorOsc.type = 'sawtooth';
      this.modulatorOsc.frequency.setValueAtTime(65, this.ctx.currentTime); // Low robotic buzz

      this.modulatorGain = this.ctx.createGain();
      this.modulatorGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

      this.sourceNode.connect(this.modulatorGain);
      this.modulatorGain.connect(this.wetGain);
      this.wetGain.gain.setValueAtTime(1.4, this.ctx.currentTime);
      this.wetGain.connect(this.destNode);

      // Connect oscillator to modulate gain
      this.modulatorOsc.connect(this.modulatorGain.gain);
      this.modulatorOsc.start();
    } else if (effect === 'echo') {
      // Cosmic stadium echo
      this.dryGain.gain.setValueAtTime(0.8, this.ctx.currentTime);

      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.setValueAtTime(0.22, this.ctx.currentTime);

      this.feedbackGain = this.ctx.createGain();
      this.feedbackGain.gain.setValueAtTime(0.45, this.ctx.currentTime);

      this.delayNode.connect(this.feedbackGain);
      this.feedbackGain.connect(this.delayNode);

      this.sourceNode.connect(this.delayNode);
      this.delayNode.connect(this.wetGain);
      this.wetGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.wetGain.connect(this.destNode);
    } else if (effect === 'alien') {
      // Tremolo + eerie bandpass
      this.dryGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

      this.modulatorOsc = this.ctx.createOscillator();
      this.modulatorOsc.type = 'sine';
      this.modulatorOsc.frequency.setValueAtTime(14, this.ctx.currentTime); // Fast vibrato

      this.modulatorGain = this.ctx.createGain();
      this.modulatorGain.gain.setValueAtTime(0.6, this.ctx.currentTime);

      this.biquadFilter = this.ctx.createBiquadFilter();
      this.biquadFilter.type = 'bandpass';
      this.biquadFilter.frequency.setValueAtTime(1100, this.ctx.currentTime);
      this.biquadFilter.Q.setValueAtTime(3.0, this.ctx.currentTime);

      this.sourceNode.connect(this.biquadFilter);
      this.biquadFilter.connect(this.modulatorGain);
      this.modulatorGain.connect(this.wetGain);
      this.wetGain.gain.setValueAtTime(1.1, this.ctx.currentTime);
      this.wetGain.connect(this.destNode);

      this.modulatorOsc.connect(this.modulatorGain.gain);
      this.modulatorOsc.start();
    }
  }

  public getProcessedStream(): MediaStream {
    return this.destNode.stream;
  }

  public destroy() {
    try {
      if (this.modulatorOsc) {
        this.modulatorOsc.stop();
        this.modulatorOsc.disconnect();
      }
      this.sourceNode?.disconnect();
      this.destNode.disconnect();
    } catch {}
  }
}

// 3. Play base64 audio from Gemini TTS
export function playBase64Audio(base64Data: string): HTMLAudioElement {
  const audio = new Audio(`data:audio/mp3;base64,${base64Data}`);
  audio.play().catch(e => {
    console.warn('Audio playback error:', e);
  });
  return audio;
}

// Fallback speech using browser Web Speech API
export function speakWithWebSpeech(text: string, pitch = 1.3, rate = 1.1) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = pitch;
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}
