/**
 * Client-side debugging utility for the plan save flow
 * This can be run in the browser console to verify setup_fee and security_deposit fields
 */

export async function debugPlanSave() {
  const { supabase } = await import("@/lib/supabase/client");

  console.group("🔍 Plan Save Debug Utility");

  // 1. Check if columns exist by querying a plan
  console.log("\n1️⃣  Checking if setup_fee and security_deposit columns exist...");
  const { data: samplePlan, error: queryError } = await supabase
    .from("plans")
    .select("id, name, setup_fee, security_deposit")
    .limit(1)
    .single();

  if (queryError) {
    console.error("❌ Query failed:", queryError);
  } else {
    console.log("✅ Columns exist and are readable");
    console.log("   Sample plan:", samplePlan);
  }

  // 2. Test update on a plan
  console.log("\n2️⃣  Testing update operation...");
  if (samplePlan?.id) {
    const testPayload = {
      setup_fee: "Test ₹999 - " + new Date().toISOString(),
      security_deposit: "Test ₹500 - " + new Date().toISOString(),
    };

    console.log("   Sending payload:", testPayload);

    const { data: updateResult, error: updateError } = await supabase
      .from("plans")
      .update(testPayload)
      .eq("id", samplePlan.id)
      .select("id, name, setup_fee, security_deposit");

    if (updateError) {
      console.error("❌ Update failed:", updateError);
    } else {
      console.log("✅ Update successful");
      console.log("   Updated row:", updateResult?.[0]);
    }
  }

  // 3. Check form state
  console.log("\n3️⃣  Checking admin form state in localStorage...");
  const formState = sessionStorage.getItem("adminPlanFormDraft");
  if (formState) {
    console.log("   Form state:", JSON.parse(formState));
  } else {
    console.log("   ℹ️  No form state in sessionStorage");
  }

  console.groupEnd();
}

// Make it globally available
if (typeof window !== "undefined") {
  (window as any).debugPlanSave = debugPlanSave;
  console.log(
    "✅ Debug utility loaded. Run: debugPlanSave() in console"
  );
}
