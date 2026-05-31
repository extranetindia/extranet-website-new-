import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SupportContent from "@/components/support/SupportContent";
import {
  DEFAULT_SUPPORT_SETTINGS,
  getSupportSettings,
} from "@/lib/database/support";

export const metadata: Metadata = {
  title: "Support",
  description: "Customer care, FAQs, tickets, and complaint resolution for Extranet subscribers.",
};

export default async function SupportPage() {
  const { data } = await getSupportSettings();

  const supportSettings = {
    phone: data?.phone ?? DEFAULT_SUPPORT_SETTINGS.phone,
    email: data?.email ?? DEFAULT_SUPPORT_SETTINGS.email,
    whatsapp: data?.whatsapp ?? DEFAULT_SUPPORT_SETTINGS.whatsapp,
    officeAddress: data?.office_address ?? DEFAULT_SUPPORT_SETTINGS.office_address,
    supportTimings: data?.support_timings ?? DEFAULT_SUPPORT_SETTINGS.support_timings,
  };

  return (
    <>
      <PageHero
        badge="Customer Support"
        title={<>We&apos;re here when you need us</>}
        description="24/7 technical support, billing assistance, and TRAI-compliant complaint handling for every Extranet connection."
      />
      <section className="bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SupportContent supportSettings={supportSettings} />
        </div>
      </section>
    </>
  );
}
