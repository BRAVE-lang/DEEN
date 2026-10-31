// ==============================================================================
// DEEN — Global Floating Audio Player Component
// ==============================================================================

import React from 'react';
import { Play, Pause, Repeat, Volume2, X } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export const AudioFloatingPlayer: React.FC = () => {
  const {
    isPlaying,
    currentTrackTitle,
    togglePlay,
    repeatAyah,
    setRepeatAyah,
    progress,
    duration,
    seek,
    pauseAudio
  } = useAudio();

  if (!currentTrackTitle) return null;

  const formatSec = (s: number) => {
    if (isNaN(s)) return '0:00';
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-16 left-3 right-3 max-w-md mx-auto z-40 bg-deen-forest text-deen-ivory rounded-2xl p-3 shadow-2xl border border-deen-gold/30 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center justify-between gap-3">
        {/* Track Details */}
        <div className="flex items-center gap-2.5 overflow-hidden flex-1">
          <div className="w-9 h-9 rounded-xl bg-deen-gold/20 flex items-center justify-center shrink-0">
            <Volume2 className="w-4 h-4 text-deen-gold-light animate-pulse" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">{currentTrackTitle}</p>
            <p className="text-[10px] text-deen-gold-light">
              {formatSec(progress)} / {formatSec(duration)}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setRepeatAyah(!repeatAyah)}
            title={repeatAyah ? 'Repeat Enabled' : 'Repeat Disabled'}
            className={`p-1.5 rounded-lg transition-colors ${
              repeatAyah ? 'text-deen-gold-light bg-deen-gold/20' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Repeat className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-deen-emerald hover:bg-deen-emerald-light text-white flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-deen-emerald/40"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={pauseAudio}
            title="Close Player"
            className="p-1.5 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrubber Progress Bar */}
      <div className="mt-2 flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={progress || 0}
          onChange={(e) => seek(Number(e.target.value))}
          className="w-full h-1 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-deen-gold"
        />
      </div>
    </div>
  );
};
