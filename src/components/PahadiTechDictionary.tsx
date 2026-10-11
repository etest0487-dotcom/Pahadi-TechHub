import React, { useState } from 'react';
import { Search, BookOpen, Volume2 } from 'lucide-react';
import { GLOSSARY_ITEMS, HERO_ASSETS } from '../data/lessonsData';
import { GlossaryItem, LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { soundEffects, SpeechNarrator } from '../utils/audio';

interface PahadiTechDictionaryProps {
  currentLanguage: LanguageMode;
  onComplete?: () => void;
}

export const PahadiTechDictionary: React.FC<PahadiTechDictionaryProps> = ({
  currentLanguage,
  onComplete,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hardware' | 'software' | 'internet' | 'troubleshoot'>('all');
  const [speakingItemId, setSpeakingItemId] = useState<string | null>(null);

  const t = UI_TRANSLATIONS.dictionary;

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2 && onComplete) {
      onComplete();
    }
  };

  const filteredItems = GLOSSARY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.techTerm.toLowerCase().includes(q) ||
      item.metaphorName[currentLanguage].toLowerCase().includes(q) ||
      item.explanation[currentLanguage].toLowerCase().includes(q) ||
      item.technicalDef[currentLanguage].toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleSpeak = (item: GlossaryItem) => {
    soundEffects.playClick();
    if (onComplete) {
      onComplete();
    }
    if (speakingItemId === item.id) {
      SpeechNarrator.stop();
      setSpeakingItemId(null);
    } else {
      setSpeakingItemId(item.id);
      const narration = `${item.techTerm}. ${item.metaphorName[currentLanguage]}. ${item.explanation[currentLanguage]}. ${item.realWorldExample[currentLanguage]}`;
      const langCode = currentLanguage === 'english' ? 'en-US' : 'hi-IN';
      SpeechNarrator.speak(
        narration,
        () => {
          setSpeakingItemId(null);
        },
        langCode
      );
    }
  };

  const categoryOptions = [
    {
      id: 'all' as const,
      label: currentLanguage === 'english' ? 'All Terms' : 'सभी शब्द',
    },
    {
      id: 'hardware' as const,
      label: currentLanguage === 'english' ? 'Hardware (Utensils)' : 'हार्डवेयर (केतली-तवा)',
    },
    {
      id: 'software' as const,
      label: currentLanguage === 'english' ? 'Software (Aroma & Taste)' : 'सॉफ्टवेयर (खुशबू-स्वाद)',
    },
    {
      id: 'internet' as const,
      label: currentLanguage === 'english' ? 'Internet & Cloud' : 'इंटरनेट (डाकघर-क्लाउड)',
    },
  ];

  return (
    <section id="dictionary" className="w-full bg-slate-900 py-16 border-b border-slate-800 text-slate-100">
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

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder[currentLanguage]}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Mascot & Category Filters Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-8">
          
          {/* Mascot Teacher Badge */}
          <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4 shadow-sm">
            <img
              src={HERO_ASSETS.mascot}
              alt="Pahadi Tech Teacher Guide"
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/60 shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-xs font-bold text-amber-200">
                {t.adviceBubble.title[currentLanguage]}
              </p>
              <p className="text-[11px] text-slate-300 leading-snug">
                {t.adviceBubble.text[currentLanguage]}
              </p>
            </div>
          </div>

          {/* Filter Categories */}
          <div className="lg:col-span-8 flex flex-wrap gap-2">
            {categoryOptions.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Dictionary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isSpeaking = speakingItemId === item.id;
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 shadow-md hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                      {item.category}
                    </span>
                    <button
                      onClick={() => handleSpeak(item)}
                      className="p-1.5 text-slate-400 hover:text-amber-300 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                      title="उच्चारण व अर्थ सुनें"
                    >
                      <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-400 animate-pulse' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {item.techTerm}
                  </h3>

                  <div className="mt-2 p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs">
                    <span className="text-amber-400 font-semibold block text-[11px] uppercase tracking-wider mb-0.5">
                      {currentLanguage === 'english' ? 'Cultural Metaphor:' : 'पहाड़ी उपमा:'}
                    </span>
                    <p className="text-amber-200 font-medium">
                      "{item.metaphorName[currentLanguage]}"
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {item.explanation[currentLanguage]}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                  <p>
                    <strong className="text-slate-300">
                      {currentLanguage === 'english' ? 'Technical Definition:' : 'तकनीकी परिभाषा:'}
                    </strong>{' '}
                    {item.technicalDef[currentLanguage]}
                  </p>
                  <p>
                    <strong className="text-slate-300">
                      {currentLanguage === 'english' ? 'Daily Life Example:' : 'दैनिक उदाहरण:'}
                    </strong>{' '}
                    {item.realWorldExample[currentLanguage]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>
              {currentLanguage === 'english'
                ? 'No terms found matching your query.'
                : 'कोई शब्द नहीं मिला। कृपया दूसरा शब्द खोजें।'}
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
