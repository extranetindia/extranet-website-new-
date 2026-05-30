import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Globe, Link as LinkIcon, Camera, Play } from "lucide-react";

const footerLinks = {
  Plans: [
    { label: "Home Broadband", href: "/plans#home-broadband" },
    { label: "Business & Enterprise", href: "/plans#enterprise" },
    // { label: "Enterprise Leased Line", href: "/plans#enterprise" },
    { label: "Compare Plans", href: "/plans" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Coverage", href: "/coverage" },
  ],
  Support: [
    { label: "Help Center", href: "/support" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
    // { label: "TRAI Compliance", href: "#" },
  ],
};

const social = [
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: LinkIcon, href: "#", label: "Twitter" },
  { icon: LinkIcon, href: "#", label: "LinkedIn" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: Play, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="border-b border-slate-800 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                icon: Phone,
                label: "Sales & Support",
                value: "+91 9540901195",
                sub: "Available 24/7",
              },
              {
                icon: Mail,
                label: "Email Us",
                value: "help.extranet@gmail.com",
                sub: "Response within 4 hours",
              },
              {
                icon: MapPin,
                label: "Registered Office",
                value: "Extranet Infotech India Pvt. Ltd.",
                sub: "LGF - 4, Shiva Plaza, Kasna, Greater Noida, Uttar Pradesh, India — 201310",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-900/50 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold text-white">{item.value}</div>
                  <div className="text-xs text-slate-500">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="relative mb-5 block h-10 shrink-0">
              <Image
                src="/logo.png"
                alt="Extranet"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Connecting India with enterprise-grade fiber and broadband. Reliable.
              Fast. Trusted.
            </p>
            <div className="flex gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-900/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-300 transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-5">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center justify-center gap-4">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            © {new Date().getFullYear()} Extranet India Private Limited. All rights
            reserved.
          </p>
          {/* <div className="flex flex-wrap items-center justify-center gap-2">
            {["ISO 9001:2015", "TRAI Licensed", "DOT Certified"].map((cert) => (
              <span
                key={cert}
                className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-blue-300/80 font-medium"
              >
                {cert}
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
}
