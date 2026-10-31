// ==============================================================================
// DEEN — User Profile, Language, Privacy & Settings Page
// ==============================================================================

import React, { useState } from 'react';
import {
  User,
  Globe,
  Moon,
  Sun,
  ShieldCheck,
  Download,
  Trash2,
  LogOut,
  Mail,
  CheckCircle,
  Database
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { getDeenDB } from '@/services/dbService';
import { SupportedLanguage } from '@/types';

export const Profile: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { user, isLoggedIn, isConfigured, loginWithEmail, signOut, updateProfile } = useAuth();

  const [nameInput, setNameInput] = useState<string>(user.displayName || '');
  const [emailInput, setEmailInput] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<string>('');
  const [editName, setEditName] = useState<boolean>(false);

  const handleLanguageChange = (l: SupportedLanguage) => {
    setLanguage(l);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    const { error } = await loginWithEmail(emailInput.trim());
    if (error) {
      setLoginMessage(`Error: ${error}`);
    } else {
      setLoginMessage('Verification magic link sent to your email.');
      setEmailInput('');
    }
  };

  const handleSaveName = async () => {
    if (nameInput.trim()) {
      await updateProfile(nameInput.trim());
      setEditName(false);
    }
  };

  const handleExportData = async () => {
    const db = await getDeenDB();
    const bookmarks = await db.getAll('bookmarks');
    const tasbeeh = await db.getAll('tasbeeh_sessions');
    const logs = await db.getAll('daily_deen_logs');
    const qaza = await db.get('qaza_records', 'current');

    const exportObject = {
      exportDate: new Date().toISOString(),
      user: user.displayName,
      bookmarks,
      tasbeeh,
      logs,
      qaza
    };

    const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deen-data-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearCache = async () => {
    if (window.confirm('Clear cached Quran verses and temporary data? Your bookmarks and prayers will remain safe.')) {
      const db = await getDeenDB();
      await db.clear('quran_verses_cache');
      alert('Quran cache cleared successfully.');
    }
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
          {t('profile')} & Preferences
        </h1>
        <p className="text-xs text-stone-500">
          Personalize language, display, and privacy settings
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-deen-forest to-deen-emerald text-white flex items-center justify-center font-bold text-lg shadow-md shadow-deen-emerald/20">
            {user.displayName?.charAt(0).toUpperCase() || 'S'}
          </div>
          <div>
            {editName ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="text-xs p-1 rounded-lg border border-deen-emerald bg-transparent text-stone-800 dark:text-stone-200"
                />
                <button
                  onClick={handleSaveName}
                  className="px-2 py-1 bg-deen-emerald text-white text-[11px] rounded-lg font-semibold"
                >
                  Save
                </button>
              </div>
            ) : (
              <h2
                onClick={() => setEditName(true)}
                className="text-sm font-bold text-deen-forest dark:text-deen-ivory cursor-pointer hover:underline flex items-center gap-1.5"
                title="Tap to edit name"
              >
                {user.displayName}
              </h2>
            )}
            <p className="text-[11px] text-stone-400">
              {user.isGuest ? 'Guest Mode (Offline-first)' : user.email || 'Authenticated Account'}
            </p>
          </div>
        </div>

        {isLoggedIn && (
          <button
            onClick={signOut}
            className="p-2 text-stone-400 hover:text-rose-500 transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Language Switcher */}
      <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-2.5">
        <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-deen-emerald" />
          {t('selectLanguage')}
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { id: 'en', label: 'English', sub: 'Latin LTR' },
            { id: 'ar', label: 'العربية (Arabic)', sub: 'Uthmani RTL' },
            { id: 'hi', label: 'हिन्दी (Hindi)', sub: 'Devanagari LTR' },
            { id: 'gu', label: 'ગુજરાતી (Gujarati)', sub: 'Gujarati LTR' }
          ].map((l) => {
            const active = language === l.id;
            return (
              <button
                key={l.id}
                onClick={() => handleLanguageChange(l.id as SupportedLanguage)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  active
                    ? 'bg-deen-emerald text-white border-deen-emerald shadow-sm'
                    : 'bg-stone-50 dark:bg-deen-charcoal border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span className="font-bold block">{l.label}</span>
                <span className={`text-[10px] block ${active ? 'text-emerald-100' : 'text-stone-400'}`}>
                  {l.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Appearance Theme */}
      <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-deen-gold/10 text-deen-gold">
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="text-xs font-bold text-deen-forest dark:text-deen-ivory">Theme Mode</h4>
            <p className="text-[11px] text-stone-400">
              {isDark ? 'Dark Emerald Theme' : 'Light Ivory Theme'}
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300"
        >
          Toggle
        </button>
      </div>

      {/* Account Synchronization / Sign-in */}
      {!isLoggedIn && (
        <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-deen-emerald" />
            Cloud Sync (Optional)
          </h3>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            DEEN is completely usable without an account. Enter your email if you wish to back up your bookmarks and prayer history to Supabase.
          </p>

          <form onSubmit={handleLogin} className="flex gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="name@example.com"
              className="flex-1 text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-deen-emerald"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-deen-emerald hover:bg-deen-emerald-light text-white text-xs font-semibold shadow-sm shrink-0"
            >
              Sign In
            </button>
          </form>
          {loginMessage && (
            <p className="text-[11px] text-deen-emerald font-medium">{loginMessage}</p>
          )}
        </div>
      )}

      {/* Data Management & Export */}
      <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-2">
        <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
          Data Management
        </h3>

        <div className="flex gap-2">
          <button
            onClick={handleExportData}
            className="flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal/60 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-deen-emerald"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Data (JSON)</span>
          </button>

          <button
            onClick={handleClearCache}
            className="flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal/60 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-rose-500"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Clear Cache</span>
          </button>
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-stone-600 dark:text-stone-300 space-y-1.5">
        <div className="flex items-center gap-1.5 text-deen-emerald font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy & Security Guarantee</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          DEEN contains zero commercial advertisements, zero user tracking, and zero public scoreboards. All spiritual logs and private reflections are saved locally in your browser’s IndexedDB and encrypted at rest in Supabase under strict Row Level Security.
        </p>
      </div>
    </div>
  );
};
