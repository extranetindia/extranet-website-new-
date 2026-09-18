export const dynamic = "force-dynamic";

import Hero from "../components/Hero";
import Plans from "../components/Plans";
import PlanCategorySelection from "@/components/plans/PlanCategorySelection";
import Features from "../components/Features";
import Coverage from "../components/Coverage";
import Testimonials from "../components/Testimonials";
import StatsBand from "@/components/home/StatsBand";
import SectorsMarquee from "@/components/home/SectorsMarquee";
import PulseStrip from "@/components/home/PulseStrip";
import PlanFinder from "@/components/home/PlanFinder";
import OttStrip from "@/components/home/OttStrip";
import HowItWorks from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <SectorsMarquee />
      <PulseStrip />
      <PlanCategorySelection />
      <Plans />
      <PlanFinder />
      <Features />
      <OttStrip />
      <HowItWorks />
      <Coverage />
      <Testimonials />
    </>
  );
}
