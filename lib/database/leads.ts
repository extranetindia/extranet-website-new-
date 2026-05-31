import { supabase } from "@/lib/supabase/client";

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "closed",
  "spam",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const INQUIRY_TYPES = [
  "New connection — Home",
  "New connection — Business",
  "Enterprise / Leased line",
  "General inquiry",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export interface LeadRow {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  inquiry_type: string;
  message: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface LeadInsert {
  full_name: string;
  phone: string;
  email?: string | null;
  inquiry_type: string;
  message?: string | null;
}

export type LeadUpdate = Partial<
  Pick<LeadRow, "full_name" | "phone" | "email" | "inquiry_type" | "message" | "status">
>;

const LEAD_COLUMNS =
  "id, full_name, phone, email, inquiry_type, message, status, created_at, updated_at";

export async function createLead(
  payload: LeadInsert,
): Promise<{ data: LeadRow | null; error: Error | null }> {
  const { data, error } = await supabase
    .from("leads")
    .insert({
      full_name: payload.full_name.trim(),
      phone: payload.phone.trim(),
      email: payload.email?.trim() || null,
      inquiry_type: payload.inquiry_type.trim(),
      message: payload.message?.trim() || null,
    })
    .select(LEAD_COLUMNS)
    .single();

  return {
    data: (data as LeadRow | null) ?? null,
    error: error ? new Error(error.message) : null,
  };
}

export async function getLeads(): Promise<{
  data: LeadRow[];
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from("leads")
    .select(LEAD_COLUMNS)
    .order("created_at", { ascending: false });

  return {
    data: (data ?? []) as LeadRow[],
    error: error ? new Error(error.message) : null,
  };
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<{ error: Error | null }> {
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id);

  return {
    error: error ? new Error(error.message) : null,
  };
}

export async function deleteLead(id: string): Promise<{ error: Error | null }> {
  const { error } = await supabase.from("leads").delete().eq("id", id);

  return {
    error: error ? new Error(error.message) : null,
  };
}

export function formatLeadDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function formatLeadStatus(status: LeadStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ");
}
