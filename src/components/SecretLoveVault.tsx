import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Unlock, Key, Heart, Sparkles, X, 
  Send, Gift, Check, Flame, Star
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

export const SecretLoveVault: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const handleUnlock = () => {
    soundFX.playCinematicChord();
    setIsUnlocked(true);
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept 2017 (anniversary year), 0406 (wedding date), or any instant unlock
    if (passcode === '2017' || passcode === '0406' || passcode === '1808' || passcode.toLowerCase() === 'usura') {
      soundFX.playCinematicChord();
      setIsUnlocked(true);
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
      soundFX.playChime(400);
      setTimeout(() => setErrorMessage(false), 2000);
    }
  };

  return (
    <section className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-midnight-950 via-[#190F24] to-midnight-900 overflow-hidden w-full">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-berry/15 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-6 sm:space-y-8">
        
        {/* VAULT BANNER */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#26162F] via-[#160B1C] to-[#100714] border-2 border-gold/40 p-6 sm:p-10 shadow-2xl overflow-hidden text-center space-y-4 sm:space-y-6">
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-gold/30 font-serif text-lg pointer-events-none">✦</div>
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gold/30 font-serif text-lg pointer-events-none">✦</div>
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-gold/30 font-serif text-lg pointer-events-none">✦</div>
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-gold/30 font-serif text-lg pointer-events-none">✦</div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wine-900/80 border border-gold/30 text-gold text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em]">
            <Lock className="w-3.5 h-3.5 text-rose-dusty" />
            <span>Bonus Episode • Confidential Archive</span>
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h3 className="font-display font-black text-2xl sm:text-4xl text-ivory tracking-tight">
              FAZI'S PRIVATE BIRTHDAY VAULT
            </h3>
            <p className="font-serif italic text-sm sm:text-base md:text-lg text-gold-light/90">
              "An unreleased letter from a wife to her husband on his birthday. Sealed with a digital wax stamp, written from the deepest corner of her heart."
            </p>
          </div>

          {/* Locked State Teaser Card */}
          {!isUnlocked ? (
            <div className="max-w-md mx-auto p-5 sm:p-6 rounded-2xl bg-midnight-950/90 border border-gold/25 space-y-4 shadow-xl">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-tr from-wine-900 to-berry border-2 border-gold/50 flex items-center justify-center text-gold shadow-lg shadow-gold/10">
                <Gift className="w-7 h-7 animate-bounce" />
              </div>

              <div className="space-y-1 text-center">
                <span className="text-xs font-mono uppercase tracking-wider text-gold font-bold">
                  Dedicated To Fayaz (USURA)
                </span>
                <p className="text-[11px] text-ivory/60 font-mono">
                  Tap below to break the seal and reveal your surprise
                </p>
              </div>

              {/* Direct Instant Unlock Button */}
              <button
                onClick={handleUnlock}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold hover:brightness-110 text-midnight-950 font-display font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4 text-midnight-950" />
                <span>Unlock The Birthday Letter</span>
              </button>

              {/* Optional Passcode Clue */}
              <div className="text-[10px] font-mono text-ivory/40 pt-1">
                Passcode hint: <span className="text-gold/70">2017</span> (The year we began) or one-tap unlock above
              </div>
            </div>
          ) : (
            /* UNLOCKED PARCHMENT LETTER */
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FBF4EC] to-[#F5ECE0] text-midnight-950 shadow-2xl border-4 border-gold/60 space-y-6 text-left relative overflow-hidden"
            >
              {/* Wax Seal Stamp in top right */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-wine-900 to-berry border-2 border-gold shadow-xl flex flex-col items-center justify-center text-gold pointer-events-none">
                <Heart className="w-4 h-4 fill-gold" />
                <span className="font-display font-black text-[9px] tracking-tighter">USURA</span>
              </div>

              {/* Letter Header */}
              <div className="border-b border-wine-900/15 pb-4 space-y-1">
                <span className="font-mono text-xs text-berry font-bold uppercase tracking-widest">
                  Private Birthday Letter • November 2026
                </span>
                <h4 className="font-serif italic text-2xl sm:text-3xl font-bold text-wine-900">
                  Dearest Fayaz (My USURA),
                </h4>
              </div>

              {/* Letter Body in Beautiful Romantic Serif */}
              <div className="space-y-4 font-serif text-sm sm:text-base md:text-lg text-zinc-800 leading-relaxed">
                <p>
                  Today, on your birthday, I sat back and rewatched the entire movie of our lives. From that single unexpected Instagram request on August 18, 2017 that I almost rejected, to the blue shirt you wore when I found you by your dimple... every single chapter has been nothing short of a miracle.
                </p>

                <p>
                  Six years of waiting. You in Saudi Arabia, me in Erode. Thousands of miles apart, holding on through late-night phone calls, quiet tears, and family hesitations. You taught me what real patience looks like. You never doubted our destiny, and on June 4, 2023, when we stood on our wedding stage, I knew in my soul: <em>"Edho perusa saadhichuttom."</em>
                </p>

                <p className="p-4 rounded-xl bg-amber-50 border-l-4 border-l-amber-600 font-sans text-xs sm:text-sm text-zinc-700 italic">
                  "When our little warrior Zayyan was in the NICU for those eleven frightening days, you didn’t just support me — you carried our whole world on your shoulders. You held my hand and said, 'Onnum aagadhu, naan irukken.' That is the kind of man you are."
                </p>

                <p>
                  Thank you for loving me without ego. Thank you for making me laugh when I am impossible to deal with. Thank you for supporting my career, for helping me build my dream center, for building our Chennai home, and for every hot dosa and flower surprise.
                </p>

                <p className="font-bold text-wine-900">
                  You are not just my husband; you are my best friend, the father of my son, and my safest home. Whatever comes next in life... <em>"Paathukkalaam."</em>
                </p>
              </div>

              {/* Sign-off */}
              <div className="pt-4 border-t border-wine-900/15 flex items-center justify-between">
                <div>
                  <p className="font-serif italic text-sm text-zinc-600">With all my love and prayers,</p>
                  <p className="font-display font-extrabold text-lg sm:text-xl text-wine-900">
                    Your Fazi ♡
                  </p>
                </div>

                <button
                  onClick={() => setIsUnlocked(false)}
                  className="px-4 py-2 rounded-full border border-wine-900/30 text-wine-900 hover:bg-wine-900 hover:text-ivory text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Re-Seal Vault
                </button>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
