export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase/client";
import type { PlanRow } from "@/lib/database/schema";
import HomePlansSwitcher from "./HomePlansSwitcher";

export default async function PlansPageSections() {
  const { data: plans } = await supabase
    .from("plans")
    .select("*")
    .order("created_at", { ascending: false });

  if (!plans?.length) return null;

  return (
    <section className="mx-auto max-w-7xl overflow-visible px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
      <HomePlansSwitcher
        basePlans={plans as PlanRow[]}
        variant="plans"
        ctaHref="/contact"
        ctaLabel="Get Started"
      />
    </section>
  );
}
