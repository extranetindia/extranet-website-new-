"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { CoverageCity } from "@/lib/admin/mock-data";
import { initialCoverageCities } from "@/lib/admin/mock-data";

export default function AdminCoveragePage() {
  const [cities, setCities] = useState(initialCoverageCities);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<CoverageCity>({
    id: "",
    name: "",
    state: "",
    active: true,
  });

  const startAdd = () => {
    setEditingId(null);
    setDraft({ id: `city-${Date.now()}`, name: "", state: "", active: true });
    setOpen(true);
  };

  const startEdit = (city: CoverageCity) => {
    setEditingId(city.id);
    setDraft(city);
    setOpen(true);
  };

  const saveCity = () => {
    setCities((previous) =>
      editingId
        ? previous.map((city) => (city.id === editingId ? draft : city))
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
              Coverage Management
            </h2>
            <p className="text-sm text-slate-500">
              Manage serviceable cities and active coverage status.
            </p>
          </div>
          <button
            type="button"
            onClick={startAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <Plus size={16} />
            Add City
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-slate-200 text-left text-slate-500">
              <tr>
                <th className="px-3 py-2 font-medium">City</th>
                <th className="px-3 py-2 font-medium">State</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <tr key={city.id} className="border-b border-slate-100">
                  <td className="px-3 py-3 font-medium text-slate-900">{city.name}</td>
                  <td className="px-3 py-3 text-slate-700">{city.state}</td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        setCities((previous) =>
                          previous.map((item) =>
                            item.id === city.id
                              ? { ...item, active: !item.active }
                              : item,
                          ),
                        )
                      }
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        city.active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {city.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(city)}
                        className="rounded-lg border border-slate-200 p-1.5 text-slate-600 transition hover:bg-slate-100"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setCities((previous) =>
                            previous.filter((item) => item.id !== city.id),
                          )
                        }
                        className="rounded-lg border border-red-200 p-1.5 text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                {editingId ? "Edit Coverage City" : "Add Coverage City"}
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
                  City Name
                </span>
                <input
                  value={draft.name}
                  onChange={(event) =>
                    setDraft((previous) => ({ ...previous, name: event.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  State
                </span>
                <input
                  value={draft.state}
                  onChange={(event) =>
                    setDraft((previous) => ({ ...previous, state: event.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={draft.active}
                  onChange={(event) =>
                    setDraft((previous) => ({ ...previous, active: event.target.checked }))
                  }
                />
                <span className="text-sm font-medium text-slate-700">Active city</span>
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
                onClick={saveCity}
                className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Save City
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
