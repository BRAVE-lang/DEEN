// ==============================================================================
// DEEN — Explore Hub Page
// Central Navigation to All Specialized Islamic Modules
// ==============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  BookMarked,
  Layers,
  Calendar,
  Users,
  GraduationCap,
  Navigation,
  Calculator,
  Activity,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Explore: React.FC = () => {
  const { t } = useLanguage();

  const modules = [
    {
      to: '/tasbeeh',
      title: t('tasbeeh'),
      arabicTitle: 'المسبحة الإلكترونية',
      desc: 'Count Sunnah Adhkar & custom dhikr with haptic vibration feedback',
      icon: Sparkles,
      color: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
    },
    {
      to: '/duas',
      title: t('duas'),
      arabicTitle: 'الأدعية والأذكار',
      desc: 'Authentic supplications from Hisn al-Muslim & Quranic Rabbana duas',
      icon: Heart,
      color: 'bg-rose-500/10 text-rose-500 border-rose-500/20'
    },
    {
      to: '/hadith',
      title: t('hadith'),
      arabicTitle: 'الحديث النبوي الشريف',
      desc: 'Canonical collections (Bukhari, Muslim, Abu Dawood, Tirmidhi, 40 Nawawi)',
      icon: BookMarked,
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    },
    {
      to: '/names',
      title: t('namesOfAllah'),
      arabicTitle: 'أسماء الله الحسنى',
      desc: 'All 99 Beautiful Divine Names with explanations, Quran references & audio',
      icon: Layers,
      color: 'bg-deen-emerald/10 text-deen-emerald border-deen-emerald/20'
    },
    {
      to: '/calendar',
      title: t('calendar'),
      arabicTitle: 'التقويم الهجري والمناسبات',
      desc: 'Dual Hijri/Gregorian calendar, Ramadan countdown, and holy fasting days',
      icon: Calendar,
      color: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
    },
    {
      to: '/prophets',
      title: t('prophets'),
      arabicTitle: 'قصص الأنبياء',
      desc: 'Stories of all 25 Prophets in the Quran grounded in Ibn Kathir’s scholarship',
      icon: Users,
      color: 'bg-emerald-600/10 text-emerald-600 border-emerald-600/20'
    },
    {
      to: '/learning',
      title: t('learning'),
      arabicTitle: 'تعليم الصلاة والوضوء',
      desc: 'Step-by-step visual interactive tutorials for Wudu, Ghusl, Salah & Taharah',
      icon: GraduationCap,
      color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
    },
    {
      to: '/hajj-umrah',
      title: t('hajjUmrah'),
      arabicTitle: 'دليل الحج والعمرة',
      desc: 'Interactive pilgrim companion with rites, Talbiyah audio & emergency numbers',
      icon: Navigation,
      color: 'bg-amber-600/10 text-amber-600 border-amber-600/20'
    },
    {
      to: '/zakat',
      title: t('zakat'),
      arabicTitle: 'حاسبة الزكاة الشرعية',
      desc: 'Accurate multi-asset calculation with Gold/Silver Nisab & detailed report',
      icon: Calculator,
      color: 'bg-teal-500/10 text-teal-500 border-teal-500/20'
    },
    {
      to: '/tracker',
      title: t('tracker'),
      arabicTitle: 'متابعة العبادات اليومية',
      desc: '100% private spiritual habit tracker, prayer history & personal reflections',
      icon: Activity,
      color: 'bg-deen-gold/10 text-deen-gold border-deen-gold/20'
    }
  ];

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
          {t('explore')} DEEN
        </h1>
        <p className="text-xs text-stone-500">
          Islamic tools, knowledge, and worship companions
        </p>
      </div>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 gap-2.5">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.to}
              to={m.to}
              className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 hover:border-deen-emerald/40 transition-all shadow-sm group"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-deen-forest dark:text-deen-ivory group-hover:text-deen-emerald transition-colors">
                      {m.title}
                    </h2>
                    <span className="font-arabic text-xs text-deen-gold block">
                      {m.arabicTitle}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                    {m.desc}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-deen-emerald transition-transform" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
