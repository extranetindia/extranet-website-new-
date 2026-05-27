import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Extranet sales and support for new connections and enterprise fiber.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact"
        title="Talk to our team"
        description="New connections, enterprise quotes, or general questions — we respond within one business day."
      />
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactContent />
        </div>
      </section>
    </>
  );
}
