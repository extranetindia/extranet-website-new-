import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy describing the information Extranet India collects from broadband and fiber internet customers.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      summary="This Privacy Policy explains how Extranet India collects, uses, protects, and retains customer information for broadband and enterprise internet services."
      lastUpdated="June 2, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Information We Collect</h2>
        <p className="text-base leading-8 text-slate-700">
          We collect customer registration data, service address details, payment and billing information,
          device identifiers, and network usage records necessary to deliver broadband and fiber internet
          services. Information may also include communication preferences, support interactions, and
          location data required for service provisioning.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">How We Use Information</h2>
        <p className="text-base leading-8 text-slate-700">
          Extranet uses collected information to activate and maintain service, manage accounts, process
          payments, and respond to customer service requests. We also use data to monitor network health,
          diagnose faults, and provide tailored recommendations for plan upgrades or network improvements.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Cookies</h2>
        <p className="text-base leading-8 text-slate-700">
          Our website and customer portals use cookies and similar technologies to remember preferences,
          improve navigation, and secure sessions. These cookies support essential functions such as login
          persistence, form submission, and user interface personalization.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Analytics</h2>
        <p className="text-base leading-8 text-slate-700">
          We may use analytics tools to understand how customers interact with our online portals and
          to improve service delivery. Analytics data is typically aggregated and anonymized to protect
          customer privacy while enabling better website performance and support workflows.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Data Security</h2>
        <p className="text-base leading-8 text-slate-700">
          Extranet maintains administrative, technical, and physical safeguards to protect customer data
          against unauthorized access, alteration, disclosure, or destruction. We restrict access to
          customer information to authorized personnel and regularly review our security practices.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Third-Party Services</h2>
        <p className="text-base leading-8 text-slate-700">
          We may share information with third-party service providers who support billing, customer care,
          network operations, or analytics. These partners are contractually obligated to protect the data
          and may only use it for the specific services they provide on our behalf.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Customer Rights</h2>
        <p className="text-base leading-8 text-slate-700">
          Customers have the right to access, correct, or update their account information. Requests for
          data access or corrections should be submitted to our support team. We will process such
          requests in accordance with applicable privacy laws and our internal policies.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Data Retention</h2>
        <p className="text-base leading-8 text-slate-700">
          We retain customer data as long as needed to provide services, comply with legal obligations,
          and support service operations. Account information and billing records are preserved in line
          with statutory requirements and our retention schedule.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Contact Information</h2>
        <p className="text-base leading-8 text-slate-700">
          For privacy inquiries or requests, please contact our privacy team at help.extranet@gmail.com.
          We are committed to addressing privacy concerns and explaining how we protect customer data.
        </p>
      </section>
    </LegalPage>
  );
}
