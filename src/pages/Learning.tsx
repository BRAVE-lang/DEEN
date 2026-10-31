// ==============================================================================
// DEEN — Islamic Learning (Wudu, Ghusl, Salah & Taharah) Page
// ==============================================================================

import React, { useState } from 'react';
import {
  GraduationCap,
  Droplets,
  Heart,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LEARNING_TOPICS } from '@/services/learningService';
import { LearningTopic } from '@/types';

export const Learning: React.FC = () => {
  const { t } = useLanguage();
  const [selectedTopicId, setSelectedTopicId] = useState<string>('wudu');

  const topic = LEARNING_TOPICS.find(t => t.id === selectedTopicId) || LEARNING_TOPICS[0];

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
          {t('learning')} & Worship Guides
        </h1>
        <p className="text-xs text-stone-500">
          Step-by-step practical Sunnah tutorials
        </p>
      </div>

      {/* Topic Switcher Pills */}
      <div className="flex bg-stone-200/60 dark:bg-deen-charcoal p-1 rounded-2xl">
        {LEARNING_TOPICS.map((top) => {
          const isSelected = selectedTopicId === top.id;
          return (
            <button
              key={top.id}
              onClick={() => setSelectedTopicId(top.id)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                isSelected
                  ? 'bg-white dark:bg-deen-charcoal-card text-deen-emerald shadow-sm'
                  : 'text-stone-500'
              }`}
            >
              {top.category}
            </button>
          );
        })}
      </div>

      {/* Active Guide Card */}
      <div className="bg-white dark:bg-deen-charcoal-card rounded-2xl p-4 border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-3">
        <div>
          <h2 className="text-sm font-bold text-deen-forest dark:text-deen-ivory">
            {topic.title}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            {topic.shortSummary}
          </p>
        </div>

        {/* Madhhab Note if available */}
        {topic.madhhabDistinctions && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-deen-emerald shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold">Madhhab Insights: </strong>
              {topic.madhhabDistinctions}
            </p>
          </div>
        )}

        {/* Steps List */}
        <div className="space-y-3 pt-2">
          {topic.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="p-3.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal/60 border border-stone-100 dark:border-stone-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-lg bg-deen-emerald text-white text-xs font-bold flex items-center justify-center">
                  {step.stepNumber}
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-deen-gold/10 text-deen-gold">
                  {step.ruling || 'Sunnah'}
                </span>
              </div>

              <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory">
                {step.title}
              </h3>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                {step.description}
              </p>

              {/* Arabic Phrase & Meaning if applicable */}
              {step.arabicPhrase && (
                <div className="bg-white dark:bg-deen-charcoal-card p-3 rounded-xl border border-stone-200 dark:border-stone-700 space-y-1">
                  <p className="font-arabic text-base text-right text-deen-forest dark:text-deen-ivory leading-relaxed" dir="rtl">
                    {step.arabicPhrase}
                  </p>
                  {step.transliteration && (
                    <p className="text-[11px] text-stone-500 italic">
                      "{step.transliteration}"
                    </p>
                  )}
                  {step.meaning && (
                    <p className="text-[11px] text-stone-700 dark:text-stone-300">
                      {step.meaning}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Invalidators / Nullifiers */}
        {topic.invalidators && (
          <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2">
            <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              Things that Invalidate / Nullify
            </h4>
            <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-400">
              {topic.invalidators.map((inv, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{inv}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
