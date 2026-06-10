/**
 * Verify that setup_fee and security_deposit columns exist in the plans table
 * and that they are writable
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyPlanFields() {
  console.log("🔍 Verifying plan table columns...\n");

  // Step 1: Query the information schema to see all columns in the plans table
  const { data: columns, error: columnsError } = await supabase
    .from("information_schema.columns")
    .select("column_name, data_type, is_nullable")
    .eq("table_name", "plans")
    .eq("table_schema", "public");

  if (columnsError) {
    console.error("❌ Failed to query columns:", columnsError);
    process.exit(1);
  }

  console.log("📋 Plans table columns:");
  const setupFeeColumn = columns?.find((c) => c.column_name === "setup_fee");
  const securityDepositColumn = columns?.find(
    (c) => c.column_name === "security_deposit"
  );

  if (setupFeeColumn) {
    console.log(`✅ setup_fee: ${setupFeeColumn.data_type}`);
  } else {
    console.log("❌ setup_fee: MISSING");
  }

  if (securityDepositColumn) {
    console.log(`✅ security_deposit: ${securityDepositColumn.data_type}`);
  } else {
    console.log("❌ security_deposit: MISSING");
  }

  console.log("\n");

  // Step 2: Try to update a test plan with these fields
  const { data: plans, error: plansError } = await supabase
    .from("plans")
    .select("id, name")
    .limit(1);

  if (plansError || !plans || plans.length === 0) {
    console.error(
      "❌ Could not find a plan to test:",
      plansError || "No plans found"
    );
    process.exit(1);
  }

  const testPlanId = plans[0].id;
  console.log(`🧪 Testing update on plan: ${testPlanId}\n`);

  // Update the plan with test values
  const { error: updateError, data: updated } = await supabase
    .from("plans")
    .update({
      setup_fee: "₹1,500",
      security_deposit: "₹2,000",
    })
    .eq("id", testPlanId)
    .select("id, name, setup_fee, security_deposit");

  if (updateError) {
    console.error("❌ Update failed:", updateError);
    process.exit(1);
  }

  console.log("✅ Update successful. Updated row:");
  console.log(JSON.stringify(updated, null, 2));

  // Step 3: Verify the values were actually saved
  const { data: verified, error: verifyError } = await supabase
    .from("plans")
    .select("id, name, setup_fee, security_deposit")
    .eq("id", testPlanId)
    .single();

  if (verifyError) {
    console.error("❌ Verification query failed:", verifyError);
    process.exit(1);
  }

  console.log("\n✅ Verification successful:");
  console.log(`   setup_fee: ${verified.setup_fee}`);
  console.log(`   security_deposit: ${verified.security_deposit}`);

  console.log("\n✅ All checks passed! Fields are working correctly.");
}

verifyPlanFields().catch((err) => {
  console.error("💥 Script error:", err);
  process.exit(1);
});
