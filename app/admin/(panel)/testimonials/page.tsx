"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import type { AdminTestimonial } from "@/lib/admin/mock-data";
import { initialTestimonials } from "@/lib/admin/mock-data";

const defaultDraft: AdminTestimonial = {
  id: "",
  customerName: "",
  companyName: "",
  rating: 5,
  testimonial: "",
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState(initialTestimonials);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<AdminTestimonial>(defaultDraft);

  const startAdd = () => {
    setEditingId(null);
    setDraft({ ...defaultDraft, id: `test-${Date.now()}` });
    setOpen(true);
  };

  const startEdit = (item: AdminTestimonial) => {
    setEditingId(item.id);
    setDraft(item);
    setOpen(true);
  };

  const save = () => {
    setItems((previous) =>
      editingId
        ? previous.map((item) => (item.id === editingId ? draft : item))
        : [...previous, draft],
    );
    setOpen(false);
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
              Manage approved customer testimonials shown on the website.
            </p>
          </div>
          <button
            type="button"
            onClick={startAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <Plus size={16} />
            Add Testimonial
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{item.customerName}</h3>
                  <p className="text-xs text-slate-500">{item.companyName}</p>
                </div>
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-700">{item.testimonial}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition hover:bg-slate-100"
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setItems((previous) =>
                      previous.filter((existing) => existing.id !== item.id),
                    )
                  }
                  className="rounded-lg border border-red-200 bg-white p-1.5 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
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
                  Customer Name
                </span>
                <input
                  value={draft.customerName}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      customerName: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Company Name
                </span>
                <input
                  value={draft.companyName}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      companyName: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Rating
                </span>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={draft.rating}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      rating: Number(event.target.value),
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Testimonial Text
                </span>
                <textarea
                  rows={4}
                  value={draft.testimonial}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      testimonial: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
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
                onClick={save}
                className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Save Testimonial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
