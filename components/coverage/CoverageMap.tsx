"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Building, Home, Radio } from "lucide-react";

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
    description:
      "FTTH (Fiber to the Home) with speeds from 50 Mbps to 1 Gbps. Available in 500+ cities across India.",
    count: "500+ Cities",
  },
  {
    icon: Building,
    title: "Business Leased Line",
    description:
      "Dedicated fiber for commercial buildings, IT parks, and campuses with guaranteed SLAs.",
    count: "200+ Business Zones",
  },
  {
    icon: Radio,
    title: "Last-Mile Wireless",
    description:
      "High-capacity fixed wireless for areas where fiber deployment is in progress.",
    count: "100+ Towns",
  },
];

export default function CoverageMap() {
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-3 gap-6">
        {coverageTypes.map((type, i) => (
          <motion.div
            key={type.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <type.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-slate-900 mb-1">{type.count}</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{type.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{type.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Live in these cities — and expanding fast
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {cities.map((city, i) => (
            <motion.div
              key={city}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className="flex items-center gap-2 text-sm text-slate-700"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              {city}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 p-8 sm:p-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 network-grid-light opacity-30" />
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <MapPin className="w-10 h-10 text-blue-200 mb-4" />
            <h3 className="text-2xl font-black mb-2">Network expansion</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              We are actively laying fiber in 40+ Tier 2 cities this year, with
              wireless backhaul bridging gaps until FTTH is live. Enterprise
              customers can request priority build-out surveys.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter your pincode"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-white/40"
            />
            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold text-sm transition-colors shrink-0"
            >
              Check availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
