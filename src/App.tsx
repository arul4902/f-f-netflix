import React, { useState, useEffect } from 'react';
import { CinematicIntro } from './components/CinematicIntro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StreamingRow } from './components/StreamingRow';
import { ChapterCard } from './components/ChapterCard';
import { ReplayCard, ChaosCard, FamilyCard } from './components/MomentCards';
import { ChapterModal } from './components/ChapterModal';
import { SongifySection } from './components/SongifySection';
import { BirthdaySurpriseZone } from './components/BirthdaySurpriseZone';
import { Top10Row } from './components/Top10Row';
import { SoundboardRow } from './components/SoundboardRow';
import { SecretLoveVault } from './components/SecretLoveVault';
import { LittleThingsZone } from './components/LittleThingsZone';
import { CinematicTimeline } from './components/CinematicTimeline';
import { FinaleMovie } from './components/FinaleMovie';
import { MediaViewerModal } from './components/MediaViewerModal';
import { AudioPlayer } from './components/AudioPlayer';
import { Footer } from './components/Footer';

import { chaptersData } from './data/chaptersData';
import { replayMoments, chaosMoments, familyMoments } from './data/momentsData';
import { Chapter, MomentCard } from './types';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [mediaViewer, setMediaViewer] = useState<{
    type: 'video' | 'image';
    src: string;
    title: string;
    subtitle?: string;
    caption?: string;
  } | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  const originalSeriesChapters = chaptersData.slice(0, 12);
  const remainingChapters = chaptersData.slice(12);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'chapters', 'our-song', 'birthday-fun', 'top-10', 'little-things', 'timeline', 'finale'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterStory = () => {
    setShowIntro(false);
    setIsPlayingMusic(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenFeaturedWeddingFilm = () => {
    setMediaViewer({
      type: 'video',
      src: '/assets/wedding-cinematic-film.mp4',
      title: 'Our Wedding Film: The Biggest Win',
      subtitle: 'June 4, 2023 • Neelgiri Haneefa Mahal, Pallapatti',
      caption: '"Edho perusa saadhichuttom." Six years of waiting culminated in this day.',
    });
  };

  const handleOpenMoment = (moment: MomentCard) => {
    if (moment.relatedChapterId) {
      const targetChapter = chaptersData.find((c) => c.id === moment.relatedChapterId);
      if (targetChapter) {
        setSelectedChapter(targetChapter);
        return;
      }
    }

    // For image-only moments, view image
    if (moment.imageSrc && !moment.videoSrc) {
      setMediaViewer({
        type: 'image',
        src: moment.imageSrc,
        title: moment.title,
        subtitle: moment.subtitle,
        caption: moment.synopsis,
      });
    }
  };

  const handleExpandVideo = (moment: MomentCard) => {
    if (moment.videoSrc) {
      setMediaViewer({
        type: 'video',
        src: moment.videoSrc,
        title: moment.title,
        subtitle: moment.subtitle,
        caption: moment.synopsis,
      });
    }
  };

  const handleSelectChapterById = (chapterId: string) => {
    const chap = chaptersData.find((c) => c.id === chapterId);
    if (chap) {
      setSelectedChapter(chap);
    }
  };

  const handleNavigateChapter = (direction: 'next' | 'prev') => {
    if (!selectedChapter) return;
    const currentIndex = chaptersData.findIndex((c) => c.id === selectedChapter.id);
    if (direction === 'next' && currentIndex < chaptersData.length - 1) {
      setSelectedChapter(chaptersData[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      setSelectedChapter(chaptersData[currentIndex - 1]);
    }
  };

  const currentChapterIndex = selectedChapter
    ? chaptersData.findIndex((c) => c.id === selectedChapter.id)
    : -1;

  return (
    <div className="relative min-h-screen bg-midnight-900 text-ivory selection:bg-berry selection:text-ivory">
      {/* Cinematic Intro Screen */}
      {showIntro && <CinematicIntro onEnter={handleEnterStory} />}

      {/* Main Experience */}
      {!showIntro && (
        <div className="w-full">
          {/* Navigation */}
          <Navbar
            activeSection={activeSection}
            onNavigate={handleNavigateSection}
            isPlayingMusic={isPlayingMusic}
            onToggleMusic={() => setIsPlayingMusic(!isPlayingMusic)}
          />

          {/* Hero Section */}
          <Hero
            onPlayStory={handleOpenFeaturedWeddingFilm}
            onExploreDetails={() => handleNavigateSection('little-things')}
            onOpenFeaturedChapter={() => {
              const weddingChapter = chaptersData.find((c) => c.id === 'chapter-12');
              if (weddingChapter) setSelectedChapter(weddingChapter);
            }}
          />

          {/* STREAMING ROWS CONTAINER */}
          <main id="chapters" className="space-y-6 md:space-y-10 relative z-10 -mt-6 sm:-mt-10 md:-mt-12">
            {/* ROW 1: THE ORIGINAL SERIES */}
            <StreamingRow
              title="THE ORIGINAL SERIES"
              subtitle="From the first DM to the sacred wedding stage • 12 core episodes"
              tag="Original Production"
            >
              {originalSeriesChapters.map((chapter, idx) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  index={idx}
                  onSelect={(c) => setSelectedChapter(c)}
                />
              ))}
            </StreamingRow>

            {/* CONTINUATION: CHAPTERS 13 - 18 (Life As One) */}
            <StreamingRow
              title="SEASON 2: LIFE AS ONE"
              subtitle="The wedding games, 5 AM talks, our 1.6 kg warrior & Chennai home"
              tag="New Season"
            >
              {remainingChapters.map((chapter, idx) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  index={idx + 12}
                  onSelect={(c) => setSelectedChapter(c)}
                />
              ))}
            </StreamingRow>

            {/* SPECIAL RELEASE: THE DEDICATED SONGIFY SECTION */}
            <SongifySection />

            {/* BIRTHDAY SURPRISE ARCADE & FUN ZONE */}
            <BirthdaySurpriseZone />

            {/* NETFLIX ICONIC TOP 10 COUNTDOWN */}
            <Top10Row />

            {/* ROW 2: THE MOMENTS THAT DESERVE A REPLAY */}
            <StreamingRow
              title="THE MOMENTS THAT DESERVE A REPLAY"
              subtitle="A playful collection of mini memories, bus stop dates & first phone calls"
              tag="Instant Replay"
            >
              {replayMoments.map((moment) => (
                <ReplayCard
                  key={moment.id}
                  card={moment}
                  onSelect={handleOpenMoment}
                  onExpandVideo={handleExpandVideo}
                />
              ))}
            </StreamingRow>

            {/* INTERACTIVE SOUNDBOARD: THE WORDS WE WILL NEVER FORGET */}
            <SoundboardRow />

            {/* ROW 3: LOVE, BUT WITH A LITTLE CHAOS */}
            <StreamingRow
              title="LOVE, BUT WITH A LITTLE CHAOS"
              subtitle="Dimple detective work, competitive brides & breakfast proposals"
              tag="Comedy Special"
            >
              {chaosMoments.map((moment) => (
                <ChaosCard
                  key={moment.id}
                  card={moment}
                  onSelect={handleOpenMoment}
                  onExpandVideo={handleExpandVideo}
                />
              ))}
            </StreamingRow>

            {/* ROW 4: THE PEOPLE WHO MADE US */}
            <StreamingRow
              title="THE PEOPLE WHO MADE US"
              subtitle="Sacred milestones, Zayyan's birthday, and blessings before the Kaaba"
              tag="Heart & Heritage"
            >
              {familyMoments.map((moment) => (
                <FamilyCard
                  key={moment.id}
                  card={moment}
                  onSelect={handleOpenMoment}
                  onExpandVideo={handleExpandVideo}
                />
              ))}
            </StreamingRow>
          </main>

          {/* BONUS EPISODE: FAZI'S PRIVATE BIRTHDAY VAULT */}
          <SecretLoveVault />

          {/* SECTION 7: THE LITTLE THINGS (SCRAPBOOK ZONE) */}
          <LittleThingsZone />

          {/* SECTION 8: CHRONOLOGICAL TIMELINE */}
          <CinematicTimeline onSelectChapterById={handleSelectChapterById} />

          {/* SECTION 9: THE FINAL FEATURED MOVIE — USURA */}
          <FinaleMovie
            onReplay={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setShowIntro(true);
            }}
          />

          {/* Footer */}
          <Footer
            onScrollToTop={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* Chapter Detail Overlay Modal — Top-level Portal */}
      <ChapterModal
        chapter={selectedChapter}
        onClose={() => setSelectedChapter(null)}
        onNavigateChapter={handleNavigateChapter}
        hasNext={currentChapterIndex < chaptersData.length - 1}
        hasPrev={currentChapterIndex > 0}
      />

      {/* Media Cinema Modal — Top-level Portal */}
      <MediaViewerModal
        isOpen={!!mediaViewer}
        onClose={() => setMediaViewer(null)}
        media={mediaViewer}
      />

      {/* Persistent Floating Audio Bar */}
      {!showIntro && (
        <AudioPlayer
          isPlaying={isPlayingMusic}
          onTogglePlay={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      )}
    </div>
  );
};
