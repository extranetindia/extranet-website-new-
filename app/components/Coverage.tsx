"use client";

import { motion } from "framer-motion";
import { MapPin, Building, Home, ArrowRight } from "lucide-react";
import SectionPreview from "@/components/ui/SectionPreview";
import Link from "next/link";

const coverageTypes = [
  {
    icon: Home,
    title: "Residential Fiber",
    description: "FTTH from 50 Mbps to 1 Gbps in 50+ cities.",
    count: "50+ Cities",
  },
  {
    icon: Building,
    title: "Business Leased Line",
    description: "Dedicated fiber for IT parks and commercial campuses.",
    count: "80+ Zones",
  },
  {
    icon: MapPin,
    title: "Last-Mile Wireless",
    description: "Fixed wireless where fiber rollout is in progress.",
    count: "40+ Towns",
  },
];

export default function Coverage() {
  return (
    <SectionPreview
      eyebrow="Network coverage"
      title="Connected across India"
      description="20,000+ km of fiber backbone with active expansion into Tier 2 and Tier 3 cities."
      href="/coverage"
      linkLabel="Check your area"
      className="bg-white"
      id="coverage"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {coverageTypes.map((type, i) => (
          <motion.div
            key={type.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i, 5) * 0.07 }}
            className="tele-card tele-card-hover p-6"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-[10px] ${
              i % 2 === 1 ? "bg-[#C1170C]/10 text-[#C1170C]" : "bg-[#11418D]/10 text-[#11418D]"
            }`}>
              <type.icon className="h-5 w-5" aria-hidden />
            </div>
            <div className="mt-4 text-[1.7rem] font-extrabold tracking-tight text-[#11418D]">{type.count}</div>
            <h3 className="mt-1 font-extrabold text-[#15366A]">{type.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5C6F89]">{type.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-3 rounded-xl border border-[#DCE3EC] bg-[#F4F7FC] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#11418D] text-white">
            <MapPin className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h3 className="font-extrabold text-[#15366A]">Not sure if we serve your address?</h3>
            <p className="mt-0.5 text-sm text-[#5C6F89]">
              Check serviceability by pincode or talk to our team for a feasibility check.
            </p>
          </div>
        </div>
        <Link href="/coverage" className="tele-btn tele-btn-primary shrink-0 px-6">
          Check availability
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </SectionPreview>
  );
}
