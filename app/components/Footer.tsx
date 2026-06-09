import Link from "next/link";
import FooterContent from "@/components/FooterContent";

const footerLinks = {
  Plans: [
    { label: "WiFi Only", href: "/plans#wifi-only" },
    { label: "WiFi + OTT Bundle", href: "/plans#wifi-ott" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Coverage", href: "/coverage" },
    { label: "For ILL", href: "/contact" },
  ],
  Support: [
    { label: "Help Center", href: "/support" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Acceptable Use Policy", href: "/acceptable-use" },
    { label: "Cancellation Policy", href: "/cancellation" },
  ],
};

const social = [
  { iconName: "Globe", href: "#", label: "Facebook" },
  { iconName: "Link", href: "#", label: "Twitter" },
  { iconName: "Link", href: "#", label: "LinkedIn" },
  { iconName: "Camera", href: "#", label: "Instagram" },
  { iconName: "Play", href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300 border-t border-slate-800">
      <FooterContent footerLinks={footerLinks} social={social} />
    </footer>
  );
}
