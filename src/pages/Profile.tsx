// ==============================================================================
// DEEN — Multi-User Account, Cloud Sync, Language & Settings Page
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
  KeyRound,
  RefreshCw,
  CheckCircle,
  Database,
  Lock,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { SupportedLanguage } from '@/types';

export const Profile: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const {
    user,
    isLoggedIn,
    isConfigured,
    syncStatus,
    signUpWithEmail,
    signInWithPassword,
    loginWithEmail,
    signOut,
    updateProfile,
    deleteAccount,
    exportUserData,
    triggerSync
  } = useAuth();

  // Auth form states
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'magic'>('signin');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>(user.displayName || '');
  const [authError, setAuthError] = useState<string>('');
  const [authMessage, setAuthMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Profile editing
  const [editName, setEditName] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleLanguageChange = (l: SupportedLanguage) => {
    setLanguage(l);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthMessage('');
    if (!emailInput.trim()) return;

    setIsSubmitting(true);
    try {
      if (authMode === 'signup') {
        if (!passwordInput || passwordInput.length < 6) {
          setAuthError('Password must be at least 6 characters.');
          setIsSubmitting(false);
          return;
        }
        const { error } = await signUpWithEmail(emailInput.trim(), passwordInput, nameInput.trim() || undefined);
        if (error) {
          setAuthError(error);
        } else {
          setAuthMessage('Account created successfully! Your personal settings are now synced.');
          setPasswordInput('');
        }
      } else if (authMode === 'signin') {
        if (!passwordInput) {
          setAuthError('Please enter your password.');
          setIsSubmitting(false);
          return;
        }
        const { error } = await signInWithPassword(emailInput.trim(), passwordInput);
        if (error) {
          setAuthError(error);
        } else {
          setAuthMessage('Welcome back! Cloud synchronization complete.');
          setPasswordInput('');
        }
      } else if (authMode === 'magic') {
        const { error } = await loginWithEmail(emailInput.trim());
        if (error) {
          setAuthError(error);
        } else {
          setAuthMessage('Verification magic link sent to your email.');
          setEmailInput('');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveName = async () => {
    if (nameInput.trim()) {
      await updateProfile(nameInput.trim());
      setEditName(false);
    }
  };

  const handleExportData = async () => {
    const data = await exportUserData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deen-data-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccountConfirm = async () => {
    setIsSubmitting(true);
    await deleteAccount();
    setIsSubmitting(false);
    setShowDeleteModal(false);
  };

  return (
    <div className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
          {t('profile')} & Settings
        </h1>
        <p className="text-xs text-stone-500">
          Manage your account, multi-device cloud sync, and display preferences
        </p>
      </div>

      {/* Profile Card & Account State */}
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
                title="Tap to edit display name"
              >
                {user.displayName}
              </h2>
            )}
            <p className="text-[11px] text-stone-400">
              {user.isGuest ? 'Guest Mode (Local Offline Storage)' : user.email || 'Authenticated Account'}
            </p>
          </div>
        </div>

        {isLoggedIn ? (
          <button
            onClick={signOut}
            className="p-2 text-stone-400 hover:text-rose-500 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        ) : (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-100 dark:bg-deen-charcoal text-stone-500">
            Guest
          </span>
        )}
      </div>

      {/* Cloud Synchronization Status (For Logged in Users) */}
      {isLoggedIn && (
        <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-deen-forest dark:text-deen-ivory flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-deen-emerald" />
              Cross-Device Cloud Sync
            </span>
            <p className="text-[11px] text-stone-400 mt-0.5">
              {syncStatus.isSyncing
                ? 'Syncing changes...'
                : syncStatus.lastSyncedAt
                ? `Last synced at ${new Date(syncStatus.lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : 'All devices synchronized'}
            </p>
          </div>

          <button
            onClick={() => triggerSync()}
            disabled={syncStatus.isSyncing}
            className="px-3 py-1.5 rounded-xl bg-deen-emerald/10 text-deen-emerald hover:bg-deen-emerald/20 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncStatus.isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync Now</span>
          </button>
        </div>
      )}

      {/* Authentication Tabs / Forms for Unauthenticated Users */}
      {!isLoggedIn && (
        <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-deen-emerald" />
              Sync Across Your Devices
            </h3>
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Create an account or sign in to synchronize your bookmarks, Tasbeeh sessions, and spiritual goals between your phone, tablet, and computer.
          </p>

          {/* Mode Switcher */}
          <div className="flex bg-stone-100 dark:bg-deen-charcoal p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => { setAuthMode('signin'); setAuthError(''); setAuthMessage(''); }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                authMode === 'signin' ? 'bg-white dark:bg-deen-charcoal-card text-deen-forest dark:text-white shadow-sm' : 'text-stone-500'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('signup'); setAuthError(''); setAuthMessage(''); }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                authMode === 'signup' ? 'bg-white dark:bg-deen-charcoal-card text-deen-forest dark:text-white shadow-sm' : 'text-stone-500'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => { setAuthMode('magic'); setAuthError(''); setAuthMessage(''); }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                authMode === 'magic' ? 'bg-white dark:bg-deen-charcoal-card text-deen-forest dark:text-white shadow-sm' : 'text-stone-500'
              }`}
            >
              Magic Link
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-2.5 pt-1">
            {authMode === 'signup' && (
              <div>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Your Name (optional)"
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-deen-emerald"
                />
              </div>
            )}

            <div>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="name@example.com"
                className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-deen-emerald"
              />
            </div>

            {authMode !== 'magic' && (
              <div>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Password (min 6 characters)"
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-deen-emerald"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-deen-emerald hover:bg-deen-emerald-light text-white text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting
                ? 'Processing...'
                : authMode === 'signup'
                ? 'Create Synchronized Account'
                : authMode === 'signin'
                ? 'Sign In to Your Account'
                : 'Send Magic Link'}
            </button>

            {authError && (
              <p className="text-[11px] text-rose-500 font-medium text-center">{authError}</p>
            )}
            {authMessage && (
              <p className="text-[11px] text-deen-emerald font-medium text-center">{authMessage}</p>
            )}
          </form>
        </div>
      )}

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

      {/* Data Management & Export */}
      <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-2">
        <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
          Data Management & Portability
        </h3>

        <div className="flex gap-2">
          <button
            onClick={handleExportData}
            className="flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal/60 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-deen-emerald transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup (JSON)</span>
          </button>

          {isLoggedIn && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Account</span>
            </button>
          )}
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-deen-charcoal rounded-3xl p-5 space-y-3.5 shadow-2xl text-xs">
            <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Delete Account Permanently</span>
            </div>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              Are you sure you want to delete your account? All your synchronized bookmarks, Tasbeeh history, and spiritual logs in Supabase will be permanently removed. This action cannot be undone.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 rounded-xl bg-stone-100 dark:bg-deen-charcoal-card text-stone-700 dark:text-stone-300 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccountConfirm}
                disabled={isSubmitting}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Guarantee */}
      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-stone-600 dark:text-stone-300 space-y-1.5">
        <div className="flex items-center gap-1.5 text-deen-emerald font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Multi-User Privacy Guarantee</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          DEEN contains zero commercial advertisements, zero analytics tracking, and zero public scoreboards. Every registered user has an isolated Supabase Auth UUID protected by strict Row Level Security (RLS). Your records are never accessible to any other user.
        </p>
      </div>
    </div>
  );
};
