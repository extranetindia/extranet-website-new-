"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Globe, Link as LinkIcon, Camera, Play, ArrowRight } from "lucide-react";
import { useCompanySettings } from "@/lib/hooks/useCompanySettings";

interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinksCategory {
  [key: string]: FooterLink[];
}

interface FooterContentProps {
  footerLinks: FooterLinksCategory;
  social: SocialLink[];
}

// Helper function to render icons by name
function getIcon(iconName: string) {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    Globe,
    Link: LinkIcon,
    Camera,
    Play,
  };
  return iconMap[iconName] || LinkIcon;
}

export default function FooterContent({ footerLinks, social }: FooterContentProps) {
  const { settings } = useCompanySettings();

  const contactItems = [
    {
      icon: Phone,
      label: "Sales & Support · 24×7",
      value: settings?.company_phone || "+91 9540901195",
      href: `tel:${(settings?.company_phone || "+919540901195").replace(/\s+/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email us",
      value: settings?.support_email || "help.extranet@gmail.com",
      href: `mailto:${settings?.support_email || "help.extranet@gmail.com"}`,
    },
    {
      icon: MapPin,
      label: "Registered office",
      value: settings?.company_address || "A-110, Sector-37, Near Samsara School, Greater Noida, Uttar Pradesh 201310",
      href: "/contact",
    },
  ];

  return (
    <>
      {/* Service band — deep telecom blue */}
      <div className="relative overflow-hidden bg-[#15366A]">
        <div aria-hidden className="network-grid-dark absolute inset-0 opacity-60" />
        <div aria-hidden className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#C1170C]/15 blur-[120px]" />
        <div aria-hidden className="absolute -bottom-40 -left-28 h-96 w-96 rounded-full bg-[#11418D]/50 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:px-8">
          <div>
            <p className="tele-eyebrow text-white/60">Talk to our connectivity team</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-[1.7rem]">
              Need a new connection or a business quote?
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {contactItems.map((item) => (
                <a key={item.label} href={item.href} className="group flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white/10 ring-1 ring-white/15 transition-colors group-hover:bg-white/15">
                    <item.icon className="h-5 w-5 text-white" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/60">
                      {item.label}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm font-bold text-white group-hover:underline">
                      {item.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2.5 md:w-60">
            <Link href="/contact" className="tele-btn tele-btn-red w-full px-6">
              Get Connected
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/plans"
              className="tele-btn w-full border border-white/25 px-6 text-white hover:bg-white/10"
            >
              View broadband plans
            </Link>
          </div>
        </div>
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-[#C1170C]" />
      </div>

      {/* Main footer — light corporate */}
      <div className="bg-[#F4F7FC]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-6 lg:gap-8 lg:px-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="block h-11 transition-opacity hover:opacity-90" aria-label="Extranet India — home">
              <Image
                src={settings?.logo_url || "/logo.png"}
                alt={settings?.company_name || "Extranet"}
                width={180}
                height={44}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5C6F89]">
              Enterprise-grade fibre and broadband for Indian homes and businesses —
              reliable speeds, transparent pricing, responsive support.
            </p>
            <div className="mt-5 flex gap-2.5">
              {social.map((s) => {
                const IconComponent = getIcon(s.iconName);
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#DCE3EC] bg-white text-[#5C6F89] transition-colors hover:border-[#11418D] hover:bg-[#11418D] hover:text-white"
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-[#15366A]">
                {category}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-[#475569] transition-colors hover:text-[#11418D]"
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

      <div className="border-t border-[#DCE3EC] bg-white">
        <div className="wordmark-wrap mx-auto max-w-7xl cursor-default overflow-hidden px-4 pt-8 sm:px-6 lg:px-8" aria-hidden>
          <motion.p
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-stroke-navy wordmark-glow select-none whitespace-nowrap text-center text-[19vw] font-extrabold leading-[0.85] tracking-tight sm:text-[17vw] lg:text-[13rem]"
          >
            EXTRANET
          </motion.p>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-xs font-medium text-[#5C6F89]">
            © {new Date().getFullYear()} {settings?.company_name || "Extranet Infotech"}. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {[
              { label: "Terms", href: "/terms" },
              { label: "Privacy", href: "/privacy" },
              { label: "Refunds", href: "/refund" },
              { label: "Support", href: "/support" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="text-xs font-semibold text-[#5C6F89] hover:text-[#11418D]">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
