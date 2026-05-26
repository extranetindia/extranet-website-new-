"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Building, Home } from "lucide-react";

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
    description: "FTTH (Fiber to the Home) with speeds from 50 Mbps to 1 Gbps. Available in 500+ cities across India.",
    count: "500+ Cities",
  },
  {
    icon: Building,
    title: "Business Leased Line",
    description: "Dedicated fiber circuits for commercial buildings, IT parks, and campuses with guaranteed SLAs.",
    count: "200+ Business Zones",
  },
  {
    icon: MapPin,
    title: "Last-Mile Wireless",
    description: "High-capacity fixed wireless for areas where fiber deployment is in progress.",
    count: "100+ Towns",
  },
];

export default function Coverage() {
  return (
    <section id="coverage" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#040810]" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      {/* Subtle map-like grid */}
      <div className="absolute inset-0 network-grid opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/6 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-700/40 text-blue-300 text-sm font-medium mb-4"
          >
            <MapPin className="w-4 h-4" />
            Pan-India Network
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
          >
            Connected Across{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              India
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Our fiber backbone spans 50,000+ km across India, with active expansion
            into Tier 2 and Tier 3 cities.
          </motion.p>
        </div>

        {/* Coverage types */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {coverageTypes.map((type, i) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="p-6 rounded-2xl bg-[#080f1e]/80 border border-white/8 hover:border-blue-700/40 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-900/40 text-blue-400 flex items-center justify-center mb-4">
                <type.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-white mb-1">{type.count}</div>
              <h3 className="text-base font-bold text-white mb-2">{type.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Cities list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-[#080f1e]/60 border border-white/8 p-8"
        >
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            Live in these cities — and expanding fast
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {cities.map((city, i) => (
              <motion.div
                key={city}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.03 }}
                className="flex items-center gap-2 text-sm text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                {city}
              </motion.div>
            ))}
          </div>

          {/* Check availability */}
          <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-slate-400 text-sm">
              Not sure if we cover your area?
            </p>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Enter your pincode"
                className="flex-1 sm:w-52 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm hover:from-blue-500 hover:to-blue-600 transition-all shrink-0">
                Check
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
