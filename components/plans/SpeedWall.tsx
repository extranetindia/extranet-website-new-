import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import SpeedTiles from "@/components/plans/SpeedTiles";

function speedMbps(speed: string | null | undefined): number {
  const match = String(speed ?? "").match(/(\d+(?:\.\d+)?)\s*(G)?\s*M?BPS/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  return match[2] ? value * 1000 : value;
}

function priceNum(price: string | null | undefined): number {
  const n = Number(String(price ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : Number.POSITIVE_INFINITY;
}

/**
 * Agency-style giant speed selector — every tile is computed live
 * from the cheapest home plan at that speed. No mock numbers.
 */
export default async function SpeedWall() {
  const [{ data }, { data: businessPlans }] = await Promise.all([
    supabase.from("plans").select("speed, price").eq("plan_type", "home"),
    supabase.from("plans").select("speed").eq("plan_type", "business"),
  ]);

  const bySpeed = new Map<number, number>();
  for (const plan of data ?? []) {
    const speed = speedMbps(plan.speed);
    const price = priceNum(plan.price);
    if (!speed || !Number.isFinite(price)) continue;
    const current = bySpeed.get(speed);
    if (current === undefined || price < current) bySpeed.set(speed, price);
  }

  const tiers = [...bySpeed.entries()].sort((a, b) => a[0] - b[0]);
  if (tiers.length === 0) return null;

  const maxBusiness = Math.max(0, ...(businessPlans ?? []).map((p) => speedMbps(p.speed)));

  return (
    <section aria-label="Choose your speed" className="relative overflow-hidden bg-[#15366A]">
      <div aria-hidden className="network-grid-dark absolute inset-0 opacity-50" />
      <div aria-hidden className="absolute -left-28 top-0 h-96 w-96 rounded-full bg-[#11418D]/60 blur-[120px]" />
      <div aria-hidden className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#C1170C]/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="tele-eyebrow flex items-center gap-2 text-white/60">
          <span aria-hidden className="inline-block h-[2px] w-7 rounded-full bg-[#C1170C]" />
          Home broadband speeds
        </p>
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            How fast do you want to go?
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            Tap a speed to see live plans. Every tier is truly unlimited —
            pick the bandwidth your household actually needs.
          </p>
        </div>

        <SpeedTiles tiers={tiers} maxBusiness={maxBusiness} />

        <p className="mt-6 text-center text-xs leading-relaxed text-white/50">
          Speeds are &ldquo;up to&rdquo; plan maximums on a wired connection · All plans include unlimited data · Prices exclude 18% GST
        </p>
      </div>
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-[#C1170C]" />
    </section>
  );
}
