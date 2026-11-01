// ==============================================================================
// DEEN — Home Dashboard Page
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Compass,
  BookOpen,
  Sparkles,
  Heart,
  Calendar as CalendarIcon,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Volume2,
  Play
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAudio } from '@/context/AudioContext';
import { useAuth } from '@/context/AuthContext';
import {
  fetchPrayerTimes,
  getNextPrayerInfo,
  PRESET_CITIES,
  LocationCoords
} from '@/services/prayerService';
import { getDailyHadith } from '@/services/hadithService';
import { getDailyDua } from '@/services/duaService';
import { getLastRead } from '@/services/dbService';
import { getDailyDeenLog, saveDailyDeenLog } from '@/services/dbService';
import { IslamicPattern } from '@/components/common/IslamicPattern';
import { PrayerTimesData, HijriDateInfo, DailyDeenLog } from '@/types';

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const { playCustomUrl } = useAudio();
  const { user } = useAuth();

  const [currentCity, setCurrentCity] = useState<LocationCoords>(PRESET_CITIES[0]); // Default Makkah
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [hijriDate, setHijriDate] = useState<HijriDateInfo | null>(null);
  const [countdown, setCountdown] = useState<string>('00:00:00');
  const [nextPrayerName, setNextPrayerName] = useState<string>('Fajr');
  const [currentPrayerName, setCurrentPrayerName] = useState<string>('Isha');
  const [lastRead, setLastReadState] = useState<{ surahNumber: number; ayahNumber: number; surahName: string } | null>(null);
  const [todayLog, setTodayLog] = useState<DailyDeenLog | null>(null);
  const [ramadanDaysLeft, setRamadanDaysLeft] = useState<number>(120);

  // Daily verified items
  const dailyHadith = getDailyHadith();
  const dailyDua = getDailyDua();

  // Canonical Daily Ayah (Surah Al-Baqarah 2:152)
  const dailyAyah = {
    surahNumber: 2,
    ayahNumber: 152,
    verseKey: '2:152',
    surahName: 'Al-Baqarah',
    arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    transliteration: 'Fadhkuruni adhkurkum washkuru li wa la takfurun.',
    translation: {
      en: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
      hi: 'पस तुम मुझे याद रखो, मैं तुम्हें याद रखूँगा, और मेरा शुक्र अदा करो और मेरी नाशुक्री न करो।',
      gu: 'માટે તમે મને યાદ કરો, હું તમને યાદ કરીશ, અને મારો આભાર માનો અને મારી નાશુક્રી ન કરો.'
    },
    audioUrl: 'https://verses.quran.com/Alafasy/mp3/002152.mp3'
  };

  useEffect(() => {
    // Load prayer times
    fetchPrayerTimes(currentCity).then(({ timings, hijri }) => {
      setPrayerTimes(timings);
      setHijriDate(hijri);
    });

    // Load Last Read
    getLastRead().then(lr => {
      if (lr) setLastReadState(lr);
    });

    // Load Today's Deen Log
    const todayStr = new Date().toISOString().split('T')[0];
    getDailyDeenLog(todayStr).then(log => setTodayLog(log));

    // Approximate Ramadan countdown
    const now = new Date();
    const nextRamadan = new Date(now.getFullYear(), 2, 1); // Approx March
    if (now > nextRamadan) nextRamadan.setFullYear(now.getFullYear() + 1);
    const diffDays = Math.ceil((nextRamadan.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    setRamadanDaysLeft(Math.max(1, diffDays));
  }, [currentCity]);

  // Live Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const info = getNextPrayerInfo(currentCity);
      setCountdown(info.formattedCountdown);
      setNextPrayerName(info.nextPrayer);
      setCurrentPrayerName(info.currentPrayer);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentCity]);

  // Toggle prayer completion in Deen Tracker
  const handleTogglePrayer = async (prayerKey: keyof DailyDeenLog['prayers']) => {
    if (!todayLog) return;
    const updated = {
      ...todayLog,
      prayers: {
        ...todayLog.prayers,
        [prayerKey]: !todayLog.prayers[prayerKey]
      }
    };
    setTodayLog(updated);
    await saveDailyDeenLog(updated);
  };

  const gregorianToday = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Hero Greeting & Location Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deen-forest via-deen-forest-light to-deen-emerald text-white p-5 shadow-xl border border-emerald-700/30">
        <IslamicPattern opacity={0.08} />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-deen-gold/20 text-deen-gold-accent border border-deen-gold/30 mb-2">
              Assalamu Alaikum
            </span>
            <h1 className="text-xl font-bold tracking-tight">
              {user.displayName || 'Servant of Allah'}
            </h1>
            <p className="text-xs text-emerald-200/90 mt-0.5">{gregorianToday}</p>
          </div>

          {/* Location Selector */}
          <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10 text-xs">
            <MapPin className="w-3.5 h-3.5 text-deen-gold-accent shrink-0" />
            <select
              value={currentCity.city}
              onChange={(e) => {
                const found = PRESET_CITIES.find(c => c.city === e.target.value);
                if (found) setCurrentCity(found);
              }}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-1 text-xs"
            >
              {PRESET_CITIES.map(c => (
                <option key={c.city} value={c.city} className="bg-deen-charcoal text-white">
                  {c.city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hijri Date Display */}
        {hijriDate && (
          <div className="relative z-10 mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-100">
            <span className="font-arabic text-base font-semibold text-deen-gold-accent">
              {hijriDate.day} {hijriDate.month.ar} {hijriDate.year} هـ
            </span>
            <span className="text-[11px] text-emerald-200">
              {hijriDate.day} {hijriDate.month.en} {hijriDate.year} AH
            </span>
          </div>
        )}

        {/* Next Prayer Countdown Banner */}
        <div className="relative z-10 mt-4 bg-black/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-emerald-200 block">
              {t('nextPrayer')}
            </span>
            <span className="text-xl font-extrabold text-white">
              {nextPrayerName}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-deen-gold-accent block">
              {t('countdown')}
            </span>
            <span className="font-mono text-xl font-bold tracking-wider text-white">
              {countdown}
            </span>
          </div>
        </div>
      </div>

      {/* 5 Daily Prayer Times Timetable Bar */}
      <div className="bg-white dark:bg-deen-charcoal-card rounded-2xl p-4 shadow-sm border border-emerald-900/10 dark:border-emerald-800/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-deen-emerald" />
            <h2 className="text-sm font-bold text-deen-forest dark:text-deen-ivory">
              Today’s Prayer Timings
            </h2>
          </div>
          <Link to="/salah" className="text-xs text-deen-emerald hover:underline font-medium flex items-center gap-0.5">
            Full Schedule <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {prayerTimes ? (
          <div className="grid grid-cols-5 gap-1.5 text-center">
            {[
              { name: 'Fajr', time: prayerTimes.Fajr },
              { name: 'Dhuhr', time: prayerTimes.Dhuhr },
              { name: 'Asr', time: prayerTimes.Asr },
              { name: 'Maghrib', time: prayerTimes.Maghrib },
              { name: 'Isha', time: prayerTimes.Isha },
            ].map((p) => {
              const isNext = p.name === nextPrayerName;
              return (
                <div
                  key={p.name}
                  className={`rounded-xl py-2 px-1 transition-all ${
                    isNext
                      ? 'bg-deen-emerald text-white shadow-md shadow-deen-emerald/30 scale-105'
                      : 'bg-emerald-900/5 dark:bg-emerald-500/5 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className={`text-[10px] font-semibold block ${isNext ? 'text-emerald-100' : 'text-stone-500 dark:text-stone-400'}`}>
                    {p.name}
                  </span>
                  <span className="text-xs font-bold block mt-0.5 font-mono">
                    {p.time}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-3 text-xs text-stone-400">Loading prayer times...</div>
        )}
      </div>

      {/* Quick Access Action Shortcuts */}
      <div className="grid grid-cols-4 gap-2.5">
        <Link
          to="/quran"
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 hover:border-deen-emerald/40 transition-all text-center shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-deen-emerald/10 text-deen-emerald flex items-center justify-center mb-1.5">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-stone-800 dark:text-stone-200">Quran</span>
        </Link>

        <Link
          to="/salah"
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 hover:border-deen-emerald/40 transition-all text-center shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-deen-gold/10 text-deen-gold flex items-center justify-center mb-1.5">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-stone-800 dark:text-stone-200">Salah</span>
        </Link>

        <Link
          to="/qibla"
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 hover:border-deen-emerald/40 transition-all text-center shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-1.5">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-stone-800 dark:text-stone-200">Qibla</span>
        </Link>

        <Link
          to="/tasbeeh"
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 hover:border-deen-emerald/40 transition-all text-center shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-1.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-stone-800 dark:text-stone-200">Tasbeeh</span>
        </Link>
      </div>

      {/* Continue Reading Quran Card */}
      {lastRead && (
        <div className="bg-gradient-to-r from-emerald-950 to-deen-forest text-white rounded-2xl p-4 shadow-md flex items-center justify-between border border-emerald-700/30">
          <div>
            <span className="text-[11px] text-deen-gold-light uppercase tracking-wider block font-medium">
              Continue Reading
            </span>
            <h3 className="text-sm font-bold mt-0.5">
              Surah {lastRead.surahName} (Ayah {lastRead.ayahNumber})
            </h3>
          </div>
          <Link
            to={`/quran/surah/${lastRead.surahNumber}`}
            className="px-3 py-1.5 rounded-xl bg-deen-gold hover:bg-deen-gold-light text-white text-xs font-semibold flex items-center gap-1 transition-transform active:scale-95"
          >
            Resume <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Verse of the Day Card */}
      <div className="bg-white dark:bg-deen-charcoal-card rounded-2xl p-5 shadow-sm border border-emerald-900/10 dark:border-emerald-800/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-deen-emerald" />
            <span className="text-xs font-bold text-deen-forest dark:text-deen-ivory">
              {t('dailyAyah')}
            </span>
          </div>
          <button
            onClick={() => playCustomUrl(dailyAyah.audioUrl, `Ayah ${dailyAyah.verseKey} (Mishari Rashid)`)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-deen-emerald/10 text-deen-emerald text-xs font-medium hover:bg-deen-emerald/20 transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Listen</span>
          </button>
        </div>

        <p className="font-arabic text-xl text-right leading-loose text-deen-forest dark:text-deen-ivory" dir="rtl">
          {dailyAyah.arabic}
        </p>

        <p className="text-xs text-stone-500 italic">
          "{dailyAyah.transliteration}"
        </p>

        <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
          {dailyAyah.translation[language === 'ar' ? 'en' : language] || dailyAyah.translation.en}
        </p>

        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400">
          <span>Surah {dailyAyah.surahName} ({dailyAyah.verseKey})</span>
          <Link to={`/quran/surah/${dailyAyah.surahNumber}`} className="text-deen-emerald hover:underline">
            Read Surah
          </Link>
        </div>
      </div>

      {/* Daily Worship Check-In (Deen Tracker) */}
      <div className="bg-white dark:bg-deen-charcoal-card rounded-2xl p-4 shadow-sm border border-emerald-900/10 dark:border-emerald-800/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-deen-emerald" />
            <h3 className="text-sm font-bold text-deen-forest dark:text-deen-ivory">
              {t('todayHabits')}
            </h3>
          </div>
          <Link to="/tracker" className="text-xs text-deen-emerald hover:underline font-medium">
            View Analytics
          </Link>
        </div>

        {/* 4 Pillars Daily Metric Strip */}
        {todayLog && (
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <Link
              to="/salah"
              className="p-2 rounded-xl bg-emerald-50 dark:bg-deen-charcoal border border-emerald-900/10 dark:border-emerald-800/20"
            >
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">Prayers</span>
              <span className="text-xs font-bold text-deen-emerald">
                {Object.values(todayLog.prayers).filter(Boolean).length} / 5
              </span>
            </Link>

            <Link
              to="/quran"
              className="p-2 rounded-xl bg-emerald-50 dark:bg-deen-charcoal border border-emerald-900/10 dark:border-emerald-800/20"
            >
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">Quran</span>
              <span className="text-xs font-bold text-deen-emerald">
                {todayLog.quranPages || 0} pages
              </span>
            </Link>

            <Link
              to="/calendar"
              className="p-2 rounded-xl bg-emerald-50 dark:bg-deen-charcoal border border-emerald-900/10 dark:border-emerald-800/20"
            >
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">Fasting</span>
              <span className={`text-xs font-bold ${todayLog.fasted ? 'text-amber-500' : 'text-stone-400'}`}>
                {todayLog.fasted ? 'Fasting' : 'None'}
              </span>
            </Link>
          </div>
        )}

        {todayLog && (
          <div className="grid grid-cols-5 gap-2 pt-1 border-t border-stone-100 dark:border-stone-800/60">
            {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((pKey) => {
              const isChecked = todayLog.prayers[pKey];
              return (
                <button
                  key={pKey}
                  onClick={() => handleTogglePrayer(pKey)}
                  className={`p-2.5 rounded-xl flex flex-col items-center justify-center transition-all ${
                    isChecked
                      ? 'bg-deen-emerald text-white shadow-sm'
                      : 'bg-stone-100 dark:bg-deen-charcoal text-stone-500 hover:bg-stone-200'
                  }`}
                >
                  <span className="text-[11px] capitalize font-medium">{pKey}</span>
                  <CheckCircle2 className={`w-4 h-4 mt-1 ${isChecked ? 'text-white' : 'text-stone-300 dark:text-stone-600'}`} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Hadith of the Day Card */}
      <div className="bg-white dark:bg-deen-charcoal-card rounded-2xl p-5 shadow-sm border border-emerald-900/10 dark:border-emerald-800/20 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-deen-gold" />
            <span className="text-xs font-bold text-deen-forest dark:text-deen-ivory">
              {t('dailyHadith')}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            {dailyHadith.grade}
          </span>
        </div>

        <p className="font-arabic text-base text-right leading-relaxed text-stone-800 dark:text-stone-200" dir="rtl">
          {dailyHadith.arabicText}
        </p>

        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
          "{dailyHadith.englishText}"
        </p>

        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400">
          <span>{dailyHadith.reference}</span>
          <Link to="/hadith" className="text-deen-emerald hover:underline">
            Explore Hadith
          </Link>
        </div>
      </div>

      {/* Ramadan Countdown Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-900/20 to-deen-forest/30 border border-deen-gold/30 p-4 flex items-center justify-between">
        <IslamicPattern opacity={0.06} />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-deen-gold/20 flex items-center justify-center shrink-0">
            <CalendarIcon className="w-5 h-5 text-deen-gold-light" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-deen-forest dark:text-deen-ivory">
              {t('ramadanCountdown')}
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Prepare for the month of blessing and mercy
            </p>
          </div>
        </div>
        <div className="relative z-10 text-right">
          <span className="text-2xl font-black text-deen-gold font-mono">
            {ramadanDaysLeft}
          </span>
          <span className="text-[10px] text-stone-400 block uppercase font-medium">Days</span>
        </div>
      </div>
    </div>
  );
};
