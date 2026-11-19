import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film } from 'lucide-react';

interface MediaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: {
    type: 'video' | 'image';
    src: string;
    title: string;
    subtitle?: string;
    caption?: string;
  } | null;
}

export const MediaViewerModal: React.FC<MediaViewerModalProps> = ({
  isOpen,
  onClose,
  media,
}) => {
  // Lock background scroll cleanly without shifting scroll position
  useEffect(() => {
    if (isOpen && media) {
      const origHtmlOverflow = document.documentElement.style.overflow;
      const origBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      return () => {
        document.documentElement.style.overflow = origHtmlOverflow;
        document.body.style.overflow = origBodyOverflow;
      };
    }
  }, [isOpen, media]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || !media) return null;

  const portalRoot = typeof document !== 'undefined'
    ? (document.getElementById('modal-portal-root') || document.body)
    : null;

  if (!portalRoot) return null;

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
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-midnight-950/95 backdrop-blur-2xl"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* Cinema Player Container - Strictly Centered in Viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-5xl bg-midnight-900 border border-gold/30 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92dvh]"
        >
          {/* Top Bar */}
          <div className="p-3 sm:p-4 bg-midnight-950/90 border-b border-gold/15 flex items-center justify-between flex-none">
            <div className="flex items-center gap-2 sm:gap-2.5 pr-2">
              <span className="w-8 h-8 rounded-lg bg-wine-900 border border-gold/30 flex items-center justify-center text-gold flex-none">
                <Film className="w-4 h-4" />
              </span>
              <div className="overflow-hidden">
                <h3 className="font-display font-bold text-sm sm:text-base md:text-lg text-ivory truncate">
                  {media.title}
                </h3>
                {media.subtitle && (
                  <p className="font-serif italic text-[11px] sm:text-xs text-gold-light truncate">
                    {media.subtitle}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-wine-900/60 hover:bg-wine-900 border border-gold/30 hover:border-gold text-ivory hover:text-gold flex items-center justify-center transition-colors cursor-pointer flex-none active:scale-95"
              aria-label="Close viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Media Player Area - Prominently Centered */}
          <div className="relative bg-black flex items-center justify-center flex-1 max-h-[72dvh] min-h-[240px] sm:min-h-[340px] overflow-hidden">
            {media.type === 'video' ? (
              <video
                src={media.src}
                controls
                autoPlay
                playsInline
                className="max-h-[70dvh] w-full h-full object-contain"
              />
            ) : (
              <img
                src={media.src}
                alt={media.title}
                className="max-h-[70dvh] w-auto max-w-full object-contain"
              />
            )}
          </div>

          {/* Bottom Caption & Memory Note */}
          {media.caption && (
            <div className="p-3 sm:p-4 bg-midnight-950 text-center border-t border-gold/15 flex-none">
              <p className="font-serif italic text-xs sm:text-sm text-ivory/80">
                "{media.caption}"
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    portalRoot
  );
};
