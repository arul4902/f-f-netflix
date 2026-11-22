import React, { useState, useRef, useEffect } from 'react';
import { 
  Volume2, VolumeX, Play, Pause, ChevronDown, ChevronUp, 
  Disc, Sparkles, Music2 
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const PLAYLIST = [
  {
    id: 'songify',
    title: 'USURA (Songify Original)',
    artist: 'Dedicated to Fayaz by Fazila',
    src: '/assets/songify-our-song.mp3',
    badge: 'Songify Master'
  },
  {
    id: 'beach',
    title: 'Save The Date Theme',
    artist: 'Beach Sunset Milestone',
    src: '/assets/save-the-date-beach.mp4',
    badge: 'Cinematic Score'
  }
];

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onTogglePlay }) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeTrack = PLAYLIST[activeTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  const handleSwitchTrack = (index: number) => {
    setActiveTrackIndex(index);
    soundFX.playChime(1000);
    if (!isPlaying) onTogglePlay();
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 max-w-[calc(100vw-24px)]">
      {/* Audio Element playing Songify Track by default */}
      <audio
        ref={audioRef}
        src={activeTrack.src}
        loop
        preload="metadata"
      />

      <div className="bg-gradient-to-br from-[#201326] via-midnight-950 to-midnight-950/95 backdrop-blur-2xl border border-gold/40 rounded-2xl shadow-2xl p-2.5 sm:p-3 transition-all duration-300">
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Play/Pause Button with Mini Vinyl Record Animation */}
          <button
            onClick={() => {
              onTogglePlay();
              soundFX.playChime(isPlaying ? 600 : 900);
            }}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer flex-none relative overflow-hidden ${
              isPlaying
                ? 'bg-gradient-to-tr from-gold to-gold-light text-midnight-950 shadow-gold/20'
                : 'bg-wine-900 border border-gold/40 text-gold hover:bg-wine-800'
            }`}
            title={isPlaying ? 'Pause Music' : 'Play Music'}
            aria-label="Play/Pause Background Music"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-midnight-950" />
            ) : (
              <Play className="w-5 h-5 fill-gold ml-0.5" />
            )}
          </button>

          {/* Track Information */}
          <div className="max-w-[150px] sm:max-w-[190px] overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] sm:text-[10px] font-mono text-gold uppercase tracking-wider font-bold truncate">
                {activeTrack.badge}
              </span>
              {isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping flex-none" />
              )}
            </div>
            <p className="text-xs sm:text-sm text-ivory font-serif italic truncate">
              {activeTrack.title}
            </p>
          </div>

          {/* Animated Frequency Bars */}
          {isPlaying && (
            <div className="hidden xs:flex items-end gap-1 h-5 px-1 flex-none">
              <span className="w-1 bg-gold h-3 animate-[pulse_0.5s_ease-in-out_infinite]" />
              <span className="w-1 bg-gold h-5 animate-[pulse_0.8s_ease-in-out_infinite_0.1s]" />
              <span className="w-1 bg-gold h-2 animate-[pulse_0.6s_ease-in-out_infinite_0.3s]" />
              <span className="w-1 bg-gold h-4 animate-[pulse_0.7s_ease-in-out_infinite_0.2s]" />
            </div>
          )}

          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-midnight-900/80 hover:bg-midnight-900 border border-gold/25 text-ivory hover:text-gold flex items-center justify-center transition-colors cursor-pointer flex-none active:scale-95"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label="Mute or Unmute"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-dusty" />
            ) : (
              <Volume2 className="w-4 h-4 text-gold" />
            )}
          </button>

          {/* Expand Track Switcher Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 flex items-center justify-center text-ivory/60 hover:text-gold transition-colors flex-none"
            aria-label="Toggle Track Options"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Options: Playlist Switcher & Volume Slider */}
        {isExpanded && (
          <div className="pt-3 mt-2 border-t border-gold/20 space-y-2.5 animate-fade-in">
            {/* Track Selectors */}
            <div className="space-y-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-gold/80 block">
                Select Audio Soundtrack:
              </span>
              <div className="grid grid-cols-1 gap-1">
                {PLAYLIST.map((trk, idx) => (
                  <button
                    key={trk.id}
                    onClick={() => handleSwitchTrack(idx)}
                    className={`w-full text-left p-1.5 rounded-lg text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                      activeTrackIndex === idx 
                        ? 'bg-gold/20 text-gold border border-gold/40 font-bold' 
                        : 'hover:bg-midnight-900/80 text-ivory/60 hover:text-ivory'
                    }`}
                  >
                    <span className="truncate pr-2">{trk.title}</span>
                    {activeTrackIndex === idx && <span className="text-[10px] text-emerald-400">● Active</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 pt-1 border-t border-gold/10">
              <span className="text-[10px] font-mono text-ivory/50">Vol</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-full h-1 bg-midnight-900 rounded-lg appearance-none cursor-pointer accent-gold"
                aria-label="Volume Slider"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
