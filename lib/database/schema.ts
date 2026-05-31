/**
 * Supabase row types for Extranet CMS tables.
 * plans table shape is unchanged — legacy price field remains the default fallback.
 */

/** Existing plans table (unchanged). */
export interface PlanRow {
  id: string;
  created_at?: string;
  name: string;
  speed: string;
  /** Legacy default price — used when no plan_pricing row exists for a city. */
  price: string;
  description: string | null;
  features: string[] | string | null;
  popular: boolean;
  category: string;
  button_text: string;
}

export interface CityRow {
  id: string;
  name: string;
  active: boolean;
  created_at: string;
}

export interface PlanPricingRow {
  id: string;
  plan_id: string;
  city_id: string;
  price: string;
  original_price: string | null;
  created_at: string;
  updated_at: string;
}

/** plan_pricing joined with its city. */
export interface PlanPricingWithCity extends PlanPricingRow {
  city: CityRow;
}

/** plan_pricing joined with its plan. */
export interface PlanPricingWithPlan extends PlanPricingRow {
  plan: PlanRow;
}

/** Full join for admin / future public pricing resolution. */
export interface PlanPricingWithRelations extends PlanPricingRow {
  city: CityRow;
  plan: PlanRow;
}

/**
 * Resolved price for display: city override when present, otherwise plans.price.
 */
export interface ResolvedPlanPrice {
  planId: string;
  cityId: string | null;
  price: string;
  originalPrice: string | null;
  source: "plan_pricing" | "plans_fallback";
}

export type CityInsert = Pick<CityRow, "name"> & Partial<Pick<CityRow, "active">>;

export type CityUpdate = Partial<Pick<CityRow, "name" | "active">>;

export type PlanPricingInsert = Pick<
  PlanPricingRow,
  "plan_id" | "city_id" | "price"
> &
  Partial<Pick<PlanPricingRow, "original_price">>;

export type PlanPricingUpdate = Partial<
  Pick<PlanPricingRow, "price" | "original_price">
>;

export interface SupportSettingsRow {
  id: string;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  office_address: string | null;
  support_timings: string | null;
  created_at: string;
  updated_at: string;
}

export type SupportSettingsUpdate = Partial<
  Pick<
    SupportSettingsRow,
    "phone" | "email" | "whatsapp" | "office_address" | "support_timings"
  >
>;
