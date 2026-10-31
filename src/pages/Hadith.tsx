// ==============================================================================
// DEEN — Authentic Hadith Library Page
// Canonical Collections (Bukhari, Muslim, Abu Dawood, Tirmidhi, 40 Nawawi)
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  BookMarked,
  Search,
  Bookmark as BookmarkIcon,
  ShieldCheck,
  Share2,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  HADITH_COLLECTIONS,
  getHadithsByCollection,
  BUNDLED_AUTHENTIC_HADITHS
} from '@/services/hadithService';
import { toggleFavorite, isFavorite } from '@/services/dbService';
import { HadithItem } from '@/types';

export const Hadith: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCollection, setSelectedCollection] = useState<string>('bukhari');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hadiths, setHadiths] = useState<HadithItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLoading(true);
    getHadithsByCollection(selectedCollection).then(list => {
      setHadiths(list);
      setLoading(false);
    });
  }, [selectedCollection]);

  useEffect(() => {
    BUNDLED_AUTHENTIC_HADITHS.forEach(h => {
      isFavorite('hadith', String(h.id)).then(fav => {
        if (fav) setFavoriteIds(prev => new Set(prev).add(String(h.id)));
      });
    });
  }, []);

  const handleToggleBookmark = async (hadith: HadithItem) => {
    const isFav = await toggleFavorite('hadith', String(hadith.id), hadith);
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (isFav) next.add(String(hadith.id));
      else next.delete(String(hadith.id));
      return next;
    });
  };

  const filteredHadiths = hadiths.filter(h => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      h.englishText.toLowerCase().includes(q) ||
      h.arabicText.includes(q) ||
      h.reference.toLowerCase().includes(q) ||
      h.hadithNumber.includes(q)
    );
  });

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
          {t('hadith')} Library
        </h1>
        <p className="text-xs text-stone-500">
          Canonical Sunnah with Verified Authenticity Grades
        </p>
      </div>

      {/* Collection Selection Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {HADITH_COLLECTIONS.map((c) => {
          const isSelected = selectedCollection === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCollection(c.id)}
              className={`px-3 py-1.5 rounded-xl shrink-0 text-xs font-semibold border transition-all ${
                isSelected
                  ? 'bg-deen-emerald text-white border-deen-emerald shadow-sm'
                  : 'bg-white dark:bg-deen-charcoal-card border-emerald-900/10 dark:border-emerald-800/20 text-stone-700 dark:text-stone-300'
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by topic, narrator, or keyword..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-xs focus:outline-none focus:border-deen-emerald dark:text-white"
        />
      </div>

      {/* Hadiths List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 text-xs text-stone-400">Loading authentic narrations...</div>
        ) : filteredHadiths.length > 0 ? (
          filteredHadiths.map((hadith) => {
            const isFav = favoriteIds.has(String(hadith.id));
            return (
              <div
                key={hadith.id}
                className="p-4 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-3"
              >
                {/* Header Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-deen-emerald/10 text-deen-emerald">
                      Hadith #{hadith.hadithNumber}
                    </span>
                    {hadith.grade && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        {hadith.grade}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleToggleBookmark(hadith)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isFav ? 'text-deen-gold bg-deen-gold/10' : 'text-stone-400 hover:text-deen-gold'
                    }`}
                    title="Bookmark Hadith"
                  >
                    <BookmarkIcon className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Arabic Text */}
                {hadith.arabicText && (
                  <p className="font-arabic text-lg text-right leading-loose text-deen-forest dark:text-deen-ivory" dir="rtl">
                    {hadith.arabicText}
                  </p>
                )}

                {/* English Text */}
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                  "{hadith.englishText}"
                </p>

                {/* Footer Reference */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="font-mono text-deen-emerald font-semibold">{hadith.reference}</span>
                  {hadith.gradedBy && (
                    <span className="text-[10px] text-stone-400">Graded by: {hadith.gradedBy}</span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-xs text-stone-400">
            No Hadith found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};
