export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase/client";
import type { PlanRow } from "@/lib/database/schema";
import { normalizePlanCategory } from "@/lib/plans/categories";
import CityPricedPlans from "./CityPricedPlans";

export default async function PlansPageSections({
  category = "all",
}: {
  category?: "all" | "home" | "business";
}) {
  const { data: plans } = await supabase
    .from("plans")
    .select("*")
    .order("created_at", { ascending: false });

  if (!plans?.length) return null;

  const residentialPlans = (plans as PlanRow[]).filter(
    (plan) => normalizePlanCategory(plan.plan_type) !== "business",
  );
  const businessPlans = (plans as PlanRow[]).filter(
    (plan) => normalizePlanCategory(plan.plan_type) === "business",
  );

  const visibleResidentialPlans = category === "business" ? [] : residentialPlans;
  const visibleBusinessPlans = category === "home" ? [] : businessPlans;

  return (
    <section className="mx-auto max-w-7xl overflow-visible px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
      {visibleResidentialPlans.length ? (
        <CityPricedPlans
          basePlans={visibleResidentialPlans}
          variant="plans"
          ctaHref="/contact"
          ctaLabel="Get Started"
        />
      ) : null}

      {visibleBusinessPlans.length ? (
        <div className="mt-14 rounded-3xl border border-red-100 bg-red-50/60 p-6 shadow-sm sm:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-[#D2190D]">Business Internet</p>
          <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">Dedicated plans for offices, retail, and multi-site operations</h3>
          <p className="mt-3 max-w-2xl text-slate-600">Keep enterprise pricing and SLA-ready options separate from residential bundles while preserving city pricing and lead flow.</p>
          <div className="mt-6">
            <CityPricedPlans
              basePlans={visibleBusinessPlans}
              variant="plans"
              ctaHref="/contact"
              ctaLabel="Request Business Quote"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
