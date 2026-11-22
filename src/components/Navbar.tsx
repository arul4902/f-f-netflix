import React, { useState, useEffect } from 'react';
import { Film, Volume2, VolumeX, Menu, X, Heart, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  isPlayingMusic,
  onToggleMusic,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'chapters', label: 'Our Chapters' },
    { id: 'our-song', label: 'Our Song 🎵' },
    { id: 'top-10', label: 'Top 10' },
    { id: 'little-things', label: 'Little Things' },
    { id: 'timeline', label: 'The Timeline' },
    { id: 'finale', label: 'The Finale' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full ${
        scrolled
          ? 'bg-midnight-950/95 backdrop-blur-md border-b border-gold/15 py-2.5 sm:py-3 shadow-2xl'
          : 'bg-gradient-to-b from-midnight-950/95 via-midnight-950/60 to-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 sm:gap-3 text-left group min-h-[44px]"
          aria-label="Go to Home"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-wine-900 to-berry border border-gold/30 flex items-center justify-center shadow-lg group-hover:border-gold transition-colors flex-none">
            <span className="font-display font-extrabold text-gold text-sm sm:text-base tracking-tighter">F²</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-display font-bold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-ivory group-hover:text-gold transition-colors">
                F + F
              </span>
              <span className="text-gold/40 text-xs">|</span>
              <span className="font-serif italic text-[11px] sm:text-xs tracking-wider text-gold-light">
                OUR STORY
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] tracking-widest text-ivory/50 uppercase font-mono hidden md:block">
              Never Stopped Streaming
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 relative min-h-[36px] ${
                  isActive
                    ? 'text-gold font-semibold bg-gold/10 border border-gold/30'
                    : 'text-ivory/70 hover:text-ivory hover:bg-wine-900/30'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Audio + Birthday Tag + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle button with visualizer pulse (Min 44px tap target) */}
          <button
            onClick={onToggleMusic}
            aria-label={isPlayingMusic ? 'Mute ambient soundtrack' : 'Play ambient soundtrack'}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-wine-900/70 border border-gold/25 hover:border-gold/50 text-gold text-xs transition-all duration-300 min-h-[40px] active:scale-95"
            title={isPlayingMusic ? 'Mute Music' : 'Play Ambient Soundtrack'}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-gold animate-pulse flex-none" />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider hidden xs:inline">SOUND</span>
                <span className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-1.5 bg-gold animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-2.5 bg-gold animate-[pulse_0.8s_ease-in-out_infinite_0.2s]" />
                  <span className="w-0.5 h-1 bg-gold animate-[pulse_0.5s_ease-in-out_infinite_0.4s]" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-ivory/50 flex-none" />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-ivory/60 hidden xs:inline">MUTE</span>
              </>
            )}
          </button>

          {/* Birthday Badge (Hidden on small mobile) */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-berry/20 border border-berry/40 text-[11px] text-ivory/90 font-serif italic">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>Birthday Edition</span>
          </div>

          {/* Mobile Menu Button (Min 44x44px tap target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 rounded-lg bg-wine-900/60 border border-gold/25 text-ivory hover:text-gold flex items-center justify-center transition-colors active:scale-95"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[56px] bg-midnight-950/95 backdrop-blur-2xl z-50 flex flex-col justify-between p-6 overflow-y-auto border-t border-gold/20 animate-fade-in">
          <div className="flex flex-col space-y-2 pt-2">
            <span className="text-[10px] font-mono text-gold uppercase tracking-[0.2em] mb-2 px-3">
              Navigation Menu
            </span>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-3 px-4 rounded-xl text-sm uppercase tracking-wider font-medium transition-colors flex items-center justify-between min-h-[48px] ${
                  activeSection === item.id
                    ? 'text-gold bg-wine-900/70 font-semibold border border-gold/30'
                    : 'text-ivory/80 hover:text-ivory hover:bg-wine-900/30'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="w-2 h-2 rounded-full bg-gold" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-gold/15 space-y-3">
            <div className="flex items-center justify-between text-xs text-ivory/60">
              <span className="font-serif italic text-gold-light">Fazila & Fayaz • Birthday Premiere</span>
              <Heart className="w-3.5 h-3.5 text-rose-dusty fill-rose-dusty" />
            </div>
            <p className="text-[11px] font-mono text-ivory/40">
              "A love story that never stopped streaming."
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
