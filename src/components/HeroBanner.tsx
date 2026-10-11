import React, { useState } from 'react';
import { Play, Volume2, Coffee, Cpu, MapPin, Heart } from 'lucide-react';
import { HERO_ASSETS, USER_OPENING_QUOTE, CREATOR_PROFILE } from '../data/lessonsData';
import { LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { soundEffects, SpeechNarrator } from '../utils/audio';

interface HeroBannerProps {
  currentLanguage: LanguageMode;
  onStartLearning: () => void;
  onExploreHardware: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentLanguage,
  onStartLearning,
  onExploreHardware,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const t = UI_TRANSLATIONS.hero;

  const handleToggleVoice = () => {
    soundEffects.playClick();
    if (isPlayingAudio) {
      SpeechNarrator.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const textToSpeak = USER_OPENING_QUOTE[currentLanguage];
      const langCode = currentLanguage === 'english' ? 'en-US' : 'hi-IN';
      SpeechNarrator.speak(
        textToSpeak,
        () => {
          setIsPlayingAudio(false);
        },
        langCode
      );
    }
  };

  return (
    <section id="hero" className="relative w-full bg-slate-950 text-slate-100 overflow-hidden py-10 md:py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unboxed Metadata Header (Zero-Pill Compliance) */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-amber-400/90 font-medium tracking-wide mb-4">
          <span>{t.kicker[currentLanguage]}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>बोराआगर, जाडापानी (Boraagar Jarapani)</span>
          </span>
        </div>

        {/* 2-Column Split: Content & Visual Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Opening Quote & Introduction */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
              {t.title[currentLanguage]}
            </h1>

            {/* Featured User Prompt Card with Language Adaptability */}
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-amber-500/30 shadow-xl relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-amber-400" />
                  {t.quoteLabel[currentLanguage]}
                </span>
                
                <button
                  onClick={handleToggleVoice}
                  className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border border-amber-400/30 transition-colors cursor-pointer"
                  title={t.listenBtn[currentLanguage]}
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-pulse text-amber-300' : ''}`} />
                  <span>{isPlayingAudio ? t.stopBtn[currentLanguage] : t.listenBtn[currentLanguage]}</span>
                </button>
              </div>

              {/* Quote in Selected Language */}
              <blockquote className="text-base sm:text-lg text-amber-100 font-medium leading-relaxed italic">
                "{USER_OPENING_QUOTE[currentLanguage]}"
              </blockquote>

              {/* Cross-Language Bridge (Secondary meaning for accessibility) */}
              {currentLanguage !== 'pahadi' ? (
                <p className="mt-3 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                  <span className="text-amber-300/80 font-medium">मूल गढ़वाली-पहाड़ी उद्धरण:</span> "{USER_OPENING_QUOTE.pahadi}"
                </p>
              ) : (
                <p className="mt-3 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                  <span className="text-amber-300/80 font-medium">{t.meaningLabel.pahadi}</span> {USER_OPENING_QUOTE.hindi}
                </p>
              )}

              {/* Creator & Home Location Attribution Card */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
                <div className="flex items-center gap-1.5 text-amber-200">
                  <span className="font-semibold text-white">आनंद कुमार (Anand Kumar)</span>
                  <span className="text-slate-500">·</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>घर: बोराआगर, जाडापानी (Boraagar Jarapani)</span>
                  </span>
                </div>
                <span className="text-[11px] text-amber-400/90 font-medium">
                  पाठशाला संचालक
                </span>
              </div>
            </div>

            {/* Intro paragraph */}
            <p className="text-base text-slate-300 leading-relaxed">
              {t.introDesc[currentLanguage]}
            </p>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onStartLearning();
                }}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{t.runSimBtn[currentLanguage]}</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onExploreHardware();
                }}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>{t.explorePartsBtn[currentLanguage]}</span>
              </button>
            </div>
          </div>

          {/* Right Column: High Fidelity Mountain Tech Artwork */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src={HERO_ASSETS.heroBanner}
                alt="Himalayan Mountain Room with traditional stove, kettle, manduwa bread and modern glowing computer"
                className="w-full h-80 sm:h-96 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/50 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-amber-200">{t.visualBadge.title[currentLanguage]}</p>
                  <p className="text-slate-400 text-[11px]">{t.visualBadge.subtitle[currentLanguage]}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
                    100% RELATABLE
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
