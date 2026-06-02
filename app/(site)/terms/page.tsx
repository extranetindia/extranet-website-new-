import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Extranet India broadband and enterprise internet service customers.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      summary="These terms govern access to and use of Extranet India broadband, fiber, and managed internet services. They define customer responsibilities, payment terms, and network usage for residential and business customers."
      lastUpdated="June 2, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Introduction</h2>
        <p className="text-base leading-8 text-slate-700">
          These Terms of Service govern the relationship between Extranet India Private Limited
          ("Extranet," "we," "us") and you, the customer, for residential and business broadband,
          fiber, and last-mile internet services. By subscribing, activating, or continuing to use our
          services, you agree to abide by these terms and any supplemental policies that apply to your plan.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Eligibility</h2>
        <p className="text-base leading-8 text-slate-700">
          Service is available only to individuals and businesses with a valid address within our
          authorized service area. Customers must be at least 18 years old or, for business accounts,
          authorized representatives of the subscribing entity. By signing up, you warrant that the
          information you provide is accurate and complete.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Service Availability</h2>
        <p className="text-base leading-8 text-slate-700">
          Extranet provides service subject to network capacity, infrastructure readiness, and regulatory
          approvals. Service activation timelines depend on site surveys, access permissions, and
          equipment availability. We do not guarantee uninterrupted service; however, we will use
          commercially reasonable efforts to maintain high availability in accordance with published service levels.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Customer Responsibilities</h2>
        <p className="text-base leading-8 text-slate-700">
          Customers are responsible for maintaining safe access to the installation location, providing
          truthful contact and billing information, and securing any customer-owned equipment connected
          to our network. You must keep your account password and credentials confidential and notify
          Extranet promptly if you suspect unauthorized access.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Network Usage</h2>
        <p className="text-base leading-8 text-slate-700">
          Extranet services are intended for lawful personal and business communications. You agree not
          to use the network to send malicious traffic, compromise network integrity, or conduct any
          activity that interferes with others' experience. Bandwidth usage may be subject to fair use
          policies and capacity management if required to preserve service quality for all customers.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Billing and Payments</h2>
        <p className="text-base leading-8 text-slate-700">
          Monthly service fees, installation charges, taxes, and any add-on charges are due in accordance
          with your service agreement. You authorize Extranet to collect payments using the payment method
          on file. Late payments may incur interest, administrative fees, or suspension of service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Service Suspension</h2>
        <p className="text-base leading-8 text-slate-700">
          Extranet reserves the right to suspend service for non-payment, violation of these terms,
          network abuse, or when required by law. Suspension may also occur to perform maintenance or
          upgrades. We will provide notice when practical and restore service once the underlying issue
          is resolved.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Limitation of Liability</h2>
        <p className="text-base leading-8 text-slate-700">
          Extranet is not liable for indirect, special, incidental, or consequential damages arising from
          service interruptions, data loss, or third-party content. Our total liability for any claim
          related to the service is limited to the amount paid by you for the service during the three
          months preceding the claim, to the fullest extent permitted by law.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Intellectual Property</h2>
        <p className="text-base leading-8 text-slate-700">
          All intellectual property in Extranet's website, service interfaces, documentation, and network
          management tools remains the exclusive property of Extranet or its licensors. Customers are
          granted a limited, non-transferable right to use these materials solely in support of their
          service relationship with Extranet.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Service Modifications</h2>
        <p className="text-base leading-8 text-slate-700">
          Extranet may modify service features, pricing, or network practices to improve performance,
          comply with law, or address new security requirements. Material changes will be communicated
          in advance whenever reasonably possible. Continued use of the service after notice constitutes
          acceptance of the modifications.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Termination</h2>
        <p className="text-base leading-8 text-slate-700">
          Either party may terminate the service agreement in accordance with the applicable contract
          terms and notice requirements. Extranet may terminate service immediately for serious breaches,
          including non-payment, unlawful conduct, or network abuse. Upon termination, you must return
          any rented equipment and pay any outstanding charges.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Governing Law</h2>
        <p className="text-base leading-8 text-slate-700">
          These terms are governed by the laws of India. Any disputes arising out of or related to the
          service will be subject to the exclusive jurisdiction of the competent courts in the state
          where Extranet's registered office is located.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Contact Information</h2>
        <p className="text-base leading-8 text-slate-700">
          For questions about these Terms of Service, billing, or service support, please contact our
          customer care team at help.extranet@gmail.com or +91 9540901195.
        </p>
      </section>
    </LegalPage>
  );
}
