"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  Server,
  HeadphonesIcon,
} from "lucide-react";
import SectionPreview from "@/components/ui/SectionPreview";
import MobileCarousel from "@/components/ui/MobileCarousel";

const features = [
  {
    icon: Shield,
    title: "Enterprise DDoS Protection",
    description:
      "Real-time scrubbing centers protect against volumetric and application-layer attacks.",
    accent: "red",
  },
  {
    icon: Clock,
    title: "99.99% Uptime SLA",
    description:
      "Redundant routes, automatic failover, and proactive monitoring.",
    accent: "red",
  },
  {
    icon: Server,
    title: "Dedicated IP & BGP",
    description:
      "Static IPs, PTR records, and BGP for enterprises with their own AS.",
    accent: "blue",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Assistance",
    description:
      "Certified engineers in our Network Operations Center, always on call.",
    accent: "red",
  },
];

function FeatureCard({
  feat,
  index,
}: {
  feat: (typeof features)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 ease-in-out hover:border-[#134799]/30 hover:shadow-lg hover:shadow-blue-900/10"
    >
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
          feat.accent === "blue"
            ? "bg-text-[#134799] text-[#134799]"
            : "bg-red-50 text-red-600"
        }`}
      >
        <feat.icon className="h-5 w-5" />
      </div>
      <h3 className="mb-2 text-base font-bold text-slate-900">{feat.title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{feat.description}</p>
    </motion.div>
  );
}

export default function Features() {
  return (
    <SectionPreview
      eyebrow="Why Extranet"
      title="Why Extranet"
      description="Enterprise technology for homes and businesses across India — reliability, security, and speed in one network."
      href="/about"
      linkLabel="Learn about us"
      className="bg-slate-50"
    >
      <MobileCarousel
        ariaLabel="Why Extranet features"
        slideClassName="w-[84%] max-w-[300px] shrink-0 snap-start snap-always"
      >
        {features.map((feat, i) => (
          <FeatureCard key={feat.title} feat={feat} index={i} />
        ))}
      </MobileCarousel>

      <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feat, i) => (
          <FeatureCard key={feat.title} feat={feat} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 flex flex-col items-stretch justify-between gap-5 rounded-2xl bg-gradient-to-r from-[#134799] to-[#0f3b7f] p-6 text-white sm:mt-12 sm:flex-row sm:items-center sm:gap-6 sm:p-8"
      >
        <div>
          <h3 className="mb-1 text-lg font-bold sm:text-xl">
            Ready for real internet speed?
          </h3>
          <p className="text-sm text-white/80">Join 50,000+ customers on Extranet.</p>
        </div>
        <Link
          href="/plans"
          className="min-h-[44px] shrink-0 rounded-xl bg-white px-7 py-3.5 text-center text-sm font-bold text-[#134799] transition-all duration-200 ease-in-out hover:bg-slate-50 hover:text-[#0f3b7f] hover:shadow-lg hover:shadow-blue-950/20"
        >
          See all plans
        </Link>
      </motion.div>
    </SectionPreview>
  );
}
