import type { HeroBannerConfig } from "@/lib/cms/hero-banner";

export type PlanCategory = "WiFi Only" | "WiFi + OTT Bundle";

export interface AdminPlan {
  id: string;
  name: string;
  category: PlanCategory;
  speed: string;
  price: string;
  buttonText: string;
  popular: boolean;
  features: string[];
}

export interface CoverageCity {
  id: string;
  name: string;
  state: string;
  active: boolean;
}

export interface SupportSettingsData {
  phone: string;
  email: string;
  whatsapp: string;
  officeAddress: string;
  supportTimings: string;
}

export const quickActions = [
  "Add New Plan",
  "Edit Hero Banner",
  "Add Coverage City",
  "Review Support Queue",
];

export const initialPlans: AdminPlan[] = [
  {
    id: "plan-1",
    name: "Starter 50",
    category: "WiFi Only",
    speed: "50 Mbps",
    price: "INR 499/mo",
    buttonText: "Subscribe",
    popular: false,
    features: ["Unlimited Data", "Free Installation", "Basic Router"],
  },
  {
    id: "plan-2",
    name: "Power 200",
    category: "WiFi + OTT Bundle",
    speed: "200 Mbps",
    price: "INR 999/mo",
    buttonText: "Get Started",
    popular: true,
    features: ["Unlimited Data", "Priority Support", "Dual Band Router"],
  },
  {
    id: "plan-3",
    name: "Enterprise Fiber 1G",
    category: "WiFi + OTT Bundle",
    speed: "1 Gbps",
    price: "Custom Quote",
    buttonText: "Contact Sales",
    popular: true,
    features: ["SLA 99.99%", "Dedicated Manager", "Static IP Bundle"],
  },
];

export const initialCoverageCities: CoverageCity[] = [
  { id: "city-1", name: "Mumbai", state: "Maharashtra", active: true },
  { id: "city-2", name: "Delhi", state: "Delhi NCR", active: true },
  { id: "city-3", name: "Bengaluru", state: "Karnataka", active: true },
  { id: "city-4", name: "Indore", state: "Madhya Pradesh", active: false },
];

export const initialSupportSettings: SupportSettingsData = {
  phone: "+91 88888 88888",
  email: "support@extranet.in",
  whatsapp: "+91 90000 90000",
  officeAddress: "Connaught Place, New Delhi, India - 110001",
  supportTimings: "Mon-Sat, 9:00 AM - 8:00 PM",
};

export const initialHeroConfig: HeroBannerConfig = {
  id: "hero-admin-preview",
  isActive: true,
  title: "Enterprise Fiber Internet for Homes & Businesses",
  subtitle: "Premium ISP Connectivity",
  supportingText:
    "Ultra-fast broadband with unlimited data, low latency, and 24/7 support.",
  speedHighlights: [
    "Up to 1 Gbps Speeds",
    "Unlimited Data",
    "24/7 Customer Support",
  ],
  pricingTeaser: "Plans start from INR 499/month",
  primaryCtaText: "View Plans",
  secondaryCtaText: "Contact Sales",
  ctaLink: "/plans",
  desktopBannerImage:
    "https://plus.unsplash.com/premium_photo-1755873911560-4e007f722c16?auto=format&fit=crop&w=2400&q=80",
  mobileBannerImage:
    "https://plus.unsplash.com/premium_photo-1755873911560-4e007f722c16?auto=format&fit=crop&w=1200&q=80",
};
