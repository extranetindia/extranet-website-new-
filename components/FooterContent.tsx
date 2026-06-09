"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Globe, Link as LinkIcon, Camera, Play } from "lucide-react";
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
      label: "Sales & Support",
      value: settings?.company_phone || "+91 9540901195",
      sub: "Available 24/7",
    },
    {
      icon: Mail,
      label: "Email Us",
      value: settings?.support_email || "help.extranet@gmail.com",
      sub: "Response within 4 hours",
    },
    {
      icon: MapPin,
      label: "Registered Office",
      value: settings?.company_name || "Extranet Infotech",
      sub: settings?.company_address || "A-110, Sector-37, Near Samsara School, Greater Noida, Uttar Pradesh 201310",
    },
  ];

  return (
    <>
      <div className="border-b border-slate-800 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-900/50 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs hover:text-[#134799] uppercase tracking-wider font-medium mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold text-white">{item.value}</div>
                  <div className="text-xs hover:text-[#134799]">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="relative mb-5 block h-10 shrink-0 transition-all duration-200 ease-in-out hover:opacity-90">
              <Image
                src={settings?.logo_url || "/logo.png"}
                alt={settings?.company_name || "Extranet"}
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
              {social.map((s) => {
                const IconComponent = getIcon(s.iconName);
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#134799] border border-slate-700 hover:border-[#134799] flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 ease-in-out"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
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
                      className="text-sm transition-all duration-200 ease-in-out hover:text-[#134799]"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center justify-center gap-4">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            © {new Date().getFullYear()} {settings?.company_name || "Extranet Infotech"}. All rights
            reserved.
          </p>
        </div>
      </div>
    </>
  );
}
