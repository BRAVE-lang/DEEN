// ==============================================================================
// DEEN — Surah Reader & Audio Synchronization Page
// Uthmani Arabic, English, Hindi, Gujarati & Transliteration
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Play,
  Pause,
  Bookmark as BookmarkIcon,
  Settings2,
  Share2,
  Volume2,
  Repeat
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAudio } from '@/context/AudioContext';
import {
  getAllSurahs,
  getSurahVerses,
  cleanTranslationText,
  QURAN_RECITERS
} from '@/services/quranService';
import {
  saveQuranBookmark,
  removeQuranBookmark,
  isVerseBookmarked,
  saveLastRead
} from '@/services/dbService';
import { SurahMeta, Verse } from '@/types';

export const SurahView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const surahId = parseInt(id || '1', 10);
  const { language } = useLanguage();
  const {
    isPlaying,
    currentVerseKey,
    playAyah,
    pauseAudio,
    reciter,
    setReciter,
    repeatAyah,
    setRepeatAyah
  } = useAudio();

  const [surahMeta, setSurahMeta] = useState<SurahMeta | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(() => {
    return Number(localStorage.getItem('deen_quran_font_size')) || 24;
  });
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [bookmarkedKeys, setBookmarkedKeys] = useState<Set<string>>(new Set());
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);

  // Translation priority based on active app language
  // 20 = English (Saheeh), 122 = Hindi, 225 = Gujarati
  const preferredResourceId = language === 'hi' ? 122 : language === 'gu' ? 225 : 20;

  useEffect(() => {
    setLoading(true);
    getAllSurahs().then(list => {
      const meta = list.find(s => s.id === surahId);
      if (meta) {
        setSurahMeta(meta);
        saveLastRead(meta.id, 1, meta.name_simple);
      }
    });

    getSurahVerses(surahId, 1, 300).then(res => {
      setVerses(res.verses);
      setLoading(false);

      // Check bookmarks
      res.verses.forEach(v => {
        isVerseBookmarked(v.verse_key).then(isB => {
          if (isB) {
            setBookmarkedKeys(prev => new Set(prev).add(v.verse_key));
          }
        });
      });
    });
  }, [surahId]);

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    localStorage.setItem('deen_quran_font_size', String(size));
  };

  const handleToggleBookmark = async (verse: Verse) => {
    const isBookmarked = bookmarkedKeys.has(verse.verse_key);
    if (isBookmarked) {
      await removeQuranBookmark(verse.verse_key);
      setBookmarkedKeys(prev => {
        const next = new Set(prev);
        next.delete(verse.verse_key);
        return next;
      });
    } else {
      const primaryTrans = verse.translations.find(t => t.resource_id === preferredResourceId) || verse.translations[0];
      await saveQuranBookmark({
        surah_number: surahId,
        ayah_number: verse.verse_number,
        verse_key: verse.verse_key,
        surah_name: surahMeta?.name_simple,
        text_uthmani: verse.text_uthmani,
        translation_text: cleanTranslationText(primaryTrans?.text || '')
      });
      setBookmarkedKeys(prev => new Set(prev).add(verse.verse_key));
    }
  };

  return (
    <div className="pb-32 pt-2 px-4 max-w-2xl mx-auto space-y-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between sticky top-14 z-30 bg-deen-ivory/95 dark:bg-deen-charcoal/95 backdrop-blur-md py-2 border-b border-emerald-900/10 dark:border-emerald-800/20">
        <Link
          to="/quran"
          className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-emerald-900/10 flex items-center gap-1 text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Surahs</span>
        </Link>

        {surahMeta && (
          <div className="text-center">
            <h1 className="text-sm font-bold text-deen-forest dark:text-deen-ivory">
              {surahMeta.name_simple}
            </h1>
            <p className="text-[10px] text-stone-400">
              {surahMeta.translated_name.name} • {surahMeta.verses_count} Verses
            </p>
          </div>
        )}

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-emerald-900/10 transition-colors"
          title="Reader Settings"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>

      {/* Reader Settings Drawer */}
      {showSettings && (
        <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-md space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-700 dark:text-stone-300">Arabic Font Size</span>
            <span className="font-mono text-deen-emerald font-bold">{fontSize}px</span>
          </div>
          <input
            type="range"
            min={18}
            max={40}
            value={fontSize}
            onChange={(e) => handleFontSizeChange(Number(e.target.value))}
            className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-deen-emerald"
          />

          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-stone-700 dark:text-stone-300">
              <input
                type="checkbox"
                checked={showTranslation}
                onChange={(e) => setShowTranslation(e.target.checked)}
                className="rounded accent-deen-emerald"
              />
              Show Translations
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-stone-700 dark:text-stone-300">
              <input
                type="checkbox"
                checked={showTransliteration}
                onChange={(e) => setShowTransliteration(e.target.checked)}
                className="rounded accent-deen-emerald"
              />
              Show Transliteration
            </label>
          </div>

          {/* Reciter Selector */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
            <label className="text-[11px] font-semibold text-stone-500 block mb-1">Reciter</label>
            <select
              value={reciter.id}
              onChange={(e) => {
                const found = QURAN_RECITERS.find(r => r.id === Number(e.target.value));
                if (found) setReciter(found);
              }}
              className="w-full text-xs p-2 rounded-xl bg-stone-100 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200"
            >
              {QURAN_RECITERS.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name} {r.style ? `(${r.style})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Surah Banner Card */}
      {surahMeta && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deen-forest via-deen-forest-light to-deen-emerald text-white p-6 text-center shadow-lg border border-emerald-700/30">
          <span className="font-arabic text-3xl font-bold block mb-1 text-deen-gold-accent">
            {surahMeta.name_arabic}
          </span>
          <h2 className="text-lg font-extrabold">{surahMeta.name_simple}</h2>
          <p className="text-xs text-emerald-200 mt-0.5">
            {surahMeta.translated_name.name} • {surahMeta.verses_count} Ayahs • {surahMeta.revelation_place === 'makkah' ? 'Makki' : 'Madani'}
          </p>

          {/* Bismillah Header (except Surah At-Tawbah 9) */}
          {surahMeta.id !== 9 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="font-arabic text-2xl text-deen-gold-accent font-semibold leading-relaxed" dir="rtl">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
            </div>
          )}
        </div>
      )}

      {/* Ayahs List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-16 text-xs text-stone-400">Loading Ayahs...</div>
        ) : (
          verses.map((verse) => {
            const isPlayingThis = currentVerseKey === verse.verse_key && isPlaying;
            const isBookmarked = bookmarkedKeys.has(verse.verse_key);

            // Select active translation
            const translation = verse.translations.find(t => t.resource_id === preferredResourceId) || verse.translations[0];

            return (
              <div
                key={verse.id}
                id={verse.verse_key}
                className={`p-4 rounded-2xl border transition-all duration-200 shadow-sm ${
                  isPlayingThis
                    ? 'bg-deen-emerald/10 border-deen-emerald dark:border-deen-emerald shadow-glow-emerald'
                    : 'bg-white dark:bg-deen-charcoal-card border-emerald-900/10 dark:border-emerald-800/20'
                }`}
              >
                {/* Ayah Header Strip */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100 dark:border-stone-800/60">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-deen-emerald/10 text-deen-emerald font-bold text-xs flex items-center justify-center">
                      {verse.verse_number}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      {verse.verse_key}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Audio Play/Pause Button */}
                    <button
                      onClick={() => {
                        if (isPlayingThis) {
                          pauseAudio();
                        } else {
                          playAyah(verse.verse_key, `Surah ${surahMeta?.name_simple} (${verse.verse_key})`);
                        }
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isPlayingThis
                          ? 'bg-deen-emerald text-white'
                          : 'text-stone-500 hover:text-deen-emerald hover:bg-deen-emerald/10'
                      }`}
                      title={isPlayingThis ? 'Pause' : 'Play Ayah Recitation'}
                    >
                      {isPlayingThis ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    {/* Bookmark Button */}
                    <button
                      onClick={() => handleToggleBookmark(verse)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked
                          ? 'text-deen-gold bg-deen-gold/10'
                          : 'text-stone-400 hover:text-deen-gold hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                      title="Bookmark Verse"
                    >
                      <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Uthmani Arabic Text */}
                <p
                  className="font-quran text-right leading-loose text-deen-forest dark:text-deen-ivory my-3 tracking-wide"
                  style={{ fontSize: `${fontSize}px`, lineHeight: `${fontSize * 2.1}px` }}
                  dir="rtl"
                >
                  {verse.text_uthmani}
                </p>

                {/* Transliteration */}
                {showTransliteration && verse.transliteration && (
                  <p className="text-xs text-stone-500 italic mt-2 leading-relaxed">
                    {verse.transliteration}
                  </p>
                )}

                {/* Translation Text */}
                {showTranslation && translation && (
                  <div className="mt-2.5 pt-2.5 border-t border-stone-100 dark:border-stone-800/60">
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                      {cleanTranslationText(translation.text)}
                    </p>
                    <span className="text-[10px] text-stone-400 block mt-1">
                      {preferredResourceId === 225
                        ? 'Translation: Rabila Al-Umry (Gujarati)'
                        : preferredResourceId === 122
                        ? 'Translation: Maulana Azizul Haque (Hindi)'
                        : 'Translation: Saheeh International (English)'}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
