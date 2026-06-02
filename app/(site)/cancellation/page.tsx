import type { Metadata } from "next";
import LegalPolicyPage from "@/components/legal/LegalPolicyPage";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "Cancellation policy for Extranet India broadband and enterprise internet customers.",
};

export default function CancellationPage() {
  return (
    <LegalPolicyPage
      slug="cancellation"
      title="Cancellation Policy"
      description="Cancellation policy for Extranet India broadband and enterprise internet customers."
      summary="This Cancellation Policy explains how residential and business broadband customers may cancel service, return equipment, and settle final charges."
    />
  );
}
