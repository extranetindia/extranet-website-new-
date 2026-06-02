import type { Metadata } from "next";
import LegalPolicyPage from "@/components/legal/LegalPolicyPage";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund policy for Extranet India broadband installation, activation, and subscription charges.",
};

export default function RefundPage() {
  return (
    <LegalPolicyPage
      slug="refund"
      title="Refund Policy"
      description="Refund policy for Extranet India broadband installation, activation, and subscription charges."
      summary="This Refund Policy explains how Extranet India handles refunds for installation, subscription, and activation-related charges for broadband and fiber services."
    />
  );
}
