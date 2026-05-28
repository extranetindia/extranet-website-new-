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
  featureBadges?: HeroBannerFeatureBadge[];
}

export const homeHeroBanners: HeroBannerConfig[] = [
  {
    id: "summer-fiber-campaign",
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
  },
];
