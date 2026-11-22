import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Trophy, Heart, Sparkles, 
  Info, Star, CheckCircle2, X
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface Top10Item {
  rank: number;
  title: string;
  category: string;
  quote: string;
  matchScore: string;
  synopsis: string;
  detailedMemory: string;
  imageSrc?: string;
  badge: string;
}

const TOP_10_ITEMS: Top10Item[] = [
  {
    rank: 1,
    title: 'The Dimple Detective',
    category: 'First Impression Legend',
    quote: '"Un dimple vechu kandupidichen. Adhu nee dhaan nu enakku theriyum."',
    matchScore: '100% Match',
    synopsis: 'Before they ever met, she knew him by his drawing appreciation. But the moment they stood in the same room, his smile dimple gave him away instantly.',
    detailedMemory: 'They had never exchanged photos with open faces. When they finally met in person, she scanned the room and locked eyes: "I found you because of your dimple. I just knew it was you." That dimple remains her favorite sight in the world.',
    imageSrc: '/assets/fayaz-terrace.jpeg',
    badge: 'Iconic Moment'
  },
  {
    rank: 2,
    title: 'The Lifetime Dosa Bargain',
    category: 'Unscripted Kitchen Proposal',
    quote: '"Enakku indha dosa kedacha nalla irukkum, for a lifetime." — "Kidaikkum, kidaikkum."',
    matchScore: '99.9% Match',
    synopsis: 'Eating hot crispy dosas together, he dropped the smoothest food-based proposal in human history. Her reply was the first green light of their forever.',
    detailedMemory: 'No grand diamond ring, no rehearsed theatrical speech — just the smell of hot, golden dosas and his sincere eyes across the table asking if she could make him dosas for the rest of his life. Her cheerful response, "Kidaikkum, kidaikkum," sealed the deal.',
    badge: 'Best Proposal Ever'
  },
  {
    rank: 3,
    title: 'The Apology Record: Zero Ego',
    category: 'Husband of the Century',
    quote: '"Paathukkalaam... naan dhaan sorry."',
    matchScore: '100% Match',
    synopsis: 'Whenever small storms brewing, Fayaz never let male pride or ego outrank his love. His instant reflex was always to soothe her first.',
    detailedMemory: 'In an argument, pride never had a seat at the table. Even when she was fiercely stubborn or being dramatic, he would break the tension with a gentle laugh: "Paathukkalaam... naan dhaan sorry." He taught her that peace and love always matter more than winning an argument.',
    badge: 'Unconditional Love'
  },
  {
    rank: 4,
    title: 'The 4,000 KM Saudi Wait',
    category: 'Loyalty Across Continents',
    quote: 'August 18, 2017 to June 4, 2023 • 6 Years of Patience',
    matchScore: '99.8% Match',
    synopsis: 'While he was working in Saudi Arabia and she was in Erode, thousands of miles and different time zones could never shake what they were building.',
    detailedMemory: 'Six years of waiting. Late-night WhatsApp calls after long shifts, counting down flight dates, dealing with family hesitations, and staying patient: "If it\'s the right choice, it will happen in the right way. Trust Allah\'s destiny."',
    badge: 'True Commitment'
  },
  {
    rank: 5,
    title: 'The 11-Day NICU Guardian',
    category: 'Devotion in Crisis',
    quote: '"Onnum aagadhu Fazi, naan irukken. Namma paiyan thirumba varuvaan."',
    matchScore: '100% Match',
    synopsis: 'When their 1.6 kg miracle baby Zayyan was rushed into emergency NICU care for eleven critical days, Fayaz didn\'t sleep a single full night.',
    detailedMemory: 'An emergency C-section, fear, and alarms. For eleven days, Fayaz stood as the unwavering pillar between the hospital ward and the NICU. Running tests, wiping tears, feeding her, and holding baby Zayyan\'s tiny hand through the incubator glass. A real man, a heroic father.',
    imageSrc: '/assets/zayyan-with-father.mp4',
    badge: 'Super Dad'
  },
  {
    rank: 6,
    title: 'The 5 AM Club',
    category: 'Soulmate Connection',
    quote: 'Midnight ice cream runs, pillow talks & future blueprints.',
    matchScore: '99.7% Match',
    synopsis: 'Long after the world falls asleep, they talk until the morning athan calls. Unfiltered laughter, quiet secrets, and finding home in each other.',
    detailedMemory: 'Even on the most exhausting workdays, they find themselves awake at 5 AM talking about everything and nothing — building her dream center, funny comebacks, grocery lists, and growing old together in Chennai.',
    badge: 'Pure Soulmates'
  },
  {
    rank: 7,
    title: 'The Marina Beach First Meet',
    category: 'Sacred Beginnings',
    quote: 'The Holy Quran gift, melting chocolate ice cream & shivering hands.',
    matchScore: '99.9% Match',
    synopsis: 'Meeting on her birthday by the Chennai sea. His gift to her wasn\'t just jewelry — it was the Holy Quran, asking Allah to protect their bond.',
    detailedMemory: 'Walking beside the crashing waves of Marina Beach, sharing ice cream, nervously talking about their families, and holding hands for the very first time. That afternoon etched itself forever as their sacred turning point.',
    imageSrc: '/assets/beach-together.jpeg',
    badge: 'Sacred Memory'
  },
  {
    rank: 8,
    title: 'The Competitive Bride Games',
    category: 'Laughter Over Tears',
    quote: '"I cried during the wedding rites, then went into full combat mode for the ring!"',
    matchScore: '99.5% Match',
    synopsis: 'Right after the emotional teary ceremony on June 4, 2023, the wedding games began — and Fazila was NOT leaving second place!',
    detailedMemory: 'She watched other brides play the ring-finding milk pot game for years. When the pot was placed between them, Fayaz smiled and gave her a competitive run, but her fiery determination swept the win. The hall erupted in laughter.',
    imageSrc: '/assets/wedding-stage.jpeg',
    badge: 'Pure Comedy'
  },
  {
    rank: 9,
    title: 'Faith Before the Kaaba',
    category: 'Sacred Blessing',
    quote: '"Alhamdulillah for every tear that led us to this prayer."',
    matchScore: '100% Match',
    synopsis: 'Performing Umrah together in Makkah, looking upon the Holy Kaaba side-by-side, thanking Allah for protecting their marriage and granting them Zayyan.',
    detailedMemory: 'After six years of prayers, waiting, and family trials, standing together on the white marble of Masjid al-Haram was their ultimate victory. A love grounded in faith, gratitude, and barakah.',
    imageSrc: '/assets/umrah-kaaba.jpeg',
    badge: 'Spiritual Peak'
  },
  {
    rank: 10,
    title: 'The Eternal "Paathukkalaam"',
    category: 'His Lifetime Vow',
    quote: '"Paathukkalaam. Ennaanaalum paathukkalaam. I\'ll be there for you. I\'m here."',
    matchScore: '100% Match',
    synopsis: 'His one-word answer to every anxiety, fear, challenge, and future hurdle. With him, the whole world feels manageable.',
    detailedMemory: 'Whenever she is overwhelmed by work, family pressure, or uncertainty, Fayaz looks her in the eye and says those magic words: "Paathukkalaam." It isn\'t just optimism — it is his solemn oath that whatever life throws, she will never face it alone.',
    badge: 'Ultimate Safety'
  }
];

export const Top10Row: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Top10Item | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      soundFX.playChime(direction === 'left' ? 750 : 950);
    }
  };

  const handleOpenDetail = (item: Top10Item) => {
    setSelectedItem(item);
    soundFX.playChime(1100);
  };

  return (
    <section id="top-10" className="relative py-12 sm:py-16 px-3 sm:px-6 lg:px-8 bg-midnight-900 overflow-hidden w-full">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 rounded-full bg-wine-900/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        
        {/* ROW HEADER: NETFLIX ICONIC TOP 10 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 px-1 sm:px-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-berry/80 border border-gold/40 flex items-center justify-center text-gold text-xs font-bold shadow">
                <Trophy className="w-3.5 h-3.5 text-gold" />
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-gold uppercase tracking-[0.2em] font-semibold">
                Trending In Her Heart Today
              </span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-ivory tracking-tight">
              TOP 10 REASONS WHY HE IS HER <span className="text-shimmer-gold font-serif">"USURA"</span>
            </h2>

            <p className="font-serif italic text-xs sm:text-sm text-gold-light/80">
              The top 10 ranked traits, funny bargains, and heroic acts that won her heart forever.
            </p>
          </div>

          {/* Desktop Row Slider Navigation Controls */}
          <div className="hidden sm:flex items-center gap-2 flex-none">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-midnight-950/80 hover:bg-midnight-950 border border-gold/30 hover:border-gold text-ivory hover:text-gold flex items-center justify-center shadow-lg transition-colors cursor-pointer active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-midnight-950/80 hover:bg-midnight-950 border border-gold/30 hover:border-gold text-ivory hover:text-gold flex items-center justify-center shadow-lg transition-colors cursor-pointer active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* HORIZONTAL SNAP ROW WITH GIANT NUMBERS (1 to 10) */}
        <div
          ref={scrollRef}
          className="flex items-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar snap-scroll-x px-1 sm:px-2 py-4"
        >
          {TOP_10_ITEMS.map((item) => (
            <motion.div
              key={item.rank}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenDetail(item)}
              className="group relative flex-none w-[78vw] max-w-[290px] xs:w-[72vw] xs:max-w-[310px] sm:w-[320px] md:w-[340px] h-[340px] sm:h-[360px] rounded-2xl bg-gradient-to-br from-[#201326] via-midnight-900 to-[#120B18] border border-gold/25 hover:border-gold/70 shadow-2xl transition-all duration-300 snap-item cursor-pointer overflow-hidden flex flex-col justify-between p-4 sm:p-5 select-none"
            >
              {/* GIANT ICONIC NETFLIX TOP 10 NUMBER BEHIND CARD */}
              <div 
                className="absolute -bottom-6 -right-2 text-[130px] sm:text-[150px] font-display font-black leading-none pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '2.5px rgba(201, 155, 114, 0.28)',
                  textShadow: '0 0 25px rgba(118, 45, 74, 0.4)'
                }}
              >
                {item.rank}
              </div>

              {/* Top Meta: Rank Badge & Category */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-berry/70 border border-gold/30 text-gold text-[10px] font-mono uppercase font-bold tracking-wider shadow">
                  <span>TOP #{item.rank}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">
                  {item.matchScore}
                </span>
              </div>

              {/* Center Content: Title, Category & Quote */}
              <div className="relative z-10 space-y-2.5 my-auto">
                <span className="text-[10px] font-mono text-gold/80 uppercase tracking-widest block font-medium">
                  {item.category}
                </span>

                <h3 className="font-display font-black text-lg sm:text-xl text-ivory group-hover:text-gold transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="font-serif italic text-xs sm:text-sm text-gold-light/90 line-clamp-3 bg-midnight-950/50 p-2.5 rounded-xl border border-gold/15">
                  {item.quote}
                </p>

                <p className="text-[11px] text-ivory/70 line-clamp-2 font-light">
                  {item.synopsis}
                </p>
              </div>

              {/* Bottom Interactive Tap CTA */}
              <div className="relative z-10 pt-3 border-t border-gold/15 flex items-center justify-between text-xs font-mono text-gold/80 group-hover:text-gold">
                <span className="text-[10px] uppercase tracking-wider">{item.badge}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                  Read Moment →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* DETAIL MODAL FOR TOP 10 REVEAL */}
      <AnimatePresence>
        {selectedItem && (
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
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            />

            {/* Modal Window Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-xl bg-gradient-to-br from-[#25152D] via-midnight-900 to-[#120B19] border border-gold/40 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl space-y-5 max-h-[90dvh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-midnight-950/80 hover:bg-midnight-950 border border-gold/30 hover:border-gold text-ivory hover:text-gold flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1.5 pr-10">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold text-midnight-950 font-bold text-xs uppercase tracking-wider">
                    Reason #{selectedItem.rank}
                  </span>
                  <span className="text-xs font-mono text-gold-light uppercase tracking-widest">
                    {selectedItem.category}
                  </span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-ivory">
                  {selectedItem.title}
                </h3>
              </div>

              {/* Prominent Quote Box */}
              <div className="p-4 rounded-xl bg-wine-900/40 border border-gold/30 text-center space-y-1">
                <p className="font-serif italic text-sm sm:text-base text-gold-light font-medium">
                  {selectedItem.quote}
                </p>
                <span className="text-[10px] font-mono text-ivory/50 uppercase tracking-widest">
                  Verified True Quote
                </span>
              </div>

              {/* Optional Photo Attachment if available */}
              {selectedItem.imageSrc && !selectedItem.imageSrc.endsWith('.mp4') && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-gold/25 shadow-md">
                  <img
                    src={selectedItem.imageSrc}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/70 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[10px] font-mono text-ivory/80">
                    Real Asset: {selectedItem.title}
                  </span>
                </div>
              )}

              {/* Full Detailed Story */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold">
                  The Full Unfiltered Memory:
                </h4>
                <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed font-light">
                  {selectedItem.detailedMemory}
                </p>
              </div>

              {/* Footer Badge & Close */}
              <div className="pt-3 border-t border-gold/15 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-400/40 text-emerald-300 text-xs font-mono">
                  ✓ {selectedItem.matchScore} For Life
                </span>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2 rounded-full bg-gold hover:bg-gold-light text-midnight-950 font-bold text-xs uppercase tracking-wider shadow cursor-pointer active:scale-95 transition-all"
                >
                  Got It ♡
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
