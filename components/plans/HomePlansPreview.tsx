"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { PlanRow } from "@/lib/database/schema";
import HomePlansSwitcher from "./HomePlansSwitcher";
import CityPricedPlans from "./CityPricedPlans";

type PlanType = "home" | "business";

export default function HomePlansPreview() {
  const [plans, setPlans] = useState<PlanRow[]>([]);
  const [selectedType, setSelectedType] = useState<PlanType>("home");

  useEffect(() => {
    let isMounted = true;

    async function loadPlans() {
      const { data } = await supabase
        .from("plans")
        .select("*")
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
    () => plans.filter((plan) => plan.plan_type === selectedType),
    [plans, selectedType],
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
              selectedType={selectedType}
              onSelectType={setSelectedType}
            />
          }
        />
      </div>
    </section>
  );
}
