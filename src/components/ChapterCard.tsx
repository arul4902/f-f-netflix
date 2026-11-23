import React from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Sparkles, MessageSquare, Phone, Compass, Utensils } from 'lucide-react';
import { Chapter } from '../types';
import { InlineCardVideo } from './MomentCards';

interface ChapterCardProps {
  chapter: Chapter;
  onSelect: (chapter: Chapter) => void;
  index: number;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onSelect }) => {
  const getThumbnailContent = () => {
    if (chapter.videoSrc) {
      return (
        <InlineCardVideo
          videoSrc={chapter.videoSrc}
          poster={chapter.imageSrc}
          title={chapter.title}
          onExpand={() => onSelect(chapter)}
        />
      );
    }

    if (chapter.imageSrc) {
      return (
        <img
          src={chapter.imageSrc}
          alt={chapter.title}
          className="w-full h-full object-cover object-[center_18%] sm:object-[center_20%] group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      );
    }

    // Stylized graphic scenes
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-wine-900 via-midnight-800 to-berry/50 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-gold/10 blur-2xl pointer-events-none" />
        
        {chapter.interactiveType === 'instagram-request' && (
          <div className="flex flex-col items-center text-center space-y-1.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-berry/40 border border-gold/40 flex items-center justify-center text-gold shadow-lg">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase">18 AUG 2017</span>
            <span className="font-serif italic text-xs sm:text-sm text-ivory/90">The "Hi" that began it all</span>
          </div>
        )}

        {chapter.interactiveType === 'dosa-deal' && (
          <div className="flex flex-col items-center text-center space-y-1.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-berry/40 border border-gold/40 flex items-center justify-center text-gold shadow-lg">
              <Utensils className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase">KITCHEN PROPOSAL</span>
            <span className="font-serif italic text-xs sm:text-sm text-ivory/90">"For a lifetime..."</span>
          </div>
        )}

        {chapter.interactiveType === 'first-call' && (
          <div className="flex flex-col items-center text-center space-y-1.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-berry/40 border border-gold/40 flex items-center justify-center text-gold shadow-lg">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase">PERIMA'S HOUSE</span>
            <span className="font-serif italic text-xs sm:text-sm text-ivory/90">"Sollu, sollu... I love you"</span>
          </div>
        )}

        {chapter.interactiveType === 'distance-map' && (
          <div className="flex flex-col items-center text-center space-y-1.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-berry/40 border border-gold/40 flex items-center justify-center text-gold shadow-lg">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase">4,000 KM JOURNEY</span>
            <span className="font-serif italic text-xs sm:text-sm text-ivory/90">Erode ⇄ Saudi Arabia</span>
          </div>
        )}

        {!['instagram-request', 'dosa-deal', 'first-call', 'distance-map'].includes(chapter.interactiveType || '') && (
          <div className="flex flex-col items-center text-center space-y-1.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-berry/40 border border-gold/40 flex items-center justify-center text-gold shadow-lg">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase">{chapter.genre}</span>
            <span className="font-serif italic text-xs sm:text-sm text-ivory/90">{chapter.year}</span>
          </div>
        )}
      </div>
    );
  };

  const formattedNumber = String(chapter.number).padStart(2, '0');

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex-none w-[76vw] max-w-[280px] xs:w-[72vw] xs:max-w-[300px] sm:w-[290px] md:w-[320px] lg:w-[340px] rounded-xl overflow-hidden bg-midnight-800 border border-gold/15 hover:border-gold/50 shadow-xl transition-all duration-300 snap-item flex flex-col justify-between"
    >
      {/* Aspect Ratio Container for Thumbnail - Taller height ensures faces are clearly visible */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-midnight-950 flex-none">
        {getThumbnailContent()}

        {/* Gradient Shadow Overlay for non-video */}
        {!chapter.videoSrc && (
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent pointer-events-none" />
        )}

        {/* Chapter Number Badge */}
        {!chapter.videoSrc && (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5 pointer-events-none">
            <span className="font-display font-extrabold text-sm sm:text-base text-gold drop-shadow-md bg-midnight-950/85 px-2 py-0.5 rounded border border-gold/30">
              {formattedNumber}
            </span>
            {chapter.isFeatured && (
              <span className="bg-berry text-ivory font-bold text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                Featured
              </span>
            )}
          </div>
        )}

        {/* Top Right Duration / Genre */}
        {!chapter.videoSrc && (
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 pointer-events-none">
            <span className="bg-midnight-950/85 backdrop-blur-md text-ivory/80 text-[10px] font-mono px-2 py-0.5 rounded border border-ivory/15">
              {chapter.year}
            </span>
          </div>
        )}

        {/* Desktop Hover Action Overlay for non-video */}
        {!chapter.videoSrc && (
          <div 
            onClick={() => onSelect(chapter)}
            className="absolute inset-0 bg-midnight-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-3 backdrop-blur-[2px] cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-gold text-midnight-950 flex items-center justify-center shadow-xl">
              <Play className="w-4 h-4 fill-midnight-950 ml-0.5" />
            </div>
            <div className="w-9 h-9 rounded-full bg-midnight-800/80 border border-gold/40 text-ivory flex items-center justify-center shadow-lg">
              <Info className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>

      {/* Card Info Section */}
      <div 
        onClick={() => onSelect(chapter)}
        className="p-3.5 sm:p-4 space-y-1.5 sm:space-y-2 bg-gradient-to-b from-midnight-900 to-midnight-950 flex-1 flex flex-col justify-between cursor-pointer"
      >
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gold font-bold tracking-wider text-[11px] sm:text-xs">
              {chapter.videoSrc ? `Chapter ${formattedNumber} • Video` : chapter.matchScore}
            </span>
            <span className="text-ivory/50 font-mono text-[10px] sm:text-[11px]">{chapter.duration}</span>
          </div>

          <h3 className="font-display font-bold text-sm sm:text-base text-ivory group-hover:text-gold transition-colors line-clamp-1">
            {chapter.title}
          </h3>

          <p className="font-serif italic text-[11px] sm:text-xs text-gold-light/80 line-clamp-1">
            {chapter.subtitle}
          </p>

          <p className="text-[11px] sm:text-xs text-ivory/70 line-clamp-2 leading-relaxed pt-0.5">
            {chapter.synopsis}
          </p>
        </div>

        {/* Card Footer tags */}
        <div className="pt-2 flex items-center justify-between border-t border-gold/10 text-[10px] sm:text-[11px] text-ivory/50 mt-auto">
          <span className="tracking-wider uppercase font-mono truncate max-w-[120px]">{chapter.genre}</span>
          <span className="group-hover:text-gold transition-colors flex items-center gap-1 font-medium text-gold/80 flex-none">
            {chapter.videoSrc ? 'Play Video ▶' : 'Open Chapter →'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
