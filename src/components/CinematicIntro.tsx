import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Film } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface CinematicIntroProps {
  onEnter: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onEnter }) => {
  const [step, setStep] = useState<number>(0);

  const handleEnterWithSound = () => {
    soundFX.playCinematicChord();
    onEnter();
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 600);
    const timer2 = setTimeout(() => setStep(2), 2400);
    const timer3 = setTimeout(() => setStep(3), 4400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0911] text-ivory flex flex-col items-center justify-center overflow-hidden select-none min-h-[100dvh] w-full px-4">
      {/* Background Cinematic Lighting & Film Grain */}
      <div className="absolute inset-0 film-grain pointer-events-none" />
      
      {/* Golden atmospheric glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[750px] md:h-[750px] rounded-full bg-gradient-to-tr from-berry/40 via-gold/30 to-wine-900/60 blur-[80px] sm:blur-[120px] pointer-events-none"
      />

      {/* Top Brand Tag */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-10 flex items-center gap-2">
        <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold animate-pulse flex-none" />
        <span className="font-display font-bold tracking-[0.15em] sm:tracking-[0.25em] text-[10px] sm:text-xs text-gold uppercase">
          A NETFLIX ORIGINAL MEMORY
        </span>
      </div>

      {/* Skip Button (Touch target >= 44px) */}
      <button
        onClick={handleEnterWithSound}
        className="absolute top-3.5 right-4 sm:top-5 sm:right-6 md:top-8 md:right-10 text-[11px] sm:text-xs font-mono tracking-widest text-ivory/60 hover:text-gold uppercase px-3.5 py-2 sm:px-4 sm:py-2 rounded-full border border-ivory/15 hover:border-gold/40 transition-all duration-300 backdrop-blur-md min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
        aria-label="Skip Cinematic Intro"
      >
        Skip Intro
      </button>

      {/* Main Story Sequence Container */}
      <div className="w-full max-w-2xl px-2 sm:px-6 text-center z-10 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[320px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.p
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="font-serif italic text-xl sm:text-2xl md:text-3xl text-ivory/90 tracking-wide px-2"
            >
              "Some stories begin with a grand gesture."
            </motion.p>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="space-y-2 sm:space-y-3 px-2"
            >
              <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-ivory/80">
                "But theirs began with..."
              </p>
              <p className="font-serif font-semibold text-2xl sm:text-3xl md:text-4xl text-gold text-shimmer-gold">
                ...an Instagram request.
              </p>
            </motion.div>
          )}

          {step >= 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-berry/30 border border-berry/40 text-gold text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] mb-3 sm:mb-4"
              >
                <Sparkles className="w-3 h-3 text-gold" />
                Special Birthday Premiere
              </motion.div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.1em] sm:tracking-[0.15em] text-ivory mb-2 sm:mb-3 drop-shadow-2xl max-w-full">
                FAZILA <span className="text-gold font-light">×</span> FAYAZ
              </h1>

              <p className="font-serif italic text-sm sm:text-lg md:text-xl text-ivory/80 max-w-md sm:max-w-lg mb-6 sm:mb-8 tracking-wide px-2">
                "Every chapter. Every fight. Every laugh. Every comeback."
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEnterWithSound}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-midnight-950 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:shadow-gold/30 transition-all duration-300 cursor-pointer min-h-[48px] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Play className="w-4 h-4 fill-midnight-950 flex-none" />
                <span className="relative z-10">ENTER THEIR STORY</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle bottom line */}
      <div className="absolute bottom-4 sm:bottom-6 text-center text-[10px] sm:text-xs text-ivory/40 font-mono tracking-wider px-2">
        2017 – PRESENT • A LOVE STORY THAT NEVER STOPPED STREAMING
      </div>
    </div>
  );
};
