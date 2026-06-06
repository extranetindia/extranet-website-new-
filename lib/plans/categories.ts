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
