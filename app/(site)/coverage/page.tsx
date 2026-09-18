import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CoverageMap from "@/components/coverage/CoverageMap";
import QuickCallback from "@/components/home/QuickCallback";
import { supabase } from "@/lib/supabase/client";

export const metadata: Metadata = {
  title: "Coverage",
  description:
    "Check Extranet fiber and broadband availability across 500+ Indian cities.",
};

export default async function CoveragePage() {
  const { data } = await supabase
    .from("cities")
    .select("id, name")
    .eq("active", true)
    .order("name", { ascending: true });

  return (
    <>
      <PageHero
        badge="Pan-India network"
        title="Service coverage across India"
        description="Our fiber backbone spans 20,000+ km with residential FTTH, business leased lines, and wireless last-mile where fiber is rolling out."
        crumbs={[{ label: "Coverage" }]}
      />
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CoverageMap cities={(data ?? []).map((c) => ({ id: c.id, name: c.name }))} />
        </div>
      </section>
      <QuickCallback />
    </>
  );
}
