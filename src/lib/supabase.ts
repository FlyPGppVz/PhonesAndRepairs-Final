import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim() || 'https://mjlhbhiraheaeijxeedg.supabase.co'
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qbGhiaGlyYWhlYWVpanhlZWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDcyMzAsImV4cCI6MjA5MTkyMzIzMH0.qfxfY-DPhneV3IJQ0ODxA6TYOKV_YiAWcfb4rDi3e9A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
