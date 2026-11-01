// ==============================================================================
// DEEN — Top Application Header / Navbar
// ==============================================================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Globe, Bell } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { SupportedLanguage } from '@/types';
import { ReminderSettingsModal } from '@/components/reminders/ReminderSettingsModal';

export const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [showRemindersModal, setShowRemindersModal] = useState<boolean>(false);

  const handleLanguageCycle = () => {
    const langs: SupportedLanguage[] = ['en', 'ar', 'hi', 'gu'];
    const nextIdx = (langs.indexOf(language) + 1) % langs.length;
    setLanguage(langs[nextIdx]);
  };

  const langLabels: Record<SupportedLanguage, string> = {
    en: 'EN',
    ar: 'عربي',
    hi: 'हिन्दी',
    gu: 'ગુજરાતી'
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-deen-ivory/90 dark:bg-deen-charcoal/90 backdrop-blur-md border-b border-emerald-900/10 dark:border-emerald-800/20 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* App Branding */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-deen-forest to-deen-emerald flex items-center justify-center shadow-md shadow-deen-emerald/20 transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-deen-gold-accent fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79.9 2.59 3.25 4.54 6.11 4.88.38.05.77.07 1.16.07.64 0 1.25-.08 1.83-.24-.96 2.87-3.32 4.93-6.31 5.01z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-deen-forest dark:text-deen-ivory block leading-none font-sans">
                DEEN
              </span>
              <span className="text-[10px] text-deen-gold font-medium tracking-wide">
                Every day, closer to Allah
              </span>
            </div>
          </Link>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            {/* Reminders / Notifications Bell Button */}
            <button
              onClick={() => setShowRemindersModal(true)}
              title="Reminders & Notifications"
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-emerald-900/5 dark:hover:bg-emerald-500/10 transition-colors"
              aria-label="Reminders"
            >
              <Bell className="w-4 h-4 text-deen-forest dark:text-deen-ivory" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={handleLanguageCycle}
              title="Change Language (English, Arabic, Hindi, Gujarati)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-900/5 dark:bg-emerald-500/10 hover:bg-emerald-900/10 dark:hover:bg-emerald-500/20 text-deen-forest dark:text-emerald-300 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{langLabels[language]}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-emerald-900/5 dark:hover:bg-emerald-500/10 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-deen-gold-light" /> : <Moon className="w-4 h-4 text-deen-forest" />}
            </button>
          </div>
        </div>
      </header>

      {/* Reminder Settings Modal */}
      <ReminderSettingsModal
        isOpen={showRemindersModal}
        onClose={() => setShowRemindersModal(false)}
      />
    </>
  );
};
