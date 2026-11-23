import React from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, Info, Film } from 'lucide-react';

interface HeroProps {
  onPlayStory: () => void;
  onExploreDetails: () => void;
  onOpenFeaturedChapter: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onPlayStory,
  onExploreDetails,
  onOpenFeaturedChapter,
}) => {
  return (
    <section id="home" className="relative min-h-[92dvh] sm:min-h-[95dvh] lg:min-h-screen flex items-end pb-12 sm:pb-20 md:pb-24 pt-24 sm:pt-28 overflow-hidden w-full">
      {/* Background Hero Image with Layered Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/wedding-stage.jpeg"
          alt="Fazila and Fayaz on their wedding stage"
          className="w-full h-full object-cover object-[center_18%] sm:object-[center_20%] lg:object-[center_20%] transform scale-100 sm:scale-102 transition-transform duration-1000 ease-out"
        />
        
        {/* Refined Layered Gradient Overlays that keep their faces bright while preserving text legibility */}
        {/* Top subtle shadow for navbar */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950/80 via-transparent to-midnight-950/60 pointer-events-none" />
        
        {/* Left readable vignette for typography only behind text */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-950/90 via-midnight-950/70 via-35% to-transparent sm:max-w-3xl pointer-events-none" />
        
        {/* Bottom gentle fade to content row */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/50 to-transparent pointer-events-none" />
        
        {/* Warm subtle ambient tone */}
        <div className="absolute inset-0 bg-wine-900/10 pointer-events-none" />
        
        {/* Film grain texture */}
        <div className="absolute inset-0 film-grain pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5">
          {/* Top Metadata Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2 sm:gap-2.5"
          >
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-berry text-ivory text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-md">
              <Film className="w-3 h-3 flex-none" />
              #1 IN OUR HEARTS TODAY
            </span>
            <span className="text-gold font-bold text-xs tracking-wider">
              99% MATCH
            </span>
            <span className="text-ivory/40 text-xs hidden sm:inline">•</span>
            <span className="px-1.5 py-0.5 rounded border border-ivory/30 text-[10px] text-ivory/80 font-mono">
              18 CHAPTERS
            </span>
            <span className="px-1.5 py-0.5 rounded border border-gold/40 text-[10px] text-gold font-mono">
              ULTRA 4K MEMORY
            </span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-1.5 sm:space-y-2"
          >
            <h1 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-ivory leading-[1.1] sm:leading-[1.08] drop-shadow-xl break-words">
              ONE REQUEST.<br />
              <span className="text-shimmer-gold">A WHOLE LIFETIME.</span>
            </h1>
            <p className="font-serif italic text-base xs:text-lg sm:text-xl md:text-2xl text-gold-light/95 tracking-wide">
              From an unexpected Instagram request to becoming each other's home.
            </p>
          </motion.div>

          {/* Subtitle / Metadata Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-2 text-[11px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] text-ivory/70 uppercase font-mono flex-wrap"
          >
            <span className="text-gold">2017 – PRESENT</span>
            <span>|</span>
            <span>LOVE</span>
            <span>•</span>
            <span>LAUGHTER</span>
            <span>•</span>
            <span>LIFE</span>
          </motion.div>

          {/* Featured Story Synopsis */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-ivory/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-light"
          >
            She accepted one request she normally would have rejected. He appreciated her drawings. Neither knew that a simple "Hi" would eventually become a lifetime.
          </motion.p>

          {/* Action Buttons (Touch friendly & responsive) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-4 pt-2 w-full sm:w-auto"
          >
            {/* Play Our Story */}
            <button
              onClick={onPlayStory}
              className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold text-midnight-950 font-display font-black text-xs sm:text-sm tracking-wider uppercase shadow-2xl shadow-gold/30 hover:brightness-110 transition-all duration-300 active:scale-95 cursor-pointer min-h-[48px]"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-midnight-950 transition-colors flex-none" />
              <span>PLAY OUR STORY</span>
            </button>

            {/* The Little Details */}
            <button
              onClick={onExploreDetails}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-wine-900 via-berry/60 to-wine-900 hover:from-wine-800 hover:to-wine-800 border-2 border-gold/40 text-ivory font-display font-bold text-xs sm:text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:border-gold active:scale-95 cursor-pointer min-h-[48px] shadow-lg shadow-berry/20"
            >
              <Heart className="w-4 h-4 text-rose-dusty fill-rose-dusty flex-none" />
              <span>THE LITTLE DETAILS</span>
            </button>

            {/* Story Chapters Info Button */}
            <button
              onClick={onOpenFeaturedChapter}
              className="hidden xs:inline-flex items-center justify-center p-3.5 rounded-xl bg-midnight-800/80 hover:bg-midnight-800 border-2 border-gold/30 text-gold hover:text-gold-light transition-all duration-300 min-h-[48px] min-w-[48px] active:scale-95 shadow-md"
              title="Chapter Details"
              aria-label="View Wedding Chapter Details"
            >
              <Info className="w-5 h-5 flex-none" />
            </button>
          </motion.div>

          {/* Subtle Quote Accent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="pt-1 text-xs text-gold/80 font-serif italic border-l-2 border-gold/40 pl-3"
          >
            "Edho perusa saadhichuttom." — 04 June 2023, The Biggest Win
          </motion.div>
        </div>
      </div>
    </section>
  );
};
