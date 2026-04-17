import { createBrowserClient } from '@supabase/ssr'

// Hardcoded temporarily to bypass environment variable resolution issues during Build
const SUPABASE_URL = 'https://mjlhbhiraheaeijxeedg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_jf2EAm5dueZJY1xAXXNoJA_gn_3MDpn';

export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
