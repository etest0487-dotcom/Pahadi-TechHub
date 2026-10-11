import React, { useState } from 'react';
import { 
  Wind, Waves, Bell, Play, Pause, Volume2, 
  VolumeX, X, Sparkles, Music 
} from 'lucide-react';
import { LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { himalayanSoundscape, SoundscapePreset } from '../utils/himalayanSoundscape';
import { soundEffects } from '../utils/audio';

interface HimalayanSoundscapeControllerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageMode;
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentPreset: SoundscapePreset;
  onSelectPreset: (preset: SoundscapePreset) => void;
}

export const HimalayanSoundscapeController: React.FC<HimalayanSoundscapeControllerProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  isPlaying,
  onTogglePlay,
  currentPreset,
  onSelectPreset,
}) => {
  const [volume, setVolume] = useState<number>(himalayanSoundscape.getVolume());
  const t = UI_TRANSLATIONS.soundscape;

  if (!isOpen) return null;

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    himalayanSoundscape.setVolume(newVol);
  };

  const handleRingBell = () => {
    soundEffects.playClick();
    himalayanSoundscape.strikeTempleBell(523.25);
  };

  const presetsList: {
    id: SoundscapePreset;
    title: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'breeze_bells',
      title: t.presets.breeze_bells.title[currentLanguage],
      desc: t.presets.breeze_bells.desc[currentLanguage],
      icon: Wind,
    },
    {
      id: 'stream',
      title: t.presets.stream.title[currentLanguage],
      desc: t.presets.stream.desc[currentLanguage],
      icon: Waves,
    },
    {
      id: 'temple_chimes',
      title: t.presets.temple_chimes.title[currentLanguage],
      desc: t.presets.temple_chimes.desc[currentLanguage],
      icon: Bell,
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
          aria-label="बंद करें"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md">
            <Music className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {t.panelTitle[currentLanguage]}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.panelSubtitle[currentLanguage]}
            </p>
          </div>
        </div>

        {/* Master Play / Pause Action & Equalizer */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundEffects.playClick();
                onTogglePlay();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                isPlaying
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>{t.pauseBtn[currentLanguage]}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.playBtn[currentLanguage]}</span>
                </>
              )}
            </button>

            {/* Visual Equalizer Animation */}
            {isPlaying && (
              <div className="flex items-center gap-1 h-5 px-2">
                <span className="w-1 bg-amber-400 rounded-full animate-pulse h-3" />
                <span className="w-1 bg-amber-300 rounded-full animate-bounce h-5" />
                <span className="w-1 bg-amber-400 rounded-full animate-pulse h-4" />
                <span className="w-1 bg-amber-200 rounded-full animate-bounce h-2" />
              </div>
            )}
          </div>

          <button
            onClick={handleRingBell}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="पहाड़ी मंदिर की घंटी बजाएं"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>घंटी बजाएं</span>
          </button>
        </div>

        {/* Presets List */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
            ध्वनि का रूप (Soundscape Presets)
          </label>

          <div className="space-y-2">
            {presetsList.map((p) => {
              const isSelected = currentPreset === p.id;
              const IconComp = p.icon;

              return (
                <button
                  key={p.id}
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectPreset(p.id);
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-950 border-amber-400/80 shadow-md ring-1 ring-amber-400/40 text-white'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    <IconComp className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                      {p.title}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {p.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Volume Slider */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              {volume > 0 ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              <span>{t.volumeLabel[currentLanguage]}</span>
            </span>
            <span className="font-mono text-amber-400 font-bold tabular-nums">
              {Math.round(volume * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md"
          >
            पूर्ण (Done)
          </button>
        </div>

      </div>
    </div>
  );
};
