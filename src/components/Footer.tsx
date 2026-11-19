import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="relative bg-[#08060D] text-ivory/80 border-t border-gold/15 pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Logo & Identity */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-lg bg-wine-900 border border-gold/30 flex items-center justify-center text-gold font-display font-extrabold text-xs sm:text-sm flex-none">
                F²
              </div>
              <span className="font-display font-bold text-base sm:text-lg tracking-[0.15em] sm:tracking-[0.2em] text-ivory">
                FAZILA × FAYAZ
              </span>
            </div>
            <p className="font-serif italic text-xs sm:text-sm text-gold-light/80 max-w-md">
              "A love story that never stopped streaming. From 18 August 2017 to every tomorrow."
            </p>
          </div>

          {/* Birthday Surprise Stamp */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-wine-900/40 border border-gold/20 text-center md:text-right space-y-1 w-full sm:w-auto">
            <div className="inline-flex items-center gap-1.5 text-gold text-[10px] sm:text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 flex-none" />
              <span>Special Birthday Edition</span>
            </div>
            <p className="font-display font-bold text-sm sm:text-base text-ivory">
              Happy Birthday, Fayaz!
            </p>
            <p className="font-serif italic text-[11px] sm:text-xs text-rose-dusty">
              With all my love, always — Fazi (Usura)
            </p>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs font-mono text-ivory/50 text-center sm:text-left">
          <div>
            2017 – FOREVER • 18 CHAPTERS • 100% UNCONDITIONAL LOVE
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-midnight-900 hover:bg-wine-900 border border-gold/20 text-gold hover:text-ivory transition-colors cursor-pointer min-h-[44px] active:scale-95 w-full sm:w-auto"
            aria-label="Scroll back to top"
          >
            <span>Back to Beginning</span>
            <ArrowUp className="w-3.5 h-3.5 flex-none" />
          </button>
        </div>
      </div>
    </footer>
  );
};
