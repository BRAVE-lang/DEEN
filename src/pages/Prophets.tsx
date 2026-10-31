// ==============================================================================
// DEEN — Stories of the Prophets (Qisas al-Anbiya) Page
// Grounded in Hafiz Ibn Kathir's Scholarship & Canonical Quranic Verses
// ==============================================================================

import React, { useState } from 'react';
import { Users, BookOpen, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { PROPHET_STORIES } from '@/services/prophetsService';
import { ProphetStory } from '@/types';
import { IslamicPattern } from '@/components/common/IslamicPattern';

export const Prophets: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProphet, setSelectedProphet] = useState<ProphetStory | null>(null);

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
          {t('prophets')} (Qisas al-Anbiya)
        </h1>
        <p className="text-xs text-stone-500">
          Authentic chronologies from the Holy Quran & Sahih Hadith
        </p>
      </div>

      {/* Prophet Stories List */}
      <div className="space-y-2.5">
        {PROPHET_STORIES.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedProphet(p)}
            className="p-4 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 hover:border-deen-emerald/40 transition-all shadow-sm cursor-pointer group flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-deen-emerald/10 text-deen-emerald font-bold text-xs flex items-center justify-center shrink-0">
                {p.chronologyOrder}
              </div>
              <div>
                <h3 className="text-sm font-bold text-deen-forest dark:text-deen-ivory group-hover:text-deen-emerald transition-colors">
                  {p.nameEnglish}
                </h3>
                <span className="font-arabic text-xs text-deen-gold block">
                  {p.nameArabic}
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                  {p.title}
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
          </div>
        ))}
      </div>

      {/* Detailed Story Modal */}
      {selectedProphet && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-3 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-deen-charcoal rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <span className="text-xs font-bold text-deen-emerald">
                Prophet #{selectedProphet.chronologyOrder}
              </span>
              <button
                onClick={() => setSelectedProphet(null)}
                className="text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
              >
                Close
              </button>
            </div>

            {/* Prophet Header Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-deen-forest to-deen-emerald p-6 text-white text-center shadow-lg border border-emerald-700/30">
              <IslamicPattern opacity={0.1} />
              <span className="font-arabic text-2xl font-bold text-deen-gold-accent block mb-1">
                {selectedProphet.nameArabic}
              </span>
              <h2 className="text-lg font-bold">{selectedProphet.nameEnglish}</h2>
              <p className="text-xs text-emerald-200 mt-0.5">{selectedProphet.title}</p>
            </div>

            {/* Summary */}
            <div className="bg-stone-50 dark:bg-deen-charcoal-card p-3.5 rounded-2xl border border-stone-100 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 leading-relaxed italic">
              "{selectedProphet.summary}"
            </div>

            {/* Story Text */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
                Authentic Chronicle
              </h4>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line font-sans">
                {selectedProphet.story}
              </p>
            </div>

            {/* Key Lessons */}
            <div className="space-y-2 text-xs pt-2 border-t border-stone-100 dark:border-stone-800">
              <h4 className="font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
                Spiritual & Moral Lessons
              </h4>
              <ul className="space-y-1.5">
                {selectedProphet.keyLessons.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-stone-600 dark:text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-deen-emerald shrink-0 mt-0.5" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quranic References */}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex flex-wrap gap-1 text-[11px]">
              <span className="text-stone-400 font-medium mr-1">Quran Citations:</span>
              {selectedProphet.quranReferences.map((ref, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md bg-deen-emerald/10 text-deen-emerald font-mono text-[10px]">
                  {ref}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
