import { supabase } from "@/lib/supabase/client";
import type { SettingsRow, SettingsUpdate } from "@/lib/database/schema";

const SETTINGS_COLUMNS =
  "id, company_name, company_address, company_phone, company_email, support_email, gst_number, website_url, logo_url, created_at, updated_at";

export const DEFAULT_SETTINGS: Partial<SettingsRow> = {
  company_name: "Extranet",
  company_address: "Bangalore, India",
  company_phone: "+91-80-XXXX-XXXX",
  company_email: "info@extranet.in",
  support_email: "support@extranet.in",
  gst_number: "29AABCE0000Z1",
  website_url: "https://extranet.in",
};

export async function getSettings(): Promise<{
  data: SettingsRow | null;
  error: Error | null;
}> {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select(SETTINGS_COLUMNS)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return {
      data: (data as SettingsRow | null) ?? null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
}

export async function saveSettings(
  payload: SettingsUpdate,
): Promise<{ data: SettingsRow | null; error: Error | null }> {
  try {
    // Get existing settings
    const { data: existing, error: fetchError } = await supabase
      .from("settings")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      return { data: null, error: new Error(fetchError.message) };
    }

    if (existing?.id) {
      // Update existing settings
      const { data, error } = await supabase
        .from("settings")
        .update({
          ...payload,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select(SETTINGS_COLUMNS)
        .single();

      if (error) {
        return { data: null, error: new Error(error.message) };
      }

      return {
        data: (data as SettingsRow) ?? null,
        error: null,
      };
    }

    // Create new settings if none exist
    const { data, error } = await supabase
      .from("settings")
      .insert([
        {
          ...payload,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select(SETTINGS_COLUMNS)
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return {
      data: (data as SettingsRow) ?? null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
}
