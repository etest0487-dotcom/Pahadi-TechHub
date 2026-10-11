import React, { useState } from 'react';
import { Cpu, Layers, HardDrive, Image, Zap, CheckCircle2, RotateCcw, Power, Sparkles } from 'lucide-react';
import { ASSEMBLY_PARTS_LIST } from '../data/lessonsData';
import { LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { soundEffects } from '../utils/audio';

interface PcAssemblyGameProps {
  currentLanguage: LanguageMode;
  onComplete?: () => void;
}

export const PcAssemblyGame: React.FC<PcAssemblyGameProps> = ({
  currentLanguage,
  onComplete,
}) => {
  const [installedParts, setInstalledParts] = useState<string[]>([]);
  const [isPoweredOn, setIsPoweredOn] = useState<boolean>(false);

  const t = UI_TRANSLATIONS.assembly;

  const getPartIcon = (id: string) => {
    switch (id) {
      case 'cpu': return Cpu;
      case 'ram': return Layers;
      case 'ssd': return HardDrive;
      case 'gpu': return Image;
      case 'psu': return Zap;
      default: return Cpu;
    }
  };

  const handleInstallPart = (partId: string) => {
    soundEffects.playClick();
    if (!installedParts.includes(partId)) {
      const next = [...installedParts, partId];
      setInstalledParts(next);
      soundEffects.playSuccess();
    }
  };

  const handlePowerOn = () => {
    soundEffects.playChaiWhistle();
    setIsPoweredOn(true);
    if (onComplete) {
      onComplete();
    }
  };

  const handleReset = () => {
    soundEffects.playClick();
    setInstalledParts([]);
    setIsPoweredOn(false);
  };

  const isAllInstalled = installedParts.length === ASSEMBLY_PARTS_LIST.length;

  return (
    <section id="assembly" className="w-full bg-slate-950 py-16 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
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

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 tabular-nums">
              {t.installedLabel[currentLanguage]}: {installedParts.length} / {ASSEMBLY_PARTS_LIST.length}
            </span>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetBtn[currentLanguage]}</span>
            </button>
          </div>
        </div>

        {/* 2-Zone Assembly Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Zone: Motherboard Chassis */}
          <div className={`lg:col-span-7 rounded-2xl border p-6 transition-all relative overflow-hidden ${
            isPoweredOn
              ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 border-emerald-500/50 shadow-2xl ring-2 ring-emerald-500/30'
              : 'bg-slate-900/90 border-slate-800 shadow-xl'
          }`}>
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs uppercase font-mono text-slate-400">
                  {currentLanguage === 'english' ? 'System Chassis (PC Case)' : 'सिस्टम चेसिस (PC Case)'}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {currentLanguage === 'english' ? 'Motherboard Mounting Tray' : 'मदरबोर्ड बेस-प्लेट'}
                </h3>
              </div>

              <div>
                {isPoweredOn ? (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{t.onlineBadge[currentLanguage]}</span>
                  </div>
                ) : isAllInstalled ? (
                  <button
                    onClick={handlePowerOn}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  >
                    <Power className="w-4 h-4" />
                    <span>{t.powerBtn[currentLanguage]}</span>
                  </button>
                ) : (
                  <span className="text-xs text-slate-400">
                    {currentLanguage === 'english'
                      ? 'Install all 5 parts to activate power'
                      : 'सभी 5 पुर्जे लगाने पर पावर बटन खुलेगा'}
                  </span>
                )}
              </div>
            </div>

            {/* Simulated Sockets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ASSEMBLY_PARTS_LIST.map((part) => {
                const isInstalled = installedParts.includes(part.id);
                const IconComponent = getPartIcon(part.id);

                return (
                  <div
                    key={part.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isInstalled
                        ? isPoweredOn
                          ? 'bg-slate-950 border-emerald-500/40 shadow-inner'
                          : 'bg-slate-950 border-amber-500/40'
                        : 'bg-slate-950/50 border-dashed border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-4 h-4 ${isInstalled ? 'text-amber-400' : 'text-slate-600'}`} />
                        <span className={`text-xs font-bold ${isInstalled ? 'text-white' : 'text-slate-500'}`}>
                          {part.name[currentLanguage]}
                        </span>
                      </div>
                      {isInstalled ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500">
                          {currentLanguage === 'english' ? 'Empty Slot' : 'रिक्त सॉकेट'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400">
                      {isInstalled ? (
                        <span className="text-amber-300 font-medium">
                          ✓ {part.metaphorName[currentLanguage]} {currentLanguage === 'english' ? 'seated securely!' : 'सही तरह से लॉक हो गया!'}
                        </span>
                      ) : (
                        <span>
                          {currentLanguage === 'english' ? `Click ${part.name.english} from toolbox` : `दाहिनी ओर से ${part.name[currentLanguage]} चुनें`}
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* On Boot Fanfare Banner */}
            {isPoweredOn && (
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-emerald-500/40 text-center space-y-1">
                <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>{t.bootFanfare.title[currentLanguage]}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {t.bootFanfare.text[currentLanguage]}
                </p>
              </div>
            )}

          </div>

          {/* Right Zone: Parts Toolbox */}
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-white mb-0.5">
                {currentLanguage === 'english' ? 'Component Toolbox' : 'टूलबॉक्स (Toolbox Inventory)'}
              </h3>
              <p className="text-xs text-slate-400">
                {currentLanguage === 'english' ? 'Click a part to seat it into its motherboard slot.' : 'पुर्जे पर क्लिक करें और उसे मदरबोर्ड में लगाएं।'}
              </p>
            </div>

            <div className="space-y-2.5">
              {ASSEMBLY_PARTS_LIST.map((part) => {
                const isInstalled = installedParts.includes(part.id);
                const IconComponent = getPartIcon(part.id);

                return (
                  <button
                    key={part.id}
                    disabled={isInstalled}
                    onClick={() => handleInstallPart(part.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isInstalled
                        ? 'bg-slate-950/60 border-slate-800/80 text-slate-500 cursor-not-allowed opacity-60'
                        : 'bg-slate-950 border-slate-800 hover:border-amber-400/80 hover:bg-slate-950/90 text-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isInstalled ? 'bg-slate-800 text-slate-600' : 'bg-amber-400/10 text-amber-400'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">
                          {part.name[currentLanguage]}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {part.metaphorName[currentLanguage]} · {part.hint[currentLanguage]}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isInstalled ? (
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                          {currentLanguage === 'english' ? 'Installed ✓' : 'लग गया ✓'}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-400 text-slate-950 hover:bg-amber-300">
                          {currentLanguage === 'english' ? 'Install' : 'फिट करो'}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
