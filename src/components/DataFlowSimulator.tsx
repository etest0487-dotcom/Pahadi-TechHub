import React, { useState } from 'react';
import { Send, Binary, Cpu, Layers, Monitor } from 'lucide-react';
import { LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { soundEffects } from '../utils/audio';

interface DataFlowSimulatorProps {
  currentLanguage: LanguageMode;
  onComplete?: () => void;
}

export const DataFlowSimulator: React.FC<DataFlowSimulatorProps> = ({
  currentLanguage,
  onComplete,
}) => {
  const [inputText, setInputText] = useState<string>('चाय + मंडुवा');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [flowStep, setFlowStep] = useState<number>(0);
  const [computedOutput, setComputedOutput] = useState<string>('तैयार पहाड़ी नाश्ता! ☕🫓');
  const [binaryStream, setBinaryStream] = useState<string>('01000010 01100001 01101100');

  const t = UI_TRANSLATIONS.dataflow;

  const textToBinary = (str: string): string => {
    return str
      .split('')
      .slice(0, 8)
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const handleRunSimulation = (customInput?: string) => {
    const textToProcess = customInput ?? inputText;
    if (!textToProcess.trim()) return;

    soundEffects.playClick();
    setIsProcessing(true);
    setFlowStep(1);

    const binary = textToBinary(textToProcess);
    setBinaryStream(binary);

    // Step 2: RAM load
    setTimeout(() => {
      soundEffects.playProcessPulse();
      setFlowStep(2);
    }, 600);

    // Step 3: CPU calculate
    setTimeout(() => {
      soundEffects.playProcessPulse();
      setFlowStep(3);
    }, 1300);

    // Step 4: Output render
    setTimeout(() => {
      soundEffects.playSuccess();
      setFlowStep(4);
      setIsProcessing(false);
      if (onComplete) {
        onComplete();
      }

      try {
        if (/^[\d\s+\-*/]+$/.test(textToProcess.trim())) {
          // eslint-disable-next-line no-eval
          const mathResult = Function(`'use strict'; return (${textToProcess})`)();
          setComputedOutput(currentLanguage === 'english' ? `ALU Math Solved = ${mathResult}` : `गणना का हल = ${mathResult}`);
        } else if (textToProcess.includes('चाय') || textToProcess.includes('मंडुवा') || textToProcess.toLowerCase().includes('tea')) {
          setComputedOutput(
            currentLanguage === 'english'
              ? 'Hot Spiced Tea & Steaming Manduwa Flatbread Served! ☕🫓'
              : 'कड़क अदरक चाय और गरमा-गरम मंडुवे की रोटी तैयार! ☕🫓'
          );
        } else {
          setComputedOutput(
            currentLanguage === 'english'
              ? `Output: "${textToProcess}" rendered on display!`
              : `आउटपुट: "${textToProcess}" प्रोसेस होकर स्क्रीन पर प्रस्तुत हुआ!`
          );
        }
      } catch {
        setComputedOutput(`Output: "${textToProcess}"`);
      }
    }, 2000);
  };

  const presets = [
    {
      label: currentLanguage === 'english' ? 'Tea + Manduwa' : 'चाय + मंडुवा',
      val: currentLanguage === 'english' ? 'Chai + Manduwa' : 'चाय + मंडुवा',
    },
    { label: '45 + 55', val: '45 + 55' },
    { label: '12 * 8', val: '12 * 8' },
    {
      label: currentLanguage === 'english' ? 'Hello Friends!' : 'बल दगड्या!',
      val: currentLanguage === 'english' ? 'Hello Friends!' : 'बल दगड्या!',
    },
  ];

  return (
    <section id="dataflow" className="w-full bg-slate-900 py-16 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
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

        {/* Input & Presets Bar */}
        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRunSimulation();
                }}
                placeholder={
                  currentLanguage === 'english'
                    ? 'Type words or math here (e.g. 45 + 55 or Spiced Tea)...'
                    : 'यहाँ शब्द या गणित लिखें (उदा. 45 + 55 या जय बद्री विशाल)...'
                }
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium text-sm transition-colors"
              />
            </div>

            <button
              onClick={() => handleRunSimulation()}
              disabled={isProcessing}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0 whitespace-nowrap"
            >
              <Send className="w-4 h-4" />
              <span>{isProcessing ? t.processing[currentLanguage] : t.sendBtn[currentLanguage]}</span>
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-medium">{t.presetsLabel[currentLanguage]}</span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(p.val);
                  handleRunSimulation(p.val);
                }}
                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time 4-Stage Flow Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Node 1: Input & Binary Conversion */}
          <div className={`p-5 rounded-2xl border transition-all ${
            flowStep === 1
              ? 'bg-slate-950 border-amber-400 ring-2 ring-amber-400/30'
              : flowStep > 1
              ? 'bg-slate-950 border-slate-700'
              : 'bg-slate-950/60 border-slate-800 opacity-70'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-amber-400 font-semibold">
                {currentLanguage === 'english' ? '01 // Binary Encoding' : '01 // इनपुट एनकोडिंग'}
              </span>
              <Binary className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-xs text-slate-400 mb-1">
              {currentLanguage === 'english' ? 'Raw Characters → 8-Bit Stream' : 'रॉ कैरेक्टर → 8-बिट बाइनरी'}
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-mono text-amber-300 break-all tabular-nums">
              {binaryStream}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {currentLanguage === 'english'
                ? 'Computers only interpret 0 (low voltage) and 1 (high voltage).'
                : 'कंप्यूटर केवल 0 (लो वोल्टेज) और 1 (हाई वोल्टेज) समझता है।'}
            </p>
          </div>

          {/* Node 2: RAM Register */}
          <div className={`p-5 rounded-2xl border transition-all ${
            flowStep === 2
              ? 'bg-slate-950 border-cyan-400 ring-2 ring-cyan-400/30'
              : flowStep > 2
              ? 'bg-slate-950 border-slate-700'
              : 'bg-slate-950/60 border-slate-800 opacity-70'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-cyan-400 font-semibold">
                {currentLanguage === 'english' ? '02 // RAM Buffer' : '02 // RAM बफर'}
              </span>
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-xs text-slate-400 mb-1">
              {currentLanguage === 'english' ? 'Active Rolling Platter Buffer' : 'कार्यकारी थाली (DDR5 Register)'}
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300">
              0x7FFEE4A0: DATA_LOAD
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {currentLanguage === 'english'
                ? 'Data held in high-speed capacitive cells ready for immediate CPU dispatch.'
                : 'डाटा बिजली से चार्ज कैपेसिटर में CPU के निर्देश की प्रतीक्षा में है।'}
            </p>
          </div>

          {/* Node 3: CPU ALU Execution */}
          <div className={`p-5 rounded-2xl border transition-all ${
            flowStep === 3
              ? 'bg-slate-950 border-emerald-400 ring-2 ring-emerald-400/30'
              : flowStep > 3
              ? 'bg-slate-950 border-slate-700'
              : 'bg-slate-950/60 border-slate-800 opacity-70'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                {currentLanguage === 'english' ? '03 // CPU (ALU Logic)' : '03 // CPU (ALU + CU)'}
              </span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400 mb-1">
              {currentLanguage === 'english' ? 'Village Elder Arithmetic & Logic' : 'मुखिया जी का लॉजिक व गणना'}
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-300">
              EXECUTE: 4.8 GHz CYCLE
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {currentLanguage === 'english'
                ? 'Logic gates (AND, OR, NOT) calculate result across nanoseconds.'
                : 'लॉजिक गेट्स (AND, OR, NOT) ने गणना पूरी कर दी।'}
            </p>
          </div>

          {/* Node 4: Output Display */}
          <div className={`p-5 rounded-2xl border transition-all ${
            flowStep === 4
              ? 'bg-slate-950 border-amber-300 ring-2 ring-amber-300/30'
              : 'bg-slate-950/60 border-slate-800 opacity-70'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-amber-300 font-semibold">
                {currentLanguage === 'english' ? '04 // Display Output' : '04 // स्क्रीन पर आउटपुट'}
              </span>
              <Monitor className="w-4 h-4 text-amber-300" />
            </div>
            <p className="text-xs text-slate-400 mb-1">
              {currentLanguage === 'english' ? 'Served Final Dish' : 'तैयार परिणाम (परोसी गई चाय)'}
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs font-semibold text-amber-200">
              {computedOutput}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {currentLanguage === 'english'
                ? 'Rendered cleanly on user display monitor.'
                : 'मानव की आंखों के पढ़ने लायक रंगीन स्क्रीन पर प्रस्तुत!'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
