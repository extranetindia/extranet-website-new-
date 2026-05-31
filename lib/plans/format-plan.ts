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

export type SupabasePlanCard = PlanDefinition & {
  id: string;
  originalPrice: string | null;
  priceSource: "plan_pricing" | "plans_fallback";
};

export function formatSupabasePlanForCards(
  plan: PlanRow & { originalPrice?: string | null; priceSource?: "plan_pricing" | "plans_fallback" },
): SupabasePlanCard {
  return {
    id: plan.id,
    name: plan.name,
    speed: plan.speed,
    price: plan.price,
    originalPrice: plan.originalPrice ?? null,
    priceSource: plan.priceSource ?? "plans_fallback",
    description: plan.description ?? "",
    features: parsePlanFeatures(plan.features),
    popular: Boolean(plan.popular),
    tag: plan.popular ? "Most Popular" : null,
    color: "blue" as PlanColor,
    period: "/month",
  };
}
