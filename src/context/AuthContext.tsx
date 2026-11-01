// ==============================================================================
// DEEN — Multi-User Authentication & Synchronization Context
// Supabase Auth Integration with Password, Magic Link & 100% Offline Guest Mode
// ==============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/services/supabaseClient';
import { syncUserData, clearLocalUserData, subscribeToSyncStatus, SyncStatus } from '@/services/syncService';
import { getDeenDB } from '@/services/dbService';

export interface UserProfile {
  id: string;
  email?: string;
  displayName: string;
  avatarUrl?: string;
  isGuest: boolean;
}

interface AuthContextType {
  user: UserProfile;
  isLoggedIn: boolean;
  isConfigured: boolean;
  syncStatus: SyncStatus;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<{ error: string | null }>;
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>;
  loginWithEmail: (email: string) => Promise<{ error: string | null }>; // OTP Magic link
  signOut: () => Promise<void>;
  updateProfile: (name: string) => Promise<void>;
  deleteAccount: () => Promise<{ error: string | null }>;
  exportUserData: () => Promise<object>;
  triggerSync: () => Promise<boolean>;
}

const GUEST_USER: UserProfile = {
  id: 'guest-local-user',
  displayName: 'Servant of Allah (Guest)',
  isGuest: true
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('deen_local_user');
      return saved ? JSON.parse(saved) : GUEST_USER;
    } catch {
      return GUEST_USER;
    }
  });

  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isSyncing: false,
    lastSyncedAt: null,
    error: null
  });

  useEffect(() => {
    const unsubscribeSync = subscribeToSyncStatus(setSyncStatus);
    return () => unsubscribeSync();
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    // Check existing active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const profile: UserProfile = {
          id: session.user.id,
          email: session.user.email,
          displayName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Servant of Allah',
          avatarUrl: session.user.user_metadata?.avatar_url,
          isGuest: false
        };
        setUser(profile);
        localStorage.setItem('deen_local_user', JSON.stringify(profile));
        // Auto sync on session restoration
        syncUserData(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile: UserProfile = {
          id: session.user.id,
          email: session.user.email,
          displayName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Servant of Allah',
          avatarUrl: session.user.user_metadata?.avatar_url,
          isGuest: false
        };
        setUser(profile);
        localStorage.setItem('deen_local_user', JSON.stringify(profile));
        syncUserData(session.user.id);
      } else {
        setUser(GUEST_USER);
        localStorage.removeItem('deen_local_user');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 1. Password-based Registration
  const signUpWithEmail = async (email: string, password: string, displayName?: string): Promise<{ error: string | null }> => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: 'Supabase client is not configured' };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: displayName || email.split('@')[0]
          }
        }
      });

      if (error) return { error: error.message };

      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email,
          displayName: displayName || email.split('@')[0],
          isGuest: false
        };
        setUser(profile);
        localStorage.setItem('deen_local_user', JSON.stringify(profile));
        await syncUserData(data.user.id);
      }

      return { error: null };
    } catch (e: any) {
      return { error: e.message || 'Registration failed' };
    }
  };

  // 2. Password-based Login
  const signInWithPassword = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: 'Supabase client is not configured' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) return { error: error.message };

      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email,
          displayName: data.user.user_metadata?.full_name || email.split('@')[0],
          isGuest: false
        };
        setUser(profile);
        localStorage.setItem('deen_local_user', JSON.stringify(profile));
        await syncUserData(data.user.id);
      }

      return { error: null };
    } catch (e: any) {
      return { error: e.message || 'Sign in failed' };
    }
  };

  // 3. OTP Magic Link Login
  const loginWithEmail = async (email: string): Promise<{ error: string | null }> => {
    if (!isSupabaseConfigured || !supabase) {
      const localProfile: UserProfile = {
        id: 'user-' + Date.now(),
        email,
        displayName: email.split('@')[0],
        isGuest: false
      };
      setUser(localProfile);
      localStorage.setItem('deen_local_user', JSON.stringify(localProfile));
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      if (error) return { error: error.message };
      return { error: null };
    } catch (e: any) {
      return { error: e.message || 'Login failed' };
    }
  };

  // 4. Sign Out & Clear Local Isolation
  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    await clearLocalUserData();
    setUser(GUEST_USER);
  };

  // 5. Update Profile
  const updateProfile = async (name: string) => {
    const updated = { ...user, displayName: name };
    setUser(updated);
    localStorage.setItem('deen_local_user', JSON.stringify(updated));

    if (isSupabaseConfigured && supabase && !user.isGuest) {
      await supabase.auth.updateUser({
        data: { full_name: name }
      });
      await supabase
        .from('profiles')
        .update({ display_name: name })
        .eq('id', user.id);
    }
  };

  // 6. Delete Account (GDPR Compliance)
  const deleteAccount = async (): Promise<{ error: string | null }> => {
    if (!isSupabaseConfigured || !supabase || user.isGuest) {
      await clearLocalUserData();
      setUser(GUEST_USER);
      return { error: null };
    }

    try {
      // Delete user's public profile record (cascades all related child records)
      const { error } = await supabase.from('profiles').delete().eq('id', user.id);
      if (error) {
        console.warn('Profile deletion notice:', error);
      }
      await supabase.auth.signOut();
      await clearLocalUserData();
      setUser(GUEST_USER);
      return { error: null };
    } catch (e: any) {
      return { error: e.message || 'Account deletion failed' };
    }
  };

  // 7. Full JSON Data Export
  const exportUserData = async (): Promise<object> => {
    const db = await getDeenDB();
    const bookmarks = await db.getAll('bookmarks');
    const tasbeeh = await db.getAll('tasbeeh_sessions');
    const logs = await db.getAll('daily_deen_logs');
    const qaza = await db.get('qaza_records', 'current');
    const history = await db.getAll('reading_history');

    return {
      exportDate: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        isGuest: user.isGuest
      },
      quranBookmarks: bookmarks,
      readingHistory: history,
      tasbeehSessions: tasbeeh,
      dailyLogs: logs,
      qazaRecords: qaza
    };
  };

  // 8. Manual Sync Trigger
  const triggerSync = async (): Promise<boolean> => {
    if (user.isGuest) return false;
    return syncUserData(user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !user.isGuest,
        isConfigured: isSupabaseConfigured,
        syncStatus,
        signUpWithEmail,
        signInWithPassword,
        loginWithEmail,
        signOut,
        updateProfile,
        deleteAccount,
        exportUserData,
        triggerSync
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
