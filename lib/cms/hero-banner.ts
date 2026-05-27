export interface HeroBannerFeatureBadge {
  id: string;
  label: string;
}

export interface HeroBannerConfig {
  id: string;
  isActive: boolean;
  title: string;
  subtitle: string;
  supportingText: string;
  speedHighlights: string[];
  pricingTeaser: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  ctaLink: string;
  desktopBannerImage: string;
  mobileBannerImage: string;
  featureBadges: HeroBannerFeatureBadge[];
}

export const homeHeroBanners: HeroBannerConfig[] = [
  {
    id: "summer-fiber-campaign",
    isActive: true,
    title: "Ultra-Fast Fiber Internet for Every Home",
    subtitle: "Premium Broadband Offer",
    supportingText:
      "Get enterprise-grade speed, low latency, and uninterrupted connectivity with Extranet India Private Limited.",
    speedHighlights: ["Up to 1 Gbps", "99.9% Uptime SLA", "Zero Throttling"],
    pricingTeaser: "Plans start from INR 499/month",
    primaryCtaText: "View Plans",
    secondaryCtaText: "Get Connected Today",
    ctaLink: "/plans",
    desktopBannerImage: "/images/isp-hero-desktop.svg",
    mobileBannerImage: "/images/isp-hero-mobile.svg",
    featureBadges: [
      { id: "install", label: "Free Installation" },
      { id: "unlimited", label: "Unlimited Data" },
      { id: "support", label: "24/7 Support" },
      { id: "activation", label: "Same-Day Activation" },
    ],
  },
];
