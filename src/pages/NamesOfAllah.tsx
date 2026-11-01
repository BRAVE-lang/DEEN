// ==============================================================================
// DEEN — 99 Names of Allah (Asma ul-Husna) Comprehensive Page
// Classical Scholarly Enumeration (Tirmidhi #3507, Bukhari #2736, Muslim #2677)
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Info,
  CheckCircle2,
  Share2,
  X
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  NAMES_OF_ALLAH,
  searchDivineNames,
  getNameOfTheDay
} from '@/services/namesService';
import { toggleFavorite, isFavorite } from '@/services/dbService';
import { DivineName } from '@/types';
import { IslamicPattern } from '@/components/common/IslamicPattern';

export const NamesOfAllah: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [favoriteNumbers, setFavoriteNumbers] = useState<Set<number>>(new Set());
  const [memorizedNumbers, setMemorizedNumbers] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('deen_memorized_names');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [selectedName, setSelectedName] = useState<DivineName | null>(null);
  const [playingNumber, setPlayingNumber] = useState<number | null>(null);
  const [showScholarNote, setShowScholarNote] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dailyName = getNameOfTheDay();

  // Load favorites
  useEffect(() => {
    NAMES_OF_ALLAH.forEach(n => {
      isFavorite('name', String(n.number)).then(fav => {
        if (fav) setFavoriteNumbers(prev => new Set(prev).add(n.number));
      });
    });
  }, []);

  // Save memorized progress to local storage
  const toggleMemorized = (e: React.MouseEvent, num: number) => {
    e.stopPropagation();
    setMemorizedNumbers(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      localStorage.setItem('deen_memorized_names', JSON.stringify(Array.from(next)));
      return next;
    });
  };

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

  const playPronunciation = (e: React.MouseEvent, name: DivineName) => {
    e.stopPropagation();
    if (playingNumber === name.number) {
      audioRef.current?.pause();
      setPlayingNumber(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(name.audioUrl);
    audioRef.current = audio;
    setPlayingNumber(name.number);

    audio.play().catch(() => {
      // Browser autoplay restriction or offline fallback
      setPlayingNumber(null);
    });

    audio.onended = () => {
      setPlayingNumber(null);
    };
    audio.onerror = () => {
      setPlayingNumber(null);
    };
  };

  // Filter names based on search and active tab
  const searchedNames = searchDivineNames(searchQuery);
  const displayedNames = activeTab === 'favorites'
    ? searchedNames.filter(n => favoriteNumbers.has(n.number))
    : searchedNames;

  const memorizedPercent = Math.round((memorizedNumbers.size / 99) * 100);

  return (
    <div className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
            {t('namesOfAllah')}
          </h1>
          <p className="text-xs text-stone-500">
            Asma ul-Husna • 99 Canonical Names
          </p>
        </div>

        <button
          onClick={() => setShowScholarNote(true)}
          className="p-2 rounded-xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-stone-500 hover:text-deen-emerald transition-colors"
          title="Scholarly Documentation"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Daily Name of Allah Banner */}
      <div
        onClick={() => setSelectedName(dailyName)}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deen-forest via-deen-forest-light to-deen-emerald p-5 text-white shadow-lg border border-emerald-700/30 cursor-pointer group"
      >
        <IslamicPattern opacity={0.1} />
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-deen-gold/20 text-deen-gold-accent border border-deen-gold/30">
              <Sparkles className="w-3 h-3" />
              Name of the Day
            </span>
            <h2 className="text-sm font-bold tracking-tight">
              #{dailyName.number} {dailyName.transliteration}
            </h2>
            <p className="text-xs text-emerald-100 max-w-[210px] line-clamp-1">
              {dailyName.meaning[language === 'ar' ? 'en' : language] || dailyName.meaning.en}
            </p>
          </div>

          <div className="text-right">
            <span className="font-arabic text-3xl font-extrabold text-deen-gold-accent block leading-tight drop-shadow" dir="rtl">
              {dailyName.arabic}
            </span>
            <button
              onClick={(e) => playPronunciation(e, dailyName)}
              className="mt-1.5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors inline-flex items-center justify-center"
            >
              {playingNumber === dailyName.number ? (
                <VolumeX className="w-4 h-4 text-deen-gold-accent animate-pulse" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Memorization / Learning Progress Tracker */}
      <div className="bg-white dark:bg-deen-charcoal-card p-3.5 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-deen-forest dark:text-deen-ivory flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-deen-emerald" />
            Memorization Progress
          </span>
          <span className="font-mono text-deen-emerald font-bold">
            {memorizedNumbers.size} / 99 ({memorizedPercent}%)
          </span>
        </div>
        <div className="w-full bg-stone-100 dark:bg-deen-charcoal h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-deen-emerald to-deen-gold h-full rounded-full transition-all duration-500"
            style={{ width: `${memorizedPercent}%` }}
          />
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Arabic, English, Hindi, Gujarati, or number..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-xs focus:outline-none focus:border-deen-emerald dark:text-white shadow-sm"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-deen-emerald text-white shadow-sm'
                : 'bg-white dark:bg-deen-charcoal-card text-stone-600 dark:text-stone-300 border border-emerald-900/10 dark:border-emerald-800/20'
            }`}
          >
            All 99 Names
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'bg-deen-emerald text-white shadow-sm'
                : 'bg-white dark:bg-deen-charcoal-card text-stone-600 dark:text-stone-300 border border-emerald-900/10 dark:border-emerald-800/20'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Favourites ({favoriteNumbers.size})</span>
          </button>
        </div>
      </div>

      {/* Grid of Names */}
      {displayedNames.length > 0 ? (
        <div className="grid grid-cols-2 gap-2.5">
          {displayedNames.map((name) => {
            const isFav = favoriteNumbers.has(name.number);
            const isMemorized = memorizedNumbers.has(name.number);
            const isPlaying = playingNumber === name.number;

            return (
              <div
                key={name.number}
                onClick={() => setSelectedName(name)}
                className={`p-3.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border transition-all shadow-sm cursor-pointer relative group flex flex-col justify-between ${
                  isMemorized
                    ? 'border-deen-emerald/40 ring-1 ring-deen-emerald/20'
                    : 'border-emerald-900/10 dark:border-emerald-800/20 hover:border-deen-emerald/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="w-6 h-6 rounded-lg bg-deen-emerald/10 text-deen-emerald font-mono font-bold text-[10px] flex items-center justify-center">
                    {name.number}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => playPronunciation(e, name)}
                      className={`p-1 rounded-lg transition-colors ${
                        isPlaying ? 'text-deen-gold-accent animate-pulse' : 'text-stone-300 hover:text-deen-emerald'
                      }`}
                      title="Audio Pronunciation"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
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
                </div>

                <div className="text-center my-2">
                  <span
                    className="font-arabic text-2xl font-bold text-deen-forest dark:text-deen-ivory block leading-normal"
                    dir="rtl"
                  >
                    {name.arabic}
                  </span>
                  <span className="text-xs font-bold text-deen-gold-dark dark:text-deen-gold-light block mt-0.5">
                    {name.transliteration}
                  </span>
                </div>

                <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center line-clamp-2 mt-1">
                  {name.meaning[language === 'ar' ? 'en' : language] || name.meaning.en}
                </p>

                <div className="pt-2 mt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between">
                  <button
                    onClick={(e) => toggleMemorized(e, name.number)}
                    className={`text-[10px] font-semibold flex items-center gap-1 ${
                      isMemorized ? 'text-deen-emerald' : 'text-stone-400 hover:text-stone-600'
                    }`}
                  >
                    <CheckCircle2 className={`w-3 h-3 ${isMemorized ? 'fill-current text-white bg-deen-emerald rounded-full' : ''}`} />
                    <span>{isMemorized ? 'Learned' : 'Learn'}</span>
                  </button>
                  <span className="text-[9px] text-stone-400 font-mono truncate max-w-[80px]">
                    {name.quranReference.split(',')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center text-stone-400 text-xs">
          No Names of Allah found matching your criteria.
        </div>
      )}

      {/* Detail Modal */}
      {selectedName && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-3 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-deen-charcoal rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <span className="text-xs font-bold text-deen-emerald">
                Name #{selectedName.number} of 99
              </span>
              <button
                onClick={() => setSelectedName(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
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

              <button
                onClick={(e) => playPronunciation(e, selectedName)}
                className="mt-3 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors inline-flex items-center gap-1.5 text-xs font-semibold"
              >
                {playingNumber === selectedName.number ? (
                  <>
                    <VolumeX className="w-4 h-4 text-deen-gold-accent animate-pulse" />
                    <span>Pause Pronunciation</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-white" />
                    <span>Listen Pronunciation</span>
                  </>
                )}
              </button>
            </div>

            {/* Multilingual Meanings */}
            <div className="bg-stone-50 dark:bg-deen-charcoal-card p-3 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
              <h4 className="font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider text-[10px]">
                Multilingual Translations
              </h4>
              <div className="space-y-1">
                <p><span className="font-semibold text-stone-400">English:</span> {selectedName.meaning.en}</p>
                <p><span className="font-semibold text-stone-400">हिन्दी:</span> {selectedName.meaning.hi}</p>
                <p><span className="font-semibold text-stone-400">ગુજરાતી:</span> {selectedName.meaning.gu}</p>
              </div>
            </div>

            {/* Theological Explanation */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider text-[10px]">
                Theological Meaning & Explanation
              </h4>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                {selectedName.explanation[language === 'ar' ? 'en' : language] || selectedName.explanation.en}
              </p>
            </div>

            {/* Quranic Citations */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
              <span className="font-mono text-deen-emerald font-semibold">
                {selectedName.quranReference}
              </span>
              <button
                onClick={(e) => toggleMemorized(e, selectedName.number)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                  memorizedNumbers.has(selectedName.number)
                    ? 'bg-deen-emerald/10 text-deen-emerald border border-deen-emerald/20'
                    : 'bg-stone-100 dark:bg-deen-charcoal text-stone-600 dark:text-stone-300'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{memorizedNumbers.has(selectedName.number) ? 'Memorized' : 'Mark as Memorized'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scholarly Documentation Modal */}
      {showScholarNote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-deen-charcoal rounded-3xl p-6 space-y-3.5 shadow-2xl max-h-[80vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-sm text-deen-forest dark:text-deen-ivory">
                Scholarly Authentication & Sources
              </h3>
              <button
                onClick={() => setShowScholarNote(false)}
                className="text-xs text-deen-emerald font-semibold"
              >
                Close
              </button>
            </div>

            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              <strong>Hadith Foundation:</strong> The Messenger of Allah (ﷺ) said:
              <br />
              <em>
                "Allah has ninety-nine names, one hundred minus one; whoever memorizes/preserves them will enter Paradise."
              </em>
              <br />
              <span className="text-[10px] text-stone-400">(Sahih al-Bukhari #2736, Sahih Muslim #2677)</span>
            </p>

            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-deen-charcoal-card border border-stone-200 dark:border-stone-800 space-y-1.5">
              <h4 className="font-bold text-deen-forest dark:text-deen-ivory">
                The Classical Enumeration
              </h4>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-[11px]">
                While the hadith in Sahih al-Bukhari establishes the 99 count, the individual listing of the 99 names was transmitted by Imam at-Tirmidhi (Jami' at-Tirmidhi #3507) through Al-Walid ibn Muslim, and analyzed by scholars including Imam Al-Ghazali (<em>Al-Maqsad Al-Asna</em>) and Imam Al-Bayhaqi (<em>Al-Asma wa-s-Sifat</em>). DEEN provides this established classical sequence with direct Quranic grounding for every divine attribute.
              </p>
            </div>

            <p className="text-[10px] text-stone-400 italic">
              DEEN guarantees zero fabricated names and adheres to classical Sunni orthodox theology.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
