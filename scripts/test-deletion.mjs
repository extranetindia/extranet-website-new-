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

async function testDeletion() {
  console.log('\n=== PRICING DELETION TEST ===\n');

  // Fetch a plan with existing pricing
  const { data: plans, error: plansError } = await supabase
    .from('plans')
    .select('id, name, price')
    .limit(1)
    .single();

  if (plansError) {
    console.error('Error fetching plan:', plansError);
    return;
  }

  const planId = plans.id;
  console.log(`Testing with plan: ${plans.name} (${planId})`);

  // Fetch pricing for this plan
  const { data: pricing, error: pricingError } = await supabase
    .from('plan_pricing')
    .select('id, plan_id, city_id, price, city:cities(name)')
    .eq('plan_id', planId)
    .limit(3);

  if (pricingError) {
    console.error('Error fetching pricing:', pricingError);
    return;
  }

  console.log(`Found ${pricing.length} pricing rows for this plan`);
  console.log('\nPricing rows to test:');
  pricing.forEach((row, idx) => {
    console.log(`  ${idx + 1}. ${row.city?.name}: ${row.price} (id: ${row.id})`);
  });

  // Test deleting each pricing row
  console.log('\n--- Attempting DELETIONS ---');
  for (const row of pricing) {
    console.log(
      `\nDeleting pricing: city="${row.city?.name}", id=${row.id}, price=${row.price}`,
    );
    const { error } = await supabase.from('plan_pricing').delete().eq('id', row.id);

    if (error) {
      console.error(
        `❌ DELETE FAILED: code=${error.code}, message="${error.message}", hint="${error.hint}", details="${error.details}"`,
      );
      console.error('Full error:', JSON.stringify(error, null, 2));
    } else {
      console.log(`✅ DELETE SUCCEEDED`);
    }
  }

  // Verify deletions
  console.log('\n--- Verifying DELETIONS ---');
  const { data: afterDelete, error: verifyError } = await supabase
    .from('plan_pricing')
    .select('id, city_id, city:cities(name)')
    .eq('plan_id', planId);

  if (verifyError) {
    console.error('Error verifying:', verifyError);
  } else {
    console.log(`\nRemaining pricing rows for this plan: ${afterDelete.length}`);
    afterDelete.forEach((row) => {
      console.log(`  - ${row.city?.name} (id: ${row.id})`);
    });
  }
}

testDeletion().catch(console.error);
