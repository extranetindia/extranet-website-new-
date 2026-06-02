export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase/client";
import type { PlanRow } from "@/lib/database/schema";
import HomePlansSwitcher from "./HomePlansSwitcher";

export default async function HomePlansPreview() {
  const { data: plans } = await supabase
    .from("plans")
    .select("*")
    .order("created_at", { ascending: false });

  if (!plans?.length) return null;

  return (
    <section className="overflow-hidden bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] overflow-visible px-4 sm:px-6 lg:px-8">
        <HomePlansSwitcher
          basePlans={plans as PlanRow[]}
          ctaHref="/contact"
          ctaLabel="Get Started"
        />
      </div>
    </section>
  );
}
