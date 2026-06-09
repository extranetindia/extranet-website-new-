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

async function run() {
  console.log('URL', supabaseUrl?.slice(0, 30) + '...');
  const { data, error } = await supabase
    .from('plan_pricing')
    .select(
      'id, plan_id, city_id, price, original_price, created_at, updated_at, city:cities (id, name)',
    )
    .order('plan_id', { ascending: true })
    .order('city_id', { ascending: true })
    .limit(500);

  console.log('fetch error', JSON.stringify(error, null, 2));
  console.log('count', data?.length);
  if (data) {
    console.log(
      'sample with city names:',
      JSON.stringify(
        data.slice(0, 15).map((row) => ({
          id: row.id,
          plan_id: row.plan_id,
          city_id: row.city_id,
          city_name: row.city?.name,
          price: row.price,
          updated_at: row.updated_at,
        })),
        null,
        2,
      ),
    );
  }

  // Find rows for plan 40200cfa-a6e0-4de9-96ad-b77b4a5620e7
  const plan40200rows = data?.filter((r) => r.plan_id === '40200cfa-a6e0-4de9-96ad-b77b4a5620e7');
  console.log('Pricing rows for 50 Mbps plan (40200cfa...):', plan40200rows?.length || 0);
  if (plan40200rows && plan40200rows.length > 0) {
    console.log(
      JSON.stringify(
        plan40200rows.map((row) => ({
          city_name: row.city?.name,
          price: row.price,
          updated_at: row.updated_at,
        })),
        null,
        2,
      ),
    );
  }
}

run().catch((error) => {
  console.error('script failed', error);
});
