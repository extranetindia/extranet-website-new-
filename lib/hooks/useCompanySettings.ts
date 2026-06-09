"use client";

import { useEffect, useState } from "react";
import type { SettingsRow } from "@/lib/database/schema";
import { getSettings, DEFAULT_SETTINGS } from "@/lib/database/settings";

interface UseCompanySettingsResult {
  settings: SettingsRow | null;
  loading: boolean;
  error: Error | null;
}

// Module-level cache to avoid multiple requests
let cachedSettings: SettingsRow | null = null;
let cachedError: Error | null = null;
let cachePromise: Promise<{ data: SettingsRow | null; error: Error | null }> | null = null;

export function useCompanySettings(): UseCompanySettingsResult {
  const [settings, setSettings] = useState<SettingsRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadSettings = async () => {
      setLoading(true);

      try {
        // Use cached promise if in-flight
        if (cachePromise) {
          const result = await cachePromise;
          if (!cancelled) {
            if (result.error) {
              setSettings(null);
              setError(result.error);
            } else {
              setSettings(result.data);
              setError(null);
            }
            setLoading(false);
          }
          return;
        }

        // If already cached, use it
        if (cachedSettings !== null || cachedError !== null) {
          if (!cancelled) {
            setSettings(cachedSettings);
            setError(cachedError);
            setLoading(false);
          }
          return;
        }

        // Fetch fresh data
        cachePromise = getSettings();
        const result = await cachePromise;
        cachePromise = null;

        if (!cancelled) {
          if (result.error) {
            cachedError = result.error;
            setSettings(null);
            setError(result.error);
          } else {
            cachedSettings = result.data;
            cachedError = null;
            setSettings(result.data);
            setError(null);
          }
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          cachedError = error;
          setSettings(null);
          setError(error);
          setLoading(false);
        }
      }
    };

    void loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  // Provide fallback values if no settings loaded
  const settingsWithDefaults = settings || (DEFAULT_SETTINGS as SettingsRow);

  return {
    settings: settingsWithDefaults,
    loading,
    error,
  };
}

// Helper function to get settings synchronously from cache (after first load)
export function getCachedSettings(): SettingsRow | null {
  return cachedSettings;
}

// Helper function to invalidate cache
export function invalidateSettingsCache(): void {
  cachedSettings = null;
  cachedError = null;
  cachePromise = null;
}
