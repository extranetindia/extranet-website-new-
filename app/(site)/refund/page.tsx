import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund policy for Extranet India broadband installation, activation, and subscription charges.",
};

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      summary="This Refund Policy explains how Extranet India handles refunds for installation, subscription, and activation-related charges for broadband and fiber services."
      lastUpdated="June 2, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Installation Charges</h2>
        <p className="text-base leading-8 text-slate-700">
          Installation charges are assessed for technician visits, inside wiring, and equipment setup.
          Refunds for installation fees are granted only when the charge is canceled before the service
          installation begins or when the service cannot be activated due to Extranet network limitations.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Monthly Subscription Charges</h2>
        <p className="text-base leading-8 text-slate-700">
          Monthly subscription fees are non-refundable for periods of service already rendered.
          If you cancel within the current billing cycle, the fees paid for that cycle will remain
          applied unless otherwise required by law or contract.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Service Activation</h2>
        <p className="text-base leading-8 text-slate-700">
          Activation charges are refundable only when the service activation is delayed or prevented by
          Extranet. If a service activation fails due to our infrastructure or planning error, we will
          evaluate the activation fee for refund on a case-by-case basis.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Non-Refundable Services</h2>
        <p className="text-base leading-8 text-slate-700">
          Charges related to third-party content, value-added services, late payment penalties, or
          one-time administrative fees are generally non-refundable. Any exception will be documented
          explicitly in your service agreement or customer confirmation.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Refund Processing Time</h2>
        <p className="text-base leading-8 text-slate-700">
          Refund requests are reviewed within 7 business days after receipt. Approved refunds are
          processed within 14 business days and returned using the original payment method or an agreed
          alternative, depending on the payment provider.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Exceptional Circumstances</h2>
        <p className="text-base leading-8 text-slate-700">
          In exceptional situations such as service discontinuation, regulatory changes, or significant
          service outages caused by Extranet, we may offer goodwill credits or partial refunds to
          affected customers. These are assessed at our discretion and documented in writing.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Contact Information</h2>
        <p className="text-base leading-8 text-slate-700">
          For refund requests or billing questions, contact our billing team at help.extranet@gmail.com
          or +91 9540901195. Please reference your account number and invoice details for faster support.
        </p>
      </section>
    </LegalPage>
  );
}
