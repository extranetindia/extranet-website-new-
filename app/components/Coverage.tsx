"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Building, Home } from "lucide-react";
import SectionPreview from "@/components/ui/SectionPreview";
import Link from "next/link";

const cities = [
  "Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai",
  "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow",
  "Nagpur", "Bhopal", "Indore", "Surat", "Vadodara",
  "Kochi", "Visakhapatnam", "Coimbatore", "Patna", "Chandigarh",
];

const coverageTypes = [
  {
    icon: Home,
    title: "Residential Fiber",
    description: "FTTH from 50 Mbps to 1 Gbps in 500+ cities.",
    count: "10+ Cities",
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
    count: "50+ Towns",
  },
];

export default function Coverage() {
  return (
    <SectionPreview
      eyebrow="Network Coverage"
      title="Connected across India"
      description="50,000+ km of fiber backbone with active expansion into Tier 2 and Tier 3 cities."
      href="/coverage"
      linkLabel="Full coverage map"
      className="bg-white"
    >
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {coverageTypes.map((type, i) => (
          <motion.div
            key={type.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-2xl bg-slate-50 border border-slate-200"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <type.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-slate-900 mb-1">{type.count}</div>
            <h3 className="font-bold text-slate-900 mb-2">{type.title}</h3>
            <p className="text-slate-600 text-sm">{type.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Live in these cities
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 mb-6">
          {cities.slice(0, 10).map((city) => (
            <span
              key={city}
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              {city}
            </span>
          ))}
        </div>
        <p className="text-sm text-slate-500 mb-4">+ 10 more metros on the full coverage page</p>
        <Link
          href="/coverage"
          className="text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          Check availability by pincode →
        </Link>
      </div>
    </SectionPreview>
  );
}
