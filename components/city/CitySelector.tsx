"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  const handleCitySelect = (cityId: string) => {
    onChange(cityId);
    setIsOpen(false);
  };

  if (variant === "inline") {
    return (
      <div ref={dropdownRef} className={`relative inline-flex max-w-full items-center align-baseline ${className}`}>
        <span className="mr-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#11418D]/10">
          <MapPin className="h-4 w-4 text-[#11418D]" aria-hidden />
        </span>
        <button
          id={id}
          disabled={isDisabled}
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
          className="w-fit min-w-0 max-w-full cursor-pointer border-b-2 border-dashed border-[#11418D]/40 bg-transparent py-1 pr-6 text-left text-[26px] font-extrabold leading-tight tracking-tight text-[#11418D] outline-none transition-colors hover:border-[#11418D] hover:text-[#0e3675] focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#11418D]/25 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 sm:text-[38px] sm:leading-none"
          aria-label={ariaLabel}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          type="button"
        >
          {/* Long sector names wrap on small screens instead of clipping */}
          <span className="whitespace-normal break-words sm:whitespace-nowrap">{selectedCity?.name || "Select city"}</span>
        </button>
        <ChevronDown
          className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C1170C] transition-transform duration-200 ease-out sm:h-5 sm:w-5"
          style={{ transform: isOpen ? "translateY(-50%) rotate(180deg)" : "translateY(-50%) rotate(0deg)" }}
          aria-hidden
        />
        {isOpen && !isDisabled && (
          <ul
            className="absolute left-0 top-full z-[60] mt-2 max-h-72 w-[min(18rem,calc(100vw-1rem))] overflow-y-auto rounded-xl border border-[#DCE3EC] bg-white py-1.5 shadow-[0_20px_44px_rgba(21,54,106,0.18)]"
            role="listbox"
            aria-label="Available cities"
          >
            {cities.map((city) => (
              <li key={city.id} role="option" aria-selected={value === city.id}>
                <button
                  onClick={() => handleCitySelect(city.id)}
                  className={`flex min-h-[44px] w-full items-center justify-between px-4 py-2.5 text-left text-sm font-semibold transition-colors sm:text-[0.95rem] ${
                    value === city.id
                      ? "bg-[#F4F7FC] text-[#11418D]"
                      : "text-[#15366A] hover:bg-[#F8F9FB]"
                  }`}
                  type="button"
                >
                  {city.name}
                  {value === city.id ? (
                    <span aria-hidden className="h-2 w-2 rounded-full bg-[#C1170C]" />
                  ) : null}
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
          className="mb-2 block text-sm font-bold text-[#33475f]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <MapPin
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#11418D]"
          aria-hidden
        />
        <select
          id={id}
          value={value ?? ""}
          disabled={isDisabled}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-[46px] w-full appearance-none rounded-[10px] border border-[#DCE3EC] bg-white py-3 pl-10 pr-10 text-[0.9375rem] font-semibold text-[#15366A] shadow-sm outline-none transition-colors hover:border-[#11418D]/40 focus:border-[#11418D] focus:ring-[3px] focus:ring-[#11418D]/15 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 sm:min-w-[220px]"
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
