"use client";

import { useState } from "react";
import type { PlanRow } from "@/lib/database/schema";
import PlanCategorySwitcher from "./PlanCategorySwitcher";
import CityPricedPlans from "./CityPricedPlans";
import PlansFaq from "./PlansFaq";

export default function PlansPageSections({
  category = "all",
  plans: initialPlans,
}: {
  category?: "all" | "home" | "business";
  plans?: PlanRow[];
}) {
  const [homePlanCategory, setHomePlanCategory] = useState<"wifi" | "wifi_ott">("wifi");

  const plans = initialPlans || [];

  // Filter plans based on category
  const homePlans = plans.filter((p) => p.plan_type === "home");
  const businessPlans = plans.filter((p) => p.plan_type === "business");

  // Further filter home plans by home_plan_category (always applied, no null option)
  const visibleHomePlans = homePlans.filter((p) => p.home_plan_category === homePlanCategory);

  const visibleResidentialPlans = category === "business" ? [] : visibleHomePlans;
  const visibleBusinessPlans = category === "home" ? [] : businessPlans;

  return (
    <section className="mx-auto max-w-7xl overflow-visible px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {visibleResidentialPlans.length > 0 && category !== "business" && (
        <div>
          {category === "home" && homePlans.length > 1 && (
            <div className="mb-6 flex flex-col gap-2">
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#5C6F89]">
                Plan type
              </span>
              <div className="flex justify-start">
                <PlanCategorySwitcher
                  selected={homePlanCategory}
                  onSelect={setHomePlanCategory}
                />
              </div>
            </div>
          )}
          <CityPricedPlans
            basePlans={visibleResidentialPlans}
            variant="plans"
            ctaHref="/contact"
            ctaLabel="Get Started"
          />
        </div>
      )}

      {visibleBusinessPlans.length ? (
        <div className="mt-8">
          <CityPricedPlans
            basePlans={visibleBusinessPlans}
            variant="plans"
            ctaHref="/contact"
            ctaLabel="Request Business Quote"
          />
        </div>
      ) : null}

      {category === "home" && visibleResidentialPlans.length > 0 ? (
        <PlansFaq variant="home" />
      ) : null}
      {category === "business" && visibleBusinessPlans.length > 0 ? (
        <PlansFaq variant="business" />
      ) : null}
    </section>
  );
}
