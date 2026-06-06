import type { LucideIcon } from "lucide-react";
import { Zap, Star, Building2, Network, Radio, Shield } from "lucide-react";

export type PlanColor = "blue" | "red";

export interface PlanDefinition {
  name: string;
  icon?: LucideIcon;
  speed: string;
  price: string;
  period: string;
  color: PlanColor;
  tag: string | null;
  description: string;
  features: string[];
  popular?: boolean;
  /** City-specific compare-at price (strikethrough). */
  originalPrice?: string | null;
  id?: string;
  tagline?: string | null;
  setupFee?: string | null;
  securityDeposit?: string | null;
  ottApps?: string[];
  savingsBadge?: string | null;
  planType?: "wifi_only" | "wifi_ott" | "business";
  monthlyPrice?: string | null;
  quarterlyPrice?: string | null;
  halfYearlyPrice?: string | null;
  annualPrice?: string | null;
  routerIncluded?: boolean;
  landlineIncluded?: boolean;
  installationFree?: boolean;
}

export const wifiOnlyPlans: PlanDefinition[] = [
  {
    name: "Starter",
    icon: Zap,
    speed: "50 Mbps",
    price: "₹499",
    period: "/month",
    color: "blue",
    tag: null,
    description: "Perfect for light browsing and streaming",
    features: [
      "50 Mbps symmetric speed",
      "Unlimited data",
      "1 static IP included",
      "Email & chat support",
      "99.5% uptime SLA",
      "Free installation",
    ],
  },
  {
    name: "Power",
    icon: Star,
    speed: "200 Mbps",
    price: "₹999",
    period: "/month",
    color: "red",
    tag: "Most Popular",
    description: "Ideal for families and work-from-home professionals",
    features: [
      "200 Mbps symmetric speed",
      "Unlimited data, zero throttling",
      "2 static IPs included",
      "Priority 24/7 support",
      "99.9% uptime SLA",
      "Free router + installation",
      "OTT bundle included",
    ],
  },
  {
    name: "Ultra",
    icon: Building2,
    speed: "1 Gbps",
    price: "₹2,999",
    period: "/month",
    color: "blue",
    tag: "Best Value",
    description: "Maximum residential performance for power users",
    features: [
      "1 Gbps symmetric fiber",
      "Unlimited data, SLA-backed",
      "5 static IPs",
      "Dedicated account manager",
      "99.99% uptime SLA",
      "Free hardware + installation",
      "Advanced DDoS protection",
    ],
  },
];

export const wifiOttPlans: PlanDefinition[] = [
  {
    name: "Business Fiber",
    icon: Network,
    speed: "500 Mbps",
    price: "₹4,999",
    period: "/month",
    color: "blue",
    tag: null,
    description: "Symmetric fiber for SMEs, branches, and retail chains",
    features: [
      "500 Mbps dedicated bandwidth",
      "Static IP pool (up to 8)",
      "Business-hour NOC escalation",
      "QoS & traffic shaping",
      "99.95% uptime SLA",
      "Managed router option",
    ],
  },
  {
    name: "Enterprise Leased Line",
    icon: Shield,
    speed: "Up to 10 Gbps",
    price: "Custom",
    period: "",
    color: "red",
    tag: "Most Popular",
    description: "Full-duplex fiber with BGP, redundancy, and compliance-ready networking",
    features: [
      "1–10 Gbps symmetrical circuits",
      "BGP / ASN integration",
      "Dual-path redundancy & auto-failover",
      "Dedicated NOC & TAM",
      "99.99% uptime SLA",
      "DDoS scrubbing & security bundle",
      "24×7 proactive monitoring",
    ],
  },
  {
    name: "Wireless Backhaul",
    icon: Radio,
    speed: "300 Mbps",
    price: "₹3,499",
    period: "/month",
    color: "blue",
    tag: null,
    description: "High-capacity fixed wireless where fiber rollout is in progress",
    features: [
      "300 Mbps burst-ready radio link",
      "Rapid deployment (days, not months)",
      "Bridge to fiber migration path",
      "Outdoor CPE & SLA monitoring",
      "99.9% availability target",
      "Optional temporary sites",
    ],
  },
];
