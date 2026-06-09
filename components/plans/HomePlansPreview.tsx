"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { PlanRow } from "@/lib/database/schema";
import { type HomePlanCategoryValue } from "@/lib/plans/categories";
import HomePlansSwitcher from "./HomePlansSwitcher";
import CityPricedPlans from "./CityPricedPlans";

export default function HomePlansPreview() {
  const [plans, setPlans] = useState<PlanRow[]>([]);
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

  if (!plans.length) return null;

  return (
    <section className="overflow-hidden bg-white py-12 sm:py-16 md:py-20">
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
