import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CoverageMap from "@/components/coverage/CoverageMap";

export const metadata: Metadata = {
  title: "Coverage",
  description:
    "Check Extranet fiber and broadband availability across 500+ Indian cities.",
};

export default function CoveragePage() {
  return (
    <>
      <PageHero
        badge="Pan-India Network"
        title={
          <>
            Service coverage across{" "}
            <span className="text-red-600">India</span>
          </>
        }
        description="Our fiber backbone spans 50,000+ km with residential FTTH, business leased lines, and wireless last-mile where fiber is rolling out."
      />
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoverageMap />
        </div>
      </section>
    </>
  );
}
