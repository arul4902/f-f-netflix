import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronDown, ChevronUp } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onTogglePlay }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40">
      <audio
        ref={audioRef}
        src="/assets/save-the-date-beach.mp4"
        loop
        preload="metadata"
      />

      <div className="bg-midnight-950/95 backdrop-blur-xl border border-gold/30 rounded-2xl shadow-2xl p-2 sm:p-3 transition-all duration-300">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Play/Pause Button (Min 44x44px touch target) */}
          <button
            onClick={onTogglePlay}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gold hover:bg-gold-light text-midnight-950 flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer flex-none"
            title={isPlaying ? 'Pause Soundtrack' : 'Play Soundtrack'}
            aria-label="Play/Pause Ambient Soundtrack"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-midnight-950" />
            ) : (
              <Play className="w-4 h-4 fill-midnight-950 ml-0.5" />
            )}
          </button>

          {/* Track Info (Hidden on small mobile) */}
          <div className="hidden md:block max-w-[170px]">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-gold uppercase tracking-wider font-semibold">
                WEDDING SOUNDTRACK
              </span>
              {isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              )}
            </div>
            <p className="text-xs text-ivory/90 truncate font-serif italic">
              Save The Date Beach Theme
            </p>
          </div>

          {/* Equalizer Wave Indicator */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 sm:gap-1 h-4 sm:h-5 px-0.5 sm:px-1 flex-none">
              <span className="w-0.5 sm:w-1 bg-gold h-2.5 animate-[pulse_0.5s_ease-in-out_infinite]" />
              <span className="w-0.5 sm:w-1 bg-gold h-4 sm:h-5 animate-[pulse_0.8s_ease-in-out_infinite_0.1s]" />
              <span className="w-0.5 sm:w-1 bg-gold h-2 animate-[pulse_0.6s_ease-in-out_infinite_0.3s]" />
              <span className="w-0.5 sm:w-1 bg-gold h-3 sm:h-4 animate-[pulse_0.7s_ease-in-out_infinite_0.2s]" />
            </div>
          )}

          {/* Mute Toggle (Min 40x40px touch target) */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-wine-900/60 hover:bg-wine-900 border border-gold/20 text-ivory hover:text-gold flex items-center justify-center transition-colors cursor-pointer flex-none active:scale-95"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label="Mute or Unmute"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-dusty" />
            ) : (
              <Volume2 className="w-4 h-4 text-gold" />
            )}
          </button>

          {/* Volume Slider Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-ivory/50 hover:text-ivory flex-none"
            aria-label="Toggle Volume Control"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expandable Volume Slider */}
        {isExpanded && (
          <div className="pt-2.5 mt-2 border-t border-gold/15 flex items-center gap-2.5 px-1">
            <span className="text-[10px] font-mono text-ivory/60">VOL</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1 bg-wine-900 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <span className="text-[10px] font-mono text-gold flex-none">
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
