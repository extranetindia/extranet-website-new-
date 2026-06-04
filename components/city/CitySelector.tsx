"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { useRef, useState } from "react";
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
  /** Inline: city name is the trigger beside the heading (no bordered card). */
  variant?: "default" | "inline";
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
  variant = "default",
}: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDisabled = disabled || loading || cities.length === 0;
  const selectedCity = cities.find((city) => city.id === value);

  const selectOptions = loading ? (
    <option value="">Loading cities...</option>
  ) : cities.length === 0 ? (
    <option value="">No cities available</option>
  ) : (
    cities.map((city) => (
      <option key={city.id} value={city.id}>
        {city.name}
      </option>
    ))
  );

  const ariaLabel =
    label ??
    (variant === "inline" && selectedCity
      ? `Selected city: ${selectedCity.name}. Change city`
      : "Select city");

  // Handle outside clicks for dropdown
  const handleOutsideClick = (event: React.MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleCitySelect = (cityId: string) => {
    onChange(cityId);
    setIsOpen(false);
  };

  if (variant === "inline") {
    return (
      <div
        ref={dropdownRef}
        className={`relative inline-flex max-w-full items-center align-baseline ${className}`}
        onClick={handleOutsideClick}
      >
        <button
          id={id}
          disabled={isDisabled}
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
          className="max-w-full cursor-pointer bg-transparent py-1 pr-7 text-2xl font-bold text-[#d2190d] outline-none transition focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:text-slate-400 sm:text-3xl"
          aria-label={ariaLabel}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          type="button"
        >
          {selectedCity?.name || "Select city"}
        </button>
        <ChevronDown
          className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d2190d] transition-transform sm:h-5 sm:w-5"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden
        />
        {isOpen && !isDisabled && (
          <ul
            className="absolute left-0 top-full z-50 mt-2 w-max rounded-lg border border-slate-200 bg-white shadow-lg"
            role="listbox"
            aria-label="Available cities"
          >
            {cities.map((city) => (
              <li key={city.id} role="option" aria-selected={value === city.id}>
                <button
                  onClick={() => handleCitySelect(city.id)}
                  className={`block w-full px-4 py-2.5 text-base text-left font-medium transition-colors ${
                    value === city.id
                      ? "bg-text-[#134799] text-blue-700"
                      : "text-slate-900 hover:bg-slate-50"
                  }`}
                  type="button"
                >
                  {city.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

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
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#134799]"
          aria-hidden
        />
        <select
          id={id}
          value={value ?? ""}
          disabled={isDisabled}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-[44px] w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm font-semibold text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-[#134799]/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 sm:min-w-[220px]"
          aria-label={ariaLabel}
        >
          {selectOptions}

        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
      </div>
    </div>
  );
}
