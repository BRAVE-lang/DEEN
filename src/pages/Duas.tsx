// ==============================================================================
// DEEN — Duas and Adhkar (Fortress of the Muslim) Page
// Authentic Collections, Translations, Transliterations & Favorites
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  Heart,
  Search,
  Volume2,
  Share2,
  Copy,
  Check,
  BookmarkCheck,
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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const displayedDuas = filterDuas(selectedCategory, searchQuery, favoriteIds);

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

  const handleCopy = (dua: DuaItem) => {
    const textToCopy = `${dua.arabic}\n\n"${dua.transliteration}"\n\n${dua.translations[language === 'ar' ? 'en' : language] || dua.translations.en}\n\n— ${dua.reference}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
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
        {/* All Duas */}
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl shrink-0 text-xs font-semibold border transition-all ${
            selectedCategory === 'all'
              ? 'bg-deen-emerald text-white border-deen-emerald shadow-sm'
              : 'bg-white dark:bg-deen-charcoal-card border-emerald-900/10 dark:border-emerald-800/20 text-stone-700 dark:text-stone-300'
          }`}
        >
          All ({AUTHENTIC_DUAS.length})
        </button>

        {/* Favorites Quick Filter */}
        <button
          onClick={() => setSelectedCategory('favorites')}
          className={`px-3 py-1.5 rounded-xl shrink-0 text-xs font-semibold border transition-all flex items-center gap-1.5 ${
            selectedCategory === 'favorites'
              ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
              : 'bg-white dark:bg-deen-charcoal-card border-emerald-900/10 dark:border-emerald-800/20 text-rose-600 dark:text-rose-400'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Favorites ({favoriteIds.size})</span>
        </button>

        {DUA_CATEGORIES.filter(c => c.id !== 'all').map((c) => {
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
            const isCopied = copiedId === dua.id;
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
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-deen-gold/10 text-deen-gold-dark dark:text-deen-gold-light">
                        Repeat: {dua.repetitionCount}x {dua.isSunnahCount ? '(Sunnah)' : ''}
                      </span>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-stone-100 dark:bg-deen-charcoal text-stone-500 uppercase">
                        {dua.category.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(dua)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-deen-emerald transition-colors"
                      title="Copy Supplication"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>

                    {/* Audio Play Button if available */}
                    {dua.audioUrl && (
                      <button
                        onClick={() => playCustomUrl(dua.audioUrl!, dua.title.en)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-deen-emerald transition-colors"
                        title="Listen to Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}

                    {/* Favorite Button */}
                    <button
                      onClick={() => handleToggleFavorite(dua)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isFav
                          ? 'text-rose-500 bg-rose-500/10'
                          : 'text-stone-400 hover:text-rose-500'
                      }`}
                      title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
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
                  <span className="font-mono text-deen-emerald font-semibold">{dua.reference}</span>
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
            {selectedCategory === 'favorites'
              ? 'No favorite supplications saved yet. Tap the heart icon on any Dua to add it.'
              : 'No supplications found for your selection.'}
          </div>
        )}
      </div>
    </div>
  );
};
