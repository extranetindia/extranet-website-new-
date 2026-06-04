"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    <section
      className="relative h-[85vh] min-h-[620px] max-h-[980px] w-full overflow-hidden"
      onClick={handleBannerClick}
    >
      <div className="absolute inset-0">
        <Image
          src={banner.desktopBannerImage}
          alt="Premium telecom fiber network background"
          fill
          priority
          className="hidden sm:block object-cover object-center"
          sizes="100vw"
        />
        <Image
          src={banner.mobileBannerImage}
          alt="Premium telecom fiber network background mobile"
          fill
          priority
          className="sm:hidden object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        {/* <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl text-white"
        >
          <p className="text-sm sm:text-base font-semibold tracking-wide text-blue-200">
            {banner.subtitle}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.06]">
            {banner.title}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-100/95 max-w-xl">
            {banner.supportingText}
          </p>
          <p className="mt-4 text-base sm:text-lg font-semibold text-red-200">
            {banner.pricingTeaser}
          </p>

          <ul className="mt-6 space-y-2 text-sm sm:text-base text-slate-100">
            {banner.speedHighlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href={banner.ctaLink}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm sm:text-base font-bold text-white transition-all hover:bg-[#134799] hover:shadow-lg hover:shadow-blue-900/30"
            >
              {banner.primaryCtaText}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={banner.ctaLink}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-7 py-3.5 text-sm sm:text-base font-semibold text-white transition-all hover:bg-white/20"
            >
              {banner.secondaryCtaText}
            </Link>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
