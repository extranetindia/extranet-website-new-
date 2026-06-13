"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { PlanRow } from "@/lib/database/schema";
import PlanCategorySwitcher from "./PlanCategorySwitcher";
import CityPricedPlans from "./CityPricedPlans";

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
    <section className="mx-auto max-w-7xl overflow-visible px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
      {visibleResidentialPlans.length > 0 && category !== "business" && (
        <div>
          {category === "home" && homePlans.length > 1 && (
            <div className="mb-8 flex justify-center">
              <PlanCategorySwitcher
                selected={homePlanCategory}
                onSelect={setHomePlanCategory}
              />
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
    </section>
  );
}
