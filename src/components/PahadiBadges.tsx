import React, { useState } from 'react';
import { 
  Award, Lock, CheckCircle2, Sparkles, Coffee, 
  Cpu, Binary, Wrench, BookOpen, X, ArrowRight, Share2 
} from 'lucide-react';
import { PAHADI_BADGES } from '../data/badgesData';
import { PahadiBadge, LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { soundEffects } from '../utils/audio';

interface PahadiBadgesProps {
  currentLanguage: LanguageMode;
  unlockedBadgeIds: string[];
  onNavigateToModule: (sectionId: string) => void;
}

export const PahadiBadges: React.FC<PahadiBadgesProps> = ({
  currentLanguage,
  unlockedBadgeIds,
  onNavigateToModule,
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<PahadiBadge | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const t = UI_TRANSLATIONS.badges;

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return Coffee;
      case 'Cpu': return Cpu;
      case 'Binary': return Binary;
      case 'Wrench': return Wrench;
      case 'BookOpen': return BookOpen;
      case 'Award': return Award;
      default: return Award;
    }
  };

  const getModuleSectionId = (cat: PahadiBadge['category']) => {
    switch (cat) {
      case 'pipeline': return 'pipeline';
      case 'hardware': return 'hardware';
      case 'dataflow': return 'dataflow';
      case 'assembly': return 'assembly';
      case 'dictionary': return 'dictionary';
      case 'quiz': return 'quiz';
      default: return 'hero';
    }
  };

  const filteredBadges = PAHADI_BADGES.filter((badge) => {
    const isUnlocked = unlockedBadgeIds.includes(badge.id);
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'locked') return !isUnlocked;
    return true;
  });

  const totalBadges = PAHADI_BADGES.length;
  const earnedCount = unlockedBadgeIds.length;
  const earnedPercent = Math.round((earnedCount / totalBadges) * 100);

  const handleShareBadge = (badge: PahadiBadge) => {
    soundEffects.playClick();
    const shareText = `मैंने पहाड़ी कंप्यूटर पाठशाला में "${badge.title[currentLanguage]}" बैज अर्जित किया! ${badge.praisePahadi[currentLanguage]}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  return (
    <section id="badges" className="w-full bg-slate-900 py-16 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
              <span>{t.sectionNum[currentLanguage]}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.heading[currentLanguage]}
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              {t.subheading[currentLanguage]}
            </p>
          </div>

          {/* Collection Status Pill & Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono tabular-nums text-slate-300">
              <span className="text-amber-400 font-bold">{earnedCount}</span> / {totalBadges} {t.statsEarned[currentLanguage]} ({earnedPercent}%)
            </div>

            <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800">
              {(
                [
                  { id: 'all' as const, label: t.tabs.all[currentLanguage] },
                  { id: 'unlocked' as const, label: t.tabs.unlocked[currentLanguage] },
                  { id: 'locked' as const, label: t.tabs.locked[currentLanguage] },
                ]
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundEffects.playClick();
                    setFilter(tab.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    filter === tab.id
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.map((badge) => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);
            const IconComponent = getBadgeIcon(badge.icon);

            return (
              <div
                key={badge.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedBadge(badge);
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-amber-500/50 shadow-xl hover:border-amber-400 hover:scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-75 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                {/* Background ambient glow for unlocked badge */}
                {isUnlocked && (
                  <div
                    className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: badge.accentColor }}
                  />
                )}

                <div>
                  {/* Top Badge Icon & Status Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg ${
                        isUnlocked
                          ? 'text-slate-950 font-extrabold'
                          : 'bg-slate-900 text-slate-600 border border-slate-800'
                      }`}
                      style={{
                        backgroundColor: isUnlocked ? badge.accentColor : undefined,
                      }}
                    >
                      {isUnlocked ? (
                        <IconComponent className="w-7 h-7" />
                      ) : (
                        <Lock className="w-6 h-6 text-slate-500" />
                      )}
                    </div>

                    <div>
                      {isUnlocked ? (
                        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>अर्जित (Earned)</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                          LOCKED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Badge Title & Metaphor */}
                  <h3 className={`text-lg font-bold ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                    {badge.title[currentLanguage]}
                  </h3>

                  <p className="text-xs text-amber-300/90 font-medium mt-1">
                    "{badge.metaphor[currentLanguage]}"
                  </p>

                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                    {badge.description[currentLanguage]}
                  </p>
                </div>

                {/* Bottom Requirement or Action */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  {isUnlocked ? (
                    <span className="text-amber-300 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>प्रशस्ति पत्र देखें</span>
                    </span>
                  ) : (
                    <div className="w-full flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 truncate mr-2">
                        {badge.moduleRequirement[currentLanguage]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEffects.playClick();
                          onNavigateToModule(getModuleSectionId(badge.category));
                        }}
                        className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 shrink-0"
                      >
                        <span>जाएं</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Badge Details Modal */}
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl border border-amber-500/40 p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6">
              
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label={t.closeModal[currentLanguage]}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl shrink-0"
                  style={{
                    backgroundColor: unlockedBadgeIds.includes(selectedBadge.id)
                      ? selectedBadge.accentColor
                      : '#334155',
                  }}
                >
                  <Award className="w-8 h-8 text-slate-950" />
                </div>

                <div>
                  <span className="text-[11px] uppercase font-mono tracking-widest text-amber-400">
                    {unlockedBadgeIds.includes(selectedBadge.id)
                      ? t.unlockedBadgeNotice[currentLanguage]
                      : t.lockedBadgeNotice[currentLanguage]}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {selectedBadge.title[currentLanguage]}
                  </h3>
                  <p className="text-xs text-amber-200">
                    "{selectedBadge.metaphor[currentLanguage]}"
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {t.requirementLabel[currentLanguage]}
                  </h4>
                  <p className="leading-relaxed">
                    {selectedBadge.moduleRequirement[currentLanguage]}
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
                    {t.praiseLabel[currentLanguage]}
                  </h4>
                  <p className="text-amber-100 italic leading-relaxed">
                    "{selectedBadge.praisePahadi[currentLanguage]}"
                  </p>
                </div>
              </div>

              {/* Actions in Modal */}
              <div className="flex items-center justify-between pt-2">
                {unlockedBadgeIds.includes(selectedBadge.id) ? (
                  <button
                    onClick={() => handleShareBadge(selectedBadge)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer border border-slate-700"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedNotification ? 'कॉपी हो गया! ✓' : 'प्रशस्ति कॉपी करें'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const secId = getModuleSectionId(selectedBadge.category);
                      setSelectedBadge(null);
                      onNavigateToModule(secId);
                    }}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>मॉड्यूल पूरा करने जाएं</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => setSelectedBadge(null)}
                  className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer border border-slate-800"
                >
                  {t.closeModal[currentLanguage]}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
