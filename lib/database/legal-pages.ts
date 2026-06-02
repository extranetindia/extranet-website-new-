import { supabase } from "@/lib/supabase/client";
import type { LegalPageRow } from "@/lib/database/schema";

const LEGAL_PAGE_COLUMNS =
  "id, slug, title, content, last_updated, created_at, updated_at";

export async function fetchLegalPages(): Promise<{
  data: LegalPageRow[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from("legal_pages")
    .select(LEGAL_PAGE_COLUMNS)
    .order("slug", { ascending: true });

  return {
    data: (data as LegalPageRow[] | null) ?? null,
    error: error ? new Error(error.message) : null,
  };
}

export async function fetchLegalPageBySlug(
  slug: string,
): Promise<{ data: LegalPageRow | null; error: Error | null }> {
  const { data, error } = await supabase
    .from("legal_pages")
    .select(LEGAL_PAGE_COLUMNS)
    .eq("slug", slug)
    .single();

  return {
    data: (data as LegalPageRow | null) ?? null,
    error: error ? new Error(error.message) : null,
  };
}

export type LegalPageSavePayload = Pick<
  LegalPageRow,
  "slug" | "title" | "content" | "last_updated"
>;

export async function saveLegalPage(
  payload: LegalPageSavePayload,
): Promise<{ data: LegalPageRow | null; error: Error | null }> {
  const { data, error } = await supabase
    .from("legal_pages")
    .upsert(payload, { onConflict: "slug" })
    .select(LEGAL_PAGE_COLUMNS)
    .single();

  return {
    data: (data as LegalPageRow | null) ?? null,
    error: error ? new Error(error.message) : null,
  };
}
