import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { HARDWARE_PARTS, HERO_ASSETS } from '../data/lessonsData';
import { HardwarePart, LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { soundEffects, SpeechNarrator } from '../utils/audio';

interface HardwareExplorerProps {
  currentLanguage: LanguageMode;
  onComplete?: () => void;
}

export const HardwareExplorer: React.FC<HardwareExplorerProps> = ({
  currentLanguage,
  onComplete,
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string>('cpu');
  const [exploredParts, setExploredParts] = useState<Set<string>>(new Set(['cpu']));
  const [filterCategory, setFilterCategory] = useState<'all' | 'core' | 'memory' | 'graphics' | 'power'>('all');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const t = UI_TRANSLATIONS.hardware;

  const selectedPart = HARDWARE_PARTS.find((p) => p.id === selectedPartId) || HARDWARE_PARTS[0];

  const filteredParts = filterCategory === 'all'
    ? HARDWARE_PARTS
    : HARDWARE_PARTS.filter((p) => p.category === filterCategory);

  const handleSelectPart = (part: HardwarePart) => {
    soundEffects.playClick();
    setSelectedPartId(part.id);
    const updated = new Set(exploredParts);
    updated.add(part.id);
    setExploredParts(updated);
    if (updated.size >= 2 && onComplete) {
      onComplete();
    }
  };

  const handleNarrate = () => {
    soundEffects.playClick();
    if (isSpeaking) {
      SpeechNarrator.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = `${selectedPart.name[currentLanguage]}. ${selectedPart.metaphorTitle[currentLanguage]}. ${selectedPart.analogy[currentLanguage]}. ${selectedPart.technicalRole[currentLanguage]}`;
      const langCode = currentLanguage === 'english' ? 'en-US' : 'hi-IN';
      SpeechNarrator.speak(
        textToRead,
        () => {
          setIsSpeaking(false);
        },
        langCode
      );
    }
  };

  const filterOptions = [
    { id: 'all' as const, label: t.filterAll[currentLanguage] },
    { id: 'core' as const, label: t.filterCore[currentLanguage] },
    { id: 'memory' as const, label: t.filterMemory[currentLanguage] },
    { id: 'graphics' as const, label: t.filterGraphics[currentLanguage] },
    { id: 'power' as const, label: t.filterPower[currentLanguage] },
  ];

  return (
    <section id="hardware" className="w-full bg-slate-950 py-16 border-b border-slate-800 text-slate-100">
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

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto max-w-full">
            {filterOptions.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEffects.playClick();
                  setFilterCategory(cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  filterCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Diagram & Detailed Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Diagram & Selector (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl relative group">
              <img
                src={HERO_ASSETS.pcDiagram}
                alt="Modular Computer Hardware Components Isometric Diagram"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-slate-900/95 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>{currentLanguage === 'english' ? 'Modular Hardware Layout' : 'मॉड्यूलर हार्डवेयर संरचना'}</span>
                <span className="font-mono text-amber-400 text-[11px]">ISO / ATX STANDARD</span>
              </div>
            </div>

            {/* Quick Part Selector Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredParts.map((part) => {
                const isSelected = part.id === selectedPartId;
                return (
                  <button
                    key={part.id}
                    onClick={() => handleSelectPart(part)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-amber-400/80 shadow-md ring-1 ring-amber-400/50'
                        : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          {part.category}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <p className={`text-xs font-bold leading-snug ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                        {part.name[currentLanguage].split(' ')[0]}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {part.metaphorTitle[currentLanguage]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Selected Component Inspector (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div>
                <span className="text-xs uppercase font-mono text-amber-400 tracking-wider">
                  {currentLanguage === 'english' ? 'Slot / Socket:' : 'सॉकेट / स्लॉट:'} {selectedPart.slotType}
                </span>
                <h3 className="text-2xl font-bold text-white mt-0.5">
                  {selectedPart.name[currentLanguage]}
                </h3>
              </div>

              <button
                onClick={handleNarrate}
                className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold cursor-pointer transition-colors"
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-amber-300' : ''}`} />
                <span>{isSpeaking ? '...' : (currentLanguage === 'english' ? 'Explain Audio' : 'बोलकर समझाएं')}</span>
              </button>
            </div>

            {/* Metaphor Highlight Box */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{currentLanguage === 'english' ? 'Himalayan Metaphor:' : 'पहाड़ी उपमा:'} {selectedPart.metaphorTitle[currentLanguage]}</span>
              </div>
              <p className="text-sm text-amber-100 leading-relaxed italic">
                "{selectedPart.analogy[currentLanguage]}"
              </p>
            </div>

            {/* Technical Role & Plain Explanation */}
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-1">
                  {currentLanguage === 'english' ? 'Technical Role & Architecture' : 'तकनीकी भूमिका (Technical Function)'}
                </h4>
                <p className="leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                  {selectedPart.technicalRole[currentLanguage]}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-1">
                  {currentLanguage === 'english' ? 'Simple Analogy Takeaway' : 'सरल शब्दों में (Simple Takeaway)'}
                </h4>
                <p className="leading-relaxed text-slate-200">
                  {selectedPart.simpleExplanation[currentLanguage]}
                </p>
              </div>
            </div>

            {/* Key Technical Specifications */}
            <div>
              <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">
                {t.specsHeading[currentLanguage]}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedPart.keySpecs.map((spec, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono tabular-nums text-slate-300">
                    {spec}
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Fact */}
            <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2.5">
              <span className="shrink-0 text-sm">💡</span>
              <p className="leading-relaxed">
                <strong className="font-semibold text-emerald-200">{t.funFactLabel[currentLanguage]}</strong> {selectedPart.funFact[currentLanguage]}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
