// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const hasCredentials = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasCredentials) {
  console.warn('Supabase credentials missing. CMS features will operate in mock mode.');
}

// Client for public use (subject to RLS)
export const supabase = hasCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Admin client for server-side use (bypasses RLS)
export const supabaseAdmin = (hasCredentials && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase;
