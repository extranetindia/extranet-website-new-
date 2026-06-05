export const PLAN_CATEGORY_VALUES = ["wifi_only", "wifi_ott"] as const;

export type PlanCategoryValue = (typeof PLAN_CATEGORY_VALUES)[number];

export const PLAN_CATEGORY_LABELS: Record<PlanCategoryValue, string> = {
  wifi_only: "WiFi Only",
  wifi_ott: "WiFi + OTT Bundle",
};

export function normalizePlanCategory(value?: string | null): PlanCategoryValue {
  if (value === "wifi_ott" || value === "business") return "wifi_ott";
  return "wifi_only";
}

export function getPlanCategoryLabel(value?: string | null): string {
  return PLAN_CATEGORY_LABELS[normalizePlanCategory(value)];
}
