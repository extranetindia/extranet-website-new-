"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { PlanRow } from "@/lib/database/schema";
import { type HomePlanCategoryValue } from "@/lib/plans/categories";
import HomePlansSwitcher from "./HomePlansSwitcher";
import CityPricedPlans from "./CityPricedPlans";

export default function HomePlansPreview() {
  const [plans, setPlans] = useState<PlanRow[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<HomePlanCategoryValue>("wifi");

  useEffect(() => {
    let isMounted = true;

    async function loadPlans() {
      const { data } = await supabase
        .from("plans")
        .select("*")
        .eq("plan_type", "home")
        .order("created_at", { ascending: false });

      if (isMounted) {
        setPlans((data as PlanRow[]) ?? []);
        setLoaded(true);
      }
    }

    void loadPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPlans = useMemo(
    () =>
      plans.filter(
        (plan) => plan.plan_type === "home" && plan.home_plan_category === selectedCategory,
      ),
    [plans, selectedCategory],
  );

  // Skeleton reserves the section height so content popping in
  // doesn't shove the page (CLS) on mobile networks.
  if (!loaded) {
    return (
      <section aria-label="Loading broadband plans" className="overflow-hidden border-y border-[#DCE3EC] bg-[#F8F9FB] py-10 sm:py-14">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="h-7 w-64 animate-pulse rounded-md bg-[#DCE3EC]" />
          <div className="mt-3 h-10 w-40 animate-pulse rounded-md bg-[#DCE3EC]" />
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="min-h-[380px] animate-pulse rounded-xl border border-[#DCE3EC] bg-white" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!plans.length) return null;

  return (
    <section id="plans" className="overflow-hidden border-y border-[#DCE3EC] bg-[#F8F9FB] py-10 sm:py-14">
      <div className="mx-auto max-w-[1200px] overflow-visible px-4 sm:px-6 lg:px-8">
        <CityPricedPlans
          basePlans={filteredPlans}
          variant="home"
          ctaHref="/contact"
          ctaLabel="Get Started"
          renderControls={
            <HomePlansSwitcher
              selectedCategory={selectedCategory}
              onSelectCategory={(value) => setSelectedCategory(value)}
            />
          }
        />
      </div>
    </section>
  );
}
