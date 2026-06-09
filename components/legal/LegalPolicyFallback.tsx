"use client";

import { useCompanySettings } from "@/lib/hooks/useCompanySettings";

export default function LegalPolicyFallback() {
  const { settings: companySettings } = useCompanySettings();

  const supportEmail = companySettings?.support_email || "help.extranet@gmail.com";
  const companyName = companySettings?.company_name || "Extranet";

  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-700">
      <h2 className="text-xl font-semibold text-slate-900">Policy content is not available</h2>
      <p className="mt-4 text-base leading-8">
        The requested policy page has not been published yet. Please contact support at{" "}
        <a href={`mailto:${supportEmail}`} className="font-semibold text-[#134799] hover:underline">
          {supportEmail}
        </a>{" "}
        for the latest terms and service details.
      </p>
    </section>
  );
}
