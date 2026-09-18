"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { useCompanySettings } from "@/lib/hooks/useCompanySettings";

/**
 * Sticky conversion bar — mobile only. Desktop already has
 * navbar CTA + footer band, so this stays out of their way.
 */
export default function MobileCtaBar() {
  const { settings } = useCompanySettings();
  const phone = settings?.company_phone || "+91 9540901195";
  const tel = `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <>
      {/* In-flow spacer matching the fixed bar (72px) + home-indicator zone,
          so the bar never covers footer content on notched phones */}
      <div aria-hidden className="h-[calc(72px+env(safe-area-inset-bottom))] lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#DCE3EC] bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_28px_rgba(21,54,106,0.12)] backdrop-blur lg:hidden">
        <div className="grid grid-cols-2 gap-2.5 p-3">
          <a href={tel} className="tele-btn tele-btn-outline min-h-[48px]">
            <Phone className="h-4 w-4 text-[#C1170C]" aria-hidden />
            Call now
          </a>
          <Link href="/plans" className="tele-btn tele-btn-primary min-h-[48px]">
            View plans
          </Link>
        </div>
      </div>
    </>
  );
}
