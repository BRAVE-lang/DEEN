// ==============================================================================
// DEEN — Hajj & Umrah Pilgrim Companion Page
// Grounded in Ministry of Hajj and Umrah (KSA) & Nusuk Guidelines
// ==============================================================================

import React, { useState } from 'react';
import {
  Navigation,
  Phone,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAudio } from '@/context/AudioContext';
import {
  HAJJ_STEPS,
  UMRAH_STEPS,
  TALBIYAH,
  EMERGENCY_NUMBERS
} from '@/services/hajjService';
import { HajjRitualStep } from '@/types';
import { IslamicPattern } from '@/components/common/IslamicPattern';

export const HajjUmrah: React.FC = () => {
  const { t } = useLanguage();
  const [guideMode, setGuideMode] = useState<'hajj' | 'umrah'>('hajj');
  const [selectedStep, setSelectedStep] = useState<HajjRitualStep | null>(null);

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
          {t('hajjUmrah')} Pilgrim Guide
        </h1>
        <p className="text-xs text-stone-500">
          Official Saudi Ministry & Nusuk Companion
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex bg-stone-200/60 dark:bg-deen-charcoal p-1 rounded-2xl">
        <button
          onClick={() => setGuideMode('hajj')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            guideMode === 'hajj'
              ? 'bg-white dark:bg-deen-charcoal-card text-deen-emerald shadow-sm'
              : 'text-stone-500'
          }`}
        >
          Hajj Complete Journey (7 Rites)
        </button>

        <button
          onClick={() => setGuideMode('umrah')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            guideMode === 'umrah'
              ? 'bg-white dark:bg-deen-charcoal-card text-deen-emerald shadow-sm'
              : 'text-stone-500'
          }`}
        >
          Umrah Step-by-Step (5 Rites)
        </button>
      </div>

      {/* Talbiyah Recitation Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deen-forest via-deen-forest-light to-deen-emerald text-white p-5 shadow-xl border border-emerald-700/30 text-center space-y-2">
        <IslamicPattern opacity={0.08} />
        <span className="text-[11px] uppercase tracking-wider text-deen-gold-accent font-semibold block">
          The Pilgrim’s Chant (Talbiyah)
        </span>

        <p className="font-arabic text-xl font-bold leading-loose text-white" dir="rtl">
          {TALBIYAH.arabic}
        </p>

        <p className="text-xs text-emerald-100 italic">
          "{TALBIYAH.transliteration}"
        </p>

        <p className="text-xs text-emerald-200/90 pt-1">
          {TALBIYAH.meaning}
        </p>
      </div>

      {/* Rites List */}
      {guideMode === 'hajj' ? (
        <div className="space-y-2.5">
          <h2 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
            Sequential Hajj Itinerary
          </h2>

          {HAJJ_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              onClick={() => setSelectedStep(step)}
              className="p-4 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 hover:border-deen-emerald/40 transition-all shadow-sm cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-deen-gold/10 text-deen-gold font-bold text-xs flex items-center justify-center shrink-0">
                  {step.stepNumber}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory group-hover:text-deen-emerald transition-colors">
                    {step.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {step.day} • {step.location}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          <h2 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
            Umrah Sequence
          </h2>

          {UMRAH_STEPS.map((u) => (
            <div
              key={u.step}
              className="p-4 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm flex items-start gap-3.5"
            >
              <div className="w-8 h-8 rounded-xl bg-deen-emerald text-white text-xs font-bold flex items-center justify-center shrink-0">
                {u.step}
              </div>
              <div>
                <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory">
                  {u.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  {u.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Emergency Hotlines Card */}
      <div className="bg-white dark:bg-deen-charcoal-card rounded-2xl p-4 border border-emerald-900/10 dark:border-emerald-800/20 space-y-2.5">
        <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider flex items-center gap-1.5">
          <Phone className="w-4 h-4 text-deen-emerald" />
          Kingdom of Saudi Arabia Emergency Lines
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {EMERGENCY_NUMBERS.map((em, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal/60 border border-stone-100 dark:border-stone-800">
              <span className="text-[10px] text-stone-500 block truncate" title={em.service}>{em.service}</span>
              <a href={`tel:${em.number}`} className="font-mono text-sm font-bold text-deen-emerald block mt-0.5">
                {em.number}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Step Detail Modal */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-3 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-deen-charcoal rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <span className="text-xs font-bold text-deen-emerald">
                Rite #{selectedStep.stepNumber} of 7
              </span>
              <button
                onClick={() => setSelectedStep(null)}
                className="text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
              >
                Close
              </button>
            </div>

            <div>
              <span className="font-arabic text-xl font-bold text-deen-gold block">
                {selectedStep.arabicName}
              </span>
              <h2 className="text-base font-bold text-deen-forest dark:text-deen-ivory mt-0.5">
                {selectedStep.name}
              </h2>
              <p className="text-xs text-stone-400">
                {selectedStep.day} • {selectedStep.location}
              </p>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
              {selectedStep.description}
            </p>

            {/* Dua if available */}
            {selectedStep.duaArabic && (
              <div className="bg-emerald-50 dark:bg-deen-forest/20 p-3.5 rounded-2xl border border-emerald-600/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-deen-emerald block">Recommended Supplication</span>
                <p className="font-arabic text-base text-right leading-loose text-deen-forest dark:text-deen-ivory" dir="rtl">
                  {selectedStep.duaArabic}
                </p>
                <p className="text-[11px] text-stone-500 italic">{selectedStep.duaTransliteration}</p>
                <p className="text-[11px] text-stone-700 dark:text-stone-300">{selectedStep.duaMeaning}</p>
              </div>
            )}

            {/* Obligations */}
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-deen-emerald" />
                Key Obligations (Wajibat)
              </h4>
              <ul className="space-y-1 text-stone-600 dark:text-stone-300">
                {selectedStep.obligations.map((ob, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-deen-emerald font-bold">✓</span>
                    <span>{ob}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-1.5 text-xs pt-2 border-t border-stone-100 dark:border-stone-800">
              <h4 className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Common Mistakes to Avoid
              </h4>
              <ul className="space-y-1 text-stone-600 dark:text-stone-400">
                {selectedStep.commonMistakes.map((mis, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">⚠</span>
                    <span>{mis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
