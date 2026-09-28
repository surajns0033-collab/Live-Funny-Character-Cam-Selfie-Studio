import React, { useState } from 'react';
import {
  X,
  Download,
  Trash2,
  Play,
  Film,
  Camera,
  Sparkles,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';
import { CaptureItem } from '../types';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CaptureItem[];
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  items,
  onDeleteItem,
  onClearAll,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'photo' | 'video' | 'photo-strip'>('all');
  const [selectedItem, setSelectedItem] = useState<CaptureItem | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const filtered = items.filter(
    item => filterType === 'all' || item.type === filterType
  );

  const handleDownload = (item: CaptureItem) => {
    const a = document.createElement('a');
    a.href = item.url;
    const ext = item.type === 'video' ? 'webm' : 'png';
    a.download = `funnycam_${item.type}_${item.createdAt}.${ext}`;
    a.click();
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    onDeleteItem(id);
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const handleClearAll = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    onClearAll();
    setSelectedItem(null);
    setConfirmClear(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[88vh]">
        {/* Gallery Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            {selectedItem && (
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer mr-1"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <span>📸 Media Gallery</span>
              <span className="text-xs bg-slate-800 text-amber-400 px-2 py-0.5 rounded-full font-mono">
                {items.length} items
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && !selectedItem && (
              confirmClear ? (
                <div className="flex items-center gap-1.5 bg-rose-950/80 border border-rose-600/60 px-2.5 py-1 rounded-xl">
                  <span className="text-xs text-rose-200">Delete all?</span>
                  <button
                    onClick={handleClearAll}
                    className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 px-2 py-0.5 rounded cursor-pointer"
                  >
                    Yes, Clear
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClear(true)}
                  className="text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg border border-rose-900/40 hover:bg-rose-950/40 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Navigation (when browsing grid) */}
        {!selectedItem && (
          <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-800/80 bg-slate-950/40 text-xs">
            {(['all', 'photo', 'video', 'photo-strip'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-colors cursor-pointer ${
                  filterType === type
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {type === 'all'
                  ? 'All Captures'
                  : type === 'photo'
                  ? 'Selfies'
                  : type === 'video'
                  ? 'Funny Videos'
                  : '3-Shot Strips'}
              </button>
            ))}
          </div>
        )}

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Detail View of single item */}
          {selectedItem ? (
            <div className="flex flex-col items-center max-w-2xl mx-auto">
              <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl mb-4">
                {selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.url}
                    controls
                    autoPlay
                    loop
                    className="w-full max-h-[58vh] object-contain"
                  />
                ) : (
                  <img
                    src={selectedItem.url}
                    alt="Capture Preview"
                    className="w-full max-h-[58vh] object-contain"
                  />
                )}
              </div>

              {/* Action Buttons for Detail Item */}
              <div className="w-full flex items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {selectedItem.title || selectedItem.filterName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {new Date(selectedItem.createdAt).toLocaleTimeString()} ·{' '}
                    <span className="capitalize">{selectedItem.type}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(selectedItem)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={() => {
                      onDeleteItem(selectedItem.id);
                      setSelectedItem(null);
                    }}
                    className="p-2 text-rose-400 hover:text-white hover:bg-rose-950/60 rounded-xl transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
              <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center text-3xl mb-3">
                📷
              </div>
              <h3 className="text-base font-bold text-slate-300 mb-1">
                No captures in this view yet
              </h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Try on a funny mask, snap a selfie or record a video with chipmunk voice!
              </p>
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map(item => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/90 hover:border-amber-400/60 transition-all cursor-pointer shadow-md hover:shadow-amber-500/10"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.filterName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Badge & Type indicator */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white border border-slate-700/60">
                    {item.type === 'video' ? (
                      <>
                        <Film className="w-3 h-3 text-red-400" />
                        <span>VIDEO</span>
                      </>
                    ) : item.type === 'photo-strip' ? (
                      <>
                        <Sparkles className="w-3 h-3 text-rose-400" />
                        <span>STRIP</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-3 h-3 text-amber-400" />
                        <span>SELFIE</span>
                      </>
                    )}
                  </div>

                  {/* Play Icon if video */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-slate-950/70 border border-white/20 flex items-center justify-center text-white shadow-lg">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Card Bottom Info */}
                  <div className="p-2.5 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200 truncate">
                      {item.title || item.filterName}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleDownload(item);
                        }}
                        className="p-1 text-slate-400 hover:text-amber-300 transition-colors"
                        title="Quick Download"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={e => handleDelete(item.id, e)}
                        className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Delete Capture"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
