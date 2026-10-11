import React, { useEffect } from 'react';
import { Award, Sparkles, X } from 'lucide-react';
import { PahadiBadge, LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';

interface BadgeUnlockToastProps {
  badge: PahadiBadge | null;
  currentLanguage: LanguageMode;
  onClose: () => void;
  onViewCollection: () => void;
}

export const BadgeUnlockToast: React.FC<BadgeUnlockToastProps> = ({
  badge,
  currentLanguage,
  onClose,
  onViewCollection,
}) => {
  useEffect(() => {
    if (badge) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [badge, onClose]);

  if (!badge) return null;

  const t = UI_TRANSLATIONS.badges;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 border-2 border-amber-400 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md text-slate-950 font-bold"
          style={{ backgroundColor: badge.accentColor }}
        >
          <Award className="w-6 h-6 text-slate-950" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.toastUnlocked[currentLanguage]}</span>
          </div>

          <h4 className="text-sm font-bold text-white mt-0.5 truncate">
            {badge.title[currentLanguage]}
          </h4>

          <p className="text-xs text-slate-300 mt-1 line-clamp-2">
            {badge.metaphor[currentLanguage]}
          </p>

          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onViewCollection();
              }}
              className="text-xs font-semibold text-amber-300 hover:text-amber-200 underline cursor-pointer"
            >
              मेरी थाती में देखें
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="बंद करें"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
