import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, SkipForward, Flame, 
  Layers, HardDrive, Monitor, Keyboard, CheckCircle2, 
  Sparkles, Coffee, Volume2, Cpu
} from 'lucide-react';
import { PIPELINE_STAGES } from '../data/lessonsData';
import { LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { soundEffects, SpeechNarrator } from '../utils/audio';

interface ChaiManduwaPipelineSimulatorProps {
  currentLanguage: LanguageMode;
  onComplete?: () => void;
}

export const ChaiManduwaPipelineSimulator: React.FC<ChaiManduwaPipelineSimulatorProps> = ({
  currentLanguage,
  onComplete,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'kitchen' | 'circuit'>('kitchen');
  const [currentScenario, setCurrentScenario] = useState<'chai_roti' | 'math_calc' | 'photo_edit'>('chai_roti');
  const [isNarrating, setIsNarrating] = useState<boolean>(false);

  const t = UI_TRANSLATIONS.simulator;

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      const delay = (2400 / simulationSpeed);
      interval = setInterval(() => {
        setActiveStageIndex((prev) => {
          const next = (prev + 1) % PIPELINE_STAGES.length;
          soundEffects.playProcessPulse();
          if (next === PIPELINE_STAGES.length - 1) {
            soundEffects.playChaiWhistle();
          }
          return next;
        });
      }, delay);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, simulationSpeed]);

  useEffect(() => {
    if (activeStageIndex === PIPELINE_STAGES.length - 1 && onComplete) {
      onComplete();
    }
  }, [activeStageIndex, onComplete]);

  const activeStage = PIPELINE_STAGES[activeStageIndex];

  const handleStepForward = () => {
    soundEffects.playClick();
    setIsPlaying(false);
    setActiveStageIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
  };

  const handleReset = () => {
    soundEffects.playClick();
    setIsPlaying(false);
    setActiveStageIndex(0);
  };

  const handleSelectStage = (idx: number) => {
    soundEffects.playClick();
    setIsPlaying(false);
    setActiveStageIndex(idx);
  };

  const handleNarrateStage = () => {
    soundEffects.playClick();
    if (isNarrating) {
      SpeechNarrator.stop();
      setIsNarrating(false);
    } else {
      setIsNarrating(true);
      const textToSpeak = `${activeStage.title[currentLanguage]}. ${activeStage.analogy[currentLanguage]}. ${activeStage.techConcept[currentLanguage]}`;
      const langCode = currentLanguage === 'english' ? 'en-US' : 'hi-IN';
      SpeechNarrator.speak(
        textToSpeak,
        () => {
          setIsNarrating(false);
        },
        langCode
      );
    }
  };

  const scenarios = {
    chai_roti: {
      label: {
        pahadi: 'चाय व मंडुवे की रोटी बणाण',
        hindi: 'चाय व मंडुवे की रोटी बनाना',
        english: 'Brewing Spiced Tea & Manduwa Roti',
      },
      input: {
        pahadi: 'अदरक, चायपत्ती, गुड़, मंडुवे का आटा',
        hindi: 'अदरक, चायपत्ती, गुड़, मंडुवे का आटा',
        english: 'Ginger, tea leaves, jaggery, millet flour',
      },
      process: {
        pahadi: 'चूल्हे पर उबालना व तवे पर सेंकना',
        hindi: 'चूल्हे पर उबालना व तवे पर सेंकना',
        english: 'Simmering over fire & baking flatbread on iron griddle',
      },
      output: {
        pahadi: 'गरम कड़क चाय व देशी घी की रोटी',
        hindi: 'गरम कड़क चाय व देशी घी की रोटी',
        english: 'Steaming hot spiced tea & ghee-brushed roti',
      },
    },
    math_calc: {
      label: {
        pahadi: 'कंप्यूटर मा हिसाब जोड़ण (2 + 2 = 4)',
        hindi: 'कंप्यूटर में गणना (2 + 2 = 4)',
        english: 'Computer Arithmetic (2 + 2 = 4)',
      },
      input: {
        pahadi: 'कीबोर्ड से 2 + 2 टाइप करना',
        hindi: 'कीबोर्ड से 2 + 2 टाइप करना',
        english: 'Typing 2 + 2 on Keyboard',
      },
      process: {
        pahadi: 'CPU का ALU लॉजिक यूनिट जोड़ करद',
        hindi: 'CPU का ALU लॉजिक यूनिट जोड़ करता है',
        english: 'CPU ALU logic unit executes binary addition',
      },
      output: {
        pahadi: 'स्क्रीन पर चमकता "4"',
        hindi: 'मॉनिटर स्क्रीन पर चमकता "4"',
        english: 'Glowing number "4" displayed on screen',
      },
    },
    photo_edit: {
      label: {
        pahadi: 'पहाड़ की सुंदर फोटो खोलण',
        hindi: 'पहाड़ की सुंदर फोटो खोलना',
        english: 'Opening Mountain Landscape Photo',
      },
      input: {
        pahadi: 'माउस से फोटो फाइल पर डबल-क्लिक',
        hindi: 'माउस से फोटो फाइल पर डबल-क्लिक',
        english: 'Double-clicking photo file with mouse',
      },
      process: {
        pahadi: 'SSD से डेटा RAM मा आण व GPU द्वारा रेंडर होण',
        hindi: 'SSD से डाटा निकलकर RAM में आना व GPU द्वारा रेंडर होना',
        english: 'Loading pixel buffer from SSD to RAM and GPU rendering',
      },
      output: {
        pahadi: 'स्क्रीन पर बर्फ से ढकी चोटियां',
        hindi: 'स्क्रीन पर बर्फ से ढकी सुंदर चोटियां',
        english: 'Vivid snow-capped peaks illuminated on display',
      },
    },
  };

  const getStageNodeLabel = (idx: number) => {
    if (currentLanguage === 'english') {
      const labels = ['Input', 'RAM', 'CPU', 'Storage', 'Output'];
      return labels[idx];
    }
    if (currentLanguage === 'hindi') {
      const labels = ['इनपुट', 'रैम', 'सीपीयू', 'कोठार', 'आउटपुट'];
      return labels[idx];
    }
    const labels = ['इनपुट', 'रैम', 'मुखिया CPU', 'कोठार', 'आउटपुट'];
    return labels[idx];
  };

  return (
    <section id="pipeline" className="w-full bg-slate-900 py-16 border-b border-slate-800 text-slate-100">
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

          {/* View Mode Segmented Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex p-1 bg-slate-800 rounded-lg border border-slate-700">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setViewMode('kitchen');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'kitchen'
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {t.modes.kitchen[currentLanguage]}
              </button>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setViewMode('circuit');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'circuit'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {t.modes.circuit[currentLanguage]}
              </button>
            </div>
          </div>
        </div>

        {/* Scenario Picker Strip */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">{t.experimentPickerLabel[currentLanguage]}</span>
          {(['chai_roti', 'math_calc', 'photo_edit'] as const).map((scKey) => (
            <button
              key={scKey}
              onClick={() => {
                soundEffects.playClick();
                setCurrentScenario(scKey);
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                currentScenario === scKey
                  ? 'bg-slate-800 text-amber-300 border-amber-400/40 shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {scenarios[scKey].label[currentLanguage]}
            </button>
          ))}
        </div>

        {/* The Two-Zone Sandbox Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ZONE 1 (Stage Canvas) */}
          <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
            
            {/* Visual Bus Pathway */}
            <div className="relative py-4">
              <div className="absolute top-1/2 left-4 right-4 h-1.5 -translate-y-1/2 bg-slate-800 rounded-full z-0 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    viewMode === 'kitchen' ? 'bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200' : 'bg-gradient-to-r from-cyan-600 via-cyan-400 to-emerald-400'
                  }`}
                  style={{ width: `${((activeStageIndex + 1) / PIPELINE_STAGES.length) * 100}%` }}
                />
              </div>

              {/* 5 Sequential Interactive Nodes */}
              <div className="relative z-10 grid grid-cols-5 gap-2">
                {PIPELINE_STAGES.map((stage, idx) => {
                  const isActive = idx === activeStageIndex;
                  const isCompleted = idx < activeStageIndex;

                  return (
                    <button
                      key={stage.id}
                      onClick={() => handleSelectStage(idx)}
                      className={`flex flex-col items-center group cursor-pointer focus:outline-none transition-all ${
                        isActive ? 'scale-105' : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md ${
                          isActive
                            ? viewMode === 'kitchen'
                              ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20 shadow-amber-500/30'
                              : 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/20 shadow-cyan-500/30'
                            : isCompleted
                            ? 'bg-slate-800 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {idx === 0 && <Keyboard className="w-5 h-5" />}
                        {idx === 1 && <Layers className="w-5 h-5" />}
                        {idx === 2 && <Flame className="w-5 h-5" />}
                        {idx === 3 && <HardDrive className="w-5 h-5" />}
                        {idx === 4 && <Monitor className="w-5 h-5" />}
                      </div>
                      
                      <span className="mt-2 text-[11px] sm:text-xs font-semibold text-center whitespace-nowrap text-slate-200">
                        {idx + 1}. {getStageNodeLabel(idx)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Stage Canvas Visualization */}
            <div className="mt-8 p-6 rounded-xl bg-slate-900/80 border border-slate-800 min-h-[260px] flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {activeStage.statusBadge}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {activeStage.title[currentLanguage]}
                  </span>
                </div>

                <button
                  onClick={handleNarrateStage}
                  className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-medium px-2 py-1 rounded bg-slate-800 border border-slate-700 cursor-pointer"
                  title="इस चरण को सुनें"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isNarrating ? 'animate-pulse text-amber-400' : ''}`} />
                  <span>{isNarrating ? '...' : (currentLanguage === 'english' ? 'Listen' : 'सुनें')}</span>
                </button>
              </div>

              {/* Main Content Transformation */}
              <div className="py-4">
                {viewMode === 'kitchen' ? (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                        <Coffee className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-amber-200">
                          {currentLanguage === 'english' ? 'Himalayan Culinary Metaphor:' : 'पहाड़ी रसोई का सादृश्य:'} {activeStage.kitchenEquivalent[currentLanguage]}
                        </h4>
                        <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                          {activeStage.analogy[currentLanguage]}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300">
                      <strong className="text-amber-400">
                        {currentLanguage === 'english' ? 'Active Scenario:' : 'वर्तमान प्रयोग:'} ({scenarios[currentScenario].label[currentLanguage]}):
                      </strong>{' '}
                      {activeStageIndex === 0 && scenarios[currentScenario].input[currentLanguage]}
                      {activeStageIndex === 1 && (currentLanguage === 'english' ? 'Ingredients held in active kitchen rolling platter (RAM)' : 'काम की थाली (RAM) में कच्चा डाटा तैयार रखा गया है')}
                      {activeStageIndex === 2 && scenarios[currentScenario].process[currentLanguage]}
                      {activeStageIndex === 3 && (currentLanguage === 'english' ? 'Safely stocked inside wooden granary (SSD) for future retrieval' : 'भविष्य के लिए कोठार (SSD) में सहेज लिया गया')}
                      {activeStageIndex === 4 && scenarios[currentScenario].output[currentLanguage]}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-cyan-200">
                          {currentLanguage === 'english' ? 'Computer Architecture Concept:' : 'तकनीकी अवधारणा:'} {activeStage.title.english}
                        </h4>
                        <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                          {activeStage.techConcept[currentLanguage]}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1 text-xs">
                      <span className="text-slate-400">{currentLanguage === 'english' ? 'Hardware Examples:' : 'हार्डवेयर उदाहरण:'}</span>
                      {activeStage.hardwareExamples.map((ex, i) => (
                        <span key={i} className="text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                          {ex[currentLanguage]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Progress and status footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{currentLanguage === 'english' ? `Step ${activeStageIndex + 1} of 5` : `चरण ${activeStageIndex + 1} / 5`}</span>
                <span className="flex items-center gap-1.5 text-amber-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{currentLanguage === 'english' ? 'Signal Active' : 'सिग्नल सक्रिय'}</span>
                </span>
              </div>
            </div>

          </div>

          {/* ZONE 2 (Control Deck) */}
          <div className="lg:col-span-4 bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {t.controlsHeading[currentLanguage]}
              </h3>
              <p className="text-xs text-slate-400">
                {t.controlsSub[currentLanguage]}
              </p>
            </div>

            {/* Play, Step, Reset Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsPlaying(!isPlaying);
                }}
                className={`py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? t.pauseBtn[currentLanguage] : t.playBtn[currentLanguage]}</span>
              </button>

              <button
                onClick={handleStepForward}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              >
                <SkipForward className="w-4 h-4" />
                <span>{t.stepBtn[currentLanguage]}</span>
              </button>

              <button
                onClick={handleReset}
                className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.resetBtn[currentLanguage]}</span>
              </button>
            </div>

            {/* Speed slider */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">{t.speedLabel[currentLanguage]}</span>
                <span className="font-mono text-amber-400 font-bold tabular-nums">
                  {simulationSpeed.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.5"
                value={simulationSpeed}
                onChange={(e) => {
                  soundEffects.playClick();
                  setSimulationSpeed(parseFloat(e.target.value));
                }}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0.5x</span>
                <span>1.0x</span>
                <span>2.0x</span>
              </div>
            </div>

            {/* Core Golden Rule Box */}
            <div className="p-4 bg-gradient-to-br from-amber-950/40 to-slate-900 rounded-xl border border-amber-500/30 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.goldenRuleTitle[currentLanguage]}</span>
              </div>
              <p className="text-amber-100/90 leading-relaxed">
                {t.goldenRuleText[currentLanguage]}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
