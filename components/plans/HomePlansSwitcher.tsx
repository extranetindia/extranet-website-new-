"use client";

import { useMemo, useState } from "react";
import CityPricedPlans from "./CityPricedPlans";
import type { PlanRow } from "@/lib/database/schema";

type PlanType = "home" | "business";

interface HomePlansSwitcherProps {
  basePlans: PlanRow[];
  ctaHref?: string;
  ctaLabel?: string;
}

const tabs: Array<{ label: string; value: PlanType }> = [
  { label: "Home Plans", value: "home" },
  { label: "Business Plans", value: "business" },
];

export default function HomePlansSwitcher({
  basePlans,
  ctaHref = "/contact",
  ctaLabel = "Get Started",
}: HomePlansSwitcherProps) {
  const [selectedType, setSelectedType] = useState<PlanType>("home");

  const filteredPlans = useMemo(
    () => basePlans.filter((plan) => plan.plan_type === selectedType),
    [basePlans, selectedType],
  );

  return (
    <div className="space-y-8">
      <div className="inline-flex overflow-hidden rounded-full border border-slate-200 bg-slate-100 p-1 shadow-sm">
        {tabs.map((tab) => {
          const active = tab.value === selectedType;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setSelectedType(tab.value)}
              className={`px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                active
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <CityPricedPlans
        basePlans={filteredPlans}
        variant="home"
        ctaHref={ctaHref}
        ctaLabel={ctaLabel}
      />
    </div>
  );
}
