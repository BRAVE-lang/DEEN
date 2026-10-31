// ==============================================================================
// DEEN — Salah (Prayer Times, Qaza Tracker & Adhan Settings) Page
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  Clock,
  Settings,
  Calendar,
  CheckCircle,
  Plus,
  Minus,
  MapPin,
  Volume2,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  PRESET_CITIES,
  CALCULATION_METHODS,
  fetchPrayerTimes,
  getNextPrayerInfo,
  LocationCoords
} from '@/services/prayerService';
import { getQazaCounts, saveQazaCounts } from '@/services/dbService';
import { IslamicPattern } from '@/components/common/IslamicPattern';
import { PrayerTimesData, HijriDateInfo, QazaRecord, PrayerAdjustment } from '@/types';

export const Salah: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'daily' | 'qaza' | 'adjustments'>('daily');

  const [currentCity, setCurrentCity] = useState<LocationCoords>(PRESET_CITIES[0]);
  const [methodId, setMethodId] = useState<number>(4); // Umm al-Qura
  const [juristic, setJuristic] = useState<'shafii' | 'hanafi'>('shafii');
  const [adjustments, setAdjustments] = useState<PrayerAdjustment>({
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0
  });

  const [timings, setTimings] = useState<PrayerTimesData | null>(null);
  const [hijri, setHijri] = useState<HijriDateInfo | null>(null);
  const [countdown, setCountdown] = useState<string>('00:00:00');
  const [nextPrayer, setNextPrayer] = useState<string>('Fajr');
  const [qaza, setQaza] = useState<QazaRecord>({ fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0, witr: 0 });

  useEffect(() => {
    fetchPrayerTimes(currentCity, methodId, juristic, adjustments).then(res => {
      setTimings(res.timings);
      setHijri(res.hijri);
    });

    getQazaCounts().then(q => setQaza(q));
  }, [currentCity, methodId, juristic, adjustments]);

  useEffect(() => {
    const timer = setInterval(() => {
      const info = getNextPrayerInfo(currentCity, methodId, juristic, adjustments);
      setCountdown(info.formattedCountdown);
      setNextPrayer(info.nextPrayer);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentCity, methodId, juristic, adjustments]);

  const updateQaza = async (prayer: keyof QazaRecord, delta: number) => {
    const currentVal = qaza[prayer] as number;
    const newVal = Math.max(0, currentVal + delta);
    const updated = { ...qaza, [prayer]: newVal };
    setQaza(updated);
    await saveQazaCounts(updated);
  };

  const updateAdjustment = (prayer: keyof PrayerAdjustment, delta: number) => {
    setAdjustments(prev => ({
      ...prev,
      [prayer]: prev[prayer] + delta
    }));
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
            {t('salah')} & Prayer Times
          </h1>
          <p className="text-xs text-stone-500">Astronomical & verified timetable</p>
        </div>

        {/* City Selector */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 px-2.5 py-1.5 rounded-xl text-xs">
          <MapPin className="w-3.5 h-3.5 text-deen-emerald shrink-0" />
          <select
            value={currentCity.city}
            onChange={(e) => {
              const found = PRESET_CITIES.find(c => c.city === e.target.value);
              if (found) setCurrentCity(found);
            }}
            className="bg-transparent text-deen-forest dark:text-deen-ivory font-medium focus:outline-none cursor-pointer text-xs"
          >
            {PRESET_CITIES.map(c => (
              <option key={c.city} value={c.city} className="bg-deen-charcoal text-white">
                {c.city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-stone-200/60 dark:bg-deen-charcoal p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'daily'
              ? 'bg-white dark:bg-deen-charcoal-card text-deen-emerald shadow-sm'
              : 'text-stone-500'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Daily Times</span>
        </button>

        <button
          onClick={() => setActiveTab('qaza')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'qaza'
              ? 'bg-white dark:bg-deen-charcoal-card text-deen-emerald shadow-sm'
              : 'text-stone-500'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Qaza Tracker</span>
        </button>

        <button
          onClick={() => setActiveTab('adjustments')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'adjustments'
              ? 'bg-white dark:bg-deen-charcoal-card text-deen-emerald shadow-sm'
              : 'text-stone-500'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Adjustments</span>
        </button>
      </div>

      {/* Tab: Daily Timings */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          {/* Active Countdown Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deen-forest via-deen-forest-light to-deen-emerald text-white p-5 shadow-xl border border-emerald-700/30">
            <IslamicPattern opacity={0.08} />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-emerald-200 block">
                  Next Prayer in {currentCity.city}
                </span>
                <h2 className="text-2xl font-black mt-0.5">{nextPrayer}</h2>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-deen-gold-accent block">Countdown</span>
                <span className="font-mono text-2xl font-bold">{countdown}</span>
              </div>
            </div>

            {hijri && (
              <div className="relative z-10 mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-100">
                <span>{hijri.day} {hijri.month.en} {hijri.year} AH</span>
                <span className="font-arabic font-semibold">{hijri.day} {hijri.month.ar} {hijri.year} هـ</span>
              </div>
            )}
          </div>

          {/* Timings List */}
          {timings ? (
            <div className="space-y-2">
              {[
                { name: 'Fajr', time: timings.Fajr, desc: 'Dawn to Sunrise' },
                { name: 'Sunrise', time: timings.Sunrise, desc: 'End of Fajr time' },
                { name: 'Dhuhr', time: timings.Dhuhr, desc: 'Midday to Asr' },
                { name: 'Asr', time: timings.Asr, desc: juristic === 'hanafi' ? 'Hanafi (Shadow 2x)' : 'Shafi’i (Shadow 1x)' },
                { name: 'Maghrib', time: timings.Maghrib, desc: 'Sunset / Iftar' },
                { name: 'Isha', time: timings.Isha, desc: 'Night prayer' },
              ].map((p) => {
                const isNext = p.name === nextPrayer;
                return (
                  <div
                    key={p.name}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                      isNext
                        ? 'bg-deen-emerald text-white border-deen-emerald shadow-md'
                        : 'bg-white dark:bg-deen-charcoal-card border-emerald-900/10 dark:border-emerald-800/20 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div>
                      <h3 className="text-sm font-bold flex items-center gap-2">
                        {p.name}
                        {isNext && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 bg-deen-gold text-white rounded-md font-bold">
                            Next
                          </span>
                        )}
                      </h3>
                      <p className={`text-[11px] ${isNext ? 'text-emerald-100' : 'text-stone-400'}`}>
                        {p.desc}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-base font-bold">
                        {p.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-stone-400">Loading prayer timetable...</div>
          )}
        </div>
      )}

      {/* Tab: Qaza Tracker */}
      {activeTab === 'qaza' && (
        <div className="space-y-3">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <p>
              Track and systematically make up missed obligatory prayers. All counts are saved locally and synced privately to your account.
            </p>
          </div>

          <div className="space-y-2">
            {[
              { key: 'fajr', label: 'Fajr (2 Rak’ahs Fard)' },
              { key: 'dhuhr', label: 'Dhuhr (4 Rak’ahs Fard)' },
              { key: 'asr', label: 'Asr (4 Rak’ahs Fard)' },
              { key: 'maghrib', label: 'Maghrib (3 Rak’ahs Fard)' },
              { key: 'isha', label: 'Isha (4 Rak’ahs Fard)' },
              { key: 'witr', label: 'Witr (3 Rak’ahs Wajib/Sunnah)' }
            ].map(({ key, label }) => {
              const count = qaza[key as keyof QazaRecord] as number;
              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20"
                >
                  <div>
                    <span className="text-xs font-bold text-deen-forest dark:text-deen-ivory block">
                      {label}
                    </span>
                    <span className="text-[10px] text-stone-400">Missed prayers remaining</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQaza(key as keyof QazaRecord, -1)}
                      className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 flex items-center justify-center font-bold"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-10 text-center font-mono font-bold text-sm text-deen-emerald">
                      {count}
                    </span>

                    <button
                      onClick={() => updateQaza(key as keyof QazaRecord, 1)}
                      className="w-8 h-8 rounded-xl bg-deen-emerald/10 text-deen-emerald hover:bg-deen-emerald/20 flex items-center justify-center font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Adjustments & Settings */}
      {activeTab === 'adjustments' && (
        <div className="space-y-4">
          {/* Method and School Settings */}
          <div className="bg-white dark:bg-deen-charcoal-card rounded-2xl p-4 border border-emerald-900/10 dark:border-emerald-800/20 space-y-3">
            <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
              Calculation Settings
            </h3>

            <div>
              <label className="text-[11px] font-semibold text-stone-500 block mb-1">
                Calculation Authority
              </label>
              <select
                value={methodId}
                onChange={(e) => setMethodId(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-xl bg-stone-100 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200"
              >
                {CALCULATION_METHODS.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-500 block mb-1">
                Asr Juristic Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setJuristic('shafii')}
                  className={`p-2 rounded-xl text-xs font-semibold border ${
                    juristic === 'shafii'
                      ? 'bg-deen-emerald text-white border-deen-emerald'
                      : 'bg-stone-50 dark:bg-deen-charcoal border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  Standard (Shafi'i/Hanbali/Maliki)
                </button>
                <button
                  onClick={() => setJuristic('hanafi')}
                  className={`p-2 rounded-xl text-xs font-semibold border ${
                    juristic === 'hanafi'
                      ? 'bg-deen-emerald text-white border-deen-emerald'
                      : 'bg-stone-50 dark:bg-deen-charcoal border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  Hanafi (Later Asr)
                </button>
              </div>
            </div>
          </div>

          {/* Minute Adjustments for Local Mosque Sync */}
          <div className="bg-white dark:bg-deen-charcoal-card rounded-2xl p-4 border border-emerald-900/10 dark:border-emerald-800/20 space-y-3">
            <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
              Manual Minute Adjustments (+/-)
            </h3>
            <p className="text-[11px] text-stone-400">
              Fine-tune minutes to match your local neighborhood mosque timetable exactly.
            </p>

            {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((pKey) => {
              const val = adjustments[pKey];
              return (
                <div key={pKey} className="flex items-center justify-between py-1">
                  <span className="text-xs font-semibold capitalize text-stone-700 dark:text-stone-300">
                    {pKey}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateAdjustment(pKey, -1)}
                      className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-mono text-xs font-bold text-deen-emerald">
                      {val > 0 ? `+${val}` : val}m
                    </span>
                    <button
                      onClick={() => updateAdjustment(pKey, 1)}
                      className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
