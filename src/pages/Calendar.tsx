// ==============================================================================
// DEEN — Islamic Hijri Calendar, Moon Sighting & Fasting Tracker (Sawm)
// Calculated vs Observed Moon Sighting, Sacred Events & Fasting Log
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Moon,
  AlertCircle,
  CheckCircle2,
  Plus,
  Sparkles,
  Info,
  CalendarCheck,
  Flame,
  Award
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { getLocalHijriEstimate } from '@/services/prayerService';
import {
  saveFastingRecord,
  getFastingRecords,
  deleteFastingRecord,
  getDailyDeenLog,
  saveDailyDeenLog
} from '@/services/dbService';
import { syncUserData } from '@/services/syncService';
import { IslamicPattern } from '@/components/common/IslamicPattern';
import { FastingRecord, DailyDeenLog } from '@/types';

export const ISLAMIC_EVENTS = [
  { name: 'Islamic New Year (1st Muharram)', month: 'Muharram', day: 1, desc: 'Beginning of the new Hijri calendar year' },
  { name: 'Day of Ashura (10th Muharram)', month: 'Muharram', day: 10, desc: 'Recommended fast; salvation of Prophet Musa (AS) and Children of Israel' },
  { name: 'Mawlid an-Nabi (12th Rabi’ al-Awwal)', month: "Rabi' al-Awwal", day: 12, desc: 'Birth of Prophet Muhammad (ﷺ)' },
  { name: 'Isra and Mi’raj (27th Rajab)', month: 'Rajab', day: 27, desc: 'The Miraculous Night Journey and Heavenly Ascension' },
  { name: 'Laylat al-Bara’ah (15th Sha’ban)', month: "Sha'ban", day: 15, desc: 'Night of repentance and forgiveness before Ramadan' },
  { name: 'Start of Ramadan (1st Ramadan)', month: 'Ramadan', day: 1, desc: 'Beginning of the holy month of fasting, taraweeh and Quran' },
  { name: 'Laylat al-Qadr (The Night of Decree)', month: 'Ramadan', day: 27, desc: 'Better than a thousand months (odd nights of last 10 days)' },
  { name: 'Eid ul-Fitr (1st Shawwal)', month: 'Shawwal', day: 1, desc: 'Joyful celebration marking the end of Ramadan fasting' },
  { name: 'The Day of Arafah (9th Dhul-Hijjah)', month: 'Dhu al-Hijjah', day: 9, desc: 'Pinnacle day of Hajj; expiates sins of two years for fasting non-pilgrims' },
  { name: 'Eid ul-Adha (10th Dhul-Hijjah)', month: 'Dhu al-Hijjah', day: 10, desc: 'The Feast of the Sacrifice honoring Ibrahim & Ismail (AS)' }
];

export const Calendar: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'events' | 'fasting'>('events');
  const [dayOffset, setDayOffset] = useState<number>(() => {
    return Number(localStorage.getItem('deen_hijri_day_offset')) || 0;
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const now = new Date();
  const hijri = getLocalHijriEstimate(now, dayOffset);

  // Fasting Tracker State
  const [fastingRecords, setFastingRecords] = useState<FastingRecord[]>([]);
  const [isFastingToday, setIsFastingToday] = useState<boolean>(false);
  const [selectedFastType, setSelectedFastType] = useState<FastingRecord['fastType']>('voluntary');

  // Check if today is a recommended Sunnah fasting day
  const isMondayOrThursday = now.getDay() === 1 || now.getDay() === 4;
  const dayNum = Number(hijri.day);
  const isWhiteDay = dayNum === 13 || dayNum === 14 || dayNum === 15;
  const isAshura = hijri.month.number === 1 && dayNum === 10;
  const isArafah = hijri.month.number === 12 && dayNum === 9;
  const isRamadanMonth = hijri.month.number === 9;

  useEffect(() => {
    getFastingRecords().then(records => {
      setFastingRecords(records);
      const todayRecord = records.find(r => r.date === todayStr);
      if (todayRecord) {
        setIsFastingToday(todayRecord.completed);
        setSelectedFastType(todayRecord.fastType);
      } else if (isRamadanMonth) {
        setSelectedFastType('ramadan');
      } else if (isWhiteDay) {
        setSelectedFastType('white_days');
      } else if (isMondayOrThursday) {
        setSelectedFastType('sunnah_monday_thursday');
      }
    });
  }, [todayStr, isRamadanMonth, isWhiteDay, isMondayOrThursday]);

  const handleOffsetChange = (delta: number) => {
    const newOffset = dayOffset + delta;
    setDayOffset(newOffset);
    localStorage.setItem('deen_hijri_day_offset', String(newOffset));
  };

  const handleToggleTodayFast = async () => {
    const nextStatus = !isFastingToday;
    setIsFastingToday(nextStatus);

    if (nextStatus) {
      const record: FastingRecord = {
        date: todayStr,
        fastType: selectedFastType,
        completed: true
      };
      await saveFastingRecord(record);
      setFastingRecords(prev => [record, ...prev.filter(r => r.date !== todayStr)]);
    } else {
      await deleteFastingRecord(todayStr);
      setFastingRecords(prev => prev.filter(r => r.date !== todayStr));
    }

    // Also update daily deen log
    const todayLog = await getDailyDeenLog(todayStr);
    todayLog.fasted = nextStatus;
    todayLog.fastType = nextStatus ? selectedFastType : undefined;
    await saveDailyDeenLog(todayLog);

    if (user.id) {
      syncUserData(user.id);
    }
  };

  const completedFastsCount = fastingRecords.filter(r => r.completed).length;

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
          {t('calendar')} & Fasting Tracker
        </h1>
        <p className="text-xs text-stone-500">
          Islamic Lunar Calendar (1447 AH) & Voluntary Sunnah Fasts
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-stone-200/60 dark:bg-deen-charcoal p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'events'
              ? 'bg-white dark:bg-deen-charcoal-card text-deen-emerald shadow-sm'
              : 'text-stone-500'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Hijri & Sighting</span>
        </button>

        <button
          onClick={() => setActiveTab('fasting')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'fasting'
              ? 'bg-white dark:bg-deen-charcoal-card text-deen-emerald shadow-sm'
              : 'text-stone-500'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>Fasting Tracker ({completedFastsCount})</span>
        </button>
      </div>

      {/* Hijri Calendar Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deen-forest via-deen-forest-light to-deen-emerald text-white p-6 shadow-xl border border-emerald-700/30 text-center">
        <IslamicPattern opacity={0.08} />

        <span className="font-arabic text-3xl font-bold text-deen-gold-accent block mb-1">
          {hijri.month.ar} {hijri.year} هـ
        </span>

        <h2 className="text-xl font-black">
          {hijri.day} {hijri.month.en} {hijri.year} AH
        </h2>

        <p className="text-xs text-emerald-200 mt-1">
          {now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {/* Local Moon Sighting Offset Controls */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="text-left">
            <span className="text-emerald-200 text-[11px] block font-semibold">Local Moon Sighting Offset</span>
            <span className="text-[10px] text-emerald-300/80">Adjust to match your country’s Ru’yah</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOffsetChange(-1)}
              className="w-7 h-7 rounded-xl bg-black/20 hover:bg-black/40 text-white flex items-center justify-center font-bold transition-colors"
              title="Minus 1 day"
            >
              -
            </button>
            <span className="font-mono font-bold text-deen-gold-accent w-7 text-center">
              {dayOffset > 0 ? `+${dayOffset}` : dayOffset}d
            </span>
            <button
              onClick={() => handleOffsetChange(1)}
              className="w-7 h-7 rounded-xl bg-black/20 hover:bg-black/40 text-white flex items-center justify-center font-bold transition-colors"
              title="Plus 1 day"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: Hijri Events & Moon Sighting Details */}
      {activeTab === 'events' && (
        <div className="space-y-3">
          {/* Sighting vs Calculated Explanation Notice */}
          <div className="bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-deen-emerald font-bold">
              <Info className="w-4 h-4 shrink-0" />
              <span>Calculated vs. Moon Sighting Observation</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-[11px]">
              • <strong>Astronomical Calculation (Umm al-Qura):</strong> Computes the exact celestial conjunction of the moon.
            </p>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-[11px]">
              • <strong>Local Moon Sighting (Ru’yah):</strong> Many regions follow naked-eye or telescopic sighting of the crescent (Hilal). Use the <strong>Offset (+/-)</strong> control above to synchronize with your regional Hilal committee.
            </p>
          </div>

          {/* Major Islamic Holy Events */}
          <div className="space-y-2 pt-1">
            <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
              Sacred Dates & Holidays (1447 AH)
            </h3>

            <div className="space-y-2">
              {ISLAMIC_EVENTS.map((event, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm flex items-start justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-bold text-deen-forest dark:text-deen-ivory">
                      {event.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                      {event.desc}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-deen-emerald/10 text-deen-emerald block">
                      {event.day} {event.month}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Fasting Tracker (Sawm) */}
      {activeTab === 'fasting' && (
        <div className="space-y-4">
          {/* Today's Fasting Check-in Card */}
          <div className="bg-white dark:bg-deen-charcoal-card rounded-2xl p-4 border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                  Today's Fast (Sawm)
                </span>
                <h3 className="text-sm font-bold text-deen-forest dark:text-deen-ivory">
                  {isFastingToday ? 'You are Fasting Today, Alhamdulillah' : 'Are you fasting today?'}
                </h3>
              </div>

              <button
                onClick={handleToggleTodayFast}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                  isFastingToday
                    ? 'bg-deen-emerald text-white'
                    : 'bg-stone-100 dark:bg-deen-charcoal text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isFastingToday ? 'text-white' : 'text-stone-400'}`} />
                <span>{isFastingToday ? 'Fasting Logged' : 'Mark Fasting'}</span>
              </button>
            </div>

            {/* Fast Type Selector */}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
              <label className="text-[11px] font-semibold text-stone-500 block mb-1.5">
                Fast Category / Intention (Niyyah)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'ramadan', label: 'Ramadan (Fard)' },
                  { id: 'sunnah_monday_thursday', label: 'Mon/Thu (Sunnah)' },
                  { id: 'white_days', label: 'White Days (13, 14, 15)' },
                  { id: 'qaza', label: 'Qaza (Make-up)' },
                  { id: 'ashura', label: 'Ashura / Arafah' },
                  { id: 'voluntary', label: 'Voluntary (Nafl)' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedFastType(type.id as any)}
                    className={`p-2 rounded-xl text-[11px] font-semibold text-left border transition-all ${
                      selectedFastType === type.id
                        ? 'bg-deen-emerald/10 border-deen-emerald text-deen-emerald'
                        : 'bg-stone-50 dark:bg-deen-charcoal border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sunnah Opportunity Reminder Banner */}
            {(isMondayOrThursday || isWhiteDay || isAshura || isArafah) && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 flex items-center gap-2 text-amber-800 dark:text-amber-200 text-xs">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  {isWhiteDay
                    ? `Blessed White Day (${hijri.day} ${hijri.month.en}): Fasting these 3 days expiates the year.`
                    : isMondayOrThursday
                    ? 'Sunnah Fasting Day: Deeds are presented to Allah on Mondays & Thursdays.'
                    : 'Highly Recommended Sacred Sunnah Fast Today.'}
                </span>
              </div>
            )}
          </div>

          {/* Fasting Streak & Annual Total */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-center shadow-sm">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                Total Fasts Completed
              </span>
              <span className="text-2xl font-black text-deen-emerald font-mono block mt-0.5">
                {completedFastsCount}
              </span>
              <span className="text-[10px] text-stone-400">in 1447 AH</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-center shadow-sm">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                White Days (13, 14, 15)
              </span>
              <span className="text-2xl font-black text-amber-500 font-mono block mt-0.5">
                3
              </span>
              <span className="text-[10px] text-stone-400">Days per Hijri Month</span>
            </div>
          </div>

          {/* Past Fasts Log */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
              Recent Fasting Log
            </h4>

            {fastingRecords.length > 0 ? (
              <div className="space-y-2">
                {fastingRecords.slice(0, 10).map((record) => (
                  <div
                    key={record.date}
                    className="p-3 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-deen-forest dark:text-deen-ivory block">
                        {record.date}
                      </span>
                      <span className="text-[10px] text-stone-400 capitalize">
                        {record.fastType.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-deen-emerald/10 text-deen-emerald">
                      Completed
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-stone-400">
                No fasts logged yet. Tap "Mark Fasting" above to record your first fast!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
