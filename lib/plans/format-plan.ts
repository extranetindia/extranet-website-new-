import type { PlanRow } from "@/lib/database/schema";
import type { PlanColor, PlanDefinition } from "@/lib/plans";
import { normalizePlanCategory } from "@/lib/plans/categories";

export function parsePlanFeatures(features: PlanRow["features"]): string[] {
  if (!features) return [];
  if (Array.isArray(features)) return features;
  if (typeof features === "string") {
    try {
      const parsed = JSON.parse(features) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item));
      }
    } catch {
      // comma-separated fallback
    }
    return features
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

export function parseOttApps(value: PlanRow["ott_apps"]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => String(item)).filter(Boolean);

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item)).filter(Boolean);
      }
    } catch {
      // fall back to comma-separated list
    }

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export type SupabasePlanCard = PlanDefinition & {
  id: string;
  originalPrice: string | null;
  priceSource: "plan_pricing" | "plans_fallback";
};

export function formatSupabasePlanForCards(
  plan: PlanRow & { originalPrice?: string | null; priceSource?: "plan_pricing" | "plans_fallback" },
): SupabasePlanCard {
  const monthlyPrice = plan.monthly_price ?? plan.price;
  const quarterlyPrice = plan.quarterly_price ?? null;
  const halfYearlyPrice = plan.half_yearly_price ?? null;
  const annualPrice = plan.annual_price ?? null;

  return {
    id: plan.id,
    name: plan.name,
    speed: plan.speed,
    price: monthlyPrice,
    originalPrice: plan.originalPrice ?? null,
    priceSource: plan.priceSource ?? "plans_fallback",
    description: plan.description ?? "",
    features: parsePlanFeatures(plan.features),
    popular: Boolean(plan.popular),
    tag: plan.popular ? "Most Popular" : null,
    tagline: plan.tagline ?? null,
    setupFee: plan.setup_fee ?? null,
    securityDeposit: plan.security_deposit ?? null,
    ottApps: parseOttApps(plan.ott_apps ?? []),
    savingsBadge: plan.savings_badge ?? null,
    planType: normalizePlanCategory(plan.plan_type),
    color: normalizePlanCategory(plan.plan_type) === "business" ? "red" : "blue",
    period: "/month",
    monthlyPrice,
    quarterlyPrice,
    halfYearlyPrice,
    annualPrice,
    routerIncluded: Boolean(plan.router_included),
    landlineIncluded: Boolean(plan.landline_included),
    installationFree: Boolean(plan.installation_free),
  };
}
