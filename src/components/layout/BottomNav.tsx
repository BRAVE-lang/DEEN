// ==============================================================================
// DEEN — Bottom Navigation Bar
// HOME | QURAN | SALAH | EXPLORE | PROFILE
// ==============================================================================

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Clock, Compass, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const BottomNav: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    { to: '/', label: t('home'), icon: Home },
    { to: '/quran', label: t('quran'), icon: BookOpen },
    { to: '/salah', label: t('salah'), icon: Clock },
    { to: '/explore', label: t('explore'), icon: Compass },
    { to: '/profile', label: t('profile'), icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-deen-ivory/95 dark:bg-deen-charcoal/95 backdrop-blur-md border-t border-emerald-900/10 dark:border-emerald-800/20 pb-safe shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-deen-emerald dark:text-deen-emerald-light font-semibold scale-105'
                    : 'text-stone-500 dark:text-stone-400 hover:text-deen-emerald dark:hover:text-deen-emerald-light'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-deen-emerald dark:bg-deen-emerald-light rounded-full" />
                    )}
                  </div>
                  <span className="text-[11px] mt-1 tracking-tight truncate max-w-[64px]">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
