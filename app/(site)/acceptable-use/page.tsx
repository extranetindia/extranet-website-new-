import type { Metadata } from "next";
import LegalPolicyPage from "@/components/legal/LegalPolicyPage";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "Acceptable Use Policy for Extranet India broadband customers describing permitted and prohibited network behavior.",
};

export default function AcceptableUsePage() {
  return (
    <LegalPolicyPage
      slug="acceptable-use"
      title="Acceptable Use Policy"
      description="Acceptable Use Policy for Extranet India broadband customers describing permitted and prohibited network behavior."
      summary="This Acceptable Use Policy outlines permitted behavior and prohibited activities for customers using Extranet India internet services."
    />
  );
}
