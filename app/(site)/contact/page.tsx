import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactContent from "@/components/contact/ContactContent";
import {
  DEFAULT_SUPPORT_SETTINGS,
  getSupportSettings,
} from "@/lib/database/support";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Extranet sales and support for new connections and enterprise fiber.",
};

export default async function ContactPage() {
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
        badge="Contact"
        title="Talk to our team"
        description="New connections, enterprise quotes, or general questions — we respond within one business day."
      />
      <section className="bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactContent supportSettings={supportSettings} />
        </div>
      </section>
    </>
  );
}
