import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, MessageCircle, Sparkles, Heart, Quote } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface QuoteItem {
  id: string;
  quote: string;
  speaker: 'Fazila' | 'Fayaz' | 'Both';
  occasion: string;
  year: string;
  context: string;
  pitch: number;
}

const MEMORABLE_QUOTES: QuoteItem[] = [
  {
    id: 'quote-1',
    quote: '“Edho perusa saadhichuttom.”',
    speaker: 'Both',
    occasion: 'The Wedding Stage',
    year: '4 June 2023',
    context: 'Six years of waiting, family resistance, and long-distance tears dissolved into this single triumphant phrase on the wedding stage in Pallapatti.',
    pitch: 880
  },
  {
    id: 'quote-2',
    quote: '“Aama Fazi, naan unna love panren.”',
    speaker: 'Fayaz',
    occasion: 'First Phone Call',
    year: '2017',
    context: 'At Perima\'s house, after her gentle teasing, his whisper broke through the silence with the honest confession that changed everything.',
    pitch: 660
  },
  {
    id: 'quote-3',
    quote: '“Enakku indha dosa kedacha nalla irukkum, for a lifetime.”',
    speaker: 'Fayaz',
    occasion: 'The Dosa Proposal',
    year: 'Early Dating',
    context: 'Eating hot crispy dosas together, he delivered the smoothest, most unforgettable kitchen bargain proposal in history.',
    pitch: 740
  },
  {
    id: 'quote-4',
    quote: '“Kidaikkum, kidaikkum.”',
    speaker: 'Fazila',
    occasion: 'The Instant Approval',
    year: 'Early Dating',
    context: 'Her immediate smiling confirmation to the dosa bargain — the very first spoken agreement of their lifelong companionship.',
    pitch: 980
  },
  {
    id: 'quote-5',
    quote: '“Un dimple vechu kandupidichen. Adhu nee dhaan nu enakku theriyum.”',
    speaker: 'Fazila',
    occasion: 'First In-Person Meeting',
    year: '2018',
    context: 'Scanning the crowded room, his signature smile dimple betrayed his disguise in seconds. She knew him at first glance.',
    pitch: 820
  },
  {
    id: 'quote-6',
    quote: '“Paathukkalaam. Ennaanaalum paathukkalaam. I’ll be there for you. I’m here.”',
    speaker: 'Fayaz',
    occasion: 'His Lifelong Promise',
    year: 'Every Single Day',
    context: 'His universal answer to all life\'s trials — from 11 days in the NICU to career doubts. His sacred promise of safety and presence.',
    pitch: 580
  }
];

export const SoundboardRow: React.FC = () => {
  const [activeQuote, setActiveQuote] = useState<QuoteItem | null>(null);

  const handlePlayQuote = (item: QuoteItem) => {
    setActiveQuote(item);
    soundFX.playChime(item.pitch);
  };

  return (
    <div className="py-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 px-1">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-widest">
            <Quote className="w-3.5 h-3.5 text-gold" />
            <span>Echoes of Our Journey</span>
          </div>
          <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-ivory tracking-tight mt-1">
            THE WORDS WE WILL NEVER FORGET
          </h3>
          <p className="font-serif italic text-xs sm:text-sm text-gold-light/80">
            Tap any quote bubble below to hear its echo and read its story.
          </p>
        </div>
      </div>

      {/* Grid of Quote Bubbles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {MEMORABLE_QUOTES.map((item) => {
          const isActive = activeQuote?.id === item.id;
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePlayQuote(item)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-br from-wine-900/90 to-berry/80 border-gold shadow-xl shadow-gold/15'
                  : 'bg-midnight-950/80 hover:bg-midnight-900/90 border-gold/20 hover:border-gold/50 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded-full bg-midnight-900/90 border border-gold/30 text-gold font-bold">
                  {item.speaker}
                </span>
                <span className="text-ivory/50">{item.year}</span>
              </div>

              <p className="font-serif italic text-sm sm:text-base font-bold text-ivory leading-snug">
                {item.quote}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gold/15 text-[11px] font-mono text-gold-light/80">
                <span className="truncate max-w-[180px]">{item.occasion}</span>
                <span className="flex items-center gap-1 text-gold text-xs font-bold">
                  <Volume2 className="w-3.5 h-3.5" />
                  Echo
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Active Quote Backstory Detail */}
      <AnimatePresence>
        {activeQuote && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-wine-900/50 via-midnight-950 to-wine-900/50 border border-gold/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                Story Behind {activeQuote.quote}:
              </span>
              <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed font-light">
                {activeQuote.context}
              </p>
            </div>
            <button
              onClick={() => setActiveQuote(null)}
              className="text-[10px] font-mono text-ivory/50 hover:text-gold uppercase tracking-wider flex-none"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
