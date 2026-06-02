import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "Acceptable Use Policy for Extranet India broadband customers describing permitted and prohibited network behavior.",
};

export default function AcceptableUsePage() {
  return (
    <LegalPage
      title="Acceptable Use Policy"
      summary="This Acceptable Use Policy outlines permitted behavior and prohibited activities for customers using Extranet India internet services."
      lastUpdated="June 2, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Prohibited Activities</h2>
        <p className="text-base leading-8 text-slate-700">
          Customers must not use Extranet services for illegal, abusive, or unauthorized activities.
          Prohibited conduct includes compromising network security, launching attacks, and engaging in
          fraud or identity theft. Any such use may result in immediate suspension.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Illegal Content</h2>
        <p className="text-base leading-8 text-slate-700">
          The transmission, hosting, or sharing of illegal content is strictly forbidden. This includes
          copyrighted material distributed without authorization, child sexual abuse material, hate
          speech that violates applicable law, and any content that violates Indian or international law.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Network Abuse</h2>
        <p className="text-base leading-8 text-slate-700">
          Network abuse includes actions that degrade, overload, or disrupt our infrastructure or the
          experience of other customers. This includes denial-of-service attacks, port scanning,
          unauthorized intrusion attempts, and any activity that jeopardizes network stability.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Spam and Bulk Messaging</h2>
        <p className="text-base leading-8 text-slate-700">
          Using Extranet services to send unsolicited bulk messages, spam, or phishing content is
          prohibited. This restriction applies to email, SMS, instant messaging, and any platform that
          leverages our bandwidth or network resources.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Security Violations</h2>
        <p className="text-base leading-8 text-slate-700">
          Customers must not attempt to bypass network security, exploit vulnerabilities, or distribute
          malware. Any compromise of Extranet's systems or customer premises equipment will be treated as
          a serious violation and may lead to termination.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Bandwidth Abuse</h2>
        <p className="text-base leading-8 text-slate-700">
          Excessive use of bandwidth that negatively impacts overall network performance is prohibited.
          We may apply traffic management or fair usage practices to preserve service quality for all
          subscribers. Persistent abuse may result in speed throttling, warnings, or account suspension.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Enforcement Actions</h2>
        <p className="text-base leading-8 text-slate-700">
          Extranet may investigate complaints or automated alerts of policy violations. If a violation is
          confirmed, we may issue warnings, impose temporary restrictions, or terminate service in
          accordance with the service agreement.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Account Suspension</h2>
        <p className="text-base leading-8 text-slate-700">
          Serious or repeated violations of this policy may result in account suspension or termination.
          Customers remain responsible for all accrued charges during a suspension period and must
          cooperate with Extranet to resolve the issue before service can be restored.
        </p>
      </section>
    </LegalPage>
  );
}
