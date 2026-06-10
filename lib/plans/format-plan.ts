import type { PlanRow } from "@/lib/database/schema";
import type { PlanColor, PlanDefinition } from "@/lib/plans";

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

  // Determine planType based on plan_type and home_plan_category
  let planType: "wifi_only" | "wifi_ott" | "business" = "wifi_only";
  if (plan.plan_type === "business") {
    planType = "business";
  } else if (plan.plan_type === "home") {
    planType = plan.home_plan_category === "wifi_ott" ? "wifi_ott" : "wifi_only";
  }

  const isBusinessPlan = plan.plan_type === "business";
  const color: PlanColor = isBusinessPlan ? "red" : "blue";

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
    monthlySetupFee: plan.monthly_setup_fee ?? null,
    quarterlySetupFee: plan.quarterly_setup_fee ?? null,
    halfYearlySetupFee: plan.half_yearly_setup_fee ?? null,
    annualSetupFee: plan.annual_setup_fee ?? null,
    monthlySecurityDeposit: plan.monthly_security_deposit ?? null,
    quarterlySecurityDeposit: plan.quarterly_security_deposit ?? null,
    halfYearlySecurityDeposit: plan.half_yearly_security_deposit ?? null,
    annualSecurityDeposit: plan.annual_security_deposit ?? null,
    ottApps: parseOttApps(plan.ott_apps ?? []),
    savingsBadge: plan.savings_badge ?? null,
    planType,
    color,
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
