// ==============================================================================
// DEEN — Supabase Client Initializer with Graceful Offline Fallback
// ==============================================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-ref.supabase.co' &&
  supabaseAnonKey !== 'your-supabase-publishable-anon-key'
);

// Create the Supabase client safely
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/**
 * Diagnostic logger that respects security guidelines
 * (Never outputs keys or tokens into console)
 */
export function getSupabaseStatus(): { configured: boolean; url: string } {
  return {
    configured: isSupabaseConfigured,
    url: isSupabaseConfigured ? supabaseUrl.replace(/https:\/\/(.*?)\..*/, 'https://$1.supabase.co') : 'Not Configured (Guest / Offline Mode Active)',
  };
}
