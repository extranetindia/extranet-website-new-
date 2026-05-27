import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SupportContent from "@/components/support/SupportContent";

export const metadata: Metadata = {
  title: "Support",
  description: "Customer care, FAQs, tickets, and complaint resolution for Extranet subscribers.",
};

export default function SupportPage() {
  return (
    <>
      <PageHero
        badge="Customer Support"
        title={<>We&apos;re here when you need us</>}
        description="24/7 technical support, billing assistance, and TRAI-compliant complaint handling for every Extranet connection."
      />
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SupportContent />
        </div>
      </section>
    </>
  );
}
