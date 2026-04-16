import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Page data collection might fail during build if not provided in Vercel.')
}

export const supabase = createClient(
  supabaseUrl || 'https://mjlhbhiraheaeijxeedg.supabase.co', 
  supabaseAnonKey || 'placeholder'
)
