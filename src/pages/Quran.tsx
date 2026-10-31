// ==============================================================================
// DEEN — The Holy Quran (Surahs, Juz & Bookmarks Navigation)
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookMarked, Layers, BookOpen, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getAllSurahs } from '@/services/quranService';
import { getQuranBookmarks } from '@/services/dbService';
import { SurahMeta, Bookmark } from '@/types';

export const Quran: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'surahs' | 'juz' | 'bookmarks'>('surahs');
  const [surahs, setSurahs] = useState<SurahMeta[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllSurahs().then(list => {
      setSurahs(list);
      setLoading(false);
    });
    getQuranBookmarks().then(b => setBookmarks(b));
  }, []);

  const filteredSurahs = surahs.filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      s.id.toString() === q ||
      s.name_simple.toLowerCase().includes(q) ||
      s.name_arabic.includes(q) ||
      s.translated_name.name.toLowerCase().includes(q)
    );
  });

  // 30 Juz definitions
  const juzList = Array.from({ length: 30 }, (_, i) => ({
    juzNumber: i + 1,
    title: `Juz ${i + 1}`,
    arabicTitle: `الجزء ${i + 1}`
  }));

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Search Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
            {t('quran')}
          </h1>
          <span className="text-xs text-stone-500 font-medium">114 Surahs • 30 Juz</span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Surah name, number, or Arabic..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-xs focus:outline-none focus:border-deen-emerald dark:text-white"
          />
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-stone-200/60 dark:bg-deen-charcoal p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('surahs')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'surahs'
                ? 'bg-white dark:bg-deen-charcoal-card text-deen-emerald shadow-sm'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Surahs</span>
          </button>

          <button
            onClick={() => setActiveTab('juz')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'juz'
                ? 'bg-white dark:bg-deen-charcoal-card text-deen-emerald shadow-sm'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Juz</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-white dark:bg-deen-charcoal-card text-deen-emerald shadow-sm'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Bookmarks ({bookmarks.length})</span>
          </button>
        </div>
      </div>

      {/* Surahs Tab Content */}
      {activeTab === 'surahs' && (
        <div className="space-y-2">
          {loading ? (
            <div className="text-center py-8 text-xs text-stone-400">Loading Surahs...</div>
          ) : filteredSurahs.length > 0 ? (
            filteredSurahs.map((surah) => (
              <Link
                key={surah.id}
                to={`/quran/surah/${surah.id}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 hover:border-deen-emerald/40 transition-all shadow-sm group"
              >
                <div className="flex items-center gap-3">
                  {/* Number Badge */}
                  <div className="w-9 h-9 rounded-xl bg-deen-emerald/10 text-deen-emerald font-bold text-xs flex items-center justify-center shrink-0">
                    {surah.id}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-deen-forest dark:text-deen-ivory group-hover:text-deen-emerald transition-colors">
                      {surah.name_simple}
                    </h3>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {surah.translated_name.name} • {surah.verses_count} Verses
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-arabic text-lg font-bold text-deen-forest dark:text-deen-ivory block leading-none">
                    {surah.name_arabic}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-deen-gold block mt-1">
                    {surah.revelation_place === 'makkah' ? 'Makki' : 'Madani'}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-xs text-stone-400">No Surahs found matching "{searchQuery}"</div>
          )}
        </div>
      )}

      {/* Juz Tab Content */}
      {activeTab === 'juz' && (
        <div className="grid grid-cols-2 gap-2.5">
          {juzList.map((juz) => (
            <div
              key={juz.juzNumber}
              className="p-3.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-deen-forest dark:text-deen-ivory block">
                  {juz.title}
                </span>
                <span className="font-arabic text-xs text-deen-gold block mt-0.5">
                  {juz.arabicTitle}
                </span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-deen-emerald/10 text-deen-emerald text-xs font-bold flex items-center justify-center">
                {juz.juzNumber}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bookmarks Tab Content */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-2">
          {bookmarks.length > 0 ? (
            bookmarks.map((b) => (
              <Link
                key={b.verse_key}
                to={`/quran/surah/${b.surah_number}#${b.verse_key}`}
                className="p-3.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 block hover:border-deen-emerald/40 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-deen-emerald">
                    Surah {b.surah_name || b.surah_number} ({b.verse_key})
                  </span>
                  <span className="text-[10px] text-stone-400">Ayah {b.ayah_number}</span>
                </div>
                {b.text_uthmani && (
                  <p className="font-arabic text-sm text-right leading-loose text-stone-800 dark:text-stone-200 line-clamp-2" dir="rtl">
                    {b.text_uthmani}
                  </p>
                )}
                {b.translation_text && (
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
                    {b.translation_text}
                  </p>
                )}
              </Link>
            ))
          ) : (
            <div className="text-center py-12 text-xs text-stone-400">
              <BookMarked className="w-8 h-8 mx-auto mb-2 opacity-30" />
              No bookmarks saved yet. Tap the bookmark icon on any verse while reading.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
