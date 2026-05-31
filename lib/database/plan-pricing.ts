import { supabase } from "@/lib/supabase/client";
import type {
  CityRow,
  PlanPricingRow,
  PlanPricingWithCity,
  PlanPricingWithPlan,
  PlanPricingWithRelations,
  PlanRow,
  ResolvedPlanPrice,
} from "@/lib/database/schema";

const CITY_COLUMNS = "id, name, active, created_at";
const PLAN_PRICING_COLUMNS =
  "id, plan_id, city_id, price, original_price, created_at, updated_at";
const PLAN_COLUMNS =
  "id, created_at, name, speed, price, description, features, popular, category, plan_type, button_text";

// ---------------------------------------------------------------------------
// Cities
// ---------------------------------------------------------------------------

export async function fetchCities(options?: {
  activeOnly?: boolean;
}): Promise<{ data: CityRow[]; error: Error | null }> {
  let query = supabase
    .from("cities")
    .select(CITY_COLUMNS)
    .order("name", { ascending: true });

  if (options?.activeOnly) {
    query = query.eq("active", true);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as CityRow[],
    error: error ? new Error(error.message) : null,
  };
}

export async function fetchCityById(
  cityId: string,
): Promise<{ data: CityRow | null; error: Error | null }> {
  const { data, error } = await supabase
    .from("cities")
    .select(CITY_COLUMNS)
    .eq("id", cityId)
    .maybeSingle();

  return {
    data: (data as CityRow | null) ?? null,
    error: error ? new Error(error.message) : null,
  };
}

export async function fetchCityByName(
  name: string,
): Promise<{ data: CityRow | null; error: Error | null }> {
  const { data, error } = await supabase
    .from("cities")
    .select(CITY_COLUMNS)
    .eq("name", name)
    .maybeSingle();

  return {
    data: (data as CityRow | null) ?? null,
    error: error ? new Error(error.message) : null,
  };
}

// ---------------------------------------------------------------------------
// Plan pricing
// ---------------------------------------------------------------------------

export async function fetchPlanPricingByCity(
  cityId: string,
): Promise<{ data: PlanPricingWithPlan[]; error: Error | null }> {
  const { data, error } = await supabase
    .from("plan_pricing")
    .select(`${PLAN_PRICING_COLUMNS}, plan:plans (${PLAN_COLUMNS})`)
    .eq("city_id", cityId);

  return {
    data: (data ?? []) as unknown as PlanPricingWithPlan[],
    error: error ? new Error(error.message) : null,
  };
}

export async function fetchPlanPricingForPlan(
  planId: string,
): Promise<{ data: PlanPricingWithCity[]; error: Error | null }> {
  const { data, error } = await supabase
    .from("plan_pricing")
    .select(`${PLAN_PRICING_COLUMNS}, city:cities (${CITY_COLUMNS})`)
    .eq("plan_id", planId);

  return {
    data: (data ?? []) as unknown as PlanPricingWithCity[],
    error: error ? new Error(error.message) : null,
  };
}

export async function fetchPlanPricingForPlanAndCity(
  planId: string,
  cityId: string,
): Promise<{ data: PlanPricingRow | null; error: Error | null }> {
  const { data, error } = await supabase
    .from("plan_pricing")
    .select(PLAN_PRICING_COLUMNS)
    .eq("plan_id", planId)
    .eq("city_id", cityId)
    .maybeSingle();

  return {
    data: (data as PlanPricingRow | null) ?? null,
    error: error ? new Error(error.message) : null,
  };
}

export async function fetchAllPlanPricing(): Promise<{
  data: PlanPricingWithRelations[];
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from("plan_pricing")
    .select(
      `${PLAN_PRICING_COLUMNS}, city:cities (${CITY_COLUMNS}), plan:plans (${PLAN_COLUMNS})`,
    );

  return {
    data: (data ?? []) as unknown as PlanPricingWithRelations[],
    error: error ? new Error(error.message) : null,
  };
}

/** Admin form row: one city with optional existing plan_pricing row. */
export interface CityPricingFormRow {
  cityId: string;
  cityName: string;
  pricingId: string | null;
  price: string;
  originalPrice: string;
}

export function buildCityPricingFormRows(
  cities: CityRow[],
  existing: PlanPricingWithCity[],
): CityPricingFormRow[] {
  const byCityId = new Map(existing.map((row) => [row.city_id, row]));

  return cities.map((city) => {
    const row = byCityId.get(city.id);
    return {
      cityId: city.id,
      cityName: city.name,
      pricingId: row?.id ?? null,
      price: row?.price ?? "",
      originalPrice: row?.original_price ?? "",
    };
  });
}

/**
 * Persist city pricing for a plan. Inserts new rows, updates existing,
 * deletes rows when price is cleared. Skips rows with empty price and no existing row.
 */
export async function savePlanCityPricing(
  planId: string,
  rows: CityPricingFormRow[],
): Promise<{ error: Error | null }> {
  for (const row of rows) {
    const price = row.price.trim();
    const originalPrice = row.originalPrice.trim() || null;

    if (!price) {
      if (row.pricingId) {
        const { error } = await supabase
          .from("plan_pricing")
          .delete()
          .eq("id", row.pricingId);

        if (error) {
          return { error: new Error(error.message) };
        }
      }
      continue;
    }

    if (row.pricingId) {
      const { error } = await supabase
        .from("plan_pricing")
        .update({
          price,
          original_price: originalPrice,
        })
        .eq("id", row.pricingId);

      if (error) {
        return { error: new Error(error.message) };
      }
    } else {
      const { error } = await supabase.from("plan_pricing").insert({
        plan_id: planId,
        city_id: row.cityId,
        price,
        original_price: originalPrice,
      });

      if (error) {
        return { error: new Error(error.message) };
      }
    }
  }

  return { error: null };
}

// ---------------------------------------------------------------------------
// Price resolution (backward compatible)
// ---------------------------------------------------------------------------

/**
 * Returns city-specific price when a plan_pricing row exists;
 * otherwise falls back to plans.price (unchanged legacy behavior).
 */
export function resolvePlanPrice(
  plan: Pick<PlanRow, "id" | "price">,
  cityId: string | null,
  pricingRow: PlanPricingRow | null | undefined,
): ResolvedPlanPrice {
  if (pricingRow && pricingRow.plan_id === plan.id) {
    return {
      planId: plan.id,
      cityId,
      price: pricingRow.price,
      originalPrice: pricingRow.original_price,
      source: "plan_pricing",
    };
  }

  return {
    planId: plan.id,
    cityId,
    price: plan.price,
    originalPrice: null,
    source: "plans_fallback",
  };
}

/**
 * Batch-resolve prices for all plans in a city.
 * Plans without a plan_pricing row use plans.price.
 */
export async function resolvePlansPricesForCity(
  plans: PlanRow[],
  cityId: string,
): Promise<{ data: ResolvedPlanPrice[]; error: Error | null }> {
  const { data: pricingRows, error } = await fetchPlanPricingRowsForCity(cityId);

  if (error) {
    return { data: [], error };
  }

  const byPlanId = new Map(pricingRows.map((row) => [row.plan_id, row]));

  const resolved = plans.map((plan) =>
    resolvePlanPrice(plan, cityId, byPlanId.get(plan.id)),
  );

  return { data: resolved, error: null };
}

/** Lightweight fetch — plan_pricing rows only (no joins). */
export async function fetchPlanPricingRowsForCity(
  cityId: string,
): Promise<{ data: PlanPricingRow[]; error: Error | null }> {
  const { data, error } = await supabase
    .from("plan_pricing")
    .select(PLAN_PRICING_COLUMNS)
    .eq("city_id", cityId);

  return {
    data: (data ?? []) as PlanPricingRow[],
    error: error ? new Error(error.message) : null,
  };
}

export function mergeResolvedPricesIntoPlans<T extends PlanRow>(
  plans: T[],
  resolved: ResolvedPlanPrice[],
): (T & { price: string; originalPrice: string | null; priceSource: ResolvedPlanPrice["source"] })[] {
  const byPlanId = new Map(resolved.map((item) => [item.planId, item]));

  return plans.map((plan) => {
    const match = byPlanId.get(plan.id);
    return {
      ...plan,
      price: match?.price ?? plan.price,
      originalPrice: match?.originalPrice ?? null,
      priceSource: match?.source ?? "plans_fallback",
    };
  });
}
