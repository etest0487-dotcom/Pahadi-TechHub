import React from 'react';
import { Languages, Globe } from 'lucide-react';
import { LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { soundEffects } from '../utils/audio';

interface LanguageSelectorProps {
  currentLanguage: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const t = UI_TRANSLATIONS.languageBar;

  const languages: { id: LanguageMode; label: string; sub: string }[] = [
    { id: 'pahadi', label: 'गढ़वाली-पहाड़ी', sub: 'Pahadi (Folk Style)' },
    { id: 'hindi', label: 'सरल हिन्दी', sub: 'Hindi (Clear)' },
    { id: 'english', label: 'English', sub: 'Bilingual Tech' },
  ];

  return (
    <div className="w-full bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-sm sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Language indicator and explanatory hint */}
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Languages className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold text-amber-200">
            {t.label[currentLanguage]}
          </span>
          <span className="hidden md:inline text-slate-400" aria-hidden="true">·</span>
          <span className="hidden md:inline text-slate-400 text-[11px]">
            {t.hint[currentLanguage]}
          </span>
        </div>

        {/* Right: Accessible Segmented Language Switcher */}
        <div className="inline-flex p-1 bg-slate-900 rounded-xl border border-slate-800">
          {languages.map((lang) => {
            const isActive = currentLanguage === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => {
                  soundEffects.playClick();
                  onLanguageChange(lang.id);
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                aria-pressed={isActive}
              >
                <span>{lang.label}</span>
                <span className={`text-[10px] hidden sm:inline ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                  ({lang.id.toUpperCase()})
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
