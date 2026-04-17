import { createBrowserClient } from '@supabase/ssr'

// Hardcoded temporarily to bypass environment variable resolution issues during Build
const SUPABASE_URL = 'https://mjlhbhiraheaeijxeedg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qbGhiaGlyYWhlYWVpanhlZWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDcyMzAsImV4cCI6MjA5MTkyMzIzMH0.qfxfY-DPhneV3IJQ0ODxA6TYOKV_YiAWcfb4rDi3e9A';

export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
