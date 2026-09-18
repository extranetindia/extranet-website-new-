"use client";

import { useCompanySettings } from "@/lib/hooks/useCompanySettings";

export default function LegalPolicyFallback() {
  const { settings: companySettings } = useCompanySettings();

  const supportEmail = companySettings?.support_email || "help.extranet@gmail.com";
  const companyName = companySettings?.company_name || "Extranet";

  return (
    <section className="rounded-xl border border-[#DCE3EC] bg-[#F4F7FC] p-8 text-[#475569]">
      <h2 className="text-xl font-extrabold text-[#15366A]">Policy content is not available</h2>
      <p className="mt-4 text-base leading-8">
        The requested policy page has not been published yet. Please contact support at{" "}
        <a href={`mailto:${supportEmail}`} className="font-semibold text-[#11418D] hover:underline">
          {supportEmail}
        </a>{" "}
        for the latest terms and service details.
      </p>
    </section>
  );
}
