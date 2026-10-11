import React, { useState } from 'react';
import { CheckCircle2, Circle, Sparkles, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { LanguageMode, LearningProgress } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { soundEffects } from '../utils/audio';

interface GlobalProgressBarProps {
  currentLanguage: LanguageMode;
  progress: LearningProgress;
  onNavigate: (sectionId: string) => void;
}

export const GlobalProgressBar: React.FC<GlobalProgressBarProps> = ({
  currentLanguage,
  progress,
  onNavigate,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const t = UI_TRANSLATIONS.progressBar;

  const milestones: {
    key: keyof LearningProgress;
    sectionId: string;
    label: string;
  }[] = [
    { key: 'pipeline', sectionId: 'pipeline', label: t.milestones.pipeline[currentLanguage] },
    { key: 'hardware', sectionId: 'hardware', label: t.milestones.hardware[currentLanguage] },
    { key: 'dataflow', sectionId: 'dataflow', label: t.milestones.dataflow[currentLanguage] },
    { key: 'assembly', sectionId: 'assembly', label: t.milestones.assembly[currentLanguage] },
    { key: 'quiz', sectionId: 'quiz', label: t.milestones.quiz[currentLanguage] },
  ];

  const completedCount = milestones.filter((m) => progress[m.key]).length;
  const percentage = Math.round((completedCount / milestones.length) * 100);
  const isAllComplete = percentage === 100;

  return (
    <aside
      aria-label="Learning progress"
      className="w-full bg-slate-900/95 border-b border-slate-800 shadow-md backdrop-blur-md sticky top-[108px] z-30 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        
        {/* Top Summary Row */}
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Progress title and percentage indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.title[currentLanguage]}</span>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <span className="font-mono font-bold text-white tabular-nums">
                {percentage}%
              </span>
              <span className="text-slate-400 text-[11px]">
                ({completedCount}/{milestones.length} {t.completedSuffix[currentLanguage]})
              </span>
            </div>
          </div>

          {/* Right: Milestone quick pills on desktop & expand toggle on mobile */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5">
              {milestones.map((m) => {
                const isDone = progress[m.key];
                return (
                  <button
                    key={m.key}
                    onClick={() => {
                      soundEffects.playClick();
                      onNavigate(m.sectionId);
                    }}
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      isDone
                        ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                    title={isDone ? 'पूरा हुआ · क्लिक करके देखें' : 'अधूरा · पूरा करने के लिए जाएं'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Circle className="w-3 h-3 text-slate-500" />
                    )}
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors md:hidden cursor-pointer"
              aria-label={isExpanded ? 'प्रगति पट्टी सिकोड़ें' : 'प्रगति पट्टी फैलाएं'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* The Animated Fill Progress Bar */}
        <div className="mt-1.5 w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Mobile Expanded Milestones List */}
        {isExpanded && (
          <div className="pt-2 pb-1 flex flex-wrap gap-1.5 md:hidden">
            {milestones.map((m) => {
              const isDone = progress[m.key];
              return (
                <button
                  key={m.key}
                  onClick={() => {
                    soundEffects.playClick();
                    onNavigate(m.sectionId);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                    isDone
                      ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-950/60 text-slate-400 border border-slate-800'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  ) : (
                    <Circle className="w-2.5 h-2.5 text-slate-500" />
                  )}
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* 100% Completion Celebration Banner */}
        {isAllComplete && (
          <div className="mt-2 p-2 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-emerald-300">
                  {t.congratsTitle[currentLanguage]}
                </span>
                <span className="hidden sm:inline text-emerald-400/80 text-[11px] ml-2">
                  {t.congratsSub[currentLanguage]}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                soundEffects.playClick();
                onNavigate('quiz');
              }}
              className="text-[11px] font-semibold text-emerald-300 hover:text-white underline cursor-pointer shrink-0 ml-2"
            >
              प्रमाण-पत्र देखें
            </button>
          </div>
        )}

      </div>
    </aside>
  );
};
