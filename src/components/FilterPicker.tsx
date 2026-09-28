import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { CharacterFilterId, VoiceEffectId, FilterCategory } from '../types';
import { CHARACTER_FILTERS } from '../utils/filters';

interface FilterPickerProps {
  currentFilter: CharacterFilterId;
  onSelectFilter: (id: CharacterFilterId) => void;
  voiceEffect: VoiceEffectId;
  onSelectVoiceEffect: (id: VoiceEffectId) => void;
  anchorScale?: number;
  setAnchorScale?: (s: number) => void;
}

export const FilterPicker: React.FC<FilterPickerProps> = ({
  currentFilter,
  onSelectFilter,
  voiceEffect,
  onSelectVoiceEffect,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory | 'all'>('realistic');

  const categories: { id: FilterCategory | 'all'; label: string; icon: string }[] = [
    { id: 'realistic', label: 'Realistic AR', icon: '🎭' },
    { id: 'snap_animals', label: 'Snap Animals', icon: '🐶' },
    { id: 'fantasy', label: 'Fantasy & Hero', icon: '✨' },
    { id: 'warps', label: 'Face Warps', icon: '🌀' },
    { id: 'all', label: 'All FX', icon: '🌟' },
  ];

  const voiceOptions: { id: VoiceEffectId; label: string; icon: string }[] = [
    { id: 'none', label: 'Normal Voice', icon: '🎤' },
    { id: 'chipmunk', label: 'Chipmunk', icon: '🐿️' },
    { id: 'robot', label: 'Cyber Bot', icon: '🤖' },
    { id: 'echo', label: 'Echo Cave', icon: '📢' },
    { id: 'alien', label: 'Alien Vibrato', icon: '👽' },
  ];

  const filteredItems = CHARACTER_FILTERS.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  const handleFilterClick = (filterId: CharacterFilterId) => {
    onSelectFilter(filterId);
    const found = CHARACTER_FILTERS.find(f => f.id === filterId);
    if (found?.recommendedVoice && voiceEffect === 'none') {
      onSelectVoiceEffect(found.recommendedVoice);
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
      {/* Top Filter Category & Voice Selector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800">
        {/* Category Tabs (Clean Segmented Control) */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-950/70 rounded-xl border border-slate-800/80 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Voice FX Quick Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Voice:</span>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto p-0.5 bg-slate-950/70 rounded-lg border border-slate-800">
            {voiceOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => onSelectVoiceEffect(opt.id)}
                title={opt.label}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                  voiceEffect === opt.id
                    ? 'bg-slate-800 text-amber-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span>{opt.icon}</span>
                <span className="hidden md:inline">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-56 overflow-y-auto pr-1">
        {filteredItems.map(item => {
          const isSelected = currentFilter === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleFilterClick(item.id)}
              className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all cursor-pointer relative group ${
                isSelected
                  ? 'bg-slate-800/90 border-amber-400 shadow-md shadow-amber-500/10 scale-[1.02]'
                  : 'bg-slate-950/50 border-slate-800/90 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              {/* Emoji Badge with subtle color glow */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-1.5 transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: isSelected ? `${item.accentColor}25` : 'rgba(30, 41, 59, 0.5)',
                  border: isSelected ? `1.5px solid ${item.accentColor}` : '1px solid rgba(51, 65, 85, 0.4)',
                }}
              >
                {item.emoji}
              </div>

              {/* Title */}
              <span
                className={`text-xs font-bold leading-tight truncate w-full ${
                  isSelected ? 'text-amber-300' : 'text-slate-200'
                }`}
              >
                {item.name}
              </span>

              {/* Subtitle description */}
              <span className="text-[10px] text-slate-500 truncate w-full mt-0.5">
                {item.description}
              </span>

              {/* Active Indicator dot */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
