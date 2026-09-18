import { supabase } from "@/lib/supabase/client";
import StatsCounters from "@/components/home/StatsCounters";

export default async function StatsBand() {
  const { count } = await supabase
    .from("cities")
    .select("id", { count: "exact", head: true })
    .eq("active", true);

  return (
    <section aria-label="Extranet network at a glance" className="relative overflow-hidden bg-[#15366A]">
      <div aria-hidden className="network-grid-dark absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <StatsCounters sectorCount={typeof count === "number" ? count : 12} />
      </div>
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-[#C1170C]" />
    </section>
  );
}
