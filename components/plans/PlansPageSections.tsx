"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { PlanRow } from "@/lib/database/schema";
import CityPricedPlans from "./CityPricedPlans";

export default function PlansPageSections({
  category = "all",
  plans: initialPlans,
}: {
  category?: "all" | "home" | "business";
  plans?: PlanRow[];
}) {
  const [homePlanCategory, setHomePlanCategory] = useState<"wifi" | "wifi_ott" | null>(null);

  const plans = initialPlans || [];

  // Filter plans based on category
  const homePlans = plans.filter((p) => p.plan_type === "home");
  const businessPlans = plans.filter((p) => p.plan_type === "business");

  // Further filter home plans by home_plan_category if selected
  let visibleHomePlans = homePlans;
  if (homePlanCategory) {
    visibleHomePlans = homePlans.filter((p) => p.home_plan_category === homePlanCategory);
  }

  const visibleResidentialPlans = category === "business" ? [] : visibleHomePlans;
  const visibleBusinessPlans = category === "home" ? [] : businessPlans;

  return (
    <section className="mx-auto max-w-7xl overflow-visible px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
      {visibleResidentialPlans.length > 0 && category !== "business" && (
        <div>
          {category === "home" && homePlans.length > 1 && (
            <div className="mb-8 flex justify-center gap-4">
              <button
                onClick={() => setHomePlanCategory(null)}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                  homePlanCategory === null
                    ? "bg-[#134799] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All Plans
              </button>
              {homePlans.some((p) => p.home_plan_category === "wifi") && (
                <button
                  onClick={() => setHomePlanCategory("wifi")}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                    homePlanCategory === "wifi"
                      ? "bg-[#134799] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  WiFi Only
                </button>
              )}
              {homePlans.some((p) => p.home_plan_category === "wifi_ott") && (
                <button
                  onClick={() => setHomePlanCategory("wifi_ott")}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                    homePlanCategory === "wifi_ott"
                      ? "bg-[#134799] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  WiFi + OTT
                </button>
              )}
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
