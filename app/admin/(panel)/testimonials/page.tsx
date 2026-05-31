"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
  updateTestimonial,
  type TestimonialInsert,
  type TestimonialRow,
} from "@/lib/database/testimonials";

interface TestimonialDraft {
  name: string;
  city: string;
  rating: number;
  review: string;
  image_url: string;
  active: boolean;
}

const defaultDraft: TestimonialDraft = {
  name: "",
  city: "",
  rating: 5,
  review: "",
  image_url: "",
  active: true,
};

function rowToDraft(row: TestimonialRow): TestimonialDraft {
  return {
    name: row.name,
    city: row.city ?? "",
    rating: row.rating,
    review: row.review,
    image_url: row.image_url ?? "",
    active: row.active,
  };
}

function draftToInsert(draft: TestimonialDraft): TestimonialInsert {
  return {
    name: draft.name,
    city: draft.city || null,
    rating: draft.rating,
    review: draft.review,
    image_url: draft.image_url || null,
    active: draft.active,
  };
}

function RatingSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className="rounded-lg p-1 transition hover:bg-amber-50"
          aria-label={`${rating} star${rating === 1 ? "" : "s"}`}
        >
          <Star
            size={22}
            className={
              rating <= value
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<TestimonialDraft>(defaultDraft);

  const fetchItems = useCallback(async () => {
    setError(null);
    const { data, error: fetchError } = await getTestimonials();

    if (fetchError) {
      setError(fetchError.message);
      setItems([]);
      return;
    }

    setItems(data);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchItems();
      setLoading(false);
    };
    void load();
  }, [fetchItems]);

  const startAdd = () => {
    setEditingId(null);
    setDraft(defaultDraft);
    setOpen(true);
  };

  const startEdit = (item: TestimonialRow) => {
    setEditingId(item.id);
    setDraft(rowToDraft(item));
    setOpen(true);
  };

  const handleSave = async () => {
    if (!draft.name.trim() || !draft.review.trim()) {
      setError("Name and review are required.");
      return;
    }

    setSaving(true);
    setError(null);

    if (editingId) {
      const { data, error: updateError } = await updateTestimonial(
        editingId,
        draftToInsert(draft),
      );

      if (updateError || !data) {
        setError(updateError?.message ?? "Failed to update testimonial.");
        setSaving(false);
        return;
      }

      setItems((previous) =>
        previous.map((item) => (item.id === editingId ? data : item)),
      );
    } else {
      const { data, error: createError } = await createTestimonial(
        draftToInsert(draft),
      );

      if (createError || !data) {
        setError(createError?.message ?? "Failed to create testimonial.");
        setSaving(false);
        return;
      }

      setItems((previous) => [data, ...previous]);
    }

    setSaving(false);
    setOpen(false);
  };

  const handleToggleActive = async (item: TestimonialRow) => {
    setTogglingId(item.id);
    setError(null);

    const { data, error: updateError } = await updateTestimonial(item.id, {
      active: !item.active,
    });

    if (updateError || !data) {
      setError(updateError?.message ?? "Failed to update status.");
      setTogglingId(null);
      return;
    }

    setItems((previous) =>
      previous.map((row) => (row.id === item.id ? data : row)),
    );
    setTogglingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this testimonial? This cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    setError(null);

    const { error: deleteError } = await deleteTestimonial(id);

    if (deleteError) {
      setError(deleteError.message);
      setDeletingId(null);
      return;
    }

    setItems((previous) => previous.filter((item) => item.id !== id));
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Testimonials Management
            </h2>
            <p className="text-sm text-slate-500">
              Manage customer testimonials shown on the homepage.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!loading && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {items.length} total · {items.filter((i) => i.active).length}{" "}
                active
              </span>
            )}
            <button
              type="button"
              onClick={startAdd}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
            >
              <Plus size={16} />
              Add Testimonial
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {loading ? (
          <div className="mt-5 grid animate-pulse gap-4 lg:grid-cols-2">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 rounded-xl border border-slate-200 bg-slate-50"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            No testimonials yet. Add your first customer story to show on the
            homepage.
          </p>
        ) : (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.id}
                className={`rounded-xl border p-4 ${
                  item.active
                    ? "border-slate-200 bg-slate-50"
                    : "border-slate-200 bg-white opacity-75"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{item.name}</h3>
                      {!item.active && (
                        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                          Inactive
                        </span>
                      )}
                    </div>
                    {item.city && (
                      <p className="text-xs text-slate-500">{item.city}</p>
                    )}
                  </div>
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <Star key={index} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-slate-700">
                  {item.review}
                </p>
                {item.image_url && (
                  <p className="mt-2 truncate text-xs text-slate-400">
                    {item.image_url}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={togglingId === item.id}
                    onClick={() => void handleToggleActive(item)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                      item.active
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                    } disabled:opacity-60`}
                  >
                    {togglingId === item.id
                      ? "Updating…"
                      : item.active
                        ? "Active"
                        : "Inactive"}
                  </button>
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition hover:bg-slate-100"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    disabled={deletingId === item.id}
                    onClick={() => void handleDelete(item.id)}
                    className="rounded-lg border border-red-200 bg-white p-1.5 text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Name
                </span>
                <input
                  value={draft.name}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  City
                </span>
                <input
                  value={draft.city}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      city: event.target.value,
                    }))
                  }
                  placeholder="Optional"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </label>
              <div>
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Rating
                </span>
                <RatingSelector
                  value={draft.rating}
                  onChange={(rating) =>
                    setDraft((previous) => ({ ...previous, rating }))
                  }
                />
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Review
                </span>
                <textarea
                  rows={4}
                  value={draft.review}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      review: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Image URL
                </span>
                <input
                  value={draft.image_url}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      image_url: event.target.value,
                    }))
                  }
                  placeholder="Optional — profile photo URL"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={draft.active}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      active: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  Active (visible on homepage)
                </span>
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={saving}
                className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save Testimonial"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
