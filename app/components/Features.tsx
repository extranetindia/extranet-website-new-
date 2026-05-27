"use client";

import Link from "next/link";
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
import SectionPreview from "@/components/ui/SectionPreview";

const features = [
  {
    icon: Zap,
    title: "Blazing Fiber Speeds",
    description:
      "Symmetric fiber from 50 Mbps to 10 Gbps with equal upload and download.",
    accent: "blue",
  },
  {
    icon: Shield,
    title: "Enterprise DDoS Protection",
    description:
      "Real-time scrubbing centers protect against volumetric and application-layer attacks.",
    accent: "red",
  },
  {
    icon: Globe,
    title: "Low-Latency Backbone",
    description:
      "Tier-1 peering and IXPs deliver sub-5ms latency in major metros.",
    accent: "blue",
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
    icon: Wifi,
    title: "Managed Wi-Fi",
    description:
      "Wi-Fi 6E access points with centralized management and guest networks.",
    accent: "red",
  },
  {
    icon: Lock,
    title: "Zero-Trust Security",
    description:
      "Firewall, filtering, and optional SD-WAN for distributed networks.",
    accent: "blue",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 NOC Support",
    description:
      "Certified engineers in our Network Operations Center, always on call.",
    accent: "red",
  },
];

export default function Features() {
  return (
    <SectionPreview
      eyebrow="Why Extranet"
      title="Built for the digital future"
      description="Enterprise technology for homes and businesses across India — reliability, security, and speed in one network."
      href="/about"
      linkLabel="Learn about us"
      className="bg-slate-50"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                feat.accent === "blue"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              <feat.icon className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{feat.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{feat.description}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-800 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white"
      >
        <div>
          <h3 className="text-xl font-bold mb-1">Ready for real internet speed?</h3>
          <p className="text-blue-100 text-sm">Join 50,000+ customers on Extranet.</p>
        </div>
        <Link
          href="/plans"
          className="shrink-0 px-7 py-3.5 rounded-xl bg-white text-blue-800 font-bold text-sm hover:bg-blue-50 transition-colors"
        >
          See all plans
        </Link>
      </motion.div>
    </SectionPreview>
  );
}
