// ==============================================================================
// DEEN — Digital Tasbeeh Counter Page
// Tactile Haptic Vibration, Sunnah Presets & Custom Adhkar
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  Undo2,
  Sparkles,
  Plus,
  History,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { DhikrPreset, TasbeehSession } from '@/types';
import { saveTasbeehSession, getTasbeehSessions } from '@/services/dbService';
import { IslamicPattern } from '@/components/common/IslamicPattern';

export const SUNNAH_DHIKR_PRESETS: DhikrPreset[] = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    translation: {
      en: 'Glory be to Allah',
      hi: 'अल्लाह पाक है',
      gu: 'અલ્લાહ પવિત્ર છે'
    },
    target: 33,
    isSunnah: true,
    reward: 'Plants a date-palm in Paradise and wipes away sins.',
    reference: 'Sahih Muslim 597'
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation: {
      en: 'All praise is due to Allah',
      hi: 'तमाम तारीफ़ें अल्लाह के लिए हैं',
      gu: 'તમામ પ્રશંસા અલ્લાહ માટે છે'
    },
    target: 33,
    isSunnah: true,
    reward: 'Fills the scale of good deeds on the Day of Judgment.',
    reference: 'Sahih Muslim 223'
  },
  {
    id: 'allahuakbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: {
      en: 'Allah is the Greatest',
      hi: 'अल्लाह सबसे बड़ा है',
      gu: 'અલ્લાહ સૌથી મહાન છે'
    },
    target: 34,
    isSunnah: true,
    reward: 'Fills what is between the heavens and the earth.',
    reference: 'Sahih al-Bukhari 3113'
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha wa atubu ilayh',
    translation: {
      en: 'I seek forgiveness of Allah and turn to Him in repentance',
      hi: 'मैं अल्लाह से माफ़ी मांगता हूँ और उसी की तरफ़ रुजू करता हूँ',
      gu: 'હું અલ્લાહ પાસે માફી માંગું છું અને તેની તરફ પસ્તાવો કરું છું'
    },
    target: 100,
    isSunnah: true,
    reward: 'The Prophet (ﷺ) sought forgiveness 100 times daily.',
    reference: 'Sahih Muslim 2702'
  },
  {
    id: 'lailahaillallah',
    arabic: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ',
    transliteration: 'La ilaha illallah wahdahu la shareeka lah',
    translation: {
      en: 'None has the right to be worshipped except Allah alone',
      hi: 'अल्लाह के सिवा कोई माबूद नहीं, वह अकेला है उसका कोई शरीक नहीं',
      gu: 'અલ્લાહ સિવાય કોઈ પૂજનીય નથી, તે એકલો છે તેનો કોઈ ભાગીદાર નથી'
    },
    target: 100,
    isSunnah: true,
    reward: 'Equivalent to freeing 10 slaves, 100 good deeds written, 100 sins erased.',
    reference: 'Sahih al-Bukhari 3293'
  },
  {
    id: 'salawat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    transliteration: 'Allahumma salli ‘ala Muhammadin wa ‘ala ali Muhammad',
    translation: {
      en: 'O Allah, send blessings upon Muhammad and upon his family',
      hi: 'ऐ अल्लाह! मुहम्मद (ﷺ) पर और उनकी आल पर रहमत नाज़िल फ़रमा',
      gu: 'હે અલ્લાહ! મુહમ્મદ (ﷺ) પર અને તેમના પરિવાર પર આશીર્વાદ વરસાવો'
    },
    target: 100,
    isSunnah: true,
    reward: 'Whoever sends blessings once, Allah sends 10 blessings upon him.',
    reference: 'Sahih Muslim 408'
  },
  {
    id: 'subhanallahi-wa-bihamdihi',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'SubhanAllahi wa bihamdihi, SubhanAllahil-Azeem',
    translation: {
      en: 'Glory be to Allah and His is the praise, Glory be to Allah the Supreme',
      hi: 'अल्लाह पाक है अपनी तारीफ़ों के साथ, अज़ीम अल्लाह पाक है',
      gu: 'અલ્લાહ તેની પ્રશંસા સાથે પવિત્ર છે, સર્વોચ્ચ અલ્લાહ પવિત્ર છે'
    },
    target: 100,
    isSunnah: true,
    reward: 'Two words light on the tongue, heavy on the scales, beloved to the Most Merciful.',
    reference: 'Sahih al-Bukhari 6406'
  }
];

export const Tasbeeh: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedDhikr, setSelectedDhikr] = useState<DhikrPreset>(SUNNAH_DHIKR_PRESETS[0]);
  const [count, setCount] = useState<number>(0);
  const [previousCount, setPreviousCount] = useState<number>(0);
  const [history, setHistory] = useState<TasbeehSession[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  useEffect(() => {
    getTasbeehSessions().then(list => setHistory(list));
  }, []);

  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(18); // Gentle 18ms tactile pulse
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleIncrement = () => {
    setPreviousCount(count);
    const newCount = count + 1;
    setCount(newCount);
    triggerHaptic();

    // Reached Target Celebration
    if (newCount === selectedDhikr.target) {
      if ('vibrate' in navigator) {
        try {
          navigator.vibrate([40, 60, 40]);
        } catch (e) {}
      }
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      // Save Session to IndexedDB
      const session: TasbeehSession = {
        id: 'session-' + Date.now(),
        dhikrId: selectedDhikr.id,
        dhikrTitle: selectedDhikr.transliteration,
        count: newCount,
        target: selectedDhikr.target,
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now()
      };
      saveTasbeehSession(session);
      setHistory(prev => [session, ...prev]);
    }
  };

  const handleUndo = () => {
    setCount(previousCount);
    triggerHaptic();
  };

  const handleReset = () => {
    if (count > 0) {
      const session: TasbeehSession = {
        id: 'session-' + Date.now(),
        dhikrId: selectedDhikr.id,
        dhikrTitle: selectedDhikr.transliteration,
        count,
        target: selectedDhikr.target,
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now()
      };
      saveTasbeehSession(session);
      setHistory(prev => [session, ...prev]);
    }
    setCount(0);
    setPreviousCount(0);
  };

  const progressPercent = Math.min(100, Math.round((count / selectedDhikr.target) * 100));

  return (
    <div className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
            {t('tasbeeh')}
          </h1>
          <p className="text-xs text-stone-500">Digital Adhkar Counter</p>
        </div>

        <button
          onClick={() => setShowHistoryModal(!showHistoryModal)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-deen-emerald transition-colors"
        >
          <History className="w-3.5 h-3.5" />
          <span>History</span>
        </button>
      </div>

      {/* Preset Adhkar Horizontal Carousel */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SUNNAH_DHIKR_PRESETS.map((d) => {
          const isSelected = selectedDhikr.id === d.id;
          return (
            <button
              key={d.id}
              onClick={() => {
                setSelectedDhikr(d);
                setCount(0);
                setPreviousCount(0);
              }}
              className={`px-3 py-2 rounded-2xl shrink-0 text-left border transition-all ${
                isSelected
                  ? 'bg-deen-emerald text-white border-deen-emerald shadow-md'
                  : 'bg-white dark:bg-deen-charcoal-card border-emerald-900/10 dark:border-emerald-800/20 text-stone-700 dark:text-stone-300'
              }`}
            >
              <span className={`text-[10px] block font-semibold ${isSelected ? 'text-emerald-100' : 'text-stone-400'}`}>
                {d.isSunnah ? 'Sunnah' : 'Custom'} • Target: {d.target}
              </span>
              <span className="text-xs font-bold block mt-0.5">{d.transliteration}</span>
            </button>
          );
        })}
      </div>

      {/* Active Dhikr Display Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-deen-charcoal-card p-6 border border-emerald-900/10 dark:border-emerald-800/20 text-center shadow-sm space-y-2">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-deen-emerald">
          {selectedDhikr.isSunnah ? 'Established Sunnah Target' : 'Personal Target'}
        </span>

        <p className="font-arabic text-2xl font-bold text-deen-forest dark:text-deen-ivory leading-loose my-2" dir="rtl">
          {selectedDhikr.arabic}
        </p>

        <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
          "{selectedDhikr.transliteration}"
        </p>

        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto">
          {selectedDhikr.translation[language === 'ar' ? 'en' : language] || selectedDhikr.translation.en}
        </p>

        <p className="text-[10px] text-deen-gold pt-2 border-t border-stone-100 dark:border-stone-800/60 font-medium">
          {selectedDhikr.reference} • {selectedDhikr.reward}
        </p>
      </div>

      {/* Giant Tactile Touch Counter Button */}
      <div className="flex flex-col items-center justify-center my-4">
        <button
          onClick={handleIncrement}
          className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-deen-forest via-deen-forest-light to-deen-emerald text-white p-4 shadow-2xl border-4 border-deen-gold/40 flex flex-col items-center justify-center transition-transform active:scale-95 group focus:outline-none"
        >
          <IslamicPattern opacity={0.12} />

          {/* Progress Ring Simulation */}
          <div className="relative z-10 text-center select-none">
            <span className="text-6xl font-black font-mono tracking-tight block text-white drop-shadow">
              {count}
            </span>
            <span className="text-xs text-emerald-200 mt-1 block font-medium">
              Target: {selectedDhikr.target} ({progressPercent}%)
            </span>
            <span className="text-[10px] uppercase tracking-wider text-deen-gold-accent mt-3 block font-bold">
              Tap Anywhere
            </span>
          </div>
        </button>
      </div>

      {/* Counter Action Controls (Undo, Reset) */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleUndo}
          disabled={count === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-xs font-semibold text-stone-600 dark:text-stone-300 disabled:opacity-40 hover:bg-stone-50 transition-colors shadow-sm"
        >
          <Undo2 className="w-4 h-4" />
          <span>{t('undo')}</span>
        </button>

        <button
          onClick={handleReset}
          disabled={count === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-xs font-semibold text-rose-600 dark:text-rose-400 disabled:opacity-40 hover:bg-stone-50 transition-colors shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('reset')}</span>
        </button>
      </div>

      {/* History Drawer Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-3">
          <div className="w-full max-w-md bg-white dark:bg-deen-charcoal rounded-3xl p-5 max-h-[75vh] overflow-y-auto space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-sm text-deen-forest dark:text-deen-ivory">
                Tasbeeh History
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-xs text-deen-emerald font-semibold"
              >
                Close
              </button>
            </div>

            {history.length > 0 ? (
              <div className="space-y-2">
                {history.map((s) => (
                  <div
                    key={s.id}
                    className="p-3 rounded-2xl bg-stone-50 dark:bg-deen-charcoal-card border border-stone-100 dark:border-stone-800 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-deen-forest dark:text-deen-ivory block">
                        {s.dhikrTitle}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {new Date(s.timestamp).toLocaleDateString()} at {new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <span className="font-mono text-sm font-bold text-deen-emerald">
                      {s.count} / {s.target}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 text-center py-8">No saved sessions yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
