"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import type { HeroBannerConfig } from "@/lib/cms/hero-banner";

interface CmsHeroBannerProps {
  banner: HeroBannerConfig;
}

export default function CmsHeroBanner({ banner }: CmsHeroBannerProps) {
  const router = useRouter();

  const handleBannerClick = () => {
    router.push(banner.ctaLink);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white network-grid-light">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute top-32 -right-16 h-80 w-80 rounded-full bg-red-100/60 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          onClick={handleBannerClick}
          className="group cursor-pointer rounded-3xl border border-blue-100 bg-white/90 shadow-[0_25px_80px_rgba(30,64,175,0.14)] backdrop-blur-sm p-6 md:p-10"
        >
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
                <Zap className="h-4 w-4 text-blue-600" />
                {banner.subtitle}
              </span>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.06]">
                {banner.title}
              </h1>

              <p className="mt-4 max-w-xl text-base sm:text-lg text-slate-600">
                {banner.supportingText}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {banner.speedHighlights.map((speed) => (
                  <span
                    key={speed}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700"
                  >
                    {speed}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-lg sm:text-xl font-bold text-red-600">
                {banner.pricingTeaser}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  href={banner.ctaLink}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 py-3.5 text-sm sm:text-base font-bold text-white transition-all hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-200"
                >
                  {banner.primaryCtaText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={banner.ctaLink}
                  className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-7 py-3.5 text-sm sm:text-base font-semibold text-red-700 transition-all hover:bg-red-100"
                >
                  {banner.secondaryCtaText}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-100/70">
                <Image
                  src={banner.desktopBannerImage}
                  alt="Extranet hero promotional banner"
                  width={1280}
                  height={760}
                  className="hidden sm:block h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  priority
                />
                <Image
                  src={banner.mobileBannerImage}
                  alt="Extranet hero promotional banner mobile"
                  width={780}
                  height={860}
                  className="sm:hidden h-auto w-full object-cover"
                  priority
                />
              </div>

              <div className="pointer-events-none absolute -bottom-3 -left-2 right-2 sm:right-0 sm:-bottom-4 grid grid-cols-2 gap-2 sm:gap-3">
                {banner.featureBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="rounded-lg border border-white/80 bg-white/85 px-3 py-2 text-[11px] sm:text-xs font-semibold text-slate-700 shadow-md backdrop-blur"
                  >
                    {badge.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
