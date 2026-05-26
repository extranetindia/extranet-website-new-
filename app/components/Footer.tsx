import Image from "next/image";
import { Phone, Mail, MapPin, Globe, Link, Camera, Play } from "lucide-react";

const footerLinks = {
  Plans: [
    { label: "Home Broadband", href: "#plans" },
    { label: "Business Fiber", href: "#plans" },
    { label: "Enterprise Leased Line", href: "#plans" },
    { label: "Wireless Internet", href: "#plans" },
    { label: "Compare Plans", href: "#plans" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Press & Media", href: "#" },
    { label: "Investors", href: "#" },
    { label: "Partners", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Network Status", href: "#" },
    { label: "Report an Issue", href: "#" },
    { label: "Raise a Ticket", href: "#" },
    { label: "Contact Us", href: "#contact" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
    { label: "Fair Usage Policy", href: "#" },
    { label: "TRAI Compliance", href: "#" },
  ],
};

const social = [
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: Link, href: "#", label: "Twitter" },
  { icon: Link, href: "#", label: "LinkedIn" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: Play, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-[#020509] border-t border-blue-900/30">
      {/* Top contact strip */}
      <div className="border-b border-blue-900/20 bg-[#040810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Phone,
                label: "Sales & Support",
                value: "+91 88888 88888",
                sub: "Mon–Sat, 9 AM – 8 PM",
              },
              {
                icon: Mail,
                label: "Email Us",
                value: "support@extranet.in",
                sub: "Response within 4 hours",
              },
              {
                icon: MapPin,
                label: "Registered Office",
                value: "Extranet India Pvt. Ltd.",
                sub: "New Delhi, India — 110001",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-900/40 flex items-center justify-center shrink-0">
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

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/5 ring-1 ring-white/10">
                <Image
                  src="/extranet-logo.png"
                  alt="Extranet India"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white">
                  extra<span className="text-red-500">A</span>net
                </span>
                <div className="text-[9px] text-blue-400/80 tracking-widest uppercase">
                  India Pvt. Ltd.
                </div>
              </div>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Connecting India with enterprise-grade fiber and broadband internet.
              Reliable. Fast. Trusted.
            </p>
            <div className="flex gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-900/40 border border-white/8 hover:border-blue-700/40 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all duration-200"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-5">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            © {new Date().getFullYear()} Extranet India Private Limited. All rights reserved.
            Licensed by TRAI · DOT License No. UL/XXXXX/MH/ISP
          </p>
          <div className="flex items-center gap-4">
            {["ISO 9001:2015", "TRAI Licensed", "DOT Certified"].map((cert) => (
              <span
                key={cert}
                className="px-3 py-1 rounded-full bg-blue-900/20 border border-blue-900/30 text-xs text-blue-400/70 font-medium"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
