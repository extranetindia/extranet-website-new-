export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase/client";
import type { PlanRow } from "@/lib/database/schema";
import PageHero from "@/components/ui/PageHero";
import PlansPageSections from "@/components/plans/PlansPageSections";

export default async function HomePlansRoutePage() {
  const { data: plans } = await supabase
    .from("plans")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHero
        badge="Home broadband"
        title="Fibre plans for every kind of home"
        description="Power through work calls, 4K streaming and online classes. Pick your city to see live pricing, then compare WiFi-only and WiFi + OTT options."
        crumbs={[{ label: "Plans", href: "/plans" }, { label: "Home Broadband" }]}
      />
      <div className="bg-white">
        <PlansPageSections category="home" plans={plans as PlanRow[]} />
      </div>
    </>
  );
}
