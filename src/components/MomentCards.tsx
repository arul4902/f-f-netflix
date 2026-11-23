import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Quote } from 'lucide-react';
import { MomentCard } from '../types';

interface MomentCardProps {
  card: MomentCard;
  onSelect: (card: MomentCard) => void;
  onExpandVideo?: (card: MomentCard) => void;
}

/**
 * REUSABLE INLINE VIDEO PLAYER FOR CARDS
 * Plays right in-place inside the card where the user clicks!
 */
export const InlineCardVideo: React.FC<{
  videoSrc: string;
  poster?: string;
  title: string;
  onExpand?: () => void;
}> = ({ videoSrc, poster, title, onExpand }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div 
      className="relative w-full h-full bg-black group/video cursor-pointer select-none overflow-hidden"
      onClick={togglePlay}
    >
      {/* Poster photo before video plays so faces and real moments are always visible */}
      {!isPlaying && poster && (
        <img
          src={poster}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-[center_20%] z-0 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      )}

      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className={`w-full h-full object-cover object-[center_20%] ${!isPlaying && poster ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />

      {/* Progress Bar along bottom of video */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-midnight-950/60 z-20">
          <div 
            className="h-full bg-gradient-to-r from-gold to-berry transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Video Badge indicator */}
      {!isPlaying && (
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="px-2 py-0.5 rounded bg-midnight-950/85 border border-gold/40 text-gold text-[9px] sm:text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-berry animate-pulse" />
            Video
          </span>
        </div>
      )}

      {/* Play/Pause Overlay Button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-10 ${
        isPlaying ? 'opacity-0 group-hover/video:opacity-100 bg-midnight-950/40' : 'bg-midnight-950/35 opacity-100'
      }`}>
        <button
          onClick={togglePlay}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold/95 hover:bg-gold text-midnight-950 flex items-center justify-center shadow-2xl transform active:scale-90 transition-all cursor-pointer hover:scale-110"
          aria-label={isPlaying ? "Pause video in card" : "Play video in card"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-midnight-950" />
          ) : (
            <Play className="w-5 h-5 fill-midnight-950 ml-0.5" />
          )}
        </button>
      </div>

      {/* Top Controls: Sound Toggle & Expand Button */}
      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={toggleMute}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-midnight-950/80 hover:bg-midnight-950 border border-gold/30 text-gold flex items-center justify-center transition-colors shadow active:scale-95"
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-dusty" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {onExpand && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-midnight-950/80 hover:bg-midnight-950 border border-gold/30 text-ivory hover:text-gold flex items-center justify-center transition-colors shadow active:scale-95"
            title="Expand to Fullscreen Cinema"
            aria-label="Expand to Cinema"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Playing Inline Badge Indicator */}
      {isPlaying && (
        <div className="absolute top-2.5 left-2.5 z-20">
          <span className="px-2 py-0.5 rounded-full bg-emerald-900/90 border border-emerald-400/50 text-emerald-300 text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Playing in place
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * ROW 2: POLAROID / MINI-POSTER STYLE CARD
 */
export const ReplayCard: React.FC<MomentCardProps> = ({ card, onSelect, onExpandVideo }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex-none w-[68vw] max-w-[230px] xs:w-[62vw] xs:max-w-[250px] sm:w-[230px] md:w-[260px] rounded-xl overflow-hidden bg-gradient-to-b from-[#1C1322] to-midnight-950 border border-gold/20 hover:border-gold/60 shadow-xl transition-all duration-300 snap-item flex flex-col justify-between"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-midnight-950 flex-none">
        {card.imageSrc ? (
          <div 
            className="w-full h-full cursor-pointer"
            onClick={() => onSelect(card)}
          >
            <img
              src={card.imageSrc}
              alt={card.title}
              className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>
        ) : card.videoSrc ? (
          <InlineCardVideo
            videoSrc={card.videoSrc}
            poster={card.imageSrc}
            title={card.title}
            onExpand={onExpandVideo ? () => onExpandVideo(card) : undefined}
          />
        ) : (
          <div 
            className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-tr from-wine-900 via-berry/40 to-midnight-900 text-center cursor-pointer"
            onClick={() => onSelect(card)}
          >
            <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-gold/60 mb-2 sm:mb-3" />
            <p className="font-serif italic text-xs sm:text-sm text-ivory/90 line-clamp-3">
              {card.quote || card.synopsis}
            </p>
          </div>
        )}

        {/* Vintage Vignette Overlay for non-video or when paused */}
        {!card.videoSrc && (
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/30 to-transparent pointer-events-none" />
        )}

        {/* Tag Pill */}
        {!card.videoSrc && (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 pointer-events-none">
            <span className="px-2 py-0.5 rounded-full bg-berry/80 backdrop-blur-md text-gold text-[9px] sm:text-[10px] font-mono uppercase tracking-wider border border-gold/25">
              {card.tag}
            </span>
          </div>
        )}

        {/* Card Title & Subtitle at bottom of image if non-video */}
        {!card.videoSrc && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 pointer-events-none">
            <h3 className="font-display font-bold text-sm sm:text-base text-ivory group-hover:text-gold transition-colors line-clamp-1">
              {card.title}
            </h3>
            {card.subtitle && (
              <p className="font-serif italic text-[11px] sm:text-xs text-gold-light/80 line-clamp-1">
                {card.subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Synopsis Footer */}
      <div 
        className="p-3 bg-midnight-950/90 border-t border-gold/10 flex-1 flex flex-col justify-between cursor-pointer"
        onClick={() => onSelect(card)}
      >
        <div className="space-y-1">
          {card.videoSrc && (
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base text-ivory group-hover:text-gold transition-colors line-clamp-1">
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="font-serif italic text-[11px] sm:text-xs text-gold-light/80 line-clamp-1">
                  {card.subtitle}
                </p>
              )}
            </div>
          )}

          <p className="text-[11px] sm:text-xs text-ivory/70 line-clamp-2 leading-relaxed font-light">
            {card.synopsis}
          </p>
        </div>

        <div className="mt-2 text-[9px] sm:text-[10px] text-gold/70 group-hover:text-gold uppercase tracking-wider font-mono flex items-center justify-between">
          <span>{card.videoSrc ? 'Click video to play inline' : 'Replay Memory'}</span>
          <span>→</span>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * ROW 3: COMEDIC CHAOS CARD
 */
export const ChaosCard: React.FC<MomentCardProps> = ({ card, onSelect, onExpandVideo }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex-none w-[78vw] max-w-[280px] xs:w-[74vw] xs:max-w-[300px] sm:w-[290px] md:w-[320px] rounded-xl overflow-hidden bg-gradient-to-br from-wine-900/60 via-midnight-900 to-midnight-950 border border-berry/40 hover:border-gold/60 shadow-xl transition-all duration-300 snap-item flex flex-col justify-between"
    >
      <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3 flex-1 flex flex-col justify-between">
        {/* Header Tag + Chaos Badge */}
        <div className="space-y-1.5 cursor-pointer" onClick={() => onSelect(card)}>
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full bg-berry/40 border border-berry/60 text-gold text-[9px] sm:text-[10px] font-mono tracking-widest uppercase">
              {card.tag}
            </span>
            <span className="text-[9px] sm:text-[10px] text-gold-light/60 font-mono">
              EPISODE CHAOS
            </span>
          </div>

          <div>
            <h3 className="font-display font-extrabold text-base sm:text-lg text-ivory group-hover:text-gold transition-colors tracking-wide line-clamp-1">
              {card.title}
            </h3>
            {card.subtitle && (
              <p className="text-[10px] sm:text-xs font-mono text-rose-dusty/90 tracking-wider uppercase mt-0.5 line-clamp-1">
                {card.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Media Thumbnail with Inline Player */}
        {card.videoSrc ? (
          <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-lg overflow-hidden border border-gold/15 bg-wine-900/60 my-1">
            <InlineCardVideo
              videoSrc={card.videoSrc}
              poster={card.imageSrc}
              title={card.title}
              onExpand={onExpandVideo ? () => onExpandVideo(card) : undefined}
            />
          </div>
        ) : card.imageSrc ? (
          <div 
            className="relative aspect-[4/3] sm:aspect-[16/10] rounded-lg overflow-hidden border border-gold/15 my-1 cursor-pointer"
            onClick={() => onSelect(card)}
          >
            <img
              src={card.imageSrc}
              alt={card.title}
              className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : (
          <div 
            className="p-2.5 sm:p-3 rounded-lg bg-midnight-950/60 border border-gold/10 font-serif italic text-xs text-gold-light/90 my-1 cursor-pointer"
            onClick={() => onSelect(card)}
          >
            "{card.quote || card.synopsis}"
          </div>
        )}

        {/* Synopsis */}
        <p 
          className="text-[11px] sm:text-xs text-ivory/80 leading-relaxed font-light line-clamp-2 cursor-pointer"
          onClick={() => onSelect(card)}
        >
          <span className="text-gold font-semibold">Synopsis: </span>
          {card.synopsis}
        </p>

        {/* Card Action */}
        <div 
          className="pt-2 border-t border-gold/10 flex items-center justify-between text-xs text-gold/80 group-hover:text-gold font-medium mt-auto cursor-pointer"
          onClick={() => onSelect(card)}
        >
          <span className="font-serif italic text-[11px] sm:text-xs">
            {card.videoSrc ? 'Click video to play inline' : 'Read the full chaos'}
          </span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * ROW 4: FAMILY & MILESTONES CARD (Emotional, Warmer Tone)
 */
export const FamilyCard: React.FC<MomentCardProps> = ({ card, onSelect, onExpandVideo }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex-none w-[75vw] max-w-[280px] xs:w-[72vw] xs:max-w-[300px] sm:w-[280px] md:w-[320px] rounded-xl overflow-hidden bg-gradient-to-b from-[#2A1624] via-midnight-900 to-midnight-950 border border-gold/25 hover:border-gold shadow-2xl transition-all duration-300 snap-item flex flex-col justify-between"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-midnight-950 flex-none">
        {card.videoSrc ? (
          <InlineCardVideo
            videoSrc={card.videoSrc}
            poster={card.imageSrc}
            title={card.title}
            onExpand={onExpandVideo ? () => onExpandVideo(card) : undefined}
          />
        ) : card.imageSrc ? (
          <div 
            className="w-full h-full cursor-pointer relative"
            onClick={() => onSelect(card)}
          >
            <img
              src={card.imageSrc}
              alt={card.title}
              className="w-full h-full object-cover object-[center_20%] group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Warm Golden Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/30 to-transparent pointer-events-none" />
            
            {/* Milestone Tag */}
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
              <span className="px-2 py-0.5 rounded bg-gold/90 text-midnight-950 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider shadow">
                {card.tag}
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <div 
        className="p-3.5 sm:p-4 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between cursor-pointer"
        onClick={() => onSelect(card)}
      >
        <div className="space-y-1">
          <h3 className="font-display font-bold text-sm sm:text-base text-ivory group-hover:text-gold transition-colors line-clamp-1">
            {card.title}
          </h3>
          
          {card.subtitle && (
            <p className="font-serif italic text-[11px] sm:text-xs text-gold-light/90 line-clamp-1">
              {card.subtitle}
            </p>
          )}

          <p className="text-[11px] sm:text-xs text-ivory/70 line-clamp-2 leading-relaxed">
            {card.synopsis}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-gold/15 text-[10px] sm:text-[11px] text-gold/80 font-serif italic mt-auto">
          <span className="truncate max-w-[170px]">
            {card.videoSrc ? 'Click video to play inline' : (card.quote || "Alhamdulillah for every step")}
          </span>
          <span className="font-sans font-medium text-xs text-ivory/60 group-hover:text-gold transition-colors flex-none">
            {card.videoSrc ? 'Play ▶' : 'View →'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
