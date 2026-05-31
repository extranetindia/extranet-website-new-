"use client";

import { ChevronDown, MapPin } from "lucide-react";
import type { CityRow } from "@/lib/database/schema";

interface CitySelectorProps {
  cities: CityRow[];
  value: string | null;
  onChange: (cityId: string) => void;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  id?: string;
  className?: string;
}

export default function CitySelector({
  cities,
  value,
  onChange,
  loading = false,
  disabled = false,
  label,
  id = "city-selector",
  className = "",
}: CitySelectorProps) {
  const isDisabled = disabled || loading || cities.length === 0;

  return (
    <div className={`w-full sm:w-auto ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <MapPin
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-600"
          aria-hidden
        />
        <select
          id={id}
          value={value ?? ""}
          disabled={isDisabled}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-[44px] w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm font-semibold text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 sm:min-w-[220px]"
          aria-label={label ?? "Select city"}
        >
          {loading ? (
            <option value="">Loading cities...</option>
          ) : cities.length === 0 ? (
            <option value="">No cities available</option>
          ) : (
            cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))
          )}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
      </div>
    </div>
  );
}
