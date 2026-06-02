import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "Cancellation policy for Extranet India broadband and enterprise internet customers.",
};

export default function CancellationPage() {
  return (
    <LegalPage
      title="Cancellation Policy"
      summary="This Cancellation Policy explains how residential and business broadband customers may cancel service, return equipment, and settle final charges."
      lastUpdated="June 2, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Service Cancellation Requests</h2>
        <p className="text-base leading-8 text-slate-700">
          Customers may request service cancellation by contacting Extranet support by phone or email.
          Cancellation requests must include the account holder's name, service address, and account number
          or registered mobile number to ensure accurate processing.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Notice Period</h2>
        <p className="text-base leading-8 text-slate-700">
          A notice period may apply depending on the terms of your service agreement. For month-to-month
          subscriptions, cancellation requests generally take effect at the end of the current billing cycle.
          For fixed-term or promotional plans, early termination fees may apply as set out in your contract.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Equipment Return</h2>
        <p className="text-base leading-8 text-slate-700">
          Customers must return rented equipment, including routers, ONTs, and cabling supplied by Extranet,
          within the timeframe specified in their cancellation notice. Unreturned equipment may incur
          replacement charges at the rates published in your service agreement.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Outstanding Payments</h2>
        <p className="text-base leading-8 text-slate-700">
          Any outstanding service charges, taxes, or equipment fees remain payable upon cancellation.
          Final billing will reflect prorated service for the notice period, outstanding balances, and
          any applicable termination fees.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Refund Eligibility</h2>
        <p className="text-base leading-8 text-slate-700">
          Refunds on prepaid charges are evaluated according to your plan and the reason for cancellation.
          Prepaid months already consumed are not refundable. Any eligible refund is processed after
          service termination and equipment return, subject to verification of your account status.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Account Closure</h2>
        <p className="text-base leading-8 text-slate-700">
          After your service is cancelled and equipment is returned, Extranet will close your account and
          confirm the closure in writing. We may retain certain account records as required for legal,
          accounting, or regulatory compliance.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Contact Information</h2>
        <p className="text-base leading-8 text-slate-700">
          For cancellation requests, please contact Extranet support at help.extranet@gmail.com or
          +91 9540901195. Our team will verify your request and provide a confirmation number for the
          cancellation process.
        </p>
      </section>
    </LegalPage>
  );
}
