import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseClient: any = null;

if (supabaseUrl && supabaseKey) {
  supabaseClient = createClient(supabaseUrl, supabaseKey);
} else {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  // Create a dummy client that throws an error when used
  supabaseClient = new Proxy({}, {
    get: () => {
      throw new Error('Supabase is not configured. Please check your .env file.');
    }
  });
}

export const supabase = supabaseClient;
