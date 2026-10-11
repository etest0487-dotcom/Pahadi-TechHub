import React from 'react';
import { Flame, X, Check, Calendar, Sparkles, Trophy, Award } from 'lucide-react';
import { StreakData, LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { getLocalDateString } from '../utils/streak';

interface PahadiStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakData: StreakData;
  currentLanguage: LanguageMode;
}

export const PahadiStreakModal: React.FC<PahadiStreakModalProps> = ({
  isOpen,
  onClose,
  streakData,
  currentLanguage,
}) => {
  if (!isOpen) return null;

  const t = UI_TRANSLATIONS.streak;

  // Generate last 7 days calendar nodes
  const today = new Date();
  const past7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    const dateStr = getLocalDateString(d);
    const dayName = d.toLocaleDateString(currentLanguage === 'english' ? 'en-US' : 'hi-IN', {
      weekday: 'short',
    });
    const isActive = (streakData.activeDates || []).includes(dateStr);
    const isToday = dateStr === getLocalDateString(today);

    return {
      dateStr,
      dayName,
      dayNumber: d.getDate(),
      isActive,
      isToday,
    };
  });

  const streakMilestones = [
    {
      days: 1,
      title: {
        pahadi: 'चाय की पहली चुस्की (Day 1)',
        hindi: 'आरंभिक चरण (पहला दिन)',
        english: 'First Sip of Chai (Day 1)',
      },
      unlocked: streakData.count >= 1,
    },
    {
      days: 3,
      title: {
        pahadi: 'चूल्हे की स्थिर आंच (Day 3)',
        hindi: 'स्थिर संकल्प (3 दिन)',
        english: 'Steady Hearth Flame (Day 3)',
      },
      unlocked: streakData.count >= 3,
    },
    {
      days: 7,
      title: {
        pahadi: 'पहाड़ का अड़ीक साधक (Day 7)',
        hindi: 'साप्ताहिक महारथी (7 दिन)',
        english: 'Mountain Ascetic (Day 7)',
      },
      unlocked: streakData.count >= 7,
    },
    {
      days: 14,
      title: {
        pahadi: 'बर्फानी तपस्वी (Day 14)',
        hindi: 'अविचल तपस्वी (14 दिन)',
        english: 'Glacier Scholar (Day 14)',
      },
      unlocked: streakData.count >= 14,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl border border-amber-500/40 p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label={t.closeBtn[currentLanguage]}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Flame & Streak Counter Banner */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-xl shrink-0 ring-4 ring-amber-500/20">
            <Flame className="w-9 h-9 fill-current" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {streakData.count}
              </span>
              <span className="text-lg font-bold text-amber-300">
                {t.badgeText[currentLanguage]}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {streakData.isActiveToday
                ? t.todayActive[currentLanguage]
                : t.todayPending[currentLanguage]}
            </p>
          </div>
        </div>

        {/* Subtitle / Cultural Wisdom */}
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          {t.subtitle[currentLanguage]}
        </p>

        {/* 7-Day Visual Mini Calendar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.calendarTitle[currentLanguage]}</span>
            </span>
            <span className="font-mono text-[11px] text-amber-400">
              {t.totalDays[currentLanguage]} {streakData.activeDates?.length || 1}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-1">
            {past7Days.map((d, i) => (
              <div
                key={i}
                className={`p-2 rounded-xl text-center border transition-all flex flex-col items-center justify-between min-h-[64px] ${
                  d.isActive
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-sm'
                    : 'bg-slate-950 border-slate-800/80 text-slate-500'
                } ${d.isToday ? 'ring-2 ring-amber-400' : ''}`}
              >
                <span className="text-[10px] font-semibold uppercase text-slate-400">
                  {d.dayName}
                </span>

                <div className="my-1">
                  {d.isActive ? (
                    <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 shadow">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500 text-[10px] font-mono">
                      {d.dayNumber}
                    </div>
                  )}
                </div>

                <span className="text-[9px] font-mono text-slate-400">
                  {d.isToday ? 'आज' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Milestones Progression */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <h4 className="text-xs font-semibold uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>{t.levelsTitle[currentLanguage]}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {streakMilestones.map((m, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                  m.unlocked
                    ? 'bg-slate-950 border-amber-500/40 text-amber-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                    m.unlocked ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {m.days}d
                  </span>
                  <span className="font-medium text-[11px]">
                    {m.title[currentLanguage]}
                  </span>
                </div>
                {m.unlocked && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
          <span className="font-mono">
            {t.longestStreak[currentLanguage]} {streakData.longestStreak || streakData.count} दिन
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md"
          >
            {t.closeBtn[currentLanguage]}
          </button>
        </div>

      </div>
    </div>
  );
};
