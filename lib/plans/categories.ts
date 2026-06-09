// Plan type values (home or business)
export const PLAN_TYPE_VALUES = ["home", "business"] as const;
export type PlanTypeValue = (typeof PLAN_TYPE_VALUES)[number];

// Home plan category values (for home plans only)
export const HOME_PLAN_CATEGORY_VALUES = ["wifi", "wifi_ott"] as const;
export type HomePlanCategoryValue = (typeof HOME_PLAN_CATEGORY_VALUES)[number];

export const HOME_PLAN_CATEGORY_LABELS: Record<HomePlanCategoryValue, string> = {
  wifi: "WiFi Only",
  wifi_ott: "WiFi + OTT",
};

export const PLAN_TYPE_LABELS: Record<PlanTypeValue, string> = {
  home: "Home Plans",
  business: "Business Plans",
};

// Legacy conversion functions for backward compatibility
export const PLAN_CATEGORY_VALUES = ["wifi_only", "wifi_ott", "business"] as const;
export type PlanCategoryValue = (typeof PLAN_CATEGORY_VALUES)[number];

export const PLAN_CATEGORY_LABELS: Record<PlanCategoryValue, string> = {
  wifi_only: "WiFi Only",
  wifi_ott: "WiFi + OTT Bundle",
  business: "Business Internet",
};

export function normalizePlanCategory(value?: string | null): PlanCategoryValue {
  const normalized = String(value ?? "")
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");

  if (normalized === "wifi_ott" || normalized === "wifi_plus_ott" || normalized === "ott") {
    return "wifi_ott";
  }

  if (normalized === "business" || normalized === "enterprise") {
    return "business";
  }

  return "wifi_only";
}

export function getPlanCategoryLabel(value?: string | null): string {
  return PLAN_CATEGORY_LABELS[normalizePlanCategory(value)];
}

// New functions for plan type and home category
export function normalizePlanType(value?: string | null): PlanTypeValue {
  const normalized = String(value ?? "")
    .toLowerCase()
    .trim();
  
  if (normalized === "business") {
    return "business";
  }
  
  return "home";
}

export function normalizeHomePlanCategory(value?: string | null): HomePlanCategoryValue {
  const normalized = String(value ?? "")
    .toLowerCase()
    .trim();
  
  if (normalized === "wifi_ott" || normalized === "ott" || normalized === "wifi+ott") {
    return "wifi_ott";
  }
  
  return "wifi";
}
