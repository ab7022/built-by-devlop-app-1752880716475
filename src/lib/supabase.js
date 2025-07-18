import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://voyaguhbmkaakivlcydc.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZveWFndWhibWthYWtpdmxjeWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4Nzg2ODEsImV4cCI6MjA2ODQ1NDY4MX0.71ZX0LLxV3TrZEPDcMyasysTgLW-rLJE4dHT0Nr1-0M';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
