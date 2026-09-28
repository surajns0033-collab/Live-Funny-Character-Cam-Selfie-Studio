import React from 'react';
import { Camera, Video, Square, Clock, Sparkles, Wand2 } from 'lucide-react';

interface CaptureControlsProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onTakePhoto: () => void;
  onStartPhotoBooth: () => void;
  timerSeconds: number;
  setTimerSeconds: (s: number) => void;
  isCountingDown: boolean;
  onOpenAiStudio: () => void;
}

export const CaptureControls: React.FC<CaptureControlsProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  onTakePhoto,
  onStartPhotoBooth,
  timerSeconds,
  setTimerSeconds,
  isCountingDown,
  onOpenAiStudio,
}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
      {/* Left: Timer Selector (Instant, 3s, 5s) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800 text-xs">
        <Clock className="w-3.5 h-3.5 text-amber-400 ml-2 mr-1" />
        <span className="text-slate-400 font-medium pr-1 hidden sm:inline">Timer:</span>
        {[0, 3, 5].map(sec => (
          <button
            key={sec}
            onClick={() => setTimerSeconds(sec)}
            className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-colors cursor-pointer ${
              timerSeconds === sec
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {sec === 0 ? 'Off' : `${sec}s`}
          </button>
        ))}
      </div>

      {/* Center: Main Primary Action Buttons (Selfie Snap & Video Record) */}
      <div className="flex items-center gap-5">
        {/* 3-Shot Strip Button */}
        <button
          onClick={onStartPhotoBooth}
          disabled={isRecording || isCountingDown}
          title="Take 3-Shot Photo Strip"
          className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-rose-300 border border-rose-500/30 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-rose-400" />
          <span className="text-[11px] font-bold">3-Shot</span>
        </button>

        {/* Primary Shutter Button (Snapshot Selfie) */}
        <div className="relative group">
          <button
            onClick={onTakePhoto}
            disabled={isRecording || isCountingDown}
            className="w-18 h-18 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 hover:from-amber-400 hover:to-amber-200 p-1.5 shadow-lg shadow-amber-500/25 active:scale-90 transition-transform flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            <div className="w-full h-full rounded-full border-2 border-slate-950 flex items-center justify-center bg-white/20">
              <Camera className="w-7 h-7 text-slate-950" />
            </div>
          </button>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[11px] font-bold text-amber-300 whitespace-nowrap">
            Selfie
          </span>
        </div>

        {/* Video Record Toggle Button */}
        <div className="relative group">
          <button
            onClick={isRecording ? onStopRecording : onStartRecording}
            disabled={isCountingDown}
            className={`w-18 h-18 rounded-full p-1.5 shadow-lg active:scale-90 transition-transform flex items-center justify-center cursor-pointer ${
              isRecording
                ? 'bg-red-600 hover:bg-red-500 shadow-red-600/30 ring-4 ring-red-500/30 animate-pulse'
                : 'bg-gradient-to-tr from-red-600 to-rose-400 hover:from-red-500 hover:to-rose-300 shadow-rose-600/20'
            }`}
          >
            <div className="w-full h-full rounded-full border-2 border-slate-950 flex items-center justify-center bg-white/20">
              {isRecording ? (
                <Square className="w-6 h-6 text-white fill-white" />
              ) : (
                <Video className="w-7 h-7 text-white" />
              )}
            </div>
          </button>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[11px] font-bold text-rose-300 whitespace-nowrap">
            {isRecording ? 'Stop' : 'Video'}
          </span>
        </div>
      </div>

      {/* Right: AI Comic Persona Shortcut */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenAiStudio}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-900/30 active:scale-95 transition-all cursor-pointer"
        >
          <Wand2 className="w-4 h-4 text-amber-300" />
          <span>AI Caricature</span>
        </button>
      </div>
    </div>
  );
};
