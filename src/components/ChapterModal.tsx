import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, MessageSquare, Phone, Compass, 
  Utensils, Sparkles, Check, Film, MapPin, Award
} from 'lucide-react';
import { Chapter } from '../types';

interface ChapterModalProps {
  chapter: Chapter | null;
  onClose: () => void;
  onNavigateChapter: (direction: 'next' | 'prev') => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export const ChapterModal: React.FC<ChapterModalProps> = ({
  chapter,
  onClose,
  onNavigateChapter,
  hasNext,
  hasPrev,
}) => {
  const [requestAccepted, setRequestAccepted] = useState(false);
  const [dimpleFound, setDimpleFound] = useState(false);
  const [dosaStamped, setDosaStamped] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const [ringFound, setRingFound] = useState(false);

  // Lock scroll cleanly on both html and body without shifting scroll position
  useEffect(() => {
    if (chapter) {
      const origHtmlOverflow = document.documentElement.style.overflow;
      const origBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = origHtmlOverflow;
        document.body.style.overflow = origBodyOverflow;
      };
    }
  }, [chapter]);

  useEffect(() => {
    setRequestAccepted(false);
    setDimpleFound(false);
    setDosaStamped(false);
    setCallActive(false);
    setCallTimer(0);
    setRingFound(false);
  }, [chapter?.id]);

  useEffect(() => {
    let interval: any;
    if (callActive) {
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callActive]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNavigateChapter('next');
      if (e.key === 'ArrowLeft' && hasPrev) onNavigateChapter('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigateChapter, hasNext, hasPrev]);

  if (!chapter) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const portalRoot = typeof document !== 'undefined'
    ? (document.getElementById('modal-portal-root') || document.body)
    : null;

  if (!portalRoot) return null;

  // Render via React Portal into modal-portal-root to guarantee 100% viewport centering
  return createPortal(
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-5 md:p-6"
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
        {/* Fullscreen Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* Modal Window Container - Centered directly in user's physical viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-4xl bg-midnight-900 border border-gold/30 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] sm:max-h-[86dvh]"
        >
          {/* Top Close Button (Min 44x44px touch target) */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 w-11 h-11 rounded-full bg-midnight-950/90 border border-gold/40 hover:border-gold text-ivory hover:text-gold flex items-center justify-center shadow-lg transition-colors cursor-pointer active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Media Stage - IMMEDIATELY visible right at top */}
          <div className="relative w-full aspect-video sm:aspect-[21/9] max-h-[34vh] sm:max-h-[40vh] bg-black overflow-hidden flex-none">
            {chapter.videoSrc ? (
              <div className="w-full h-full relative bg-black flex items-center justify-center">
                <video
                  src={chapter.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            ) : chapter.imageSrc ? (
              <div className="w-full h-full relative">
                <img
                  src={chapter.imageSrc}
                  alt={chapter.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-950/40 to-transparent" />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-wine-900 via-midnight-900 to-berry/50 flex flex-col items-center justify-center p-6 text-center relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold mb-2 sm:mb-3">
                  <Film className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold">
                  {chapter.genre} • {chapter.year}
                </span>
                <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-ivory mt-1 line-clamp-1">
                  {chapter.title}
                </h2>
              </div>
            )}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-900/30 to-transparent pointer-events-none" />

            {/* Chapter Metadata Overlay on Media */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-6 flex items-end justify-between pointer-events-none">
              <div className="space-y-1 max-w-[85%]">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="bg-berry text-ivory font-bold text-[10px] sm:text-xs uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    Chapter {String(chapter.number).padStart(2, '0')}
                  </span>
                  <span className="text-gold font-mono text-[11px] sm:text-xs">
                    {chapter.date}
                  </span>
                </div>
                <h2 className="font-display font-extrabold text-lg sm:text-2xl md:text-3xl text-ivory drop-shadow-md line-clamp-1">
                  {chapter.title}
                </h2>
                <p className="font-serif italic text-xs sm:text-sm text-gold-light line-clamp-1">
                  {chapter.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Story Content Area ONLY */}
          <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 flex-1">
            {/* Story Synopsis */}
            <div className="glass-panel p-4 sm:p-5 rounded-xl border-l-4 border-l-gold">
              <h3 className="font-display font-semibold text-[11px] sm:text-xs tracking-widest text-gold uppercase mb-1">
                Synopsis
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-ivory/90 leading-relaxed font-light">
                {chapter.synopsis}
              </p>
            </div>

            {/* CHAPTER 1: Nostalgic Instagram Request */}
            {chapter.interactiveType === 'instagram-request' && (
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#140E1E] border border-gold/25 space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/15">
                  <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4 flex-none" />
                    <span>Nostalgic Scene • 18 August 2017</span>
                  </div>
                  <span className="text-[10px] font-mono text-ivory/40">Private Account</span>
                </div>

                {!requestAccepted ? (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-midnight-950/80 border border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-3.5">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-500 border border-gold/30 flex items-center justify-center text-ivory text-lg shadow flex-none">
                        ✌️
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-sm text-ivory">fayaz</span>
                          <span className="text-xs text-ivory/50">wants to follow you</span>
                        </div>
                        <p className="text-xs text-gold/80 font-mono">Bio: Saudi Arabia</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setRequestAccepted(true)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gold hover:bg-gold-light text-midnight-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer min-h-[44px] flex items-center justify-center"
                    >
                      Accept Request
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 sm:p-5 rounded-xl bg-midnight-950/90 border border-gold/40 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                      <Check className="w-4 h-4" />
                      <span>Request Accepted: August 18, 2017</span>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="flex justify-start">
                        <div className="px-3.5 py-2 rounded-2xl rounded-bl-sm bg-wine-900/80 text-ivory text-xs sm:text-sm border border-gold/20 shadow">
                          <p className="text-[10px] text-gold/80 font-mono mb-0.5">Fayaz</p>
                          <p className="font-sans">Hi</p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="px-3.5 py-2 rounded-2xl rounded-br-sm bg-berry/80 text-ivory text-xs sm:text-sm border border-berry/40 shadow">
                          <p className="text-[10px] text-gold-light/80 font-mono mb-0.5 text-right">Fazila (After School)</p>
                          <p className="font-sans">Hello</p>
                        </div>
                      </div>
                    </div>

                    <p className="font-serif italic text-xs text-center text-gold-light/70 pt-2 border-t border-gold/10">
                      "Neither knew that a simple 'Hi' would eventually become a lifetime."
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* CHAPTER 2: The Dimple Detective */}
            {chapter.interactiveType === 'dimple-detector' && (
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#140E1E] border border-gold/25 space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/15">
                  <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 flex-none" />
                    <span>The Cousin's Engagement Mystery</span>
                  </div>
                  <span className="text-[10px] font-mono text-ivory/50">Detective Clue</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-midnight-950/70 border border-berry/30 font-serif italic text-sm sm:text-base text-gold-light">
                    "Mudinja kandupidichu sollu naanga yaaru!"
                    <span className="block text-xs font-sans text-ivory/50 mt-1">— Fazila's challenge</span>
                  </div>

                  {!dimpleFound ? (
                    <button
                      onClick={() => setDimpleFound(true)}
                      className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-wine-900 to-berry hover:from-berry hover:to-wine-900 border border-gold/30 text-gold font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl cursor-pointer min-h-[44px]"
                    >
                      CAN YOU FIND FAZI? (CLICK TO SOLVE)
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 sm:p-5 rounded-xl bg-wine-900/60 border border-gold/40 space-y-1.5 text-center"
                    >
                      <span className="text-xs font-mono text-gold uppercase tracking-wider block">
                        Mystery Solved Instantly
                      </span>
                      <p className="font-serif italic text-lg sm:text-2xl text-ivory text-shimmer-gold">
                        "Un dimple vechu kandupidichen. Adhu nee dhaan nu enakku theriyum."
                      </p>
                      <p className="text-xs text-ivory/60 pt-1">
                        He had barely seen her recent face, but the dimple never lied.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* CHAPTER 4: The Dosa Deal */}
            {chapter.interactiveType === 'dosa-deal' && (
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#140E1E] border border-gold/25 space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/15">
                  <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-wider">
                    <Utensils className="w-4 h-4 flex-none" />
                    <span>The Dosa Lifetime Agreement</span>
                  </div>
                  <span className="text-[10px] font-mono text-ivory/50">Breakfast Rom-Com</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-midnight-950/80 border border-gold/20 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-gold uppercase">Fayaz's Proposition</span>
                      <p className="font-serif italic text-base sm:text-lg text-ivory mt-1.5">
                        "Enakku indha dosa kedacha nalla irukkum, for a lifetime."
                      </p>
                    </div>
                    <span className="text-xs text-ivory/50 mt-3 font-mono">Proposal disguised as food review</span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-midnight-950/80 border border-gold/20 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-gold uppercase">Fazila's Counter-Agreement</span>
                      <p className="font-serif italic text-base sm:text-lg text-gold mt-1.5">
                        "Kidaikkum, kidaikkum."
                      </p>
                    </div>
                    <span className="text-xs text-ivory/50 mt-3 font-mono">Terms accepted in full</span>
                  </div>
                </div>

                <div className="pt-1 text-center">
                  {!dosaStamped ? (
                    <button
                      onClick={() => setDosaStamped(true)}
                      className="px-6 py-2.5 rounded-full bg-gold hover:bg-gold-light text-midnight-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-colors cursor-pointer min-h-[44px]"
                    >
                      Stamp The Lifetime Contract
                    </button>
                  ) : (
                    <motion.div
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-block px-4 py-2 rounded-lg border-2 border-dashed border-gold text-gold font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold bg-gold/10"
                    >
                      ✓ OFFICIAL LIFETIME DOSA CONTRACT: ACTIVE (2017 – FOREVER)
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* CHAPTER 5: The First Voice Call */}
            {chapter.interactiveType === 'first-call' && (
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#140E1E] border border-gold/25 space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/15">
                  <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-wider">
                    <Phone className="w-4 h-4 flex-none" />
                    <span>Perima's House, Erode • Audio Call Scene</span>
                  </div>
                  <span className="text-[10px] font-mono text-ivory/50">4,000 KM Connection</span>
                </div>

                {!callActive ? (
                  <div className="p-5 sm:p-6 rounded-xl bg-midnight-950 text-center space-y-3.5 border border-gold/20">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
                      <Phone className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-ivory">Incoming Audio Call</h4>
                      <p className="text-xs font-mono text-gold">Fayaz (Saudi Arabia)</p>
                    </div>
                    <button
                      onClick={() => setCallActive(true)}
                      className="px-8 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-ivory font-bold text-xs uppercase tracking-wider shadow-lg transition-colors cursor-pointer min-h-[44px]"
                    >
                      Answer Call
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-5 sm:p-6 rounded-xl bg-midnight-950 text-center space-y-3.5 border border-gold/40"
                  >
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-gold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>CALL IN PROGRESS • {formatTimer(callTimer)}</span>
                    </div>

                    <div className="space-y-2 py-2">
                      <p className="font-serif italic text-base sm:text-lg text-ivory/80">
                        "Sollu, sollu..."
                        <span className="block text-xs font-mono text-gold mt-0.5">— Fayaz, coaxing gently</span>
                      </p>

                      <div className="h-0.5 w-12 bg-gold/30 mx-auto my-2" />

                      <p className="font-serif italic text-xl sm:text-2xl text-gold text-shimmer-gold">
                        "...I love you."
                        <span className="block text-xs font-mono text-rose-dusty mt-1">— Fazila, whispering from the corner</span>
                      </p>
                    </div>

                    <button
                      onClick={() => setCallActive(false)}
                      className="px-6 py-2 rounded-full bg-rose-deep/60 hover:bg-rose-deep text-ivory font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer min-h-[40px]"
                    >
                      End Call
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* CHAPTER 6: Distance Map */}
            {chapter.interactiveType === 'distance-map' && (
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#140E1E] border border-gold/25 space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/15">
                  <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-wider">
                    <Compass className="w-4 h-4 flex-none" />
                    <span>The Geometry of Distance</span>
                  </div>
                  <span className="text-[10px] font-mono text-ivory/50">4,000 Kilometers Apart</span>
                </div>

                <div className="py-4 px-3 sm:px-5 bg-midnight-950/80 rounded-xl border border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                  <div className="text-center sm:text-left space-y-0.5">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-gold text-xs font-mono">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>ERODE, TAMIL NADU</span>
                    </div>
                    <p className="text-sm font-bold text-ivory">Fazila</p>
                    <p className="text-xs text-emerald-400 font-mono">12th Grade: School 1st Rank!</p>
                  </div>

                  <div className="flex-1 w-full flex flex-col items-center">
                    <span className="text-[9px] sm:text-[10px] font-mono text-gold-light/60 tracking-widest uppercase mb-1">
                      Timezones • Missed Calls • Duas
                    </span>
                    <div className="w-full flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-gold via-berry to-gold border-dashed" />
                      <div className="w-2 h-2 rounded-full bg-gold" />
                    </div>
                    <span className="text-xs font-mono text-gold font-bold mt-1">
                      ~4,000 KM
                    </span>
                  </div>

                  <div className="text-center sm:text-right space-y-0.5">
                    <div className="flex items-center justify-center sm:justify-end gap-1.5 text-gold text-xs font-mono">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>SAUDI ARABIA</span>
                    </div>
                    <p className="text-sm font-bold text-ivory">Fayaz</p>
                    <p className="text-xs text-gold-light font-mono">NIOS Board & Determined Comeback</p>
                  </div>
                </div>
              </div>
            )}

            {/* CHAPTER 13: Bride vs Groom Wedding Game */}
            {chapter.interactiveType === 'wedding-game' && (
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#140E1E] border border-gold/25 space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/15">
                  <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-wider">
                    <Award className="w-4 h-4 flex-none" />
                    <span>The Ring Search Championship</span>
                  </div>
                  <span className="text-[10px] font-mono text-ivory/50">Post-Wedding Games</span>
                </div>

                <div className="text-center space-y-3 py-1">
                  <p className="font-serif italic text-sm sm:text-base text-gold-light max-w-lg mx-auto">
                    "Fazila was excited because she was the bride this time and was determined to win."
                  </p>

                  {!ringFound ? (
                    <button
                      onClick={() => setRingFound(true)}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-berry to-wine-900 hover:from-gold hover:to-gold-light hover:text-midnight-950 text-ivory font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl border border-gold/30 cursor-pointer min-h-[44px]"
                    >
                      DIVE INTO THE BRASS POT TO FIND THE RING!
                    </button>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4 sm:p-5 rounded-xl bg-gold/15 border border-gold text-center space-y-1.5"
                    >
                      <div className="text-xl sm:text-2xl">🏆 💍 👑</div>
                      <h4 className="font-display font-extrabold text-base sm:text-lg text-gold">
                        FAZILA WINS THE WEDDING ROUND!
                      </h4>
                      <p className="text-xs text-ivory/80 font-serif italic">
                        Surrounded by cheering cousins, she fished the ring out with championship precision while Fayaz smiled in sweet defeat!
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Story Beats List */}
            <div className="space-y-4 sm:space-y-6 pt-1">
              <h3 className="font-display font-bold text-base sm:text-lg text-gold flex items-center gap-2">
                <span>The Story Unfolds</span>
              </h3>

              {chapter.storyBeats.map((beat, idx) => (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-xl transition-all ${
                    beat.highlight
                      ? 'bg-wine-900/40 border border-gold/30 shadow-md'
                      : 'bg-midnight-950/60 border border-ivory/10'
                  }`}
                >
                  {beat.title && (
                    <h4 className="font-display font-bold text-sm sm:text-base text-ivory mb-1.5">
                      {beat.title}
                    </h4>
                  )}
                  <p className="text-xs sm:text-sm md:text-base text-ivory/80 leading-relaxed font-light">
                    {beat.text}
                  </p>
                  {beat.quote && (
                    <div className="mt-2.5 pl-3.5 border-l-2 border-gold/60 font-serif italic text-sm sm:text-base text-gold-light">
                      {beat.quote}
                      {beat.quoteAuthor && (
                        <span className="block text-xs font-sans not-italic text-ivory/50 mt-0.5 font-mono">
                          — {beat.quoteAuthor}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quotes Footer */}
            {chapter.quotes && chapter.quotes.length > 0 && (
              <div className="pt-3 border-t border-gold/15 flex flex-wrap gap-2">
                {chapter.quotes.map((q, qIdx) => (
                  <span
                    key={qIdx}
                    className="px-3 py-1 rounded-full bg-berry/20 border border-berry/40 text-[11px] sm:text-xs font-serif italic text-gold-light"
                  >
                    {q}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Modal Bottom Navigation Bar (Touch targets >= 44px) */}
          <div className="p-3 sm:p-4 bg-midnight-950 border-t border-gold/20 flex items-center justify-between flex-none">
            <button
              onClick={() => onNavigateChapter('prev')}
              disabled={!hasPrev}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] ${
                hasPrev
                  ? 'bg-wine-900/60 hover:bg-wine-900 text-ivory hover:text-gold border border-gold/20 cursor-pointer active:scale-95'
                  : 'opacity-40 text-ivory/40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4 flex-none" />
              <span className="hidden xs:inline">Previous Chapter</span>
              <span className="xs:hidden">Prev</span>
            </button>

            <span className="text-xs font-mono text-ivory/50">
              {chapter.number} / 18
            </span>

            <button
              onClick={() => onNavigateChapter('next')}
              disabled={!hasNext}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] ${
                hasNext
                  ? 'bg-gold hover:bg-gold-light text-midnight-950 font-bold shadow-md cursor-pointer active:scale-95'
                  : 'opacity-40 text-ivory/40 cursor-not-allowed'
              }`}
            >
              <span className="hidden xs:inline">Next Chapter</span>
              <span className="xs:hidden">Next</span>
              <ChevronRight className="w-4 h-4 flex-none" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    portalRoot
  );
};
