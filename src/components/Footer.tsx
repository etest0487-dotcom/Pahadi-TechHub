import React from 'react';
import { Coffee, Mountain } from 'lucide-react';
import { LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { soundEffects } from '../utils/audio';

interface FooterProps {
  currentLanguage: LanguageMode;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLanguage,
  onScrollToSection,
}) => {
  const t = UI_TRANSLATIONS;

  return (
    <footer className="w-full bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-850">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base font-bold text-amber-200 flex items-center justify-center md:justify-start gap-2">
              <Mountain className="w-4 h-4 text-amber-400" />
              <span>{t.brand[currentLanguage]}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {t.tagline[currentLanguage]}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400">
            <button
              onClick={() => {
                soundEffects.playClick();
                onScrollToSection('hero');
              }}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {currentLanguage === 'english' ? 'Home' : 'शुरुआत'}
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                onScrollToSection('pipeline');
              }}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {t.nav.pipeline[currentLanguage]}
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                onScrollToSection('hardware');
              }}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {t.nav.hardware[currentLanguage]}
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                onScrollToSection('dataflow');
              }}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {t.nav.dataflow[currentLanguage]}
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                onScrollToSection('assembly');
              }}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {t.nav.assembly[currentLanguage]}
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                onScrollToSection('dictionary');
              }}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {t.nav.dictionary[currentLanguage]}
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                onScrollToSection('badges');
              }}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {t.nav.badges[currentLanguage]}
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                onScrollToSection('quiz');
              }}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {currentLanguage === 'english' ? 'Quiz' : 'क्विज़'}
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>
            {currentLanguage === 'english'
              ? 'Created by Anand Kumar · Home: Boraagar Jarapani, Uttarakhand. Dedicated to all computer enthusiasts.'
              : 'संकल्पना व रचना: आनंद कुमार (Anand Kumar) · घर / निवास: बोराआगर, जाडापानी (उत्तराखंड)।'}
          </p>
          <p className="flex items-center gap-1">
            <span>
              {currentLanguage === 'english' ? 'Crafted with mountain warmth & tea' : 'पहाड़ी प्रेम व चाय के साथ निर्मित'}
            </span>
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
          </p>
        </div>

      </div>
    </footer>
  );
};
