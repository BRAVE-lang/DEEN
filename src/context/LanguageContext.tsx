// ==============================================================================
// DEEN — Multilingual Context & Translation Engine
// Supports Arabic (RTL), English (LTR), Hindi (LTR), and Gujarati (LTR)
// ==============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from '@/types';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  direction: 'ltr' | 'rtl';
  t: (key: string) => string;
}

const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    appName: 'DEEN',
    tagline: 'Every day, closer to Allah.',
    home: 'Home',
    quran: 'Quran',
    salah: 'Salah',
    explore: 'Explore',
    profile: 'Profile',
    qibla: 'Qibla',
    tasbeeh: 'Tasbeeh',
    duas: 'Duas',
    hadith: 'Hadith',
    namesOfAllah: '99 Names',
    calendar: 'Calendar',
    prophets: 'Prophets',
    learning: 'Learning',
    hajjUmrah: 'Hajj & Umrah',
    zakat: 'Zakat',
    tracker: 'Deen Tracker',
    nextPrayer: 'Next Prayer',
    countdown: 'Time Remaining',
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    dailyAyah: 'Verse of the Day',
    dailyHadith: 'Hadith of the Day',
    dailyDua: 'Supplication of the Day',
    quickDhikr: 'Quick Tasbeeh',
    readQuran: 'Read Quran',
    continueReading: 'Continue Reading',
    todayHabits: 'Daily Worship Tracker',
    ramadanCountdown: 'Ramadan Countdown',
    days: 'days',
    hours: 'hours',
    minutes: 'mins',
    search: 'Search...',
    allSurahs: 'All 114 Surahs',
    allJuz: '30 Juz',
    bookmarks: 'Bookmarks',
    qazaTracker: 'Qaza Tracker',
    calculateZakat: 'Calculate Zakat',
    selectLanguage: 'Select Language',
    settings: 'Settings',
    privacy: 'Privacy & Offline Mode',
    guestMode: 'Guest Mode Active',
    offlineReady: 'Saved for Offline Reading',
    tapToCount: 'Tap anywhere to count',
    reset: 'Reset',
    undo: 'Undo',
    target: 'Target',
    completed: 'Completed',
    sunnahCount: 'Established Sunnah',
    customDhikr: 'Custom Dhikr'
  },
  ar: {
    appName: 'دِين',
    tagline: 'كُلَّ يَوْمٍ، أَقْرَبَ إِلَى اللَّهِ.',
    home: 'الرئيسية',
    quran: 'القرآن الكريم',
    salah: 'الصلاة',
    explore: 'استكشف',
    profile: 'الملف الشخصي',
    qibla: 'القبلة',
    tasbeeh: 'المسبحة',
    duas: 'الأدعية والأذكار',
    hadith: 'الحديث النبوي',
    namesOfAllah: 'أسماء الله الحسنى',
    calendar: 'التقويم الهجري',
    prophets: 'قصص الأنبياء',
    learning: 'تعليم الصلاة والوضوء',
    hajjUmrah: 'الحج والعمرة',
    zakat: 'حاسبة الزكاة',
    tracker: 'متابعة العبادات',
    nextPrayer: 'الصلاة القادمة',
    countdown: 'الوقت المتبقي',
    fajr: 'الفجر',
    sunrise: 'الشروق',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
    dailyAyah: 'آية اليوم',
    dailyHadith: 'حديث اليوم',
    dailyDua: 'دعاء اليوم',
    quickDhikr: 'تسبيح سريع',
    readQuran: 'قراءة القرآن',
    continueReading: 'متابعة القراءة',
    todayHabits: 'سجل العبادات اليومي',
    ramadanCountdown: 'العد التنازلي لرمضان',
    days: 'أيام',
    hours: 'ساعات',
    minutes: 'دقائق',
    search: 'بحث...',
    allSurahs: 'جميع السور (114)',
    allJuz: 'الأجزاء الثلاثون',
    bookmarks: 'العلامات المرجعية',
    qazaTracker: 'قضاء الفوائت',
    calculateZakat: 'حساب الزكاة',
    selectLanguage: 'اختر اللغة',
    settings: 'الإعدادات',
    privacy: 'الخصوصية والوضع بدون إنترنت',
    guestMode: 'وضع الضيف مفعل',
    offlineReady: 'محفوظ للقراءة بدون إنترنت',
    tapToCount: 'اضغط في أي مكان للعد',
    reset: 'إعادة ضبط',
    undo: 'تراجع',
    target: 'الهدف',
    completed: 'مكتمل',
    sunnahCount: 'سنة نبوية مؤكدة',
    customDhikr: 'ذكر مخصص'
  },
  hi: {
    appName: 'दीन (DEEN)',
    tagline: 'हर दिन, अल्लाह के और करीब।',
    home: 'होम',
    quran: 'कुरआन',
    salah: 'नमाज़',
    explore: 'तलाशें',
    profile: 'प्रोफाइल',
    qibla: 'क़िबला',
    tasbeeh: 'तसबीह',
    duas: 'दुआएं व अज़कार',
    hadith: 'हदीस शरीफ़',
    namesOfAllah: 'अल्लाह के 99 नाम',
    calendar: 'इस्लामी कैलेंडर',
    prophets: 'अंबिया की कहानियां',
    learning: 'दीनी तालीम',
    hajjUmrah: 'हज व उमराह',
    zakat: 'ज़कात कैलकुलेटर',
    tracker: 'दीन ट्रैकर',
    nextPrayer: 'अगली नमाज़',
    countdown: 'बाक़ी वक़्त',
    fajr: 'फ़ज्र',
    sunrise: 'तुलू-ए-आफ़ताब',
    dhuhr: 'ज़ुहर',
    asr: 'अस्र',
    maghrib: 'मग़रिब',
    isha: 'इशा',
    dailyAyah: 'आज की आयत',
    dailyHadith: 'आज की हदीस',
    dailyDua: 'आज की दुआ',
    quickDhikr: 'फ़ौरी तसबीह',
    readQuran: 'कुरआन पढ़ें',
    continueReading: 'पढ़ना जारी रखें',
    todayHabits: 'आज की इबादत',
    ramadanCountdown: 'रमज़ान का इंतज़ार',
    days: 'दिन',
    hours: 'घंटे',
    minutes: 'मिनट',
    search: 'तलाश करें...',
    allSurahs: 'तमाम 114 सूरतें',
    allJuz: '30 पारे',
    bookmarks: 'महफ़ूज़ आयतें',
    qazaTracker: 'क़ज़ा नमाज़ें',
    calculateZakat: 'ज़कात निकालें',
    selectLanguage: 'ज़बान चुनें',
    settings: 'सेटिंग्स',
    privacy: 'गोपनीयता और ऑफ़लाइन',
    guestMode: 'गेस्ट मोड सक्रिय',
    offlineReady: 'ऑफ़लाइन के लिए तैयार',
    tapToCount: 'गिनने के लिए कहीं भी छुएं',
    reset: 'रीसेट',
    undo: 'वापस',
    target: 'मक़सद',
    completed: 'मुकम्मल',
    sunnahCount: 'सुन्नत तादाद',
    customDhikr: 'अपना ज़िक्र'
  },
  gu: {
    appName: 'દીન (DEEN)',
    tagline: 'દરેક દિવસ, અલ્લાહની વધુ નજીક.',
    home: 'હોમ',
    quran: 'કુરાન',
    salah: 'નમાઝ',
    explore: 'અન્વેષણ',
    profile: 'પ્રોફાઇલ',
    qibla: 'કિબલા',
    tasbeeh: 'તસબીહ',
    duas: 'દુઆઓ અને અઝકાર',
    hadith: 'હદીસ શરીફ',
    namesOfAllah: 'અલ્લાહના 99 નામો',
    calendar: 'ઇસ્લામિક કેલેન્ડર',
    prophets: 'પયગંબરોની વાતો',
    learning: 'ઇસ્લામિક શિક્ષણ',
    hajjUmrah: 'હજ અને ઉમરાહ',
    zakat: 'ઝકાત કેલ્ક્યુલેટર',
    tracker: 'દીન ટ્રેકર',
    nextPrayer: 'આગામી નમાઝ',
    countdown: 'બાકી સમય',
    fajr: 'ફજર',
    sunrise: 'સૂર્યોદય',
    dhuhr: 'ઝોહર',
    asr: 'અસર',
    maghrib: 'મગરિબ',
    isha: 'ઇશા',
    dailyAyah: 'આજનો પવિત્ર શ્લોક (આયત)',
    dailyHadith: 'આજની હદીસ',
    dailyDua: 'આજની દુઆ',
    quickDhikr: 'ત્વરિત તસબીહ',
    readQuran: 'કુરાન વાંચો',
    continueReading: 'વાંચન ચાલુ રાખો',
    todayHabits: 'આજની ઇબાદત',
    ramadanCountdown: 'રમઝાન કાઉન્ટડાઉન',
    days: 'દિવસ',
    hours: 'કલાક',
    minutes: 'મિનિટ',
    search: 'શોધો...',
    allSurahs: 'બધી 114 સુરાઓ',
    allJuz: '30 જુઝ (સિપારા)',
    bookmarks: 'બુકમાર્ક્સ',
    qazaTracker: 'કઝા નમાઝ',
    calculateZakat: 'ઝકાત ગણો',
    selectLanguage: 'ભાષા પસંદ કરો',
    settings: 'સેટિંગ્સ',
    privacy: 'ગોપનીયતા અને ઑફલાઇન મોડ',
    guestMode: 'ગેસ્ટ મોડ સક્રિય',
    offlineReady: 'ઑફલાઇન માટે તૈયાર',
    tapToCount: 'ગણવા માટે ગમે ત્યાં સ્પર્શ કરો',
    reset: 'રીસેટ',
    undo: 'પાછળ',
    target: 'લક્ષ્ય',
    completed: 'પૂર્ણ',
    sunnahCount: 'સુન્નત ગણતરી',
    customDhikr: 'કસ્ટમ ઝિક્ર'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('deen_language') as SupportedLanguage;
    return saved && ['en', 'ar', 'hi', 'gu'].includes(saved) ? saved : 'en';
  });

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    localStorage.setItem('deen_language', language);
  }, [language, direction]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, direction, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
