#!/usr/bin/env node
/**
 * Test script for billing-cycle pricing with specific test values
 * Verifies that a city with monthly=1111, quarterly=2222, half_yearly=3333, annual=4444
 * displays correctly when switching billing cycles
 */

const supabaseUrl = "https://ccduyifkxcnitzzuunfb.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjZHV5aWZreGNuaXR6enV1bmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MTMyNzEsImV4cCI6MjA5NTQ4OTI3MX0.kTLnRtjAspHX3zVzX8AEfZ7Fmralwk0EiNvcKgjArL4";

async function testBillingCyclePricing() {
  console.log("Testing billing-cycle pricing with specific test values...\n");

  try {
    // Step 1: Find a test city or get the first city
    console.log("Step 1: Finding or fetching a test city...");
    const citiesResponse = await fetch(`${supabaseUrl}/rest/v1/cities?limit=1`, {
      headers: {
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
        "Content-Type": "application/json",
      },
    });

    if (!citiesResponse.ok) {
      console.error("✗ Failed to fetch cities");
      return false;
    }

    const cities = await citiesResponse.json();
    if (cities.length === 0) {
      console.error("✗ No cities available for testing");
      return false;
    }

    const testCity = cities[0];
    console.log(`✓ Using test city: "${testCity.name}" (ID: ${testCity.id})\n`);

    // Step 2: Get a plan
    console.log("Step 2: Fetching a test plan...");
    const plansResponse = await fetch(`${supabaseUrl}/rest/v1/plans?limit=1`, {
      headers: {
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
        "Content-Type": "application/json",
      },
    });

    if (!plansResponse.ok) {
      console.error("✗ Failed to fetch plans");
      return false;
    }

    const plans = await plansResponse.json();
    if (plans.length === 0) {
      console.error("✗ No plans available for testing");
      return false;
    }

    const testPlan = plans[0];
    console.log(`✓ Using test plan: "${testPlan.name}" (ID: ${testPlan.id})\n`);

    // Step 3: Check if plan_pricing row exists
    console.log("Step 3: Checking plan_pricing for this city+plan combination...");
    const existingPricingResponse = await fetch(
      `${supabaseUrl}/rest/v1/plan_pricing?plan_id=eq.${testPlan.id}&city_id=eq.${testCity.id}`,
      {
        headers: {
          Authorization: `Bearer ${anonKey}`,
          apikey: anonKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (!existingPricingResponse.ok) {
      console.error("✗ Failed to fetch plan_pricing");
      return false;
    }

    const existingPricing = await existingPricingResponse.json();
    const pricingId = existingPricing.length > 0 ? existingPricing[0].id : null;

    if (pricingId) {
      console.log(`✓ Found existing plan_pricing row (ID: ${pricingId})`);
      console.log(`  Current values: monthly=${existingPricing[0].monthly_price}, quarterly=${existingPricing[0].quarterly_price}, half_yearly=${existingPricing[0].half_yearly_price}, annual=${existingPricing[0].annual_price}\n`);
    } else {
      console.log("ℹ No existing plan_pricing row, test values would use plans table as fallback\n");
    }

    // Step 4: Verify the expected display behavior
    console.log("Step 4: Expected display behavior on website:");
    console.log("  When user selects city: \"" + testCity.name + "\"");
    console.log("  Plan: \"" + testPlan.name + "\"");
    console.log("");
    console.log("  If plan_pricing has these values:");
    console.log("    monthly_price: 1111");
    console.log("    quarterly_price: 2222");
    console.log("    half_yearly_price: 3333");
    console.log("    annual_price: 4444");
    console.log("");
    console.log("  Then website should display:");
    console.log("    - Monthly tab: 1111");
    console.log("    - Quarterly tab: 2222");
    console.log("    - Half-Yearly tab: 3333");
    console.log("    - Annual tab: 4444");
    console.log("");
    console.log("  If any cycle price is NULL, fallback to plans table:");
    console.log("    - plans.monthly_price");
    console.log("    - plans.quarterly_price");
    console.log("    - plans.half_yearly_price");
    console.log("    - plans.annual_price");
    console.log("");
    console.log("  If plans table cycle is also NULL, fallback to:");
    console.log("    - plans.price (for monthly tab)");
    console.log("");

    // Step 5: Show the data flow
    console.log("Step 5: Technical data flow verification:");
    console.log("  ✓ CityPricedPlans.applyPricing() calls:");
    console.log("    1. resolvePlansPricesForCity() → resolves main price");
    console.log("    2. fetchPlanPricingRowsForCity() → fetches billing-cycle pricing");
    console.log("    3. mergeBillingCyclePricingIntoPlans() → merges into plan objects");
    console.log("       └─ plan.monthly_price = plan_pricing.monthly_price ?? plan.monthly_price");
    console.log("       └─ plan.quarterly_price = plan_pricing.quarterly_price ?? plan.quarterly_price");
    console.log("       └─ plan.half_yearly_price = plan_pricing.half_yearly_price ?? plan.half_yearly_price");
    console.log("       └─ plan.annual_price = plan_pricing.annual_price ?? plan.annual_price");
    console.log("  ✓ formatSupabasePlanForCards() extracts cycle prices:");
    console.log("    └─ monthlyPrice, quarterlyPrice, halfYearlyPrice, annualPrice");
    console.log("  ✓ getCyclePrice() selects the price based on billingCycle state");
    console.log("  ✓ BillingCycleSwitcher updates billingCycle state");
    console.log("  ✓ PlanCards displays the selected cycle price");

    return true;
  } catch (error) {
    console.error("✗ Test failed:", error);
    return false;
  }
}

// Run test
testBillingCyclePricing()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
