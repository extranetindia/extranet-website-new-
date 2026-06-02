import type { Metadata } from "next";
import LegalPolicyPage from "@/components/legal/LegalPolicyPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Extranet India broadband and enterprise internet service customers.",
};

export default function TermsPage() {
  return (
    <LegalPolicyPage
      slug="terms"
      title="Terms of Service"
      description="Terms of Service for Extranet India broadband and enterprise internet service customers."
    //   summary="These terms govern access to and use of Extranet India broadband, fiber, and managed internet services. They define customer responsibilities, payment terms, and network usage for residential and business customers."
    />
  );
}
