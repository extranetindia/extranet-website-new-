"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CITY_CHANGE_EVENT,
  SELECTED_CITY_STORAGE_KEY,
} from "@/lib/constants/city-storage";
import { fetchCities } from "@/lib/database/plan-pricing";
import type { CityRow } from "@/lib/database/schema";

interface UseSelectedCityResult {
  cities: CityRow[];
  cityId: string | null;
  selectedCity: CityRow | null;
  setCityId: (id: string) => void;
  loading: boolean;
  ready: boolean;
}

function readStoredCityId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SELECTED_CITY_STORAGE_KEY);
}

function writeStoredCityId(id: string) {
  localStorage.setItem(SELECTED_CITY_STORAGE_KEY, id);
}

export function useSelectedCity(): UseSelectedCityResult {
  const [cities, setCities] = useState<CityRow[]>([]);
  const [cityId, setCityIdState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const { data, error } = await fetchCities({ activeOnly: true });

      if (cancelled) return;

      if (error || data.length === 0) {
        setCities([]);
        setCityIdState(null);
        setLoading(false);
        setReady(true);
        return;
      }

      setCities(data);

      const stored = readStoredCityId();
      const validStored = stored && data.some((city) => city.id === stored);
      const initialId = validStored ? stored! : data[0].id;

      setCityIdState(initialId);
      if (!validStored) {
        writeStoredCityId(initialId);
      }

      setLoading(false);
      setReady(true);
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onCityChange = (event: Event) => {
      const custom = event as CustomEvent<string>;
      if (custom.detail) {
        setCityIdState(custom.detail);
      }
    };

    window.addEventListener(CITY_CHANGE_EVENT, onCityChange);
    return () => window.removeEventListener(CITY_CHANGE_EVENT, onCityChange);
  }, []);

  const setCityId = useCallback((id: string) => {
    setCityIdState(id);
    writeStoredCityId(id);
    window.dispatchEvent(new CustomEvent(CITY_CHANGE_EVENT, { detail: id }));
  }, []);

  const selectedCity = cities.find((city) => city.id === cityId) ?? null;

  return {
    cities,
    cityId,
    selectedCity,
    setCityId,
    loading,
    ready,
  };
}
