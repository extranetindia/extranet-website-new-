"use client";

import { useEffect, useMemo, useState } from "react";
import CityPricedPlans from "./CityPricedPlans";
import type { PlanRow } from "@/lib/database/schema";

interface HomePlansSwitcherProps {
  basePlans: PlanRow[];
  ctaHref?: string;
  ctaLabel?: string;
  columns?: 2 | 3;
}

export default function HomePlansSwitcher({
  basePlans,
  ctaHref = "/contact",
  ctaLabel = "Get Started",
  columns = 3,
}: HomePlansSwitcherProps) {
  const [planType, setPlanType] = useState<"home" | "business">("home");

  const filteredPlans = useMemo(
    () =>
      basePlans.filter((p) => {
        const t = (p as any).plan_type ?? "home";
        return t === planType;
      }),
    [basePlans, planType],
  );

  useEffect(() => {
    const homePlans = basePlans.filter(
      (plan) => (plan as any).plan_type === "home" || !(plan as any).plan_type,
    );
    const businessPlans = basePlans.filter((plan) => (plan as any).plan_type === "business");

    console.log("Total plans loaded:", basePlans.length);
    console.log("Home plans count:", homePlans.length);
    console.log("Business plans count:", businessPlans.length);
  }, [basePlans]);

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center">
          <div className="w-full sm:max-w-xs">
            <div className="inline-flex w-full rounded-full bg-slate-100 p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setPlanType("home")}
                aria-pressed={planType === "home"}
                className={`flex-1 text-sm font-semibold py-2 px-3 rounded-full transition-all duration-200 focus:outline-none ${
                  planType === "home"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-200"
                }`}
              >
                Home Plans
              </button>
              <button
                type="button"
                onClick={() => setPlanType("business")}
                aria-pressed={planType === "business"}
                className={`flex-1 text-sm font-semibold py-2 px-3 rounded-full transition-all duration-200 focus:outline-none ${
                  planType === "business"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-200"
                }`}
              >
                Business Plans
              </button>
            </div>
          </div>
        </div>
      </div>

      <CityPricedPlans
        basePlans={filteredPlans}
        variant="home"
        ctaHref={ctaHref}
        ctaLabel={ctaLabel}
        columns={columns}
      />
    </div>
  );
}
