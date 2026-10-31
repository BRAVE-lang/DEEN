// ==============================================================================
// DEEN — Prayer Times, Adhan & Astronomical Calculation Service
// Dual Engine: AlAdhan API + Standalone Batoul Apps Adhan Algorithm
// ==============================================================================

import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';
import { PrayerTimesData, HijriDateInfo, PrayerAdjustment } from '@/types';

export interface LocationCoords {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

export const PRESET_CITIES: LocationCoords[] = [
  { city: 'Mecca', country: 'Saudi Arabia', latitude: 21.4225, longitude: 39.8262 },
  { city: 'Medina', country: 'Saudi Arabia', latitude: 24.5247, longitude: 39.5692 },
  { city: 'Jerusalem', country: 'Palestine', latitude: 31.7683, longitude: 35.2137 },
  { city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
  { city: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.0060 },
  { city: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708 },
  { city: 'Istanbul', country: 'Turkey', latitude: 41.0082, longitude: 28.9784 },
  { city: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357 },
  { city: 'Mumbai', country: 'India', latitude: 19.0760, longitude: 72.8777 },
  { city: 'Ahmedabad', country: 'India', latitude: 23.0225, longitude: 72.5714 },
  { city: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090 },
  { city: 'Karachi', country: 'Pakistan', latitude: 24.8607, longitude: 67.0011 },
  { city: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.1390, longitude: 101.6869 },
  { city: 'Jakarta', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456 }
];

export const CALCULATION_METHODS = [
  { id: 4, name: 'Umm al-Qura University, Makkah', adhanMethod: CalculationMethod.UmmAlQura },
  { id: 3, name: 'Muslim World League (MWL)', adhanMethod: CalculationMethod.MuslimWorldLeague },
  { id: 2, name: 'Islamic Society of North America (ISNA)', adhanMethod: CalculationMethod.NorthAmerica },
  { id: 5, name: 'Egyptian General Authority of Survey', adhanMethod: CalculationMethod.Egyptian },
  { id: 1, name: 'University of Islamic Sciences, Karachi', adhanMethod: CalculationMethod.Karachi },
  { id: 8, name: 'Gulf / Dubai', adhanMethod: CalculationMethod.Dubai },
  { id: 9, name: 'Kuwait', adhanMethod: CalculationMethod.Kuwait },
  { id: 10, name: 'Qatar', adhanMethod: CalculationMethod.Qatar },
  { id: 11, name: 'Majlis Ugama Islam Singapura (MUIS)', adhanMethod: CalculationMethod.Singapore },
  { id: 13, name: 'Diyanet İşleri Başkanlığı, Turkey', adhanMethod: CalculationMethod.Turkey }
];

/**
 * Format a Date object into HH:mm (24h or 12h)
 */
export function formatTime(date: Date, use12h: boolean = true): string {
  if (!date || isNaN(date.getTime())) return '--:--';
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: use12h,
  });
}

/**
 * Calculate prayer times locally using high-precision astronomical algorithm
 * Works 100% offline without network connectivity
 */
export function calculateLocalPrayerTimes(
  coords: { latitude: number; longitude: number },
  date: Date = new Date(),
  methodId: number = 4,
  juristic: 'shafii' | 'hanafi' = 'shafii',
  adjustments: PrayerAdjustment = { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
): { timings: PrayerTimesData; prayerTimesInstance: PrayerTimes } {
  const coordinates = new Coordinates(coords.latitude, coords.longitude);
  const foundMethod = CALCULATION_METHODS.find(m => m.id === methodId);
  const params = (foundMethod?.adhanMethod || CalculationMethod.UmmAlQura)();

  params.madhab = juristic === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;

  const prayerTimes = new PrayerTimes(coordinates, date, params);

  // Apply minute adjustments
  const applyOffset = (d: Date, mins: number) => new Date(d.getTime() + mins * 60000);

  const adjustedFajr = applyOffset(prayerTimes.fajr, adjustments.fajr);
  const adjustedSunrise = prayerTimes.sunrise;
  const adjustedDhuhr = applyOffset(prayerTimes.dhuhr, adjustments.dhuhr);
  const adjustedAsr = applyOffset(prayerTimes.asr, adjustments.asr);
  const adjustedMaghrib = applyOffset(prayerTimes.maghrib, adjustments.maghrib);
  const adjustedIsha = applyOffset(prayerTimes.isha, adjustments.isha);

  return {
    timings: {
      Fajr: formatTime(adjustedFajr),
      Sunrise: formatTime(adjustedSunrise),
      Dhuhr: formatTime(adjustedDhuhr),
      Asr: formatTime(adjustedAsr),
      Maghrib: formatTime(adjustedMaghrib),
      Isha: formatTime(adjustedIsha)
    },
    prayerTimesInstance: prayerTimes
  };
}

/**
 * Fetch prayer times from AlAdhan API with local fallback
 */
export async function fetchPrayerTimes(
  coords: LocationCoords,
  methodId: number = 4,
  juristic: 'shafii' | 'hanafi' = 'shafii',
  adjustments: PrayerAdjustment = { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
): Promise<{ timings: PrayerTimesData; hijri: HijriDateInfo }> {
  try {
    const school = juristic === 'hanafi' ? 1 : 0;
    const url = `https://api.aladhan.com/v1/timings?latitude=${coords.latitude}&longitude=${coords.longitude}&method=${methodId}&school=${school}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('AlAdhan API request failed');
    const json = await res.json();
    const data = json.data;

    const parseAlAdhanTime = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      const d = new Date();
      d.setHours(h, m, 0, 0);
      return d;
    };

    const applyOffset = (d: Date, mins: number) => new Date(d.getTime() + mins * 60000);

    const timings: PrayerTimesData = {
      Fajr: formatTime(applyOffset(parseAlAdhanTime(data.timings.Fajr), adjustments.fajr)),
      Sunrise: formatTime(parseAlAdhanTime(data.timings.Sunrise)),
      Dhuhr: formatTime(applyOffset(parseAlAdhanTime(data.timings.Dhuhr), adjustments.dhuhr)),
      Asr: formatTime(applyOffset(parseAlAdhanTime(data.timings.Asr), adjustments.asr)),
      Maghrib: formatTime(applyOffset(parseAlAdhanTime(data.timings.Maghrib), adjustments.maghrib)),
      Isha: formatTime(applyOffset(parseAlAdhanTime(data.timings.Isha), adjustments.isha))
    };

    const hijri: HijriDateInfo = {
      date: data.date.hijri.date,
      day: data.date.hijri.day,
      month: {
        number: data.date.hijri.month.number,
        en: data.date.hijri.month.en,
        ar: data.date.hijri.month.ar
      },
      year: data.date.hijri.year,
      designation: data.date.hijri.designation,
      holidays: data.date.hijri.holidays || []
    };

    return { timings, hijri };
  } catch (error) {
    console.warn('AlAdhan API network unavailable, using local astronomical calculation engine:', error);
    const local = calculateLocalPrayerTimes(coords, new Date(), methodId, juristic, adjustments);
    
    // Estimate Hijri date locally
    const hijri = getLocalHijriEstimate(new Date());
    return { timings: local.timings, hijri };
  }
}

/**
 * Determine the next upcoming prayer and countdown seconds
 */
export function getNextPrayerInfo(
  coords: { latitude: number; longitude: number },
  methodId: number = 4,
  juristic: 'shafii' | 'hanafi' = 'shafii',
  adjustments: PrayerAdjustment = { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
): {
  currentPrayer: string;
  nextPrayer: string;
  nextPrayerTime: Date;
  secondsRemaining: number;
  formattedCountdown: string;
} {
  const now = new Date();
  const { prayerTimesInstance } = calculateLocalPrayerTimes(coords, now, methodId, juristic, adjustments);

  const applyOffset = (d: Date, mins: number) => new Date(d.getTime() + mins * 60000);

  const schedule = [
    { name: 'Fajr', time: applyOffset(prayerTimesInstance.fajr, adjustments.fajr) },
    { name: 'Sunrise', time: prayerTimesInstance.sunrise },
    { name: 'Dhuhr', time: applyOffset(prayerTimesInstance.dhuhr, adjustments.dhuhr) },
    { name: 'Asr', time: applyOffset(prayerTimesInstance.asr, adjustments.asr) },
    { name: 'Maghrib', time: applyOffset(prayerTimesInstance.maghrib, adjustments.maghrib) },
    { name: 'Isha', time: applyOffset(prayerTimesInstance.isha, adjustments.isha) },
  ];

  let nextPrayer = schedule[0];
  let currentPrayer = 'Isha';

  for (let i = 0; i < schedule.length; i++) {
    if (now < schedule[i].time) {
      nextPrayer = schedule[i];
      currentPrayer = i > 0 ? schedule[i - 1].name : 'Isha (Previous Night)';
      break;
    }
  }

  // If passed Isha today, next prayer is Fajr tomorrow
  if (now >= schedule[schedule.length - 1].time) {
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60000);
    const tomorrowTimes = calculateLocalPrayerTimes(coords, tomorrow, methodId, juristic, adjustments);
    nextPrayer = {
      name: 'Fajr',
      time: applyOffset(tomorrowTimes.prayerTimesInstance.fajr, adjustments.fajr)
    };
    currentPrayer = 'Isha';
  }

  const diffMs = Math.max(0, nextPrayer.time.getTime() - now.getTime());
  const secondsRemaining = Math.floor(diffMs / 1000);

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const formattedCountdown = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return {
    currentPrayer,
    nextPrayer: nextPrayer.name,
    nextPrayerTime: nextPrayer.time,
    secondsRemaining,
    formattedCountdown
  };
}

/**
 * Local astronomical approximation of Hijri date (with +/- day adjustments)
 */
export function getLocalHijriEstimate(date: Date = new Date(), adjustmentDays: number = 0): HijriDateInfo {
  const adjustedDate = new Date(date.getTime() + adjustmentDays * 86400000);
  const hijriMonths = [
    { number: 1, en: 'Muharram', ar: 'مُحَرَّم' },
    { number: 2, en: 'Safar', ar: 'صَفَر' },
    { number: 3, en: "Rabi' al-Awwal", ar: 'رَبِيع الأَوَّل' },
    { number: 4, en: "Rabi' al-Thani", ar: 'رَبِيع الآخِر' },
    { number: 5, en: 'Jumada al-Awwal', ar: 'جُمَادَى الأُولَى' },
    { number: 6, en: 'Jumada al-Thani', ar: 'جُمَادَى الآخِرَة' },
    { number: 7, en: 'Rajab', ar: 'رَجَب' },
    { number: 8, en: "Sha'ban", ar: 'شَعْبَان' },
    { number: 9, en: 'Ramadan', ar: 'رَمَضَان' },
    { number: 10, en: 'Shawwal', ar: 'شَوَّال' },
    { number: 11, en: "Dhu al-Qi'dah", ar: 'ذُو القَعْدَة' },
    { number: 12, en: 'Dhu al-Hijjah', ar: 'ذُو الحِجَّة' }
  ];

  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    const parts = formatter.formatToParts(adjustedDate);
    const day = parts.find(p => p.type === 'day')?.value || '1';
    const monthNum = parseInt(parts.find(p => p.type === 'month')?.value || '1', 10);
    const year = parts.find(p => p.type === 'year')?.value || '1447';

    const monthObj = hijriMonths[(monthNum - 1) % 12] || hijriMonths[0];

    return {
      date: `${day}-${monthObj.en}-${year}`,
      day,
      month: monthObj,
      year,
      designation: { abbreviated: 'AH', expanded: 'Anno Hegirae' },
      holidays: []
    };
  } catch (e) {
    // Basic fallback
    return {
      date: '1-Ramadan-1447',
      day: '1',
      month: hijriMonths[8],
      year: '1447',
      designation: { abbreviated: 'AH', expanded: 'Anno Hegirae' },
      holidays: []
    };
  }
}
