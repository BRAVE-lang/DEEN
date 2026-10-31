// ==============================================================================
// DEEN — 99 Names of Allah (Asma ul-Husna) Page
// Classical Scholarly Enumeration with Multilingual Translations
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { Layers, Search, Heart, Share2, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { NAMES_OF_ALLAH, searchDivineNames } from '@/services/namesService';
import { toggleFavorite, isFavorite } from '@/services/dbService';
import { DivineName } from '@/types';
import { IslamicPattern } from '@/components/common/IslamicPattern';

export const NamesOfAllah: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favoriteNumbers, setFavoriteNumbers] = useState<Set<number>>(new Set());
  const [selectedName, setSelectedName] = useState<DivineName | null>(null);

  const displayedNames = searchDivineNames(searchQuery);

  useEffect(() => {
    NAMES_OF_ALLAH.forEach(n => {
      isFavorite('name', String(n.number)).then(fav => {
        if (fav) setFavoriteNumbers(prev => new Set(prev).add(n.number));
      });
    });
  }, []);

  const handleToggleFavorite = async (e: React.MouseEvent, name: DivineName) => {
    e.stopPropagation();
    const isFav = await toggleFavorite('name', String(name.number), name);
    setFavoriteNumbers(prev => {
      const next = new Set(prev);
      if (isFav) next.add(name.number);
      else next.delete(name.number);
      return next;
    });
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
          {t('namesOfAllah')} (Asma ul-Husna)
        </h1>
        <p className="text-xs text-stone-500">
          Classical Sunnah Enumeration (Tirmidhi #3507 / Bukhari #2736)
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, meaning, or number..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-xs focus:outline-none focus:border-deen-emerald dark:text-white"
        />
      </div>

      {/* Grid of Names */}
      <div className="grid grid-cols-2 gap-2.5">
        {displayedNames.map((name) => {
          const isFav = favoriteNumbers.has(name.number);
          return (
            <div
              key={name.number}
              onClick={() => setSelectedName(name)}
              className="p-3.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 hover:border-deen-emerald/40 transition-all shadow-sm cursor-pointer relative group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="w-6 h-6 rounded-lg bg-deen-emerald/10 text-deen-emerald font-mono font-bold text-[10px] flex items-center justify-center">
                  {name.number}
                </span>

                <button
                  onClick={(e) => handleToggleFavorite(e, name)}
                  className={`p-1 transition-colors ${
                    isFav ? 'text-rose-500' : 'text-stone-300 dark:text-stone-600 hover:text-rose-400'
                  }`}
                  title="Favorite"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="text-center my-2">
                <span className="font-arabic text-xl font-bold text-deen-forest dark:text-deen-ivory block leading-normal" dir="rtl">
                  {name.arabic}
                </span>
                <span className="text-xs font-bold text-deen-gold-dark dark:text-deen-gold-light block mt-0.5">
                  {name.transliteration}
                </span>
              </div>

              <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center line-clamp-2 mt-1">
                {name.meaning[language === 'ar' ? 'en' : language] || name.meaning.en}
              </p>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedName && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-3 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-deen-charcoal rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <span className="text-xs font-bold text-deen-emerald">
                Name #{selectedName.number} of 99
              </span>
              <button
                onClick={() => setSelectedName(null)}
                className="text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
              >
                Close
              </button>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-deen-forest to-deen-emerald p-6 text-white text-center shadow-lg border border-emerald-700/30">
              <IslamicPattern opacity={0.1} />
              <span className="font-arabic text-3xl font-extrabold text-deen-gold-accent block leading-loose mb-1" dir="rtl">
                {selectedName.arabic}
              </span>
              <h3 className="text-lg font-bold">{selectedName.transliteration}</h3>
              <p className="text-xs text-emerald-200 mt-1">
                {selectedName.meaning[language === 'ar' ? 'en' : language] || selectedName.meaning.en}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
                Theological Meaning & Explanation
              </h4>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                {selectedName.explanation[language === 'ar' ? 'en' : language] || selectedName.explanation.en}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
              <span className="font-mono text-deen-emerald">{selectedName.quranReference}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
