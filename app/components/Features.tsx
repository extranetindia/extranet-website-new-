"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Globe,
  Clock,
  Server,
  Wifi,
  Lock,
  HeadphonesIcon,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Blazing Fiber Speeds",
    description:
      "True symmetric fiber connections delivering equal upload and download speeds — from 50 Mbps to 10 Gbps.",
    accent: "blue",
  },
  {
    icon: Shield,
    title: "Enterprise DDoS Protection",
    description:
      "Real-time threat mitigation with scrubbing centers protecting your connection from volumetric and application-layer attacks.",
    accent: "red",
  },
  {
    icon: Globe,
    title: "Low-Latency Backbone",
    description:
      "Peering agreements with Tier-1 carriers and IXPs across India ensure sub-5ms latency within major metros.",
    accent: "blue",
  },
  {
    icon: Clock,
    title: "99.99% Uptime SLA",
    description:
      "Redundant fiber routes, automatic failover, and proactive monitoring ensure your connection stays live.",
    accent: "red",
  },
  {
    icon: Server,
    title: "Dedicated IP & BGP",
    description:
      "Business plans include static IPs, PTR records, and full BGP routing for enterprises with their own AS numbers.",
    accent: "blue",
  },
  {
    icon: Wifi,
    title: "Managed Wi-Fi",
    description:
      "Enterprise-grade Wi-Fi 6E access points with centralized management, guest networks, and traffic QoS.",
    accent: "red",
  },
  {
    icon: Lock,
    title: "Zero-Trust Security",
    description:
      "Built-in firewall, content filtering, and optional SD-WAN integration for distributed enterprise networks.",
    accent: "blue",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 NOC Support",
    description:
      "Round-the-clock Network Operations Center staffed by certified engineers ready to resolve issues in minutes.",
    accent: "red",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#050a14]" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      {/* Decorative glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[100px] rounded-full -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600/5 blur-[80px] rounded-full translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-700/40 text-blue-300 text-sm font-medium mb-4"
          >
            Why Choose Extranet?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
          >
            Built for the{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Digital Future
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Enterprise technology democratized for homes and businesses across India.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative p-6 rounded-2xl bg-[#080f1e]/60 border border-white/5 hover:border-white/15 transition-all duration-300 hover:bg-[#0a1628]/80"
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  feat.accent === "blue"
                    ? "bg-blue-900/40 text-blue-400 group-hover:bg-blue-800/50 group-hover:text-blue-300"
                    : "bg-red-900/30 text-red-400 group-hover:bg-red-900/50 group-hover:text-red-300"
                }`}
              >
                <feat.icon className="w-5 h-5" />
              </div>

              <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">
                {feat.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feat.description}
              </p>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  feat.accent === "blue"
                    ? "bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
                    : "bg-gradient-to-r from-transparent via-red-500/60 to-transparent"
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-blue-900/30 via-[#080f1e]/80 to-red-900/20 border border-white/8 p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Ready to experience real internet speed?
            </h3>
            <p className="text-slate-400 text-sm">
              Join 50,000+ homes and businesses already on Extranet.
            </p>
          </div>
          <a
            href="#plans"
            className="shrink-0 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-blue-900/40"
          >
            See All Plans
          </a>
        </motion.div>
      </div>
    </section>
  );
}
