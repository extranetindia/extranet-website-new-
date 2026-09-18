"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  Server,
  HeadphonesIcon,
  ArrowRight,
} from "lucide-react";
import SectionPreview from "@/components/ui/SectionPreview";
import MobileCarousel from "@/components/ui/MobileCarousel";

const features = [
  {
    icon: Shield,
    title: "Enterprise DDoS Protection",
    description:
      "Real-time scrubbing centers protect against volumetric and application-layer attacks.",
  },
  {
    icon: Clock,
    title: "99.99% Uptime SLA",
    description:
      "Redundant routes, automatic failover, and proactive monitoring.",
  },
  {
    icon: Server,
    title: "Dedicated IP & BGP",
    description:
      "Static IPs, PTR records, and BGP for enterprises with their own AS.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Assistance",
    description:
      "Certified engineers in our Network Operations Center, always on call.",
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
      transition={{ delay: Math.min(index, 5) * 0.06 }}
      className="tele-card tele-card-hover group h-full p-6"
    >
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] ${
        index % 2 === 1 ? "bg-[#C1170C]/10 text-[#C1170C]" : "bg-[#11418D]/10 text-[#11418D]"
      }`}>
        <feat.icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mb-1.5 text-[1rem] font-extrabold text-[#15366A]">{feat.title}</h3>
      <p className="text-sm leading-relaxed text-[#5C6F89]">{feat.description}</p>
    </motion.div>
  );
}

export default function Features() {
  return (
    <SectionPreview
      eyebrow="Why Extranet"
      title="A network engineered for uptime"
      description="Enterprise technology for homes and businesses across India — reliability, security, and speed on one network."
      href="/about"
      linkLabel="About our network"
      className="bg-[#F4F7FC]"
      id="why-extranet"
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
        className="relative mt-6 overflow-hidden rounded-xl bg-[#15366A] p-6 sm:mt-8 sm:p-8"
      >
        <div aria-hidden className="network-grid-dark absolute inset-0 opacity-50" />
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C1170C]/20 blur-[100px]" />
        <div aria-hidden className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#11418D]/50 blur-[100px]" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="tele-eyebrow text-white/60">Get connected</p>
            <h3 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
              Ready for internet that keeps up with you?
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/75">
              Check availability in your area or compare plans for your city.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <Link href="/plans" className="tele-btn tele-btn-red px-7">
              See all plans
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/coverage"
              className="tele-btn border border-white/25 px-7 text-white hover:bg-white/10"
            >
              Check coverage
            </Link>
          </div>
        </div>
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-[#C1170C]" />
      </motion.div>
    </SectionPreview>
  );
}
