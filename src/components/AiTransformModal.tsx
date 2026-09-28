import React, { useState } from 'react';
import {
  X,
  Wand2,
  Volume2,
  Download,
  Sparkles,
  Share2,
  RefreshCw,
  Tag,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { AiCharacterPersona, CaptureItem } from '../types';
import { playBase64Audio, speakWithWebSpeech, playFanfareSound } from '../utils/audio';

interface AiTransformModalProps {
  isOpen: boolean;
  onClose: () => void;
  snapshotDataUrl: string | null;
  onSaveToGallery: (item: CaptureItem) => void;
}

export const AiTransformModal: React.FC<AiTransformModalProps> = ({
  isOpen,
  onClose,
  snapshotDataUrl,
  onSaveToGallery,
}) => {
  const [style, setStyle] = useState('Saturday Morning Cartoon');
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState<AiCharacterPersona | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [comicText, setComicText] = useState('');
  const [selectedStickers, setSelectedStickers] = useState<string[]>(['💥', '🍕']);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !snapshotDataUrl) return null;

  const styles = [
    'Saturday Morning Cartoon',
    'Comic Book Superhero',
    'Sci-Fi Space Creature',
    'Anime Chibi Hero',
    'Crazy Video Game Boss',
  ];

  const availableStickers = ['💥', '⚡', '🍕', '👑', '🕶️', '👽', '🐶', '🔥', '⭐', '🌮'];

  const toggleSticker = (s: string) => {
    if (selectedStickers.includes(s)) {
      setSelectedStickers(selectedStickers.filter(item => item !== s));
    } else {
      if (selectedStickers.length < 5) {
        setSelectedStickers([...selectedStickers, s]);
      }
    }
  };

  const handleGeneratePersona = async () => {
    try {
      setLoading(true);
      setPersona(null);
      setSavedSuccess(false);

      const res = await fetch('/api/ai/transform-character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: snapshotDataUrl,
          style,
        }),
      });

      const data: AiCharacterPersona = await res.json();
      setPersona(data);
      setComicText(data.catchphrase);

      // Play fanfare on success
      playFanfareSound();

      // Attempt TTS voice fetch
      try {
        const voiceRes = await fetch('/api/ai/character-voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: data.catchphrase,
            voice: 'Puck',
          }),
        });
        const voiceData = await voiceRes.json();
        if (voiceData.audioBase64) {
          data.voiceAudioBase64 = voiceData.audioBase64;
          setPersona({ ...data });
          playVoice(voiceData.audioBase64, data.catchphrase);
        } else {
          speakWithWebSpeech(data.catchphrase, 1.3, 1.05);
        }
      } catch {
        speakWithWebSpeech(data.catchphrase, 1.3, 1.05);
      }
    } catch (err) {
      console.error('Error generating AI persona:', err);
    } finally {
      setLoading(false);
    }
  };

  const playVoice = (audioBase64?: string | null, textToSpeak?: string) => {
    setIsPlayingAudio(true);
    if (audioBase64) {
      const audio = playBase64Audio(audioBase64);
      audio.onended = () => setIsPlayingAudio(false);
    } else {
      speakWithWebSpeech(textToSpeak || persona?.catchphrase || '', 1.3, 1.05);
      setTimeout(() => setIsPlayingAudio(false), 2500);
    }
  };

  // Compile composite comic card image and download
  const handleDownloadCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw comic book poster background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 900, 1200);

    // Comic halftone / frame
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, 860, 1160);

    // Load photo
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = snapshotDataUrl;
    img.onload = () => {
      // Photo area
      ctx.drawImage(img, 50, 140, 800, 560);

      // Photo border
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 6;
      ctx.strokeRect(50, 140, 800, 560);

      // Header Banner
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(40, 45, 820, 70);
      ctx.fillStyle = '#020617';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(persona?.characterName || 'FUNNY CARTOON HERO', 450, 95);

      // Archetype
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 22px monospace';
      ctx.fillText(`⚡ ${persona?.archetype || 'SUPERPERSONA'} ⚡`, 450, 735);

      // Catchphrase Comic Bubble
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(80, 770, 740, 90, 16);
      ctx.fill();
      ctx.strokeStyle = '#020617';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#020617';
      ctx.font = 'italic bold 24px sans-serif';
      ctx.fillText(`"${comicText || persona?.catchphrase || 'BEEP BOOP!'}"`, 450, 825);

      // Superpower & Weakness box
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(80, 890, 740, 220, 16);
      ctx.fill();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('✨ SUPERPOWER:', 110, 940);
      ctx.fillStyle = '#f8fafc';
      ctx.font = '19px sans-serif';
      ctx.fillText((persona?.power || 'Infinite hilarity').slice(0, 60), 110, 975);

      ctx.fillStyle = '#f87171';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('💀 KRYPTONITE:', 110, 1030);
      ctx.fillStyle = '#f8fafc';
      ctx.font = '19px sans-serif';
      ctx.fillText((persona?.weakness || 'Tickles').slice(0, 60), 110, 1065);

      // Stickers overlay
      ctx.font = '55px sans-serif';
      selectedStickers.forEach((st, idx) => {
        ctx.fillText(st, 100 + idx * 85, 660);
      });

      // Rating badge
      if (persona?.ratingBadge) {
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(620, 150, 210, 45);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(persona.ratingBadge, 725, 180);
      }

      // Download
      const link = document.createElement('a');
      link.download = `funny_character_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      // Also save to app gallery
      onSaveToGallery({
        id: `card_${Date.now()}`,
        type: 'photo',
        url: canvas.toDataURL('image/png'),
        thumbnailUrl: canvas.toDataURL('image/png'),
        createdAt: Date.now(),
        filterName: persona?.characterName || 'AI Comic Character',
        title: persona?.characterName,
        aiCharacter: persona || undefined,
      });

      setSavedSuccess(true);
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ✨
            </div>
            <h2 className="text-lg font-bold text-white font-display">
              AI Funny Character Studio
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left Column: Image Preview with Overlay Stickers & Speech */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-inner group">
              <img
                src={snapshotDataUrl}
                alt="Selfie Snapshot"
                className="w-full h-full object-cover"
              />

              {/* Speech Bubble on Photo */}
              {comicText && (
                <div className="absolute top-4 left-4 right-4 bg-white text-slate-950 text-xs md:text-sm font-black p-3 rounded-2xl shadow-xl border-2 border-slate-950 animate-bounce">
                  <div className="italic font-display">"{comicText}"</div>
                  <div className="absolute -bottom-2.5 left-8 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white" />
                </div>
              )}

              {/* Floating Stamps / Stickers */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                {selectedStickers.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-3xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-pulse"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Persona Stat Badge */}
              {persona?.ratingBadge && (
                <div className="absolute bottom-3 right-3 bg-rose-600 text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md border border-rose-400/40">
                  {persona.ratingBadge}
                </div>
              )}
            </div>

            {/* Sticker Selector Bar */}
            <div className="w-full mt-3 p-2 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between gap-1 overflow-x-auto">
              <span className="text-[11px] text-slate-400 font-bold px-1 whitespace-nowrap">
                Stickers:
              </span>
              <div className="flex items-center gap-1.5">
                {availableStickers.map(st => (
                  <button
                    key={st}
                    onClick={() => toggleSticker(st)}
                    className={`text-lg p-1 rounded-lg transition-transform hover:scale-125 cursor-pointer ${
                      selectedStickers.includes(st)
                        ? 'bg-amber-500/20 border border-amber-400/40'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Generation Controls & Persona Card */}
          <div className="flex flex-col gap-4">
            {/* Style Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Caricature Comic Style
              </label>
              <select
                value={style}
                onChange={e => setStyle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-2.5 focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                {styles.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGeneratePersona}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Gemini is brewing your funny persona...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-slate-950" />
                  <span>{persona ? 'Re-roll Character Persona' : 'Transform into Funny Character!'}</span>
                </>
              )}
            </button>

            {/* Persona Details Card */}
            {persona && (
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex flex-col gap-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-amber-300 font-display">
                      {persona.characterName}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {persona.archetype}
                    </p>
                  </div>
                  <button
                    onClick={() => playVoice(persona.voiceAudioBase64, persona.catchphrase)}
                    disabled={isPlayingAudio}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                    <span>{isPlayingAudio ? 'Talking...' : 'Hear Voice'}</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-200">Superpower: </span>
                      <span className="text-slate-300">{persona.power}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-200">Comic Kryptonite: </span>
                      <span className="text-slate-300">{persona.weakness}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 italic p-2 bg-slate-900/40 rounded-lg">
                    "{persona.backstory}"
                  </div>
                </div>

                {/* Edit Caption Input */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Custom Comic Speech:
                  </label>
                  <input
                    type="text"
                    value={comicText}
                    onChange={e => setComicText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-amber-400 focus:outline-none"
                    placeholder="Type funny quote..."
                  />
                </div>

                {/* Download and Share Button */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleDownloadCard}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-950/40 active:scale-98 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Caricature Card</span>
                  </button>
                </div>

                {savedSuccess && (
                  <p className="text-[11px] text-emerald-400 text-center font-bold">
                    ✓ Saved to your local app gallery!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
