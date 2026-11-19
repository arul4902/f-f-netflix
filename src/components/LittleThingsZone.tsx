import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Heart, Utensils, Phone, Bus, 
  Trophy, Sun, Flower2, X, Camera
} from 'lucide-react';
import { littleThingsData } from '../data/littleThingsData';
import { LittleThing } from '../types';

export const LittleThingsZone: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<LittleThing | null>(null);

  const [dosaAccepted, setDosaAccepted] = useState(false);
  const [magnifierOn, setMagnifierOn] = useState(false);

  // Lock background scroll cleanly when memory modal is open
  useEffect(() => {
    if (selectedMemory) {
      const origHtmlOverflow = document.documentElement.style.overflow;
      const origBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      return () => {
        document.documentElement.style.overflow = origHtmlOverflow;
        document.body.style.overflow = origBodyOverflow;
      };
    }
  }, [selectedMemory]);

  const handleOpenMemory = (memory: LittleThing) => {
    setSelectedMemory(memory);
    setDosaAccepted(false);
    setMagnifierOn(false);
  };

  const getMemoryIcon = (type: string) => {
    switch (type) {
      case 'dimple': return <Sparkles className="w-5 h-5 text-gold flex-none" />;
      case 'dosa': return <Utensils className="w-5 h-5 text-gold flex-none" />;
      case 'bus': return <Bus className="w-5 h-5 text-gold flex-none" />;
      case 'call': return <Phone className="w-5 h-5 text-gold flex-none" />;
      case 'apology': return <Heart className="w-5 h-5 text-gold flex-none" />;
      case 'bride-game': return <Trophy className="w-5 h-5 text-gold flex-none" />;
      case '5am-club': return <Sun className="w-5 h-5 text-gold flex-none" />;
      case 'chef-flowers': return <Flower2 className="w-5 h-5 text-gold flex-none" />;
      default: return <Sparkles className="w-5 h-5 text-gold flex-none" />;
    }
  };

  return (
    <section id="little-things" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-midnight-950 via-[#160E1E] to-midnight-950 overflow-hidden w-full">
      {/* Background Scrapbook Glows */}
      <div className="absolute top-1/4 left-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-berry/15 blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gold/10 blur-[80px] sm:blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2 sm:space-y-3 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wine-900/60 border border-gold/30 text-gold text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em]">
            <Heart className="w-3.5 h-3.5 text-rose-dusty fill-rose-dusty flex-none" />
            <span>The Private Archive</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-ivory tracking-tight">
            THE LITTLE THINGS
          </h2>

          <p className="font-serif italic text-sm sm:text-base md:text-lg text-gold-light/90">
            "A private scrapbook of the unscripted moments, funny bargains, and quiet promises."
          </p>
          <p className="text-[11px] sm:text-xs text-ivory/50 font-mono">
            Tap any memory tile below to unlock the hidden micro-story
          </p>
        </div>

        {/* Scrapbook Grid of 8 Memory Tiles */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6">
          {littleThingsData.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenMemory(item)}
              className="group relative p-4 sm:p-5 md:p-6 rounded-2xl bg-gradient-to-br from-[#201427] to-[#120B18] border border-gold/20 hover:border-gold/60 shadow-xl cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[200px] sm:min-h-[220px]"
            >
              {/* Tape Accent */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-3 sm:h-3.5 bg-gold/20 border border-gold/30 rounded-sm shadow-sm backdrop-blur-sm transform rotate-1 group-hover:rotate-0 transition-transform" />

              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-wine-900/80 border border-gold/30 flex items-center justify-center shadow-md group-hover:bg-gold group-hover:text-midnight-950 transition-colors">
                    {getMemoryIcon(item.interactiveType)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold/70">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-ivory group-hover:text-gold transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="font-serif italic text-[11px] sm:text-xs text-rose-dusty mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-[11px] sm:text-xs text-ivory/70 line-clamp-2 leading-relaxed font-light">
                  {item.synopsis}
                </p>
              </div>

              {/* Bottom Quote & Prompt */}
              <div className="pt-2.5 border-t border-gold/15 flex items-center justify-between text-xs mt-3">
                <span className="font-serif italic text-gold-light/80 text-[10px] sm:text-[11px] truncate max-w-[140px] sm:max-w-[170px]">
                  {item.quote || "A secret memory"}
                </span>
                <span className="text-gold text-[10px] font-mono tracking-widest uppercase font-semibold flex-none">
                  Open →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SCRAPBOOK DETAIL MODAL — Portaled to modal-portal-root */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedMemory && (
            <div 
              className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100dvh',
                zIndex: 99999,
                margin: 0,
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMemory(null)}
                className="fixed inset-0 bg-midnight-950/85 backdrop-blur-md"
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg bg-gradient-to-br from-[#23152B] to-[#110A17] border border-gold/40 rounded-2xl p-5 sm:p-7 md:p-8 shadow-2xl z-10 space-y-4 sm:space-y-5 my-auto max-h-[92dvh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-midnight-950/80 border border-gold/30 hover:border-gold text-ivory hover:text-gold flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                aria-label="Close Scrapbook Detail"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 pr-8">
                <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-lg flex-none">
                  {getMemoryIcon(selectedMemory.interactiveType)}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gold uppercase tracking-[0.2em] block">
                    {selectedMemory.tag} • PRIVATE SCRAPBOOK
                  </span>
                  <h3 className="font-display font-extrabold text-base sm:text-xl text-ivory leading-tight">
                    {selectedMemory.title}
                  </h3>
                  <p className="font-serif italic text-xs text-rose-dusty">
                    {selectedMemory.subtitle}
                  </p>
                </div>
              </div>

              {/* Detail Story */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-midnight-950/70 border border-ivory/10 space-y-2.5">
                <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed font-light">
                  {selectedMemory.detailText}
                </p>

                {selectedMemory.quote && (
                  <div className="p-2.5 sm:p-3 rounded-lg bg-wine-900/40 border-l-2 border-gold font-serif italic text-xs sm:text-sm text-gold-light">
                    {selectedMemory.quote}
                  </div>
                )}
              </div>

              {/* Dimple Detective Magnifier */}
              {selectedMemory.interactiveType === 'dimple' && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-wine-900/30 border border-gold/30 text-center space-y-2.5">
                  <p className="font-serif italic text-xs text-ivory/80">
                    "Mudinja kandupidichu sollu naanga yaaru!"
                  </p>
                  {!magnifierOn ? (
                    <button
                      onClick={() => setMagnifierOn(true)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gold hover:bg-gold-light text-midnight-950 font-bold text-xs uppercase tracking-wider shadow cursor-pointer transition-colors min-h-[44px]"
                    >
                      Inspect Dimple Coordinates 🔍
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-mono text-gold space-y-1"
                    >
                      <p className="text-emerald-400 font-bold">✓ DIMPLE MATCH: 100% FAZILA</p>
                      <p className="font-serif italic text-sm text-ivory text-shimmer-gold">
                        "Un dimple vechu kandupidichen. Adhu nee dhaan nu enakku theriyum."
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Dosa Contract Animation */}
              {selectedMemory.interactiveType === 'dosa' && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-wine-900/30 border border-gold/30 text-center space-y-2.5">
                  {!dosaAccepted ? (
                    <button
                      onClick={() => setDosaAccepted(true)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gold hover:bg-gold-light text-midnight-950 font-bold text-xs uppercase tracking-wider shadow cursor-pointer transition-colors min-h-[44px]"
                    >
                      Review Dosa Terms
                    </button>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-1.5 text-xs font-mono"
                    >
                      <p className="text-gold font-bold text-[11px] sm:text-xs">CLAUSE 1: CRISPY DOSA SUPPLY = LIFETIME</p>
                      <p className="font-serif italic text-sm sm:text-base text-ivory">
                        "Kidaikkum, kidaikkum."
                      </p>
                      <span className="inline-block px-3 py-1 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-500/40 text-[10px]">
                        ✓ SIGNED & SEALED FOR ETERNITY
                      </span>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Apology Record */}
              {selectedMemory.interactiveType === 'apology' && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-wine-900/30 border border-gold/30 text-center space-y-1.5">
                  <span className="text-[10px] font-mono text-gold uppercase tracking-widest block">
                    THE APOLOGY RECORD: FAYAZ
                  </span>
                  <p className="font-serif italic text-xs sm:text-sm text-ivory">
                    "Ego never stood a chance against his love for her."
                  </p>
                  <p className="text-[11px] text-gold font-mono pt-1">
                    Most Frequent Response: "Paathukkalaam... naan dhaan sorry."
                  </p>
                </div>
              )}

              {/* Optional Photo Attachment */}
              {selectedMemory.imageSrc && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-gold/20 shadow">
                  <img
                    src={selectedMemory.imageSrc}
                    alt={selectedMemory.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/70 to-transparent" />
                  <div className="absolute bottom-2 left-3 text-[10px] text-ivory/70 font-mono flex items-center gap-1">
                    <Camera className="w-3 h-3 text-gold" />
                    <span>Real Memory Asset</span>
                  </div>
                </div>
              )}

              {/* Close Button */}
              <div className="pt-2 text-center">
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-gold/30 text-gold hover:bg-gold/10 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer min-h-[44px]"
                >
                  Close Scrapbook Note
                </button>
              </div>
            </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.getElementById('modal-portal-root') || document.body
      )}
    </section>
  );
};
