// ==============================================================================
// DEEN — Duas and Adhkar (Fortress of the Muslim) Page
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  Heart,
  Search,
  Bookmark as BookmarkIcon,
  Volume2,
  Share2,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAudio } from '@/context/AudioContext';
import {
  DUA_CATEGORIES,
  AUTHENTIC_DUAS,
  filterDuas
} from '@/services/duaService';
import { toggleFavorite, isFavorite } from '@/services/dbService';
import { DuaItem } from '@/types';

export const Duas: React.FC = () => {
  const { t, language } = useLanguage();
  const { playCustomUrl } = useAudio();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const displayedDuas = filterDuas(selectedCategory, searchQuery);

  useEffect(() => {
    // Check which duas are favorited
    AUTHENTIC_DUAS.forEach(d => {
      isFavorite('dua', d.id).then(fav => {
        if (fav) setFavoriteIds(prev => new Set(prev).add(d.id));
      });
    });
  }, []);

  const handleToggleFavorite = async (dua: DuaItem) => {
    const isFav = await toggleFavorite('dua', dua.id, dua);
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (isFav) next.add(dua.id);
      else next.delete(dua.id);
      return next;
    });
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
          {t('duas')} & Supplications
        </h1>
        <p className="text-xs text-stone-500">
          Hisn al-Muslim & Authentic Sunnah Invocations
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search supplication by topic, keyword, or Arabic..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-xs focus:outline-none focus:border-deen-emerald dark:text-white"
        />
      </div>

      {/* Categories Horizontal Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {DUA_CATEGORIES.map((c) => {
          const isSelected = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl shrink-0 text-xs font-semibold border transition-all ${
                isSelected
                  ? 'bg-deen-emerald text-white border-deen-emerald shadow-sm'
                  : 'bg-white dark:bg-deen-charcoal-card border-emerald-900/10 dark:border-emerald-800/20 text-stone-700 dark:text-stone-300'
              }`}
            >
              {c.name[language === 'ar' ? 'ar' : language === 'hi' ? 'hi' : language === 'gu' ? 'gu' : 'en'] || c.name.en}
            </button>
          );
        })}
      </div>

      {/* Duas List */}
      <div className="space-y-3">
        {displayedDuas.length > 0 ? (
          displayedDuas.map((dua) => {
            const isFav = favoriteIds.has(dua.id);
            return (
              <div
                key={dua.id}
                className="p-4 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-2.5"
              >
                {/* Header Strip */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory">
                      {dua.title[language === 'ar' ? 'ar' : language === 'hi' ? 'hi' : language === 'gu' ? 'gu' : 'en'] || dua.title.en}
                    </h3>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-deen-gold/10 text-deen-gold-dark dark:text-deen-gold-light">
                      Repeat: {dua.repetitionCount}x {dua.isSunnahCount ? '(Sunnah)' : ''}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleToggleFavorite(dua)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isFav
                          ? 'text-rose-500 bg-rose-500/10'
                          : 'text-stone-400 hover:text-rose-500'
                      }`}
                      title="Bookmark Dua"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                <p className="font-arabic text-xl text-right leading-loose text-deen-forest dark:text-deen-ivory my-1" dir="rtl">
                  {dua.arabic}
                </p>

                {/* Transliteration */}
                <p className="text-xs text-stone-500 italic leading-relaxed">
                  "{dua.transliteration}"
                </p>

                {/* Translation Text in Active Language */}
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                  {dua.translations[language === 'ar' ? 'en' : language] || dua.translations.en}
                </p>

                {/* Benefits / References Footer */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="font-mono text-deen-emerald">{dua.reference}</span>
                  {dua.benefits && (
                    <span className="text-[10px] text-deen-gold max-w-[200px] truncate" title={dua.benefits}>
                      {dua.benefits}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-xs text-stone-400">
            No supplications found for your selection.
          </div>
        )}
      </div>
    </div>
  );
};
