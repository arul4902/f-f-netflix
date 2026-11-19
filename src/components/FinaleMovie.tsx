import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Film } from 'lucide-react';

interface FinaleMovieProps {
  onReplay: () => void;
}

export const FinaleMovie: React.FC<FinaleMovieProps> = ({ onReplay }) => {
  const [currentLine, setCurrentLine] = useState(0);

  const lines = [
    { text: "From a stranger on Instagram...", delay: 600 },
    { text: "...to the person beside me.", delay: 2800 },
    { text: "From a simple Hi...", delay: 5200 },
    { text: "...to a lifetime of memories.", delay: 7600 },
    { text: "From fights, waiting and uncertainty...", delay: 10000 },
    { text: "...to a home, a family and a life together.", delay: 12600 },
    { text: "And if I could go back...", delay: 15400 },
    { text: "I would still accept that request.", delay: 18000 },
  ];

  useEffect(() => {
    const timers = lines.map((item, idx) => {
      return setTimeout(() => {
        setCurrentLine(idx + 1);
      }, item.delay);
    });

    const usuraTimer = setTimeout(() => {
      setCurrentLine(lines.length + 1);
    }, 20500);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      clearTimeout(usuraTimer);
    };
  }, []);

  const isUsuraVisible = currentLine > lines.length;

  return (
    <section id="finale" className="relative min-h-[100dvh] flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#09070E] overflow-hidden select-none w-full">
      {/* Background Image with Slow Dramatic Zoom */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          src="/assets/beach-together.jpeg"
          alt="Fazila & Fayaz by the sea"
          className="w-full h-full object-cover object-[center_35%] filter brightness-40 contrast-110"
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09070E] via-[#09070E]/85 to-[#09070E]/90" />
        <div className="absolute inset-0 film-grain pointer-events-none" />

        {/* Central warm glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] md:w-[700px] h-[320px] sm:h-[500px] md:h-[700px] rounded-full bg-berry/20 blur-[90px] sm:blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 sm:space-y-10 px-2 sm:px-4 w-full">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-wine-900/60 border border-gold/30 text-gold text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em]">
          <Film className="w-3.5 h-3.5 flex-none" />
          <span>THE FINALE • DIRECTED BY DESTINY</span>
        </div>

        {/* Sequential Story Beats */}
        <div className="min-h-[200px] sm:min-h-[260px] flex flex-col items-center justify-center space-y-3.5 sm:space-y-5">
          {lines.map((line, idx) => {
            const isVisible = currentLine > idx;
            return (
              <AnimatePresence key={idx}>
                {isVisible && (
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className={`font-serif italic text-base xs:text-lg sm:text-2xl md:text-3xl tracking-wide px-2 ${
                      idx % 2 === 1
                        ? 'text-gold text-shimmer-gold font-semibold'
                        : 'text-ivory/80'
                    }`}
                  >
                    {line.text}
                  </motion.p>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* THE FOCAL POINT: USURA */}
        <AnimatePresence>
          {isUsuraVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 sm:space-y-6 pt-2 sm:pt-4"
            >
              <div className="inline-block relative">
                <span className="absolute -inset-4 bg-gold/15 blur-2xl rounded-full" />
                <h1 className="relative font-display font-black text-5xl xs:text-6xl sm:text-8xl md:text-9xl text-gold text-shimmer-gold tracking-[0.08em] sm:tracking-[0.16em] drop-shadow-2xl">
                  USURA.
                </h1>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <p className="font-display font-semibold text-xl sm:text-3xl text-ivory tracking-wide sm:tracking-wider">
                  Happy Birthday, my Usura.
                </p>
                <p className="font-serif italic text-base sm:text-xl text-rose-dusty">
                  "I would choose you again."
                </p>
              </div>

              <div className="pt-4 sm:pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onReplay}
                  className="group inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-midnight-950 font-bold text-xs sm:text-sm tracking-widest uppercase shadow-2xl hover:shadow-gold/30 transition-all duration-300 cursor-pointer min-h-[48px]"
                >
                  <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-180 duration-500 flex-none" />
                  <span>REPLAY OUR STORY</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isUsuraVisible && (
          <button
            onClick={() => setCurrentLine(lines.length + 1)}
            className="text-[10px] sm:text-[11px] font-mono tracking-widest text-ivory/40 hover:text-gold uppercase transition-colors min-h-[44px] inline-flex items-center"
          >
            Reveal Finale Immediately →
          </button>
        )}
      </div>
    </section>
  );
};
