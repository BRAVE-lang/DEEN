// ==============================================================================
// DEEN — Web Push Notification & Islamic Reminder Service
// Handles PushManager Subscriptions, VAPID registration & Supabase Storage
// ==============================================================================

import { supabase, isSupabaseConfigured } from './supabaseClient';
import { getDeenDB } from './dbService';

export interface ReminderItem {
  id: string;
  user_id?: string;
  reminder_title: string;
  reminder_type:
    | 'morning_adhkar'
    | 'evening_adhkar'
    | 'after_prayer'
    | 'sleep'
    | 'waking'
    | 'quran'
    | 'tasbeeh'
    | 'salah'
    | 'friday_kahf'
    | 'fasting'
    | 'custom';
  frequency: string;
  time_of_day: string; // '06:00:00'
  is_active: boolean;
}

// Public VAPID Key for Web Push (RFC 8292 standard keypair)
export const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Checks whether Web Push and Service Workers are supported in the browser
 */
export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

/**
 * Get current browser notification permission
 */
export function getNotificationPermission(): NotificationPermission {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}

/**
 * Request Notification Permission and register push subscription
 */
export async function subscribeToPush(userId?: string): Promise<{ success: boolean; error?: string }> {
  if (!isPushSupported()) {
    return { success: false, error: 'Web Push is not supported on this browser or platform.' };
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      return { success: false, error: 'Notification permission was not granted by the user.' };
    }

    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      const convertedKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey as unknown as BufferSource
      });
    }

    // Save subscription in Supabase if user is logged in
    if (isSupabaseConfigured && supabase && userId) {
      const subJson = subscription.toJSON();
      if (subJson.endpoint && subJson.keys) {
        await supabase.from('push_subscriptions').upsert({
          user_id: userId,
          endpoint: subJson.endpoint,
          p256dh: subJson.keys.p256dh,
          auth: subJson.keys.auth,
          user_agent: navigator.userAgent
        }, { onConflict: 'endpoint' });
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error('Failed to subscribe to push notifications:', err);
    return { success: false, error: err.message || 'Subscription failed' };
  }
}

/**
 * Unsubscribe from Web Push
 */
export async function unsubscribeFromPush(userId?: string): Promise<boolean> {
  if (!isPushSupported()) return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      const endpoint = subscription.endpoint;
      await subscription.unsubscribe();

      if (isSupabaseConfigured && supabase && userId) {
        await supabase
          .from('push_subscriptions')
          .delete()
          .eq('endpoint', endpoint);
      }
    }

    return true;
  } catch (err) {
    console.error('Failed to unsubscribe from push:', err);
    return false;
  }
}

/**
 * Fetch reminders for user (from Supabase if authenticated, else local default templates)
 */
export async function getUserReminders(userId?: string): Promise<ReminderItem[]> {
  const defaultTemplates: ReminderItem[] = [
    {
      id: 'rem-morning-adhkar',
      reminder_title: 'Morning Adhkar',
      reminder_type: 'morning_adhkar',
      frequency: 'daily',
      time_of_day: '06:00:00',
      is_active: true
    },
    {
      id: 'rem-evening-adhkar',
      reminder_title: 'Evening Adhkar',
      reminder_type: 'evening_adhkar',
      frequency: 'daily',
      time_of_day: '17:30:00',
      is_active: true
    },
    {
      id: 'rem-after-prayer',
      reminder_title: 'After-Prayer Dhikr (Ayat al-Kursi & Tasbeeh)',
      reminder_type: 'after_prayer',
      frequency: 'daily',
      time_of_day: '13:00:00',
      is_active: false
    },
    {
      id: 'rem-quran',
      reminder_title: 'Daily Quran Recitation',
      reminder_type: 'quran',
      frequency: 'daily',
      time_of_day: '20:30:00',
      is_active: true
    },
    {
      id: 'rem-sleep',
      reminder_title: 'Sunnah Bedtime Duas & Surah Al-Mulk',
      reminder_type: 'sleep',
      frequency: 'daily',
      time_of_day: '22:30:00',
      is_active: true
    },
    {
      id: 'rem-friday',
      reminder_title: 'Friday Sunnah: Surah Al-Kahf & Salawat',
      reminder_type: 'friday_kahf',
      frequency: 'weekly',
      time_of_day: '09:00:00',
      is_active: true
    },
    {
      id: 'rem-fasting',
      reminder_title: 'Sunnah Fasting Reminder (Mon & Thu)',
      reminder_type: 'fasting',
      frequency: 'weekly',
      time_of_day: '20:00:00',
      is_active: false
    }
  ];

  if (!isSupabaseConfigured || !supabase || !userId) {
    try {
      const saved = localStorage.getItem('deen_local_reminders');
      return saved ? JSON.parse(saved) : defaultTemplates;
    } catch {
      return defaultTemplates;
    }
  }

  try {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('user_id', userId);

    if (error || !data || data.length === 0) {
      return defaultTemplates;
    }

    return data.map(r => ({
      id: r.id,
      user_id: r.user_id,
      reminder_title: r.reminder_title,
      reminder_type: r.reminder_type,
      frequency: r.frequency || 'daily',
      time_of_day: r.time_of_day,
      is_active: r.is_active
    }));
  } catch (err) {
    console.error('Failed to get reminders from Supabase:', err);
    return defaultTemplates;
  }
}

/**
 * Toggle or update reminder status
 */
export async function saveUserReminder(reminder: ReminderItem, userId?: string): Promise<void> {
  // Save locally
  try {
    const current = await getUserReminders(userId);
    const updated = current.map(r => r.id === reminder.id ? reminder : r);
    if (!updated.some(r => r.id === reminder.id)) {
      updated.push(reminder);
    }
    localStorage.setItem('deen_local_reminders', JSON.stringify(updated));
  } catch {}

  // Save to Supabase if authenticated
  if (isSupabaseConfigured && supabase && userId) {
    await supabase.from('reminders').upsert({
      id: reminder.id.startsWith('rem-') ? undefined : reminder.id,
      user_id: userId,
      reminder_title: reminder.reminder_title,
      reminder_type: reminder.reminder_type,
      frequency: reminder.frequency,
      time_of_day: reminder.time_of_day,
      is_active: reminder.is_active
    });
  }
}
