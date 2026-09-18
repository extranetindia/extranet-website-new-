export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import {
  HERO_SLIDE_LIMIT,
  resolveHeroBannerUrls,
  type HeroBannerRow,
} from "@/lib/cms/hero";
import HeroSlideshow, { type HeroSlide } from "@/components/home/HeroSlideshow";

export default async function Hero() {
  const { data, error } = await supabase
    .from("hero_banner")
    .select("id, image_url, desktop_image_url, mobile_image_url, created_at")
    .order("created_at", { ascending: false })
    .limit(HERO_SLIDE_LIMIT);

  if (error) {
    console.error("Failed to fetch hero banners:", error);
  }

  // Newest-first rotation; each row resolves desktop/mobile with legacy fallback.
  const slides: HeroSlide[] = ((data as HeroBannerRow[] | null) ?? [])
    .map((row) => {
      const { desktop, mobile } = resolveHeroBannerUrls(row);
      if (!desktop) return null;
      return { desktop, mobile: mobile ?? desktop };
    })
    .filter((slide): slide is HeroSlide => slide !== null);

  if (slides.length === 0) {
    return null;
  }

  // Live storefront signal — most-loved home plan for the floating card
  const { data: popularPlans } = await supabase
    .from("plans")
    .select("id, name, speed, price, home_plan_category")
    .eq("plan_type", "home")
    .eq("popular", true)
    .order("price", { ascending: true })
    .limit(1);

  const heroPlan = popularPlans?.[0] ?? null;
  const heroPrice = heroPlan ? String(heroPlan.price ?? "").replace(/\s*\*+$/, "") : null;

  return (
    <section aria-label="Extranet broadband offers" className="bg-white">
      {/* CMS artwork spans the full width edge-to-edge — it already carries its own message */}
      <div className="fade-in w-full">
        <HeroSlideshow slides={slides} />
      </div>

      {/* Floating most-popular plan card — half over the banner, half below */}
      {heroPlan && heroPrice ? (
        <div className="relative mx-auto -mt-12 max-w-7xl px-4 sm:-mt-14 sm:px-6 lg:px-8">
          <Link
            href="/plans/home"
            className="group relative z-10 mx-auto flex max-w-3xl items-center gap-4 rounded-2xl border border-[#DCE3EC] bg-white p-4 shadow-[0_24px_60px_rgba(2,12,35,0.22)] transition-shadow duration-200 hover:shadow-[0_28px_70px_rgba(2,12,35,0.3)] sm:p-5 rise-in"
            aria-label={`Most popular plan ${heroPlan.name}, view home plans`}
          >
            <span className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-[#C1170C] px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-white shadow">
              <Star className="h-3 w-3 fill-current" aria-hidden />
              Most popular
            </span>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#11418D]/10 text-lg font-extrabold text-[#11418D]">
              {heroSpeedBadge(heroPlan.speed)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-extrabold text-[#15366A] sm:text-base">
                {heroPlan.name} · {heroPlan.speed}
                {heroPlan.home_plan_category === "wifi_ott" ? " + OTT" : ""}
              </span>
              <span className="mt-0.5 block text-xs text-[#5C6F89] sm:text-[0.8rem]">
                <strong className="text-base font-extrabold text-[#11418D] sm:text-lg">₹{heroPrice}</strong>
                /month · excl. GST · Unlimited data
              </span>
            </span>
            <span className="tele-btn tele-btn-primary hidden shrink-0 px-5 sm:inline-flex">
              Get this plan
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-[#C1170C] transition-transform group-hover:translate-x-1 sm:hidden" aria-hidden />
          </Link>
        </div>
      ) : null}
      {/* Spacer so the overlapping card never covers content below */}
      <div aria-hidden className="relative h-14 bg-white sm:h-16" />
    </section>
  );
}

/** Compact speed monogram with the correct unit — "100M" or "1G". */
function heroSpeedBadge(speed: string | null | undefined) {
  const match = String(speed ?? "").match(/(\d+(?:\.\d+)?)\s*(G)?\s*M?BPS/i);
  if (!match) return <span aria-hidden>»</span>;
  return (
    <>
      {match[1]}
      <span className="text-[0.6rem] font-bold">{match[2] ? "G" : "M"}</span>
    </>
  );
}
