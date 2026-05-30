export const dynamic = "force-dynamic";

import Hero from "../components/Hero";
import Plans from "../components/Plans";
import Features from "../components/Features";
import Coverage from "../components/Coverage";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Plans />
      <Features />
      <Coverage />
      <Testimonials />
    </>
  );
}
