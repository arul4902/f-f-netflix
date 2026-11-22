import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, 
  Download, Copy, Check, Sparkles, Disc, Music2, Heart,
  Info, Mic2, Radio, Award
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface SongVerse {
  id: string;
  label: string;
  tag: string;
  tamilLines: string[];
  englishMeaning: string[];
  storyContext: string;
  assetHint?: string;
}

const SONG_VERSES: SongVerse[] = [
  {
    id: 'intro',
    label: 'Intro',
    tag: 'The Instagram Hi',
    tamilLines: [
      'ஒரு ஹாய் சொல்லி ஆரம்பிச்ச கதை',
      'இன்னைக்கு நம் வாழ்க்கையா மாறியதே',
      'முகம் பார்க்காம பழகிய நட்பு',
      'மெல்ல காதலா பூத்ததே...'
    ],
    englishMeaning: [
      'A story that began with a single "Hi",',
      'Has now transformed into our entire lifetime.',
      'A friendship built without ever seeing each other\'s face,',
      'Quietly blossomed into eternal love...'
    ],
    storyContext: '18 August 2017: A private Instagram account with a peace sign profile picture sent a request. She almost rejected it — but destiny had other plans.'
  },
  {
    id: 'verse-1',
    label: 'Verse 1',
    tag: 'Dimple & Dosa',
    tamilLines: [
      'ஆகஸ்ட் பதினெட்டு, அந்த நாளிலே',
      'தொடங்கியது நம் கதை மெதுவாகவே',
      'நீலச் சட்டையில் வந்த அந்த முகம்',
      'ஒரு ஹாய் சொல்லி நெருங்கிய உறவு',
      'என் ஓவியத்தில் உன் ரசனை',
      'என் கன்னக்குழியில் உன் கவனம்',
      'அதை வைத்து என்னைக் கண்டுபிடித்தாய்',
      'சிரிக்கச் சொல்லி மனதில் நின்றாய்',
      '“இந்த தோசை எனக்குக் கிடைச்சா போதும் வாழ்நாள் முழுக்க” என்றாய் சிரிப்போடு',
      '“கிடைக்கும், கிடைக்கும்” என்ற என் பதில் நம் காதலுக்கு முதல் ஒப்புதல்!'
    ],
    englishMeaning: [
      'On that fateful eighteenth of August, our story gently began.',
      'That face arriving in a blue shirt, drawing close with a humble "Hi".',
      'Your sincere appreciation for my sketches, your eyes captivated by my dimple.',
      'You identified me through that dimple, asking me to smile and settling forever in my heart.',
      '"If only I could get this hot crispy dosa for a lifetime..." you bargained with laughter.',
      '"You will get it... you surely will!" was my answer — our love\'s very first vow!'
    ],
    storyContext: 'First meeting at the restaurant where hot dosas turned into a lifetime marriage contract, and Fayaz spotted her across the room using only her smile dimple.'
  },
  {
    id: 'chorus',
    label: 'Chorus',
    tag: 'USURA Theme',
    tamilLines: [
      'உசுரா... என் உசுரா...',
      'உன் சிரிப்பில் தொலைஞ்சேனே உசுரா',
      'சண்டை வந்தாலும், சிரிப்பு வந்தாலும்',
      'என் பக்கம் நீதானே எப்போதும்',
      'உசுரா... என் உசுரா...',
      'உன் கூட வாழ்வதே என் ஆசைதானே',
      'நாளும் மாறலாம், நம் பாதை மாறலாம்',
      'நம் காதல் மட்டும் மாறாதே!'
    ],
    englishMeaning: [
      'Usura... my very breath, my soul...',
      'I lost myself entirely in your gentle smile.',
      'Through heated arguments or uncontrollable laughter,',
      'It is always you standing by my side.',
      'Usura... my life, my heart...',
      'Walking through this world with you is my only desire.',
      'Days may change, seasons may turn,',
      'Yet our love will remain unshakable forever!'
    ],
    storyContext: 'The core melody and emotional anchor. "USURA" is Fazila\'s sacred term of endearment for Fayaz — representing soul, life, and home.'
  },
  {
    id: 'verse-2',
    label: 'Verse 2',
    tag: '4,000 KM & Marina',
    tamilLines: [
      'சவுதியில் நீ, ஈரோட்டில் நான்',
      'தூரம் இருந்தும் குறையாத காதல்',
      '“ஆமா ஃபஸி, நான் உன்னைக் காதலிக்கிறேன்”',
      'உன் குரல் கேட்டதும் மலர்ந்தது மனம்',
      'பிறந்தநாள் அன்று மெரினா ஓரம்',
      'நேரில் பார்த்த அந்த முதல் நேரம்',
      'ஐஸ்கிரீம், திருக்குர்ஆன் பரிசு',
      'கைகோர்த்த நொடி மறக்காத நினைவு',
      'அரைமணி நேரம், பேருந்துப் பயணம்',
      'சின்னச் சண்டையில் பெரிய சமாதானம்',
      'எதிர்ப்புகள் எல்லாம் தாண்டி வந்தோம்',
      'நம் காதலுக்குச் சம்மதம் பெற்றோம்!'
    ],
    englishMeaning: [
      'You were in Saudi Arabia, I was in Erode — 4,000 km between us,',
      'Yet distance never diminished our devotion.',
      '"Yes Fazi, I love you," your voice whispered at Perima\'s house, melting my heart.',
      'On my birthday by the shores of Marina Beach, we met in person.',
      'Sharing ice cream, receiving the Holy Quran, intertwining our hands forever.',
      'That precious half-hour bus journey, resolving petty fights with quiet warmth.',
      'We conquered every resistance and family hurdle, earning our families\' blessings!'
    ],
    storyContext: 'Six years of long-distance calls across Saudi Arabia, the sacred gift of the Quran at Marina Beach, and overcoming family hesitation with unyielding patience.'
  },
  {
    id: 'verse-3',
    label: 'Verse 3',
    tag: 'Wedding & NICU Warrior',
    tamilLines: [
      'மார்ச் இருபத்திரண்டு நிச்சயமானது',
      'ஜூன் நான்கில் வாழ்க்கை இணைந்தது',
      'தடைகள் வந்தும் தளராமல் நின்றோம்',
      'ஒரே மேடையில் கனவுகள் கண்டோம்',
      'சமையல், வீட்டு வேலை, உன் குறும்பு',
      'எல்லாத்திலும் இருக்குது உன் அன்பு',
      'பூவும் பரிசும் சின்ன ஆச்சரியம்',
      'உன்னோடு வாழ்க்கையே கொண்டாட்டம்',
      'நம் மகன் வருகைக்காக காத்திருந்தோம்',
      'பதினொரு நாளும் மனதோடு போராடினோம்',
      '“ஒன்னும் ஆகாது, நான் இருக்கேன்” என்றாய்',
      'அந்த நம்பிக்கையால் நாட்களைக் கடந்தோம்!'
    ],
    englishMeaning: [
      'Engaged on March 22, bound in sacred matrimony on June 4, 2023.',
      'Unyielding against all odds, stepping onto our wedding stage as one.',
      'Cooking meals, chores, playful banter — your love shines in every detail.',
      'Surprise flowers and quiet gifts make everyday life a celebration.',
      'Then we awaited the arrival of our precious son, baby Zayyan.',
      'For eleven agonizing days in the NICU, our hearts fought alongside him.',
      '"Nothing will happen, I am right here," you promised through the sleepless nights,',
      'And through your unwavering faith, our 1.6 kg warrior came home!'
    ],
    storyContext: 'June 4, 2023 wedding in Pallapatti followed by the intense trial of Zayyan\'s 11-day NICU recovery where Fayaz proved his heroic devotion as husband and father.'
  },
  {
    id: 'bridge',
    label: 'Bridge',
    tag: 'Paathukkalaam',
    tamilLines: [
      'என் கனவுகளுக்கு துணையாய் நின்றாய்',
      'என் வேலைக்கும் ஊக்கமாய் இருந்தாய்',
      'என் கனவு மையம் உருவாக உதவினாய்',
      'நம் வீட்டில் புதுவாழ்வு தொடங்கினாய்',
      'சில நாள் சிரிப்பு, சில நாள் சோதனை',
      'எதுவந்தாலும் உன்னோடு பயணமே',
      '“பாத்துக்கலாம், நான் உன்கூட இருக்கேன்”',
      'இந்த வார்த்தை போதும், உன்னை நம்புகிறேன்!'
    ],
    englishMeaning: [
      'You became the backbone for my career and deepest dreams.',
      'Encouraging my professional growth, helping establish my dream center.',
      'Building our warm new beginning in our Chennai home.',
      'Some days bring pure laughter, some days bring trials,',
      'Yet whatever arrives, walking with you is my greatest joy.',
      '"Paathukkalaam... I am here with you,"',
      'This single phrase gives me all the strength in the world!'
    ],
    storyContext: 'Fayaz\'s signature life motto "Paathukkalaam" (We will take care of it) and his relentless support for Fazila\'s independence, dreams, and their Chennai home.'
  },
  {
    id: 'final-chorus',
    label: 'Grand Finale',
    tag: 'Hand In Hand',
    tamilLines: [
      'உசுரா... என் உசுரா...',
      'உன் சிரிப்பில் தொலைஞ்சேனே உசுரா',
      'என் பலமும் நீதான், என் துணையும் நீதான்',
      'என் வாழ்க்கை முழுக்க உன் அன்புதான்',
      'உசுரா... என் உசுரா...',
      'நம் மகன் சிரிப்பில் நம் கனவு மலர',
      'நேற்றும் இன்றும் நாளையும் கூட',
      'உன் கையைப் பிடித்தே நடக்கணும்!'
    ],
    englishMeaning: [
      'Usura... my soul, my heartbeat...',
      'In your laughter, I found my sanctuary.',
      'You are my strength, my confidant, my eternal protector.',
      'Every breath of my life belongs to your love.',
      'Watching our dreams blossom in baby Zayyan\'s innocent smile,',
      'Yesterday, today, tomorrow, and into eternity,',
      'I only want to walk holding your hand!'
    ],
    storyContext: 'A husband, father, and soulmate celebrated on his birthday with Fazila\'s eternal pledge of love.'
  },
  {
    id: 'outro',
    label: 'Outro',
    tag: 'Our Little World',
    tamilLines: [
      'ஒரு ஹாய் சொல்லி ஆரம்பிச்ச கதை',
      'இன்னும் முடியாத அழகான பயணம்',
      'நீயும் நானும், நம் குட்டி உலகம்',
      'இதுவே போதும்... இதுவே போதும்...'
    ],
    englishMeaning: [
      'A love story that began with a single "Hi",',
      'An endless, beautiful cinematic voyage.',
      'Just you, me, and our precious little universe.',
      'This is all my heart will ever need...'
    ],
    storyContext: 'A love story that never stopped streaming.'
  }
];

export const SongifySection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(239); // ~3:59 default
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [activeVerseId, setActiveVerseId] = useState('chorus');
  const [lyricsLanguage, setLyricsLanguage] = useState<'both' | 'tamil' | 'english'>('both');
  const [copiedLyrics, setCopiedLyrics] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.loop = isLooping;
    }
  }, [volume, isMuted, isLooping]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      const nextTime = Math.min(Math.max(audioRef.current.currentTime + seconds, 0), duration);
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
      soundFX.playChime(seconds > 0 ? 1200 : 700);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    soundFX.playChime(isPlaying ? 600 : 900);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${String(remainder).padStart(2, '0')}`;
  };

  const handleCopyLyrics = () => {
    const allLyricsText = SONG_VERSES.map(v => 
      `[${v.label} - ${v.tag}]\n${v.tamilLines.join('\n')}\n\nMeaning:\n${v.englishMeaning.join('\n')}`
    ).join('\n\n---\n\n');

    navigator.clipboard.writeText(allLyricsText).then(() => {
      setCopiedLyrics(true);
      soundFX.playChime(1400);
      setTimeout(() => setCopiedLyrics(false), 2500);
    }).catch(() => {});
  };

  const currentVerse = SONG_VERSES.find(v => v.id === activeVerseId) || SONG_VERSES[2];

  return (
    <section id="our-song" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-midnight-950 via-[#180F22] to-midnight-950 overflow-hidden w-full">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src="/assets/songify-our-song.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current?.duration) setDuration(audioRef.current.duration);
        }}
        onEnded={() => {
          if (!isLooping) setIsPlaying(false);
        }}
        preload="metadata"
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] rounded-full bg-berry/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-gold/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10 sm:space-y-14">
        {/* SECTION HEADER: SONGIFY SPECIAL RELEASE */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-wine-900/90 via-berry/60 to-wine-900/90 border border-gold/40 shadow-lg shadow-gold/10">
            <Sparkles className="w-4 h-4 text-gold animate-spin-slow" />
            <span className="font-mono text-[10px] sm:text-xs text-gold uppercase tracking-[0.25em] font-semibold">
              Songify Original Master Soundtrack
            </span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-ivory tracking-tight drop-shadow-md">
            THE SOUNDTRACK OF US: <span className="text-shimmer-gold">"USURA"</span>
          </h2>

          <p className="font-serif italic text-sm sm:text-base md:text-lg text-gold-light/95 leading-relaxed max-w-2xl mx-auto">
            "A custom song crafted by Songify — every lyric is woven from their true love story, from that unexpected Instagram 'Hi' to becoming each other's forever."
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1 text-[11px] sm:text-xs font-mono text-ivory/60">
            <span className="px-2.5 py-0.5 rounded-md bg-midnight-900/90 border border-gold/20">
              🎤 Vocals & Story: Fazila & Fayaz
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-midnight-900/90 border border-gold/20">
              ⚡ Created with Songify
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-midnight-900/90 border border-gold/20 text-gold">
              Birthday Edition 2026
            </span>
          </div>
        </div>

        {/* MAIN INTERACTIVE CONSOLE: TURNTABLE ON LEFT, KARAOKE ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LEFT COLUMN: THE INTERACTIVE VINYL TURNTABLE PLAYER (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#23152B] to-[#120B19] border border-gold/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden flex flex-col items-center">
            
            {/* Top Player Badges */}
            <div className="w-full flex items-center justify-between border-b border-gold/15 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gold font-bold">
                  Dolby Atmos Vinyl Master
                </span>
              </div>
              <span className="font-mono text-[10px] text-ivory/50">33⅓ RPM</span>
            </div>

            {/* Realistic Vinyl Record & Tone-arm Container */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2 select-none">
              
              {/* Outer Vinyl Disc */}
              <div 
                className={`relative w-full h-full rounded-full bg-[#0c0910] border-4 border-[#241a2f] shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden transition-transform duration-700 ease-linear ${
                  isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                }`}
                style={{
                  backgroundImage: `
                    radial-gradient(circle at center, transparent 38%, rgba(201,155,114,0.12) 39%, transparent 40%),
                    radial-gradient(circle at center, transparent 48%, rgba(255,255,255,0.06) 49%, transparent 50%),
                    radial-gradient(circle at center, transparent 58%, rgba(201,155,114,0.1) 59%, transparent 60%),
                    radial-gradient(circle at center, transparent 68%, rgba(255,255,255,0.05) 69%, transparent 70%),
                    radial-gradient(circle at center, transparent 78%, rgba(201,155,114,0.08) 79%, transparent 80%),
                    radial-gradient(circle at center, transparent 88%, rgba(255,255,255,0.04) 89%, transparent 90%)
                  `
                }}
              >
                {/* Center Record Label / Custom Album Cover */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-gold/60 overflow-hidden relative shadow-inner">
                  <img
                    src="/assets/songify-cover.jpg"
                    alt="Fazila & Fayaz Songify Cover"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to wedding stage image if cover not found
                      (e.target as HTMLImageElement).src = '/assets/wedding-stage.jpeg';
                    }}
                  />
                  {/* Center Spindle Hole */}
                  <div className="absolute inset-0 m-auto w-3.5 h-3.5 rounded-full bg-midnight-950 border border-gold/80 shadow-md" />
                  
                  {/* Album Title Ring */}
                  <div className="absolute bottom-1 inset-x-0 text-center pointer-events-none">
                    <span className="font-mono text-[7px] uppercase font-bold text-gold drop-shadow bg-midnight-950/80 px-1 rounded">
                      USURA • F²
                    </span>
                  </div>
                </div>

                {/* Groovy Vinyl Light Sheen (Simulated Vinyl Reflection) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-ivory/10 to-transparent pointer-events-none" />
              </div>

              {/* Realistic Animated Tone-arm */}
              <div 
                className="absolute top-2 right-4 w-16 sm:w-20 h-28 sm:h-32 pointer-events-none transition-transform duration-700 ease-out origin-top-right z-20"
                style={{
                  transform: isPlaying ? 'rotate(18deg)' : 'rotate(0deg)'
                }}
              >
                {/* Pivot Mount */}
                <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-zinc-800 border-2 border-gold shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                {/* Tone Arm Metal Rod */}
                <div className="absolute top-4 right-2.5 w-1 h-20 sm:h-24 bg-gradient-to-b from-zinc-300 via-gold/80 to-zinc-400 rounded-full shadow" />
                {/* Stylus Cartridge & Needle */}
                <div className="absolute bottom-3 right-0.5 w-4 h-6 rounded-sm bg-wine-900 border border-gold shadow-md flex items-end justify-center">
                  <div className="w-1 h-1.5 bg-rose-dusty rounded-full mb-0.5" />
                </div>
              </div>
            </div>

            {/* Song Title & Credits */}
            <div className="text-center space-y-1 w-full pt-1">
              <h3 className="font-display font-black text-xl sm:text-2xl text-ivory tracking-tight line-clamp-1">
                USURA (Official Songify Track)
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-gold-light/90">
                Created with Songify for Fazila & Fayaz
              </p>
            </div>

            {/* Live Audio Visualizer Bars */}
            <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-8 px-4">
              {[40, 75, 55, 90, 65, 80, 45, 95, 70, 85, 50, 100, 60, 85, 40, 70].map((h, i) => (
                <span
                  key={i}
                  className="w-1 sm:w-1.5 bg-gradient-to-t from-gold-dark via-gold to-berry rounded-t transition-all duration-150"
                  style={{
                    height: isPlaying ? `${Math.max(12, (h * (0.4 + 0.6 * Math.sin((currentTime * 4) + i))))}%` : '15%',
                    opacity: isPlaying ? 0.95 : 0.3
                  }}
                />
              ))}
            </div>

            {/* Interactive Timeline Scrubber */}
            <div className="w-full space-y-1.5 pt-1">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-midnight-950 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                aria-label="Audio timeline slider"
              />
              <div className="flex justify-between items-center text-[11px] font-mono text-ivory/60 px-0.5">
                <span>{formatTime(currentTime)}</span>
                <span className="text-gold font-bold">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Primary Audio Player Controls */}
            <div className="w-full flex items-center justify-center gap-3 sm:gap-4">
              {/* Skip -10s */}
              <button
                onClick={() => skipTime(-10)}
                className="w-10 h-10 rounded-full bg-midnight-900/80 hover:bg-midnight-950 border border-gold/25 hover:border-gold text-ivory/80 hover:text-gold flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                title="Rewind 10 seconds"
                aria-label="Rewind 10 seconds"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Main Play / Pause Button */}
              <button
                onClick={togglePlay}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-gold to-gold-light hover:brightness-110 text-midnight-950 flex items-center justify-center shadow-xl shadow-gold/25 transform active:scale-90 transition-all cursor-pointer"
                title={isPlaying ? 'Pause Song' : 'Play Song'}
                aria-label={isPlaying ? 'Pause Song' : 'Play Song'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-midnight-950" />
                ) : (
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-midnight-950 ml-1" />
                )}
              </button>

              {/* Skip +10s */}
              <button
                onClick={() => skipTime(10)}
                className="w-10 h-10 rounded-full bg-midnight-900/80 hover:bg-midnight-950 border border-gold/25 hover:border-gold text-ivory/80 hover:text-gold flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                title="Forward 10 seconds"
                aria-label="Forward 10 seconds"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Secondary Controls: Volume, Loop & Actions */}
            <div className="w-full pt-2 border-t border-gold/15 flex items-center justify-between text-xs text-ivory/70">
              {/* Volume Slider & Mute Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-8 h-8 rounded-lg bg-midnight-950/70 hover:bg-midnight-950 text-gold flex items-center justify-center border border-gold/20 cursor-pointer"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-dusty" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 sm:w-20 h-1 bg-midnight-950 rounded appearance-none accent-gold cursor-pointer"
                  aria-label="Volume slider"
                />
              </div>

              {/* Action Buttons: Loop & Download */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLooping(!isLooping)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
                    isLooping 
                      ? 'bg-gold/20 border-gold text-gold font-bold' 
                      : 'bg-midnight-950/60 border-ivory/15 text-ivory/50 hover:text-ivory'
                  }`}
                  title="Toggle Repeat"
                >
                  Loop {isLooping ? 'On' : 'Off'}
                </button>

                <a
                  href="/assets/songify-our-song.mp3"
                  download="Fazila_Fayaz_USURA_Songify.mp3"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-wine-900/60 hover:bg-wine-900 border border-gold/25 text-gold text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  title="Download MP3"
                >
                  <Download className="w-3 h-3" />
                  <span className="hidden sm:inline">Save MP3</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: THE INTERACTIVE KARAOKE LYRICS & STORY EXPERIENCE (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Lyrics View Header with Tabs & Language Switcher */}
            <div className="bg-gradient-to-r from-[#201427] to-[#120B18] border border-gold/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gold/15 pb-3">
                <div className="flex items-center gap-2">
                  <Mic2 className="w-4 h-4 text-gold flex-none" />
                  <span className="font-display font-bold text-sm sm:text-base text-ivory">
                    Song Lyrics & Real Journey
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Language Mode Toggle */}
                  <div className="flex items-center p-0.5 rounded-lg bg-midnight-950/80 border border-gold/20 text-[10px] font-mono">
                    <button
                      onClick={() => setLyricsLanguage('both')}
                      className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                        lyricsLanguage === 'both' ? 'bg-gold text-midnight-950 font-bold shadow' : 'text-ivory/60 hover:text-ivory'
                      }`}
                    >
                      Tamil + Meaning
                    </button>
                    <button
                      onClick={() => setLyricsLanguage('tamil')}
                      className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                        lyricsLanguage === 'tamil' ? 'bg-gold text-midnight-950 font-bold shadow' : 'text-ivory/60 hover:text-ivory'
                      }`}
                    >
                      தமிழ் Only
                    </button>
                    <button
                      onClick={() => setLyricsLanguage('english')}
                      className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                        lyricsLanguage === 'english' ? 'bg-gold text-midnight-950 font-bold shadow' : 'text-ivory/60 hover:text-ivory'
                      }`}
                    >
                      Meaning
                    </button>
                  </div>

                  {/* Copy Lyrics Button */}
                  <button
                    onClick={handleCopyLyrics}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-midnight-950/80 hover:bg-midnight-950 border border-gold/30 text-gold text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer active:scale-95 flex-none"
                    title="Copy All Lyrics"
                  >
                    {copiedLyrics ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Jump Verse Pill Selectors */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
                {SONG_VERSES.map((v) => {
                  const isActive = v.id === activeVerseId;
                  return (
                    <button
                      key={v.id}
                      onClick={() => {
                        setActiveVerseId(v.id);
                        soundFX.playChime(1000);
                      }}
                      className={`flex-none px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-gradient-to-r from-gold to-gold-light text-midnight-950 font-bold shadow-md shadow-gold/20 scale-102'
                          : 'bg-midnight-950/70 text-ivory/60 hover:text-gold border border-gold/15 hover:border-gold/40'
                      }`}
                    >
                      <span>{v.label}</span>
                      <span className="text-[9px] opacity-75 hidden sm:inline">• {v.tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTIVE VERSE KARAOKE DISPLAY CARD */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVerse.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="bg-gradient-to-br from-[#23152B] via-[#150B1B] to-[#100816] border-2 border-gold/40 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden"
              >
                {/* Decorative Top Stamp */}
                <div className="flex items-center justify-between pb-3 border-b border-gold/15">
                  <div className="flex items-center gap-2">
                    <span className="bg-berry text-ivory font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded shadow">
                      {currentVerse.label}
                    </span>
                    <span className="font-display font-bold text-sm sm:text-base text-gold">
                      {currentVerse.tag}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-ivory/40 uppercase tracking-widest">
                    Real Life Memory
                  </span>
                </div>

                {/* Lyrics Display */}
                <div className="space-y-4">
                  {currentVerse.tamilLines.map((line, idx) => (
                    <div 
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-xl bg-midnight-950/60 border border-gold/15 hover:border-gold/50 transition-colors space-y-1"
                    >
                      {/* Tamil Line */}
                      {(lyricsLanguage === 'both' || lyricsLanguage === 'tamil') && (
                        <p className="font-display font-bold text-base sm:text-lg md:text-xl text-ivory tracking-wide leading-relaxed">
                          {line}
                        </p>
                      )}
                      
                      {/* English Meaning Line */}
                      {(lyricsLanguage === 'both' || lyricsLanguage === 'english') && (
                        <p className="font-serif italic text-xs sm:text-sm text-gold-light/90 leading-relaxed">
                          {currentVerse.englishMeaning[idx] || ''}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* "Behind The Song" Story Context Box */}
                <div className="glass-panel p-4 rounded-xl border-l-4 border-l-gold space-y-1 bg-midnight-950/80">
                  <div className="flex items-center gap-1.5 text-gold text-[11px] font-mono uppercase tracking-wider font-semibold">
                    <Info className="w-3.5 h-3.5" />
                    <span>The Real Memory Behind This Verse:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-ivory/85 font-light leading-relaxed">
                    {currentVerse.storyContext}
                  </p>
                </div>

                {/* Bottom Navigation between verses */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-ivory/60 border-t border-gold/15">
                  <button
                    onClick={() => {
                      const idx = SONG_VERSES.findIndex(v => v.id === currentVerse.id);
                      if (idx > 0) setActiveVerseId(SONG_VERSES[idx - 1].id);
                    }}
                    disabled={SONG_VERSES.findIndex(v => v.id === currentVerse.id) === 0}
                    className="hover:text-gold disabled:opacity-30 disabled:hover:text-ivory/60 cursor-pointer"
                  >
                    ← Previous Verse
                  </button>

                  <span className="text-[10px] text-gold/80 font-mono">
                    Verse {SONG_VERSES.findIndex(v => v.id === currentVerse.id) + 1} of {SONG_VERSES.length}
                  </span>

                  <button
                    onClick={() => {
                      const idx = SONG_VERSES.findIndex(v => v.id === currentVerse.id);
                      if (idx < SONG_VERSES.length - 1) setActiveVerseId(SONG_VERSES[idx + 1].id);
                    }}
                    disabled={SONG_VERSES.findIndex(v => v.id === currentVerse.id) === SONG_VERSES.length - 1}
                    className="hover:text-gold disabled:opacity-30 disabled:hover:text-ivory/60 cursor-pointer"
                  >
                    Next Verse →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* SONGIFY PRODUCTION LINER NOTES (Interactive Accordion / Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-midnight-950/80 border border-gold/20 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-wine-900/80 border border-gold/30 flex items-center justify-center text-gold mb-2">
              <Disc className="w-4 h-4" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base text-ivory">
              Songify Composition
            </h4>
            <p className="text-xs text-ivory/70 leading-relaxed font-light">
              Crafted with heartfelt storytelling by Songify for USURA's birthday. The melody combines warm acoustic guitar, soulful piano, and emotional vocals singing their real Tamil memories.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-midnight-950/80 border border-gold/20 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-wine-900/80 border border-gold/30 flex items-center justify-center text-gold mb-2">
              <Heart className="w-4 h-4" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base text-ivory">
              The Meaning of "USURA"
            </h4>
            <p className="text-xs text-ivory/70 leading-relaxed font-light">
              In Tamil, "Usura" translates to "My very breath and soul". Throughout their marriage, this is Fazila's private name for Fayaz — a reminder that he is her sanctuary and heartbeat.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-midnight-950/80 border border-gold/20 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-wine-900/80 border border-gold/30 flex items-center justify-center text-gold mb-2">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base text-ivory">
              Dedicated on His Birthday
            </h4>
            <p className="text-xs text-ivory/70 leading-relaxed font-light">
              "No gift in the world could match the devotion you gave during our 11 days in the NICU, the years of waiting across Saudi, and every 'Paathukkalaam'. Happy Birthday, my love."
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
