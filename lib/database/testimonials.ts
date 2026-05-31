import { supabase } from "@/lib/supabase/client";

const TESTIMONIAL_COLUMNS =
  "id, name, city, rating, review, image_url, active, created_at, updated_at";

export interface TestimonialRow {
  id: string;
  name: string;
  city: string | null;
  rating: number;
  review: string;
  image_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestimonialInsert {
  name: string;
  city?: string | null;
  rating: number;
  review: string;
  image_url?: string | null;
  active?: boolean;
}

export type TestimonialUpdate = Partial<
  Pick<
    TestimonialRow,
    "name" | "city" | "rating" | "review" | "image_url" | "active"
  >
>;

function clampRating(rating: number): number {
  return Math.min(5, Math.max(1, Math.round(rating)));
}

function normalizeInsert(payload: TestimonialInsert) {
  return {
    name: payload.name.trim(),
    city: payload.city?.trim() || null,
    rating: clampRating(payload.rating),
    review: payload.review.trim(),
    image_url: payload.image_url?.trim() || null,
    active: payload.active ?? true,
  };
}

function normalizeUpdate(payload: TestimonialUpdate) {
  const update: Record<string, unknown> = {};

  if (payload.name !== undefined) {
    update.name = payload.name.trim();
  }
  if (payload.city !== undefined) {
    update.city = payload.city?.trim() || null;
  }
  if (payload.rating !== undefined) {
    update.rating = clampRating(payload.rating);
  }
  if (payload.review !== undefined) {
    update.review = payload.review.trim();
  }
  if (payload.image_url !== undefined) {
    update.image_url = payload.image_url?.trim() || null;
  }
  if (payload.active !== undefined) {
    update.active = payload.active;
  }

  return update;
}

export async function getTestimonials(): Promise<{
  data: TestimonialRow[];
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from("testimonials")
    .select(TESTIMONIAL_COLUMNS)
    .order("created_at", { ascending: false });

  return {
    data: (data ?? []) as TestimonialRow[],
    error: error ? new Error(error.message) : null,
  };
}

export async function getActiveTestimonials(): Promise<{
  data: TestimonialRow[];
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from("testimonials")
    .select(TESTIMONIAL_COLUMNS)
    .eq("active", true)
    .order("created_at", { ascending: false });

  return {
    data: (data ?? []) as TestimonialRow[],
    error: error ? new Error(error.message) : null,
  };
}

export async function createTestimonial(
  payload: TestimonialInsert,
): Promise<{ data: TestimonialRow | null; error: Error | null }> {
  const { data, error } = await supabase
    .from("testimonials")
    .insert(normalizeInsert(payload))
    .select(TESTIMONIAL_COLUMNS)
    .single();

  return {
    data: (data as TestimonialRow | null) ?? null,
    error: error ? new Error(error.message) : null,
  };
}

export async function updateTestimonial(
  id: string,
  payload: TestimonialUpdate,
): Promise<{ data: TestimonialRow | null; error: Error | null }> {
  const update = normalizeUpdate(payload);

  if (Object.keys(update).length === 0) {
    return { data: null, error: new Error("No fields to update") };
  }

  const { data, error } = await supabase
    .from("testimonials")
    .update(update)
    .eq("id", id)
    .select(TESTIMONIAL_COLUMNS)
    .single();

  return {
    data: (data as TestimonialRow | null) ?? null,
    error: error ? new Error(error.message) : null,
  };
}

export async function deleteTestimonial(
  id: string,
): Promise<{ error: Error | null }> {
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  return {
    error: error ? new Error(error.message) : null,
  };
}

export function getTestimonialInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
  }
  return (parts[0]?.charAt(0) ?? "?").toUpperCase();
}
