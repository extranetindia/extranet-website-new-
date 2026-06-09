import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envText = fs.readFileSync(envPath, 'utf8');
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => line.split('=')),
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdminUser() {
  console.log('Signing up admin user...');
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@extranet.in',
    password: 'admin123',
  });

  if (error) {
    console.error('Error signing up user:', error);
    // Check if user already exists
    if (error.message?.includes('already registered')) {
      console.log('User already exists. Attempting to sign in...');
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'admin@extranet.in',
        password: 'admin123',
      });
      if (signInError) {
        console.error('Error signing in:', signInError);
      } else {
        console.log('Sign in successful:', signInData.user?.email);
      }
    }
    return;
  }

  console.log('User signed up successfully:', data.user?.email);
}

createAdminUser().catch(console.error);
