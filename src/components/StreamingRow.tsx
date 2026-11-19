import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface StreamingRowProps {
  id?: string;
  title: string;
  subtitle?: string;
  tag?: string;
  children: React.ReactNode;
}

export const StreamingRow: React.FC<StreamingRowProps> = ({
  id,
  title,
  subtitle,
  tag,
  children,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id={id} className="relative py-6 sm:py-8 md:py-10 group/row overflow-hidden w-full">
      {/* Row Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3.5 sm:mb-5 flex items-end justify-between">
        <div className="pr-2">
          {tag && (
            <div className="inline-flex items-center gap-1.5 text-gold text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-1">
              <Sparkles className="w-3 h-3 text-gold flex-none" />
              <span>{tag}</span>
            </div>
          )}
          <h2 className="font-display font-extrabold text-lg sm:text-2xl md:text-3xl text-ivory tracking-wide leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="font-serif italic text-xs sm:text-sm md:text-base text-gold-light/70 mt-0.5 sm:mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Scroll Controls (Desktop only) */}
        <div className="hidden md:flex items-center gap-2 flex-none">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full bg-wine-900/70 hover:bg-wine-900 border border-gold/25 hover:border-gold text-ivory hover:text-gold flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full bg-wine-900/70 hover:bg-wine-900 border border-gold/25 hover:border-gold text-ivory hover:text-gold flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Content Container with Touch Snapping */}
      <div
        ref={rowRef}
        className="flex items-stretch gap-3 sm:gap-5 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6 lg:px-8 pb-3 snap-scroll-x"
      >
        {children}
        {/* End of row padding spacer */}
        <div className="w-2 sm:w-4 flex-none" aria-hidden="true" />
      </div>
    </section>
  );
};
