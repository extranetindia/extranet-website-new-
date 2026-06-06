export const dynamic = "force-dynamic";

import Hero from "../components/Hero";
import PlanCategorySelection from "@/components/plans/PlanCategorySelection";
import Features from "../components/Features";
import Coverage from "../components/Coverage";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlanCategorySelection />
      <Features />
      <Coverage />
      <Testimonials />
    </>
  );
}
