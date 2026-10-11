import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LanguageSelector } from './components/LanguageSelector';
import { GlobalProgressBar } from './components/GlobalProgressBar';
import { HeroBanner } from './components/HeroBanner';
import { ChaiManduwaPipelineSimulator } from './components/ChaiManduwaPipelineSimulator';
import { HardwareExplorer } from './components/HardwareExplorer';
import { DataFlowSimulator } from './components/DataFlowSimulator';
import { PcAssemblyGame } from './components/PcAssemblyGame';
import { PahadiTechDictionary } from './components/PahadiTechDictionary';
import { PahadiBadges } from './components/PahadiBadges';
import { BadgeUnlockToast } from './components/BadgeUnlockToast';
import { PahadiStreakModal } from './components/PahadiStreakModal';
import { HimalayanSoundscapeController } from './components/HimalayanSoundscapeController';
import { PahadiQuiz } from './components/PahadiQuiz';
import { Footer } from './components/Footer';
import { LanguageMode, LearningProgress, PahadiBadge, StreakData } from './types';
import { PAHADI_BADGES } from './data/badgesData';
import { getInitialStreak, recordActivity } from './utils/streak';
import { himalayanSoundscape, SoundscapePreset } from './utils/himalayanSoundscape';
import { soundEffects } from './utils/audio';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageMode>('pahadi');
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Interactive Learning Progress
  const [learningProgress, setLearningProgress] = useState<LearningProgress>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pahadi_pathshala_progress');
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return {
      pipeline: false,
      hardware: false,
      dataflow: false,
      assembly: false,
      quiz: false,
    };
  });

  // Pahadi Badges Collection State
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pahadi_unlocked_badges');
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return [];
  });

  const [toastBadge, setToastBadge] = useState<PahadiBadge | null>(null);

  // Pahadi Daily Streak State
  const [streakData, setStreakData] = useState<StreakData>(() => getInitialStreak());
  const [isStreakModalOpen, setIsStreakModalOpen] = useState<boolean>(false);

  // Ambient Himalayan Soundscape State
  const [isSoundscapePlaying, setIsSoundscapePlaying] = useState<boolean>(false);
  const [soundscapePreset, setSoundscapePreset] = useState<SoundscapePreset>('breeze_bells');
  const [isSoundscapeModalOpen, setIsSoundscapeModalOpen] = useState<boolean>(false);

  const handleToggleSoundscape = () => {
    if (isSoundscapePlaying) {
      himalayanSoundscape.stop();
      setIsSoundscapePlaying(false);
    } else {
      himalayanSoundscape.start(soundscapePreset);
      setIsSoundscapePlaying(true);
    }
  };

  const handleSelectSoundscapePreset = (preset: SoundscapePreset) => {
    setSoundscapePreset(preset);
    if (isSoundscapePlaying) {
      himalayanSoundscape.start(preset);
    }
  };

  const bumpStreakActivity = () => {
    setStreakData((prev) => {
      const { data, didIncrement } = recordActivity(prev);
      if (didIncrement) {
        soundEffects.playSuccess();
      }
      return data;
    });
  };

  const grantBadge = (badgeId: string) => {
    setUnlockedBadgeIds((prev) => {
      if (prev.includes(badgeId)) return prev;
      const updated = [...prev, badgeId];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('pahadi_unlocked_badges', JSON.stringify(updated));
        } catch {
          // Ignore
        }
      }
      const badgeObj = PAHADI_BADGES.find((b) => b.id === badgeId);
      if (badgeObj) {
        soundEffects.playSuccess();
        setToastBadge(badgeObj);
      }
      return updated;
    });
  };

  const markSectionCompleted = (key: keyof LearningProgress) => {
    bumpStreakActivity();

    setLearningProgress((prev) => {
      if (prev[key]) return prev;
      const updated = { ...prev, [key]: true };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('pahadi_pathshala_progress', JSON.stringify(updated));
        } catch {
          // Ignore
        }
      }
      return updated;
    });

    // Grant corresponding badge
    if (key === 'pipeline') grantBadge('pipeline_master');
    if (key === 'hardware') grantBadge('hardware_legend');
    if (key === 'dataflow') grantBadge('binary_wizard');
    if (key === 'assembly') grantBadge('pc_builder');
    if (key === 'quiz') grantBadge('quiz_champion');
  };

  const handleToggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    soundEffects.setSoundEnabled(nextState);
  };

  const handleLanguageChange = (newLang: LanguageMode) => {
    setCurrentLanguage(newLang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang === 'english' ? 'en' : 'hi';
      if (newLang === 'english') {
        document.title = 'Pahari Computer Pathshala - Learn Architecture via Himalayan Analogies';
      } else {
        document.title = 'पहाड़ी कंप्यूटर पाठशाला - Pahari Computer Pathshala';
      }
    }
  };

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const sections = ['hero', 'pipeline', 'hardware', 'dataflow', 'assembly', 'dictionary', 'badges', 'quiz'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const elem = document.getElementById(sectionId);
        if (elem) {
          const top = elem.offsetTop;
          const height = elem.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 3-Zone Top Bar Navigation with Streak & Ambient Soundscape controls */}
      <Header
        currentLanguage={currentLanguage}
        soundOn={soundOn}
        onToggleSound={handleToggleSound}
        onScrollToSection={scrollToSection}
        activeSection={activeSection}
        streakCount={streakData.count}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
        isSoundscapePlaying={isSoundscapePlaying}
        onOpenSoundscapeController={() => setIsSoundscapeModalOpen(true)}
      />

      {/* Accessible Trilingual Language Toggle Bar */}
      <LanguageSelector
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* Global Interactive Learning Progress Tracker Bar */}
      <GlobalProgressBar
        currentLanguage={currentLanguage}
        progress={learningProgress}
        onNavigate={scrollToSection}
      />

      <main>
        {/* Hero Section */}
        <HeroBanner
          currentLanguage={currentLanguage}
          onStartLearning={() => scrollToSection('pipeline')}
          onExploreHardware={() => scrollToSection('hardware')}
        />

        {/* 01. Chai-Manduwa vs Computer Pipeline Interactive Simulator */}
        <ChaiManduwaPipelineSimulator
          currentLanguage={currentLanguage}
          onComplete={() => markSectionCompleted('pipeline')}
        />

        {/* 02. Computer Hardware Explorer & Cultural Analogies */}
        <HardwareExplorer
          currentLanguage={currentLanguage}
          onComplete={() => markSectionCompleted('hardware')}
        />

        {/* 03. Live Binary & Data Flow Lab */}
        <DataFlowSimulator
          currentLanguage={currentLanguage}
          onComplete={() => markSectionCompleted('dataflow')}
        />

        {/* 04. Assemble-Your-PC Workshop */}
        <PcAssemblyGame
          currentLanguage={currentLanguage}
          onComplete={() => markSectionCompleted('assembly')}
        />

        {/* 05. Pahadi Tech Glossary & Dictionary */}
        <PahadiTechDictionary
          currentLanguage={currentLanguage}
          onComplete={() => {
            bumpStreakActivity();
            grantBadge('dictionary_scholar');
          }}
        />

        {/* 06. Pahadi Badges: Dedicated 'My Collection' (मेरी थाती) Section */}
        <PahadiBadges
          currentLanguage={currentLanguage}
          unlockedBadgeIds={unlockedBadgeIds}
          onNavigateToModule={scrollToSection}
        />

        {/* 07. Knowledge Quiz with Pahadi Praises */}
        <PahadiQuiz
          currentLanguage={currentLanguage}
          onComplete={() => markSectionCompleted('quiz')}
        />
      </main>

      {/* Floating Real-time Badge Unlock Toast */}
      <BadgeUnlockToast
        badge={toastBadge}
        currentLanguage={currentLanguage}
        onClose={() => setToastBadge(null)}
        onViewCollection={() => scrollToSection('badges')}
      />

      {/* Pahadi Streak Detail Modal */}
      <PahadiStreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        streakData={streakData}
        currentLanguage={currentLanguage}
      />

      {/* Himalayan Ambient Soundscape Controller Modal */}
      <HimalayanSoundscapeController
        isOpen={isSoundscapeModalOpen}
        onClose={() => setIsSoundscapeModalOpen(false)}
        currentLanguage={currentLanguage}
        isPlaying={isSoundscapePlaying}
        onTogglePlay={handleToggleSoundscape}
        currentPreset={soundscapePreset}
        onSelectPreset={handleSelectSoundscapePreset}
      />

      {/* Respectful Himalayan Heritage Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onScrollToSection={scrollToSection}
      />
    </div>
  );
}
