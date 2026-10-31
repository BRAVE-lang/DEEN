// ==============================================================================
// DEEN — Authentication & User Synchronization Context
// Supabase Auth Integration with 100% Offline Guest Mode
// ==============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/services/supabaseClient';

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
  loginWithEmail: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (name: string) => Promise<void>;
}

const GUEST_USER: UserProfile = {
  id: 'guest-local-user',
  displayName: 'Servant of Allah (Guest)',
  isGuest: true
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('deen_local_user');
    return saved ? JSON.parse(saved) : GUEST_USER;
  });

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          displayName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Servant of Allah',
          avatarUrl: session.user.user_metadata?.avatar_url,
          isGuest: false
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          displayName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Servant of Allah',
          avatarUrl: session.user.user_metadata?.avatar_url,
          isGuest: false
        });
      } else {
        setUser(GUEST_USER);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginWithEmail = async (email: string): Promise<{ error: string | null }> => {
    if (!isSupabaseConfigured || !supabase) {
      // Local fallback for guest
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

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(GUEST_USER);
    localStorage.removeItem('deen_local_user');
  };

  const updateProfile = async (name: string) => {
    const updated = { ...user, displayName: name };
    setUser(updated);
    localStorage.setItem('deen_local_user', JSON.stringify(updated));

    if (isSupabaseConfigured && supabase && !user.isGuest) {
      await supabase.auth.updateUser({
        data: { full_name: name }
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !user.isGuest,
        isConfigured: isSupabaseConfigured,
        loginWithEmail,
        signOut,
        updateProfile
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
