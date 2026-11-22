import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cake, Sparkles, Flame, Smile, Search, Utensils, 
  Heart, ShieldAlert, Award, RefreshCw, CheckCircle2, 
  PartyPopper, Star, Zap, ThumbsUp
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';
import { fireConfetti } from '../utils/confetti';

export const BirthdaySurpriseZone: React.FC = () => {
  // State 1: Cake Candles
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  // State 2: Dimple Scanner
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<boolean | null>(null);

  // State 3: Dosa Maker
  const [dosaStep, setDosaStep] = useState<number>(0); // 0: raw, 1: batter poured, 2: ghee added, 3: golden flipped, 4: delivered!

  // State 4: Zero Ego Simulator
  const [selectedComplaint, setSelectedComplaint] = useState(0);
  const [reflexShown, setReflexShown] = useState(false);

  // State 5: Active Tab in Fun Zone
  const [activeTab, setActiveTab] = useState<'cake' | 'dimple' | 'dosa' | 'argument' | 'report'>('cake');

  // Blow out candles
  const handleBlowCandles = () => {
    setCandlesLit(false);
    setWishMade(true);
    soundFX.playCinematicChord();
    fireConfetti(4000);
  };

  const handleRelightCandles = () => {
    setCandlesLit(true);
    setWishMade(false);
    soundFX.playChime(1000);
  };

  // Run Dimple Scanner
  const handleStartScan = () => {
    setScanning(true);
    setScanResult(null);
    soundFX.playChime(800);

    setTimeout(() => {
      setScanning(false);
      setScanResult(true);
      soundFX.playCinematicChord();
      fireConfetti(2500);
    }, 2200);
  };

  // Dosa Maker Steps
  const advanceDosa = () => {
    soundFX.playChime(700 + dosaStep * 150);
    if (dosaStep < 4) {
      setDosaStep(dosaStep + 1);
      if (dosaStep === 3) {
        fireConfetti(2000);
      }
    } else {
      setDosaStep(0);
    }
  };

  const COMPLAINTS = [
    {
      wife: "“You didn't reply to my WhatsApp message in 30 seconds!”",
      fayazReflex: "“Paathukkalaam ma... naan dhaan sorry! I was working, but my phone is now glued to my hands forever.”",
      verdict: "Marital Peace Restored (10/10 Survival Skill)"
    },
    {
      wife: "“Who ate the last chocolate in the fridge? Was it you?!”",
      fayazReflex: "“En thappu dhaan ma. I am immediately driving out to buy you 10 boxes of chocolates and a tub of chocolate ice cream.”",
      verdict: "Crisis Averted With Sugar Diplomacy"
    },
    {
      wife: "“You're watching stray cat videos instead of looking at me!”",
      fayazReflex: "“Aama Fazi, cats are cute, but you are my only USURA. Look, closing phone and staring at you for next 3 hours.”",
      verdict: "Cat Allegations Dismissed With 1000% Love"
    },
    {
      wife: "“I literally have zero clothes to wear for this family function!”",
      fayazReflex: "“Paathukkalaam! We will go shopping right now. Whatever dress you pick will be the best in the hall.”",
      verdict: "Husband Card Successfully Maxed Out"
    }
  ];

  return (
    <section id="birthday-fun" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-midnight-950 via-[#180A20] to-midnight-950 overflow-hidden w-full">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-rose-dusty/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/15 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10 sm:space-y-12">
        
        {/* HEADER: BIRTHDAY SURPRISE ARCADE */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-berry/80 via-wine-900 to-berry/80 border border-gold/40 shadow-xl shadow-berry/20">
            <PartyPopper className="w-4 h-4 text-gold animate-bounce" />
            <span className="font-mono text-[10px] sm:text-xs text-gold uppercase tracking-[0.25em] font-bold">
              Birthday Surprise Arcade • For Fayaz
            </span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-ivory tracking-tight drop-shadow-xl">
            THE <span className="text-shimmer-rose">"USURA"</span> BIRTHDAY FUN ZONE
          </h2>

          <p className="font-serif italic text-sm sm:text-base md:text-lg text-gold-light/95 leading-relaxed max-w-2xl mx-auto">
            "Because life with you isn't just a romance — it's full of laughter, crispy dosas, funny comebacks, and zero-ego apologies. Pick an interactive game below!"
          </p>
        </div>

        {/* ARCADE TAB NAVIGATION BUTTONS */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {[
            { id: 'cake', label: '🎂 Blow The Candles', icon: Cake },
            { id: 'dimple', label: '🔍 Dimple Scanner', icon: Search },
            { id: 'dosa', label: '🥞 Dosa Flipper', icon: Utensils },
            { id: 'argument', label: '⚖️ Zero Ego Reflex', icon: ShieldAlert },
            { id: 'report', label: '🏆 Annual Report Card', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  soundFX.playChime(isActive ? 600 : 900);
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-display font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-gold via-gold-light to-gold text-midnight-950 shadow-gold/30 scale-105 border border-gold'
                    : 'bg-midnight-900/80 hover:bg-midnight-800 text-ivory/70 hover:text-gold border border-gold/25'
                }`}
              >
                <Icon className="w-4 h-4 flex-none" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* INTERACTIVE STAGE CONTAINER */}
        <div className="bg-gradient-to-br from-[#1E0E25] via-midnight-900 to-[#120817] border-2 border-gold/40 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl shadow-rose-950/40 relative overflow-hidden">
          
          {/* TAB 1: INTERACTIVE BLOWABLE BIRTHDAY CAKE */}
          {activeTab === 'cake' && (
            <div className="space-y-8 text-center max-w-xl mx-auto py-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
                  Cake Milestone • 2026 Edition
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-ivory">
                  WISH FAYAZ A HAPPY BIRTHDAY!
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-gold-light/90">
                  Make a wish, take a deep breath, and tap below to blow out the candles!
                </p>
              </div>

              {/* 3D-Style Illustrated Birthday Cake with Animated Candles */}
              <div className="relative w-56 sm:w-64 h-56 sm:h-64 mx-auto flex flex-col items-center justify-end select-none">
                
                {/* 3 Glowing Animated Candles */}
                <div className="flex items-end justify-center gap-6 sm:gap-8 mb-[-4px] z-20">
                  {[1, 2, 3].map((candleIndex) => (
                    <div key={candleIndex} className="flex flex-col items-center relative">
                      {/* Flame Animation */}
                      {candlesLit ? (
                        <div className="relative w-4 h-6 mb-1">
                          <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full blur-[1px] animate-[pulse_0.6s_ease-in-out_infinite] shadow-[0_0_15px_#F59E0B]" />
                          <div className="absolute top-1 left-1 w-2 h-3 bg-white/80 rounded-full animate-ping opacity-60" />
                        </div>
                      ) : (
                        /* Soft Smoke Puffs when blown out */
                        <div className="w-3 h-6 mb-1 flex items-center justify-center">
                          <span className="text-[10px] text-ivory/40 animate-fade-out font-mono">~ ☁</span>
                        </div>
                      )}
                      {/* Candle Wick */}
                      <div className="w-0.5 h-2 bg-zinc-700" />
                      {/* Candle Body */}
                      <div className="w-3 sm:w-3.5 h-10 sm:h-12 rounded-t-md bg-gradient-to-b from-amber-200 via-rose-300 to-amber-300 border border-gold/40 shadow-md flex items-center justify-center">
                        <span className="text-[8px] font-mono text-wine-900 font-bold">✦</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cake Tier 1 (Top Layer) */}
                <div className="w-36 sm:w-44 h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-rose-400 via-amber-200 to-rose-400 border-2 border-gold shadow-lg relative flex items-center justify-center z-10">
                  <span className="font-display font-black text-xs sm:text-sm text-wine-900 tracking-wider">
                    FAYAZ ♡
                  </span>
                  {/* Icing Drips */}
                  <div className="absolute -bottom-2 inset-x-2 flex justify-around">
                    <span className="w-3 h-3 bg-amber-100 rounded-full shadow-sm" />
                    <span className="w-4 h-4 bg-amber-100 rounded-full shadow-sm" />
                    <span className="w-3 h-3 bg-amber-100 rounded-full shadow-sm" />
                  </div>
                </div>

                {/* Cake Tier 2 (Base Layer) */}
                <div className="w-52 sm:w-60 h-20 sm:h-22 rounded-2xl bg-gradient-to-r from-wine-900 via-berry to-wine-900 border-2 border-gold shadow-2xl relative flex flex-col items-center justify-center mt-[-6px]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">
                    USURA • 100% PURE LOVE
                  </span>
                  <div className="flex items-center gap-1 text-[9px] text-ivory/80 font-serif italic">
                    <Heart className="w-3 h-3 fill-rose-dusty text-rose-dusty" />
                    <span>From Fazi & Baby Zayyan</span>
                  </div>
                </div>

                {/* Gold Serving Plate */}
                <div className="w-64 sm:w-72 h-4 rounded-full bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark shadow-2xl border border-gold mt-[-4px]" />
              </div>

              {/* Action Buttons: Blow Candles or Relight */}
              <div className="pt-2">
                {candlesLit ? (
                  <button
                    onClick={handleBlowCandles}
                    className="py-3.5 px-8 rounded-full bg-gradient-to-r from-berry via-rose-500 to-berry hover:brightness-110 text-white font-display font-black text-sm uppercase tracking-widest shadow-xl shadow-berry/40 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 mx-auto"
                  >
                    <Flame className="w-4 h-4 animate-pulse" />
                    <span>BLOW OUT CANDLES & MAKE A WISH!</span>
                  </button>
                ) : (
                  <div className="space-y-4">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-wine-900/90 to-berry/80 border-2 border-gold text-center space-y-2 shadow-2xl"
                    >
                      <PartyPopper className="w-8 h-8 text-gold mx-auto animate-bounce" />
                      <h4 className="font-display font-black text-lg sm:text-xl text-ivory">
                        🎉 WISH ACTIVATED & GRANTED BY ALLAH!
                      </h4>
                      <p className="font-serif italic text-sm text-gold-light leading-relaxed">
                        "May Allah grant my USURA long life, radiant health, endless laughter, unlimited hot crispy dosas, and baby Zayyan's joyful smiles every morning. Happy Birthday, my husband, my hero!"
                      </p>
                    </motion.div>

                    <button
                      onClick={handleRelightCandles}
                      className="py-2.5 px-6 rounded-full border border-gold/40 text-gold hover:bg-gold/10 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Relight Candles (Let's Blow Again!)
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE DIMPLE SCANNER */}
          {activeTab === 'dimple' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center max-w-4xl mx-auto py-2">
              {/* Photo Viewfinder */}
              <div className="relative aspect-[4/5] max-h-[380px] rounded-2xl overflow-hidden border-2 border-gold/50 shadow-2xl bg-midnight-950 mx-auto w-full max-w-[320px]">
                <img
                  src="/assets/fayaz-terrace.jpeg"
                  alt="Fayaz Biometric Target"
                  className="w-full h-full object-cover object-top"
                />

                {/* Cyberpunk Romantic HUD Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent pointer-events-none" />
                
                {/* Viewfinder Target Reticle */}
                <div className="absolute inset-4 border border-gold/30 rounded-xl pointer-events-none flex flex-col justify-between p-2 text-[10px] font-mono text-gold">
                  <div className="flex justify-between">
                    <span>SCAN: BIOMETRIC_DIMPLE</span>
                    <span>TARGET: FAYAZ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STATUS: {scanning ? 'SCANNING...' : 'LOCKED'}</span>
                    <span>100% MATCH</span>
                  </div>
                </div>

                {/* Laser Sweep Bar when scanning */}
                {scanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] animate-[bounce_1.2s_ease-in-out_infinite]" />
                )}

                {/* Target Locked on Dimple */}
                {scanResult && (
                  <motion.div
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-[44%] left-[54%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 border-2 border-dashed border-emerald-400 rounded-full animate-spin-slow flex items-center justify-center pointer-events-none shadow-[0_0_20px_#10B981]"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </motion.div>
                )}
              </div>

              {/* Scanner Control & Diagnosis */}
              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
                    Biometric Facial Analysis
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-ivory">
                    FAYAZ DIMPLE DETECTOR 3000
                  </h3>
                  <p className="font-serif italic text-xs sm:text-sm text-gold-light/90">
                    "Before she ever saw his full face in 2018, she identified him in the crowd by his unmistakable dimple."
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-midnight-950/80 border border-gold/25 space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-gold/10 pb-1.5">
                    <span className="text-ivory/60">Target:</span>
                    <span className="text-gold font-bold">Fayaz (USURA)</span>
                  </div>
                  <div className="flex justify-between border-b border-gold/10 pb-1.5">
                    <span className="text-ivory/60">Dimple Cutethness:</span>
                    <span className="text-emerald-400 font-bold">999.9% (Hazardously High)</span>
                  </div>
                  <div className="flex justify-between border-b border-gold/10 pb-1.5">
                    <span className="text-ivory/60">Owner / Exclusive Rights:</span>
                    <span className="text-rose-dusty font-bold">Fazila Only</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/60">Return Policy:</span>
                    <span className="text-amber-300 font-bold">Non-refundable. Kept for life.</span>
                  </div>
                </div>

                <button
                  onClick={handleStartScan}
                  disabled={scanning}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold text-midnight-950 font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>{scanning ? 'SCANNING CHEEK FOR DIMPLE...' : 'RUN BIOMETRIC SCAN NOW'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: INTERACTIVE DOSA FLIPPER SIMULATOR */}
          {activeTab === 'dosa' && (
            <div className="max-w-xl mx-auto space-y-6 text-center py-2">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
                  The Kitchen Agreement
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-ivory">
                  CRISPY DOSA CONTRACT SIMULATOR
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-gold-light/90">
                  "Enakku indha dosa kedacha nalla irukkum, for a lifetime." — "Kidaikkum, kidaikkum!"
                </p>
              </div>

              {/* The Hot Tawa Griddle */}
              <div className="relative w-56 sm:w-64 h-56 sm:h-64 mx-auto rounded-full bg-[#18111B] border-4 border-[#3D2545] shadow-[0_0_35px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
                {/* Tawa Texture */}
                <div className="absolute inset-2 rounded-full border border-gold/15 bg-gradient-to-br from-[#201524] to-[#0D0711]" />

                {/* Sizzle Steam Particles */}
                {dosaStep > 0 && dosaStep < 4 && (
                  <div className="absolute top-4 text-xs font-mono text-ivory/40 animate-pulse">
                    ~ sizzle ~ sizzle ~
                  </div>
                )}

                {/* Dosa States */}
                {dosaStep === 0 && (
                  <span className="font-mono text-xs text-gold/60 uppercase">
                    Empty Hot Tawa
                  </span>
                )}

                {dosaStep === 1 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-36 h-36 rounded-full bg-amber-100/90 border border-amber-300 shadow-inner flex items-center justify-center text-[10px] font-mono text-zinc-700"
                  >
                    Batter Swirling
                  </motion.div>
                )}

                {dosaStep === 2 && (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="w-40 h-40 rounded-full bg-gradient-to-tr from-amber-200 via-amber-300 to-amber-200 border-2 border-gold shadow-lg flex items-center justify-center text-[10px] font-mono text-wine-900 font-bold"
                  >
                    ✦ Pure Ghee Added ✦
                  </motion.div>
                )}

                {dosaStep >= 3 && (
                  <motion.div
                    initial={{ rotateY: 180, scale: 0.9 }}
                    animate={{ rotateY: 0, scale: 1 }}
                    className="w-44 h-44 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-500 border-2 border-amber-200 shadow-2xl flex flex-col items-center justify-center text-center p-2 text-white font-bold"
                  >
                    <span className="text-xs font-display">100% CRISPY GOLDEN</span>
                    <span className="text-[9px] font-mono opacity-90">Ready For Fayaz!</span>
                  </motion.div>
                )}
              </div>

              {/* Status and Counter */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono bg-midnight-950/80 p-3 rounded-xl border border-gold/20">
                  <span className="text-ivory/60">Contract Status:</span>
                  <span className="text-emerald-400 font-bold">
                    {dosaStep === 4 ? 'DELIVERED TO FAYAZ WITH LOVE ♡' : `Step ${dosaStep + 1} of 4: ${['Pour Batter', 'Add Ghee', 'Flip Golden', 'Deliver Plate'][dosaStep]}`}
                  </span>
                </div>

                <button
                  onClick={advanceDosa}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold text-midnight-950 font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer active:scale-95"
                >
                  {dosaStep === 0 && '1. POUR FRESH DOSA BATTER'}
                  {dosaStep === 1 && '2. DRIZZLE PURE GHEE'}
                  {dosaStep === 2 && '3. FLIP TO CRISPY PERFECTION!'}
                  {dosaStep === 3 && '4. DELIVER PLATE TO FAYAZ!'}
                  {dosaStep === 4 && 'MAKE ANOTHER DOSA (FAYAZ IS STILL HUNGRY!)'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: ZERO EGO ARGUMENT RESOLVER */}
          {activeTab === 'argument' && (
            <div className="max-w-2xl mx-auto space-y-6 text-left py-2">
              <div className="space-y-1 text-center">
                <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
                  Husband Survival Algorithm
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-ivory">
                  FAYAZ'S ZERO-EGO SIMULATOR
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-gold-light/90">
                  "Ego never stood a chance against his love for her. Pick a wife drama below to see his instant peace reflex!"
                </p>
              </div>

              {/* Complaint Selector Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-ivory/60 uppercase">Pick A Wife Scenario:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {COMPLAINTS.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedComplaint(idx);
                        setReflexShown(true);
                        soundFX.playChime(700 + idx * 100);
                      }}
                      className={`p-3 rounded-xl border text-left text-xs font-serif italic transition-all cursor-pointer ${
                        selectedComplaint === idx
                          ? 'bg-wine-900 border-gold text-gold font-bold shadow-lg'
                          : 'bg-midnight-950/70 hover:bg-midnight-900 border-gold/15 text-ivory/80'
                      }`}
                    >
                      {c.wife}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fayaz Instant Reflex Result */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-wine-900/90 via-midnight-950 to-wine-900/90 border-2 border-gold/40 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-gold/15 pb-2 text-xs font-mono">
                  <span className="text-gold font-bold">Fayaz's Brain Computation:</span>
                  <span className="text-emerald-400 font-bold">Ego: 0.00% | Love: 1000%</span>
                </div>

                <p className="font-serif italic text-base sm:text-lg text-ivory font-bold leading-relaxed">
                  {COMPLAINTS[selectedComplaint].fayazReflex}
                </p>

                <div className="flex items-center gap-2 pt-2 text-xs font-mono text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-none" />
                  <span>{COMPLAINTS[selectedComplaint].verdict}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ANNUAL HUSBAND REPORT CARD */}
          {activeTab === 'report' && (
            <div className="max-w-2xl mx-auto space-y-6 text-center py-2">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
                  Official Netflix Evaluation
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-ivory">
                  FAYAZ'S ANNUAL HUSBAND REPORT CARD
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-gold-light/90">
                  Conducted by Chief Executive Wife (Fazila) for Birthday 2026.
                </p>
              </div>

              {/* Report Card Table */}
              <div className="p-5 rounded-2xl bg-midnight-950/90 border border-gold/30 space-y-3 text-left font-mono text-xs">
                {[
                  { category: 'NICU Caregiver & Heroism', grade: 'SSS+', note: '11 sleepless days holding baby Zayyan & Fazi' },
                  { category: 'Hot Dosa Appreciation', grade: 'A+++', note: 'Never leaves a single crumb behind' },
                  { category: 'Winning Games Against Competitive Fazi', grade: 'F-', note: 'Wisely surrendered to stay alive' },
                  { category: 'Cat Videos vs Paying Attention', grade: 'B-', note: 'Suspiciously obsessed with kittens' },
                  { category: 'Saying "Paathukkalaam"', grade: '100/100', note: 'Solves 99.9% of all life problems' },
                  { category: 'Overall Husband Rating', grade: 'PERFECT', note: 'Subscription automatically renewed for life' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gold/10 last:border-b-0">
                    <div className="space-y-0.5">
                      <span className="text-ivory font-bold">{row.category}</span>
                      <p className="text-[10px] text-ivory/50 font-serif italic">{row.note}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-gold text-midnight-950 font-bold text-xs">
                      {row.grade}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-emerald-950/80 border border-emerald-500/30 rounded-xl text-emerald-300 font-mono text-xs">
                ✓ CERTIFIED BEST HUSBAND & SUPER DAD • NO REFUNDS OR CANCELLATIONS ACCEPTED
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
