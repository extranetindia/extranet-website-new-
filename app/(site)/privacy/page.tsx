import type { Metadata } from "next";
import LegalPolicyPage from "@/components/legal/LegalPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy describing the information Extranet India collects from broadband and fiber internet customers.",
};

export default function PrivacyPage() {
  return (
    <LegalPolicyPage
      slug="privacy"
      title="Privacy Policy"
      description="Privacy policy describing the information Extranet India collects from broadband and fiber internet customers."
      summary="This Privacy Policy explains how Extranet India collects, uses, protects, and retains customer information for broadband and enterprise internet services."
    />
  );
}
