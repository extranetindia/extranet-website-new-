import CmsHeroBanner from "@/components/hero/CmsHeroBanner";
import { homeHeroBanners } from "@/lib/cms/hero-banner";

export default function Hero() {
  const activeBanner =
    homeHeroBanners.find((banner) => banner.isActive) ?? homeHeroBanners[0];

  return <CmsHeroBanner banner={activeBanner} />;
}
