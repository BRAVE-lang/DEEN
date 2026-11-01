// ==============================================================================
// DEEN — The Holy Quran (Surahs, Juz & Bookmarks Navigation)
// Quran Completion Tracker, Daily Reading Goals & Cross-Device Sync
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  BookMarked,
  Layers,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Plus,
  Minus,
  Sparkles,
  Trash2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getAllSurahs } from '@/services/quranService';
import {
  getQuranBookmarks,
  removeQuranBookmark,
  getQuranReadingStats,
  recordQuranPagesRead
} from '@/services/dbService';
import { SurahMeta, Bookmark } from '@/types';

// Canonical Juz Start Surahs and Ayahs
const JUZ_MAPPING = [
  { juz: 1, surah: 1, ayah: 1, title: 'Al-Fatiha', arabic: 'الجزء الأول' },
  { juz: 2, surah: 2, ayah: 142, title: 'Sayaqool (Al-Baqarah)', arabic: 'الجزء الثاني' },
  { juz: 3, surah: 2, ayah: 253, title: 'Tilka ar-Rusul (Al-Baqarah)', arabic: 'الجزء الثالث' },
  { juz: 4, surah: 3, ayah: 93, title: 'Lan Tanaloo (Ali \'Imran)', arabic: 'الجزء الرابع' },
  { juz: 5, surah: 4, ayah: 24, title: 'Wal-Muhsanat (An-Nisa)', arabic: 'الجزء الخامس' },
  { juz: 6, surah: 4, ayah: 148, title: 'La Yuhibbullah (An-Nisa)', arabic: 'الجزء السادس' },
  { juz: 7, surah: 5, ayah: 82, title: 'Wa Iza Sami\'oo (Al-Ma\'idah)', arabic: 'الجزء السابع' },
  { juz: 8, surah: 6, ayah: 111, title: 'Wa Law Annana (Al-An\'am)', arabic: 'الجزء الثامن' },
  { juz: 9, surah: 7, ayah: 88, title: 'Qalal-Mala\'u (Al-A\'raf)', arabic: 'الجزء التاسع' },
  { juz: 10, surah: 8, ayah: 41, title: 'Wa\'lamoo (Al-Anfal)', arabic: 'الجزء العاشر' },
  { juz: 11, surah: 9, ayah: 93, title: 'Ya\'tadhiruna (At-Tawbah)', arabic: 'الجزء الحادي عشر' },
  { juz: 12, surah: 11, ayah: 6, title: 'Wa Ma Min Dabbatin (Hud)', arabic: 'الجزء الثاني عشر' },
  { juz: 13, surah: 12, ayah: 53, title: 'Wa Ma Ubarri\'u (Yusuf)', arabic: 'الجزء الثالث عشر' },
  { juz: 14, surah: 15, ayah: 1, title: 'Rubama (Al-Hijr)', arabic: 'الجزء الرابع عشر' },
  { juz: 15, surah: 17, ayah: 1, title: 'Subhanalladhi (Al-Isra)', arabic: 'الجزء الخامس عشر' },
  { juz: 16, surah: 18, ayah: 75, title: 'Qala Alam (Al-Kahf)', arabic: 'الجزء السادس عشر' },
  { juz: 17, surah: 21, ayah: 1, title: 'Iqtaraba (Al-Anbiya)', arabic: 'الجزء السابع عشر' },
  { juz: 18, surah: 23, ayah: 1, title: 'Qad Aflaha (Al-Mu\'minun)', arabic: 'الجزء الثامن عشر' },
  { juz: 19, surah: 25, ayah: 21, title: 'Wa Qalal-ladhina (Al-Furqan)', arabic: 'الجزء التاسع عشر' },
  { juz: 20, surah: 27, ayah: 56, title: 'Fa Ma Kana (An-Naml)', arabic: 'الجزء العشرون' },
  { juz: 21, surah: 29, ayah: 46, title: 'Utlu Ma Oohiya (Al-\'Ankabut)', arabic: 'الجزء الحادي والعشرون' },
  { juz: 22, surah: 33, ayah: 31, title: 'Wa Man Yaqnut (Al-Ahzab)', arabic: 'الجزء الثاني والعشرون' },
  { juz: 23, surah: 36, ayah: 28, title: 'Wa Ma Anzalna (Ya-Sin)', arabic: 'الجزء الثالث والعشرون' },
  { juz: 24, surah: 39, ayah: 32, title: 'Fa Man Azlamu (Az-Zumar)', arabic: 'الجزء الرابع والعشرون' },
  { juz: 25, surah: 41, ayah: 47, title: 'Ilayhi Yuraddu (Fussilat)', arabic: 'الجزء الخامس والعشرون' },
  { juz: 26, surah: 46, ayah: 1, title: 'Ha-Meem (Al-Ahqaf)', arabic: 'الجزء السادس والعشرون' },
  { juz: 27, surah: 51, ayah: 31, title: 'Qala Fa Ma Khatbukum (Adh-Dhariyat)', arabic: 'الجزء السابع والعشرون' },
  { juz: 28, surah: 58, ayah: 1, title: 'Qad Sami\'allahu (Al-Mujadila)', arabic: 'الجزء الثامن والعشرون' },
  { juz: 29, surah: 67, ayah: 1, title: 'Tabarakalladhi (Al-Mulk)', arabic: 'الجزء التاسع والعشرون' },
  { juz: 30, surah: 78, ayah: 1, title: '\'Amma Yatasa\'aloon (An-Naba)', arabic: 'الجزء الثلاثون' }
];

export const Quran: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'surahs' | 'juz' | 'bookmarks'>('surahs');
  const [surahs, setSurahs] = useState<SurahMeta[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Reading Stats
  const [stats, setStats] = useState<{
    completedPagesTotal: number;
    percentageCompleted: number;
    targetPagesDaily: number;
    todayPagesRead: number;
    lastRead?: { surahNumber: number; ayahNumber: number; surahName: string; timestamp: number };
  }>({
    completedPagesTotal: 0,
    percentageCompleted: 0,
    targetPagesDaily: 4,
    todayPagesRead: 0
  });

  const loadData = () => {
    getAllSurahs().then(list => {
      setSurahs(list);
      setLoading(false);
    });
    getQuranBookmarks().then(b => setBookmarks(b));
    getQuranReadingStats().then(s => setStats(s));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogPage = async (delta: number) => {
    await recordQuranPagesRead(delta);
    const updated = await getQuranReadingStats();
    setStats(updated);
  };

  const handleRemoveBookmark = async (verseKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await removeQuranBookmark(verseKey);
    setBookmarks(prev => prev.filter(b => b.verse_key !== verseKey));
  };

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
            <span>Juz (30)</span>
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

      {/* Reading Progress & Daily Goal Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-deen-forest via-deen-forest-light to-deen-emerald text-white p-4 shadow-lg border border-emerald-700/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-deen-gold-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
              Quran Reading Journey
            </span>
          </div>
          <span className="text-xs font-black text-deen-gold-accent">
            {stats.completedPagesTotal} / 604 Pages ({stats.percentageCompleted}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-deen-gold to-amber-300 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(2, stats.percentageCompleted)}%` }}
          />
        </div>

        {/* Daily Goal & Log Counter */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
          <div>
            <span className="text-[10px] text-emerald-200 block">Today’s Goal</span>
            <span className="font-bold">
              {stats.todayPagesRead} / {stats.targetPagesDaily} pages read
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleLogPage(-1)}
              className="w-7 h-7 rounded-lg bg-black/20 hover:bg-black/40 flex items-center justify-center text-white font-bold transition-colors"
              title="Subtract 1 Page"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleLogPage(1)}
              className="px-2.5 py-1 rounded-lg bg-deen-gold hover:bg-deen-gold-light text-white font-bold flex items-center gap-1 text-[11px] transition-transform active:scale-95"
              title="Log 1 Page Read"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+1 Page</span>
            </button>
          </div>
        </div>

        {/* Continue Reading Shortcut */}
        {stats.lastRead && (
          <Link
            to={`/quran/surah/${stats.lastRead.surahNumber}#${stats.lastRead.surahNumber}:${stats.lastRead.ayahNumber}`}
            className="block bg-black/25 hover:bg-black/35 rounded-2xl p-2.5 transition-colors text-xs flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] text-deen-gold-accent block">Resume Where You Left Off</span>
              <span className="font-semibold text-white">
                Surah {stats.lastRead.surahName} (Ayah {stats.lastRead.ayahNumber})
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-deen-gold-accent" />
          </Link>
        )}
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
        <div className="grid grid-cols-1 gap-2.5">
          {JUZ_MAPPING.map((j) => (
            <Link
              key={j.juz}
              to={`/quran/surah/${j.surah}#${j.surah}:${j.ayah}`}
              className="p-3.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 hover:border-deen-emerald/40 transition-all shadow-sm flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-deen-emerald/10 text-deen-emerald text-xs font-bold flex items-center justify-center shrink-0">
                  {j.juz}
                </div>
                <div>
                  <span className="text-xs font-bold text-deen-forest dark:text-deen-ivory group-hover:text-deen-emerald transition-colors block">
                    Juz {j.juz} — {j.title}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Starts at Surah {j.surah}, Ayah {j.ayah}
                  </span>
                </div>
              </div>

              <div className="text-right flex items-center gap-2">
                <span className="font-arabic text-xs font-semibold text-deen-gold block">
                  {j.arabic}
                </span>
                <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-deen-emerald transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Bookmarks Tab Content */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-2">
          {bookmarks.length > 0 ? (
            bookmarks.map((b) => (
              <div
                key={b.verse_key}
                className="p-3.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm relative group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Link
                    to={`/quran/surah/${b.surah_number}#${b.verse_key}`}
                    className="text-xs font-bold text-deen-emerald hover:underline flex items-center gap-1"
                  >
                    <span>Surah {b.surah_name || b.surah_number} ({b.verse_key})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-stone-400">Ayah {b.ayah_number}</span>
                    <button
                      onClick={(e) => handleRemoveBookmark(b.verse_key, e)}
                      className="text-stone-300 hover:text-rose-500 p-1 rounded-lg transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <Link to={`/quran/surah/${b.surah_number}#${b.verse_key}`} className="block">
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
              </div>
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
