// ==============================================================================
// DEEN — Digital Tasbeeh Counter Page
// Tactile Haptic Vibration, Audio Bead Click, Sunnah Presets & Custom Adhkar
// Preserves Core Interface with Multi-User Cloud Sync, Goals & Statistics
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  Undo2,
  Sparkles,
  Plus,
  History,
  CheckCircle2,
  Volume2,
  VolumeX,
  Vibrate,
  BarChart2,
  X,
  Target,
  Trash2,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { DhikrPreset, TasbeehSession } from '@/types';
import { saveTasbeehSession, getTasbeehSessions, getDeenDB, getDailyDeenLog, saveDailyDeenLog } from '@/services/dbService';
import { syncUserData } from '@/services/syncService';
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
  const { user } = useAuth();

  const [customPresets, setCustomPresets] = useState<DhikrPreset[]>([]);
  const [selectedDhikr, setSelectedDhikr] = useState<DhikrPreset>(SUNNAH_DHIKR_PRESETS[0]);
  const [count, setCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('deen_active_tasbeeh_count');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [previousCount, setPreviousCount] = useState<number>(0);
  const [history, setHistory] = useState<TasbeehSession[]>([]);

  // Modals & Controls
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Sound & Vibration Settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('deen_tasbeeh_sound') === 'true';
  });
  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(() => {
    return localStorage.getItem('deen_tasbeeh_vibration') !== 'false';
  });

  // Daily Goal
  const [dailyGoal, setDailyGoal] = useState<number>(() => {
    const saved = localStorage.getItem('deen_tasbeeh_daily_goal');
    return saved ? Number(saved) : 500;
  });

  // New Custom Dhikr Form
  const [newTitle, setNewTitle] = useState<string>('');
  const [newArabic, setNewArabic] = useState<string>('');
  const [newTarget, setNewTarget] = useState<number>(33);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Load History & Custom Presets from IndexedDB
  useEffect(() => {
    getTasbeehSessions().then(list => setHistory(list));
    getDeenDB().then(async (db) => {
      const customs = await db.getAll('custom_dhikr');
      if (customs && customs.length > 0) {
        const mapped: DhikrPreset[] = customs.map(c => ({
          id: c.id,
          arabic: c.arabic,
          transliteration: c.title,
          translation: { en: c.title, hi: c.title, gu: c.title },
          target: c.target || 33,
          isSunnah: false,
          reference: 'Personal Dhikr Target',
          reward: 'Continuous remembrance of Allah.'
        }));
        setCustomPresets(mapped);
      }
    });
  }, []);

  // Save in-progress count to local storage for session recovery
  useEffect(() => {
    localStorage.setItem('deen_active_tasbeeh_count', String(count));
  }, [count]);

  // Audio Click Feedback via Web Audio API
  const playBeadClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // 880Hz crisp soft click
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
  };

  const triggerHaptic = () => {
    if (vibrationEnabled && 'vibrate' in navigator) {
      try {
        navigator.vibrate(18); // Gentle 18ms tactile pulse
      } catch {}
    }
  };

  const handleIncrement = () => {
    setPreviousCount(count);
    const newCount = count + 1;
    setCount(newCount);
    triggerHaptic();
    playBeadClickSound();

    // Reached Target Celebration
    if (newCount === selectedDhikr.target) {
      if (vibrationEnabled && 'vibrate' in navigator) {
        try {
          navigator.vibrate([40, 60, 40]);
        } catch {}
      }
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      // Save Session
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

      // Update Daily Deen Log Dhikr Count
      const todayStr = new Date().toISOString().split('T')[0];
      getDailyDeenLog(todayStr).then(dLog => {
        dLog.dhikrCount = (dLog.dhikrCount || 0) + newCount;
        saveDailyDeenLog(dLog);
      });

      if (!user.isGuest) {
        syncUserData(user.id);
      }
    }
  };

  const handleUndo = () => {
    setCount(previousCount);
    triggerHaptic();
  };

  const confirmReset = () => {
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
      if (!user.isGuest) {
        syncUserData(user.id);
      }
    }
    setCount(0);
    setPreviousCount(0);
    setShowResetConfirm(false);
  };

  const handleResetClick = () => {
    if (count >= 5) {
      setShowResetConfirm(true);
    } else {
      setCount(0);
      setPreviousCount(0);
    }
  };

  const handleAddCustomDhikr = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newId = 'custom-' + Date.now();
    const customItem: DhikrPreset = {
      id: newId,
      arabic: newArabic.trim() || 'ذِكْر',
      transliteration: newTitle.trim(),
      translation: { en: newTitle.trim(), hi: newTitle.trim(), gu: newTitle.trim() },
      target: newTarget > 0 ? newTarget : 33,
      isSunnah: false,
      reference: 'Personal Dhikr Target',
      reward: 'Continuous remembrance of Allah.'
    };

    // Save to IndexedDB
    const db = await getDeenDB();
    await db.put('custom_dhikr', {
      id: newId,
      title: newTitle.trim(),
      arabic: newArabic.trim(),
      transliteration: newTitle.trim(),
      target: newTarget
    });

    setCustomPresets(prev => [...prev, customItem]);
    setSelectedDhikr(customItem);
    setCount(0);
    setPreviousCount(0);
    setShowCustomModal(false);
    setNewTitle('');
    setNewArabic('');
  };

  // Statistics
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySessions = history.filter(s => s.date === todayStr);
  const todayTotalCount = todaySessions.reduce((acc, s) => acc + s.count, 0) + count;
  const lifetimeTotalCount = history.reduce((acc, s) => acc + s.count, 0) + count;
  const progressPercent = Math.min(100, Math.round((count / selectedDhikr.target) * 100));
  const dailyGoalPercent = Math.min(100, Math.round((todayTotalCount / dailyGoal) * 100));

  const allPresets = [...SUNNAH_DHIKR_PRESETS, ...customPresets];

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

        <div className="flex items-center gap-1.5">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              localStorage.setItem('deen_tasbeeh_sound', String(next));
            }}
            className={`p-2 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-deen-emerald/10 text-deen-emerald border-deen-emerald/20'
                : 'bg-white dark:bg-deen-charcoal-card text-stone-400 border-emerald-900/10 dark:border-emerald-800/20'
            }`}
            title="Toggle Bead Sound"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Vibration Toggle */}
          <button
            onClick={() => {
              const next = !vibrationEnabled;
              setVibrationEnabled(next);
              localStorage.setItem('deen_tasbeeh_vibration', String(next));
            }}
            className={`p-2 rounded-xl border transition-colors ${
              vibrationEnabled
                ? 'bg-deen-emerald/10 text-deen-emerald border-deen-emerald/20'
                : 'bg-white dark:bg-deen-charcoal-card text-stone-400 border-emerald-900/10 dark:border-emerald-800/20'
            }`}
            title="Toggle Haptic Vibration"
          >
            <Vibrate className="w-3.5 h-3.5" />
          </button>

          {/* History Button */}
          <button
            onClick={() => setShowHistoryModal(true)}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-deen-emerald transition-colors shadow-sm"
          >
            <History className="w-3.5 h-3.5" />
            <span>History</span>
          </button>
        </div>
      </div>

      {/* Daily Dhikr Goal Bar */}
      <div className="p-3 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-deen-emerald" />
            Today's Adhkar: {todayTotalCount} / {dailyGoal}
          </span>
          <span className="font-mono font-bold text-deen-emerald">{dailyGoalPercent}%</span>
        </div>
        <div className="w-full bg-stone-100 dark:bg-deen-charcoal h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-deen-emerald to-deen-gold h-full rounded-full transition-all duration-300"
            style={{ width: `${dailyGoalPercent}%` }}
          />
        </div>
      </div>

      {/* Preset Adhkar Horizontal Carousel */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none items-center">
        {allPresets.map((d) => {
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
              <span className="text-xs font-bold block mt-0.5 truncate max-w-[140px]">
                {d.transliteration}
              </span>
            </button>
          );
        })}

        {/* Add Custom Dhikr Button */}
        <button
          onClick={() => setShowCustomModal(true)}
          className="px-3 py-2.5 rounded-2xl shrink-0 text-xs font-semibold bg-stone-50 dark:bg-deen-charcoal border border-dashed border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-deen-emerald hover:text-deen-emerald transition-colors flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Dhikr</span>
        </button>
      </div>

      {/* Active Dhikr Display Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-deen-charcoal-card p-6 border border-emerald-900/10 dark:border-emerald-800/20 text-center shadow-sm space-y-2">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
            selectedDhikr.isSunnah
              ? 'bg-emerald-500/10 text-deen-emerald'
              : 'bg-deen-gold/15 text-deen-gold-dark dark:text-deen-gold-light'
          }`}
        >
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
      <div className="flex flex-col items-center justify-center my-3">
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
          onClick={handleResetClick}
          disabled={count === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 text-xs font-semibold text-rose-600 dark:text-rose-400 disabled:opacity-40 hover:bg-stone-50 transition-colors shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('reset')}</span>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-deen-charcoal rounded-3xl p-5 space-y-3 shadow-2xl text-xs">
            <h3 className="font-bold text-sm text-deen-forest dark:text-deen-ivory">
              Save and Reset Counter?
            </h3>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              You have counted <strong>{count}</strong> {selectedDhikr.transliteration}. Resetting will save this session to your history and return the counter to 0.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded-xl bg-stone-100 dark:bg-deen-charcoal-card text-stone-700 dark:text-stone-300 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700"
              >
                Save & Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Dhikr Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-deen-charcoal rounded-3xl p-5 space-y-3.5 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-sm text-deen-forest dark:text-deen-ivory">
                Create Custom Dhikr
              </h3>
              <button onClick={() => setShowCustomModal(false)} className="text-stone-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomDhikr} className="space-y-3">
              <div>
                <label className="text-stone-500 block mb-1">Dhikr Name / Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Hasbunallahu wa ni'mal wakeel"
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal-card border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200"
                />
              </div>

              <div>
                <label className="text-stone-500 block mb-1">Arabic Text (optional)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={newArabic}
                  onChange={(e) => setNewArabic(e.target.value)}
                  placeholder="حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ"
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal-card border border-stone-200 dark:border-stone-700 font-arabic text-right text-stone-800 dark:text-stone-200"
                />
              </div>

              <div>
                <label className="text-stone-500 block mb-1">Target Count</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={newTarget}
                  onChange={(e) => setNewTarget(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal-card border border-stone-200 dark:border-stone-700 font-mono text-stone-800 dark:text-stone-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-deen-emerald text-white font-semibold text-xs mt-2"
              >
                Add Dhikr
              </button>
            </form>
          </div>
        </div>
      )}

      {/* History & Statistics Drawer Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-3">
          <div className="w-full max-w-md bg-white dark:bg-deen-charcoal rounded-3xl p-5 max-h-[80vh] overflow-y-auto space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-sm text-deen-forest dark:text-deen-ivory flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-deen-emerald" />
                Tasbeeh History & Statistics
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-xs text-deen-emerald font-semibold"
              >
                Close
              </button>
            </div>

            {/* Statistics Banner */}
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-deen-charcoal-card border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] text-stone-400 uppercase block">Today's Total</span>
                <span className="text-lg font-bold font-mono text-deen-emerald">{todayTotalCount}</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-deen-charcoal-card border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] text-stone-400 uppercase block">Lifetime Total</span>
                <span className="text-lg font-bold font-mono text-deen-gold-dark dark:text-deen-gold-light">
                  {lifetimeTotalCount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Session History List */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                Saved Sessions
              </span>
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
                <p className="text-xs text-stone-400 text-center py-6">No saved sessions yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
