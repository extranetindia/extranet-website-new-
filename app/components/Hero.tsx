export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import {
  HERO_ASPECT,
  resolveHeroBannerUrls,
  type HeroBannerRow,
} from "@/lib/cms/hero";

export default async function Hero() {
  const { data, error } = await supabase
    .from("hero_banner")
    .select("id, image_url, desktop_image_url, mobile_image_url, created_at")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch hero banner:", error);
  }

  const { desktop, mobile } = resolveHeroBannerUrls(data as HeroBannerRow | null);

  if (!desktop) {
    return null;
  }

  const mobileSrc = mobile ?? desktop;

  return (
    <section
      aria-label="Promotional banner"
      className="pt-[calc(3.5rem+1rem)] sm:pt-[calc(4rem+1.5rem)]"
    >
      <div className="w-full px-0">
        <Link
          href="/plans"
          className="group relative block w-full cursor-pointer rounded-[18px] border border-slate-200 shadow-lg shadow-slate-200/70 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-slate-300/60 sm:rounded-[24px]"
          aria-label="View broadband plans"
        >
          {/* Mobile banner — 1080×720 (3:2) */}
          <div
            className={`relative w-full ${HERO_ASPECT.mobile.className} md:hidden`}
          >
            <Image
              src={mobileSrc}
              alt="Extranet broadband plans"
              fill
              priority
              className="h-full w-full object-cover object-center"
              sizes="(max-width: 767px) 100vw, 0px"
            />
          </div>

          {/* Desktop banner — 1600×600 (8:3) */}
          <div
            className={`relative hidden w-full ${HERO_ASPECT.desktop.className} md:block`}
          >
            <Image
              src={desktop}
              alt="Extranet broadband plans"
              fill
              priority
              // className="h-full w-full object-cover object-center"
              className="object-cover object-center"
              sizes="(min-width: 768px) min(1280px, 100vw)"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
