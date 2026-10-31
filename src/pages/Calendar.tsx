// ==============================================================================
// DEEN — Islamic Hijri Calendar & Holy Events Page
// ==============================================================================

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Moon, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalHijriEstimate } from '@/services/prayerService';
import { IslamicPattern } from '@/components/common/IslamicPattern';

export const ISLAMIC_EVENTS = [
  { name: 'Islamic New Year (1st Muharram)', month: 'Muharram', day: 1, desc: 'Beginning of the new Hijri calendar year' },
  { name: 'Day of Ashura (10th Muharram)', month: 'Muharram', day: 10, desc: 'Recommended fast; salvation of Prophet Musa (AS)' },
  { name: 'Mawlid an-Nabi (12th Rabi’ al-Awwal)', month: "Rabi' al-Awwal", day: 12, desc: 'Birth of Prophet Muhammad (ﷺ)' },
  { name: 'Isra and Mi’raj (27th Rajab)', month: 'Rajab', day: 27, desc: 'The Miraculous Night Journey and Heavenly Ascension' },
  { name: 'Laylat al-Bara’ah (15th Sha’ban)', month: "Sha'ban", day: 15, desc: 'Night of repentance and forgiveness' },
  { name: 'Start of Ramadan (1st Ramadan)', month: 'Ramadan', day: 1, desc: 'Beginning of the holy month of fasting and Quran' },
  { name: 'Laylat al-Qadr (The Night of Decree)', month: 'Ramadan', day: 27, desc: 'Better than a thousand months (odd nights of last 10 days)' },
  { name: 'Eid ul-Fitr (1st Shawwal)', month: 'Shawwal', day: 1, desc: 'Joyful celebration marking the end of Ramadan fasting' },
  { name: 'The Day of Arafah (9th Dhul-Hijjah)', month: 'Dhu al-Hijjah', day: 9, desc: 'The pinnacle day of Hajj; expiates sins of two years for fasting non-pilgrims' },
  { name: 'Eid ul-Adha (10th Dhul-Hijjah)', month: 'Dhu al-Hijjah', day: 10, desc: 'The Feast of the Sacrifice honoring Ibrahim & Ismail (AS)' }
];

export const Calendar: React.FC = () => {
  const { t } = useLanguage();
  const [dayOffset, setDayOffset] = useState<number>(0);

  const hijri = getLocalHijriEstimate(new Date(), dayOffset);
  const now = new Date();

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
          {t('calendar')} & Hijri Events
        </h1>
        <p className="text-xs text-stone-500">
          Islamic Lunar Calendar (1447 AH)
        </p>
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

        {/* Moon Sighting Adjustment Controls */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-emerald-200 text-[11px]">Local Moon Sighting Offset:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDayOffset(prev => prev - 1)}
              className="w-6 h-6 rounded-lg bg-black/20 text-white flex items-center justify-center font-bold"
            >
              -
            </button>
            <span className="font-mono font-bold text-deen-gold-accent">
              {dayOffset > 0 ? `+${dayOffset}` : dayOffset}d
            </span>
            <button
              onClick={() => setDayOffset(prev => prev + 1)}
              className="w-6 h-6 rounded-lg bg-black/20 text-white flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Sighting Notice */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <p>
          Islamic lunar dates are calculated based on astronomical calculations and may vary by 1–2 days depending on local physical moon sighting confirmation.
        </p>
      </div>

      {/* Major Islamic Holy Events */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
          Sacred Dates & Holidays
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
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-deen-emerald/10 text-deen-emerald">
                  {event.day} {event.month}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
