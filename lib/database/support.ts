import { supabase } from "@/lib/supabase/client";
import type { SupportSettingsRow } from "@/lib/database/schema";

const SUPPORT_SETTINGS_COLUMNS =
  "id, phone, email, whatsapp, office_address, support_timings, created_at, updated_at";

export const DEFAULT_SUPPORT_SETTINGS = {
  phone: "+91 88888 88888",
  email: "support@extranet.in",
  whatsapp: "+91 90000 90000",
  office_address: "Connaught Place, New Delhi, India - 110001",
  support_timings: "Mon-Sat, 9:00 AM - 8:00 PM",
};

export type SupportSettingsPayload = Partial<
  Pick<
    SupportSettingsRow,
    "phone" | "email" | "whatsapp" | "office_address" | "support_timings"
  >
>;

export async function getSupportSettings(): Promise<{
  data: SupportSettingsRow | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from("support_settings")
    .select(SUPPORT_SETTINGS_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return {
    data: (data as SupportSettingsRow | null) ?? null,
    error: error ? new Error(error.message) : null,
  };
}

export async function saveSupportSettings(
  payload: SupportSettingsPayload,
): Promise<{ data: SupportSettingsRow | null; error: Error | null }> {
  const { data: existing, error: fetchError } = await supabase
    .from("support_settings")
    .select("id")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    return { data: null, error: new Error(fetchError.message) };
  }

  if (existing?.id) {
    const { data, error } = await supabase
      .from("support_settings")
      .update(payload)
      .eq("id", existing.id)
      .select(SUPPORT_SETTINGS_COLUMNS)
      .single();

    return {
      data: (data as SupportSettingsRow | null) ?? null,
      error: error ? new Error(error.message) : null,
    };
  }

  const { data, error } = await supabase
    .from("support_settings")
    .insert(payload)
    .select(SUPPORT_SETTINGS_COLUMNS)
    .single();

  return {
    data: (data as SupportSettingsRow | null) ?? null,
    error: error ? new Error(error.message) : null,
  };
}
