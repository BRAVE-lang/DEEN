// ==============================================================================
// DEEN — Personal Deen Tracker Page (100% Private Worship Analytics)
// Recharts Visual Trends, Prayer Streaks & Private Spiritual Journal
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Calendar,
  Lock,
  Plus,
  TrendingUp,
  Heart
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useLanguage } from '@/context/LanguageContext';
import {
  getDailyDeenLog,
  saveDailyDeenLog,
  getAllDeenLogs
} from '@/services/dbService';
import { DailyDeenLog } from '@/types';

export const Tracker: React.FC = () => {
  const { t } = useLanguage();
  const todayStr = new Date().toISOString().split('T')[0];

  const [log, setLog] = useState<DailyDeenLog | null>(null);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [journalText, setJournalText] = useState<string>('');

  useEffect(() => {
    getDailyDeenLog(todayStr).then(l => {
      setLog(l);
      if (l.journalReflection) setJournalText(l.journalReflection);
    });

    getAllDeenLogs().then(allLogs => {
      // Build 7-day chart data
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const past7 = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const dStr = d.toISOString().split('T')[0];
        const found = allLogs.find(x => x.date === dStr);
        let prayersCount = 0;
        if (found) {
          prayersCount = Object.values(found.prayers).filter(Boolean).length;
        }
        return {
          day: days[d.getDay()],
          prayers: prayersCount,
          quranPages: found?.quranPages || 0
        };
      });
      setWeeklyData(past7);
    });
  }, [todayStr]);

  const togglePrayer = async (key: keyof DailyDeenLog['prayers']) => {
    if (!log) return;
    const updated = {
      ...log,
      prayers: {
        ...log.prayers,
        [key]: !log.prayers[key]
      }
    };
    setLog(updated);
    await saveDailyDeenLog(updated);
  };

  const toggleSunnah = async (key: keyof DailyDeenLog['sunnahHabits']) => {
    if (!log) return;
    const updated = {
      ...log,
      sunnahHabits: {
        ...log.sunnahHabits,
        [key]: !log.sunnahHabits[key]
      }
    };
    setLog(updated);
    await saveDailyDeenLog(updated);
  };

  const handleSaveJournal = async () => {
    if (!log) return;
    const updated = { ...log, journalReflection: journalText };
    setLog(updated);
    await saveDailyDeenLog(updated);
  };

  const completedPrayersCount = log ? Object.values(log.prayers).filter(Boolean).length : 0;

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5">
          <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
            {t('tracker')}
          </h1>
          <span className="p-1 rounded-md bg-stone-100 dark:bg-deen-charcoal text-stone-500" title="100% Private (No Public Leaderboards)">
            <Lock className="w-3.5 h-3.5" />
          </span>
        </div>
        <p className="text-xs text-stone-500">
          Your private personal worship journal & consistency tracker
        </p>
      </div>

      {/* Today's Prayers Check-in */}
      <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
            Daily Obligatory Prayers ({completedPrayersCount}/5)
          </h2>
          <span className="text-xs font-bold text-deen-emerald">
            {Math.round((completedPrayersCount / 5) * 100)}%
          </span>
        </div>

        {log && (
          <div className="grid grid-cols-5 gap-1.5">
            {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((p) => {
              const checked = log.prayers[p];
              return (
                <button
                  key={p}
                  onClick={() => togglePrayer(p)}
                  className={`p-2.5 rounded-xl flex flex-col items-center justify-center transition-all ${
                    checked
                      ? 'bg-deen-emerald text-white shadow-sm'
                      : 'bg-stone-100 dark:bg-deen-charcoal text-stone-500 hover:bg-stone-200'
                  }`}
                >
                  <span className="text-[11px] capitalize font-medium">{p}</span>
                  <CheckCircle2 className={`w-4 h-4 mt-1 ${checked ? 'text-white' : 'text-stone-300 dark:text-stone-600'}`} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Sunnah Worship & Habits */}
      <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
          Recommended Sunnah Practices
        </h3>

        {log && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { key: 'tahajjud', label: 'Tahajjud (Night Prayer)' },
              { key: 'duha', label: 'Salat al-Duha (Forenoon)' },
              { key: 'surahMulk', label: 'Surah Al-Mulk (Nightly)' },
              { key: 'surahKahf', label: 'Surah Al-Kahf (Friday)' }
            ].map(({ key, label }) => {
              const active = log.sunnahHabits[key as keyof DailyDeenLog['sunnahHabits']];
              return (
                <button
                  key={key}
                  onClick={() => toggleSunnah(key as keyof DailyDeenLog['sunnahHabits'])}
                  className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                    active
                      ? 'bg-deen-emerald/10 border-deen-emerald text-deen-emerald font-semibold'
                      : 'bg-stone-50 dark:bg-deen-charcoal/60 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span>{label}</span>
                  <CheckCircle2 className={`w-4 h-4 ${active ? 'text-deen-emerald' : 'text-stone-300'}`} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 7-Day Prayer Consistency Chart */}
      <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-deen-emerald" />
          Weekly Prayer Completion Trend
        </h3>

        <div className="h-44 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="prayers" fill="#059669" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Private Spiritual Reflections & Gratitude Journal */}
      <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-rose-500" />
          Private Reflection & Dua Requests
        </h3>

        <textarea
          rows={3}
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="Record a thought, blessing you are grateful for today, or personal supplication..."
          className="w-full text-xs p-3 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-deen-emerald"
        />

        <div className="text-right">
          <button
            onClick={handleSaveJournal}
            className="px-4 py-2 rounded-xl bg-deen-emerald hover:bg-deen-emerald-light text-white text-xs font-semibold shadow-sm transition-transform active:scale-95"
          >
            Save Reflection
          </button>
        </div>
      </div>
    </div>
  );
};
