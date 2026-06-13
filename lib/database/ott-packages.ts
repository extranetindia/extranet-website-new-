import { supabase } from "@/lib/supabase/client";
import type { OttPackageRow, OttPackageInsert, OttPackageUpdate } from "@/lib/database/schema";

export type { OttPackageRow, OttPackageInsert, OttPackageUpdate };

const OTT_PACKAGES_COLUMNS =
  "id, name, description, apps, display_order, is_active, created_at, updated_at";

export async function getOttPackages(): Promise<{
  data: OttPackageRow[] | null;
  error: Error | null;
}> {
  try {
    const { data, error } = await supabase
      .from("ott_packages")
      .select(OTT_PACKAGES_COLUMNS)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return {
      data: (data as OttPackageRow[]) ?? [],
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
}

export async function getOttPackageById(id: string): Promise<{
  data: OttPackageRow | null;
  error: Error | null;
}> {
  try {
    const { data, error } = await supabase
      .from("ott_packages")
      .select(OTT_PACKAGES_COLUMNS)
      .eq("id", id)
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return {
      data: (data as OttPackageRow) ?? null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
}

export async function createOttPackage(
  payload: OttPackageInsert,
): Promise<{ data: OttPackageRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("ott_packages")
      .insert([payload])
      .select(OTT_PACKAGES_COLUMNS)
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return {
      data: (data as OttPackageRow) ?? null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
}

export async function updateOttPackage(
  id: string,
  payload: OttPackageUpdate,
): Promise<{ data: OttPackageRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("ott_packages")
      .update(payload)
      .eq("id", id)
      .select(OTT_PACKAGES_COLUMNS)
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return {
      data: (data as OttPackageRow) ?? null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
}

export async function deleteOttPackage(id: string): Promise<{
  data: null;
  error: Error | null;
}> {
  try {
    const { error } = await supabase
      .from("ott_packages")
      .delete()
      .eq("id", id);

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
}

export async function reorderOttPackages(
  reorderData: Array<{ id: string; display_order: number }>,
): Promise<{ data: null; error: Error | null }> {
  try {
    const updates = reorderData.map((item) =>
      supabase
        .from("ott_packages")
        .update({ display_order: item.display_order })
        .eq("id", item.id),
    );

    const results = await Promise.all(updates);

    const hasError = results.some((result) => result.error);
    if (hasError) {
      const firstError = results.find((r) => r.error)?.error;
      return { data: null, error: new Error(firstError?.message ?? "Reorder failed") };
    }

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
}

/**
 * Fetch multiple OTT packages by their IDs.
 * Used on the frontend to load package data for plans that have ott_package_id set.
 */
export async function getOttPackagesByIds(
  ids: string[],
): Promise<{ data: OttPackageRow[] | null; error: Error | null }> {
  if (!ids || ids.length === 0) {
    return { data: [], error: null };
  }

  try {
    const { data, error } = await supabase
      .from("ott_packages")
      .select(OTT_PACKAGES_COLUMNS)
      .in("id", ids)
      .order("display_order", { ascending: true });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return {
      data: (data as OttPackageRow[]) ?? [],
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
}
