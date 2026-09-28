import React from 'react';
import { Sparkles, Camera, Images, Wand2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'camera' | 'photobooth' | 'gallery';
  setActiveTab: (tab: 'camera' | 'photobooth' | 'gallery') => void;
  galleryCount: number;
  onOpenAiStudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  galleryCount,
  onOpenAiStudio,
}) => {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Zone */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-md shadow-rose-950/40">
            <span className="text-xl">🎭</span>
          </div>
          <a
            href="/"
            className="text-xl md:text-2xl font-bold tracking-tight text-white font-display flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            FunnyCam Live
          </a>
        </div>

        {/* Zone 2: Navigation Links (single line prose, clean hover underlines) */}
        <nav className="flex items-center gap-1 md:gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'camera'
                ? 'text-white bg-slate-800/90 font-semibold shadow-inner'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Live Cam</span>
          </button>

          <button
            onClick={() => setActiveTab('photobooth')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'photobooth'
                ? 'text-white bg-slate-800/90 font-semibold shadow-inner'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>3-Shot Strip</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'text-white bg-slate-800/90 font-semibold shadow-inner'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Images className="w-4 h-4 text-emerald-400" />
            <span>Gallery</span>
            {galleryCount > 0 && (
              <span className="text-xs bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded-md font-mono font-bold">
                {galleryCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAiStudio}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-lg shadow-sm hover:shadow-amber-500/20 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            <Wand2 className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">AI Comic Persona</span>
            <span className="sm:hidden">AI Persona</span>
          </button>
        </div>
      </div>
    </header>
  );
};
