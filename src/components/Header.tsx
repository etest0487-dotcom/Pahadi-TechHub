import React from 'react';
import { Volume2, VolumeX, Flame, Wind } from 'lucide-react';
import { LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { soundEffects } from '../utils/audio';

interface HeaderProps {
  currentLanguage: LanguageMode;
  soundOn: boolean;
  onToggleSound: () => void;
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
  streakCount: number;
  onOpenStreakModal: () => void;
  isSoundscapePlaying: boolean;
  onOpenSoundscapeController: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  soundOn,
  onToggleSound,
  onScrollToSection,
  activeSection,
  streakCount,
  onOpenStreakModal,
  isSoundscapePlaying,
  onOpenSoundscapeController,
}) => {
  const t = UI_TRANSLATIONS;

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            soundEffects.playClick();
            onScrollToSection('hero');
          }}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-lg sm:text-xl font-bold tracking-tight text-amber-100 whitespace-nowrap shrink-0 group-hover:text-amber-300 transition-colors">
            {t.brand[currentLanguage]}
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => {
              soundEffects.playClick();
              onScrollToSection('pipeline');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white cursor-pointer ${
              activeSection === 'pipeline' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            {t.nav.pipeline[currentLanguage]}
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              onScrollToSection('hardware');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white cursor-pointer ${
              activeSection === 'hardware' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            {t.nav.hardware[currentLanguage]}
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              onScrollToSection('dataflow');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white cursor-pointer ${
              activeSection === 'dataflow' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            {t.nav.dataflow[currentLanguage]}
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              onScrollToSection('assembly');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white cursor-pointer ${
              activeSection === 'assembly' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            {t.nav.assembly[currentLanguage]}
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              onScrollToSection('dictionary');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white cursor-pointer ${
              activeSection === 'dictionary' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            {t.nav.dictionary[currentLanguage]}
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              onScrollToSection('badges');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white cursor-pointer ${
              activeSection === 'badges' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            {t.nav.badges[currentLanguage]}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Pahadi Streak Counter Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenStreakModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all cursor-pointer font-bold text-xs shadow-sm"
            title="दैनिक पहाड़ी लगन (Hearth Streak)"
          >
            <Flame className="w-4 h-4 text-orange-400 fill-current animate-pulse" />
            <span className="font-mono tabular-nums">{streakCount}</span>
            <span className="hidden sm:inline text-[11px] text-amber-200">
              {t.streak.badgeText[currentLanguage].split(' ')[0]}
            </span>
          </button>

          {/* Ambient Himalayan Soundscape Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenSoundscapeController();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-sm ${
              isSoundscapePlaying
                ? 'bg-cyan-950/80 border-cyan-400/60 text-cyan-300 ring-2 ring-cyan-400/20'
                : 'bg-slate-900 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600'
            }`}
            title={t.soundscape.tooltip[currentLanguage]}
            aria-label={t.soundscape.toggleBtn[currentLanguage]}
          >
            <Wind className={`w-3.5 h-3.5 ${isSoundscapePlaying ? 'animate-spin-slow text-cyan-300' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">
              {t.soundscape.toggleBtn[currentLanguage]}
            </span>
            {isSoundscapePlaying && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            )}
          </button>

          <button
            onClick={() => {
              onToggleSound();
              soundEffects.playClick();
            }}
            aria-label={soundOn ? 'ध्वनि बंद करें' : 'ध्वनि चालू करें'}
            className="p-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title={soundOn ? 'ध्वनि प्रभाव चालू हैं' : 'ध्वनि प्रभाव बंद हैं'}
          >
            {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onScrollToSection('quiz');
            }}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm hover:shadow"
          >
            {t.nav.quizAction[currentLanguage]}
          </button>
        </div>

      </div>
    </header>
  );
};
