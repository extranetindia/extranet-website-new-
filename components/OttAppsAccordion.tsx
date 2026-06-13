"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    <div className="border-t border-slate-200 pt-4 mt-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg bg-slate-50 px-4 py-3 hover:bg-slate-100 transition-colors duration-200"
      >
        <span className="font-semibold text-slate-900 text-sm">
          Included OTT Apps
          <ChevronDown
            size={18}
            className={`ml-2 inline-block transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="space-y-3 px-4 py-4">
          <div>
            <p className="font-semibold text-slate-900 text-sm">{packageName}</p>
            {description && (
              <p className="text-xs text-slate-600 mt-1">{description}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {apps.map((app) => (
              <span
                key={app}
                className="inline-block rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-[#134799]"
              >
                {app}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
