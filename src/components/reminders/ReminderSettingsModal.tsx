// ==============================================================================
// DEEN — Reminders & Push Notification Settings Modal
// ==============================================================================

import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellOff,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Sparkles,
  Info,
  Calendar,
  BookOpen
} from 'lucide-react';
import {
  isPushSupported,
  getNotificationPermission,
  subscribeToPush,
  unsubscribeFromPush,
  getUserReminders,
  saveUserReminder,
  ReminderItem
} from '@/services/pushService';
import { useAuth } from '@/context/AuthContext';

export const ReminderSettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { user } = useAuth();
  const [permission, setPermission] = useState<NotificationPermission>(getNotificationPermission());
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [isEnablingPush, setIsEnablingPush] = useState<boolean>(false);
  const [pushStatusMessage, setPushStatusMessage] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setPermission(getNotificationPermission());
      getUserReminders(user.isGuest ? undefined : user.id).then(setReminders);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleTogglePush = async () => {
    setIsEnablingPush(true);
    setPushStatusMessage('');

    if (permission === 'granted') {
      await unsubscribeFromPush(user.isGuest ? undefined : user.id);
      setPermission(getNotificationPermission());
      setPushStatusMessage('Notifications paused on this device.');
    } else {
      const { success, error } = await subscribeToPush(user.isGuest ? undefined : user.id);
      setPermission(getNotificationPermission());
      if (success) {
        setPushStatusMessage('✓ Notifications enabled successfully!');
      } else {
        setPushStatusMessage(error || 'Failed to enable notifications.');
      }
    }
    setIsEnablingPush(false);
  };

  const handleToggleReminder = async (reminder: ReminderItem) => {
    const updated = { ...reminder, is_active: !reminder.is_active };
    setReminders(prev => prev.map(r => r.id === reminder.id ? updated : r));
    await saveUserReminder(updated, user.isGuest ? undefined : user.id);
  };

  const handleTimeChange = async (reminder: ReminderItem, newTime: string) => {
    const updated = { ...reminder, time_of_day: `${newTime}:00` };
    setReminders(prev => prev.map(r => r.id === reminder.id ? updated : r));
    await saveUserReminder(updated, user.isGuest ? undefined : user.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-deen-charcoal rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-deen-emerald" />
            <h2 className="text-sm font-bold text-deen-forest dark:text-deen-ivory">
              Reminders & Notifications
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Push Toggle Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-deen-forest to-deen-emerald text-white shadow-md flex items-center justify-between">
          <div className="space-y-0.5 max-w-[210px]">
            <span className="text-xs font-bold block">Device Push Notifications</span>
            <span className="text-[11px] text-emerald-100 block">
              {permission === 'granted'
                ? 'Active on this device'
                : 'Receive daily Adhkar & Salah alerts'}
            </span>
          </div>

          <button
            onClick={handleTogglePush}
            disabled={isEnablingPush}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              permission === 'granted'
                ? 'bg-rose-500/20 text-white border border-rose-400/30 hover:bg-rose-500/30'
                : 'bg-deen-gold text-deen-charcoal hover:bg-deen-gold-accent'
            }`}
          >
            {isEnablingPush
              ? 'Updating...'
              : permission === 'granted'
              ? 'Disable'
              : 'Enable Alerts'}
          </button>
        </div>

        {pushStatusMessage && (
          <p className="text-xs font-medium text-center text-deen-emerald dark:text-emerald-300">
            {pushStatusMessage}
          </p>
        )}

        {/* Platform Honesty / Limitations Note */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-stone-600 dark:text-stone-300 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
            <Info className="w-3.5 h-3.5" />
            <span>Platform Capabilities & Requirements</span>
          </div>
          <p className="leading-relaxed">
            • <strong>Android / Chrome / Desktop:</strong> Background Web Push notifications are supported natively.<br />
            • <strong>iPhone / iPad (iOS 16.4+):</strong> Apple requires tapping "Share" → <strong>"Add to Home Screen"</strong> to receive push alerts when the browser is closed.
          </p>
        </div>

        {/* Reminder Items List */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
            Scheduled Reminders
          </h3>

          <div className="space-y-2">
            {reminders.map((rem) => {
              const timeFormatted = rem.time_of_day.substring(0, 5); // "HH:MM"
              return (
                <div
                  key={rem.id}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    rem.is_active
                      ? 'bg-white dark:bg-deen-charcoal-card border-deen-emerald/30 shadow-sm'
                      : 'bg-stone-50 dark:bg-deen-charcoal border-stone-200 dark:border-stone-800 opacity-60'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-deen-forest dark:text-deen-ivory block">
                      {rem.reminder_title}
                    </span>
                    <span className="text-[10px] text-stone-400 block font-mono capitalize">
                      {rem.frequency} schedule
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Time Picker */}
                    <input
                      type="time"
                      value={timeFormatted}
                      onChange={(e) => handleTimeChange(rem, e.target.value)}
                      disabled={!rem.is_active}
                      className="text-xs px-2 py-1 rounded-lg bg-stone-100 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 font-mono text-deen-forest dark:text-deen-ivory focus:outline-none focus:border-deen-emerald"
                    />

                    {/* Toggle Switch */}
                    <button
                      onClick={() => handleToggleReminder(rem)}
                      className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                        rem.is_active ? 'bg-deen-emerald' : 'bg-stone-300 dark:bg-stone-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          rem.is_active ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-deen-emerald text-white text-xs font-semibold hover:bg-deen-emerald-light transition-colors"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
};
