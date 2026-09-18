"use client";

import { useState } from "react";
import { ChevronDown, Clapperboard } from "lucide-react";

interface OttAppsAccordionProps {
  packageName: string;
  description?: string | null;
  apps: string[];
}

export default function OttAppsAccordion({
  packageName,
  description,
  apps,
}: OttAppsAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!apps || apps.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#DCE3EC]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex min-h-[46px] w-full items-center justify-between gap-2 bg-[#F8F9FB] px-4 py-3 text-left transition-colors hover:bg-[#F4F7FC]"
      >
        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#15366A]">
          <Clapperboard className="h-4 w-4 text-[#11418D]" aria-hidden />
          Included OTT apps ({apps.length})
        </span>
        <ChevronDown
          size={18}
          aria-hidden
          className={`shrink-0 text-[#5C6F89] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 border-t border-[#EDF1F6] px-4 py-4">
            <div>
              <p className="text-sm font-bold text-[#15366A]">{packageName}</p>
              {description && (
                <p className="mt-1 text-xs leading-relaxed text-[#5C6F89]">{description}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {apps.map((app) => (
                <span
                  key={app}
                  className="inline-block rounded-full bg-[#11418D]/10 px-3 py-1.5 text-xs font-bold text-[#11418D]"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
