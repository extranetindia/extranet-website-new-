"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { CityRow } from "@/lib/database/schema";
import {
  createCity,
  deleteCity,
  fetchCities,
  updateCity,
} from "@/lib/database/plan-pricing";

const defaultCity: Omit<CityRow, "id" | "created_at"> = {
  name: "",
  active: true,
};

export default function AdminCoveragePage() {
  const [cities, setCities] = useState<CityRow[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<CityRow, "id" | "created_at">>(
    defaultCity,
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCities = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchCities();

    if (error) {
      console.error("Failed to load cities:", error);
      setCities([]);
      setLoading(false);
      return;
    }

    setCities(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadCities();
  }, [loadCities]);

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [cities, search]);

  const sortedCities = useMemo(() => {
    return [...filteredCities].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredCities]);

  const startAdd = () => {
    setEditingId(null);
    setDraft({ ...defaultCity });
    setOpen(true);
  };

  const startEdit = (city: CityRow) => {
    setEditingId(city.id);
    setDraft({
      name: city.name,
      active: city.active,
    });
    setOpen(true);
  };

  const saveCity = async () => {
    const payload = draft;

    if (editingId) {
      const { data, error } = await updateCity(editingId, payload);
      if (error) {
        console.error("Failed to update city:", error);
        return;
      }
      setCities((previous) =>
        previous.map((city) => (city.id === editingId ? data ?? city : city)),
      );
    } else {
      const { data, error } = await createCity(payload);
      if (error) {
        console.error("Failed to create city:", error);
        return;
      }
      if (data) {
        setCities((previous) => [...previous, data]);
      }
    }

    setOpen(false);
  };

  const removeCity = async (id: string) => {
    const { error } = await deleteCity(id);
    if (error) {
      console.error("Failed to delete city:", error);
      return;
    }
    setCities((previous) => previous.filter((city) => city.id !== id));
  };

  const toggleActive = async (city: CityRow) => {
    const { data, error } = await updateCity(city.id, {
      active: !city.active,
    });
    if (error) {
      console.error("Failed to toggle active state:", error);
      return;
    }
    setCities((previous) =>
      previous.map((item) => (item.id === city.id ? data ?? item : item)),
    );
  };


  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Coverage Management
            </h2>
            <p className="text-sm hover:text-[#134799]">
              Manage coverage cities, status, and the order of service regions.
            </p>
          </div>
          <button
            type="button"
            onClick={startAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-[#134799] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0f3b7f] hover:shadow-lg hover:shadow-blue-900/20"
          >
            <Plus size={16} />
            Add City
          </button>
        </div>

<div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-slate-200 text-left hover:text-[#134799]">
                <tr>
                  <th className="px-3 py-2 font-medium">City</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-3 py-8 text-center hover:text-[#134799]">
                      Loading cities...
                    </td>
                  </tr>
                ) : sortedCities.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-3 py-8 text-center hover:text-[#134799]">
                      No cities found.
                    </td>
                  </tr>
                ) : (
                  sortedCities.map((city) => (
                    <tr key={city.id} className="border-b border-slate-100">
                      <td className="px-3 py-3 font-medium text-slate-900">{city.name}</td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() => void toggleActive(city)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            city.active
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 hover:text-[#134799]"
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
                            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 transition-all duration-200 ease-in-out hover:border-[#134799]/30 hover:bg-slate-100 hover:text-[#134799]"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => void removeCity(city.id)}
                            className="rounded-lg border border-red-200 p-1.5 text-red-600 transition-all duration-200 ease-in-out hover:border-[#D2190D]/40 hover:bg-red-50 hover:text-[#b8160c]"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                {editingId ? "Edit City" : "Add City"}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 transition-all duration-200 ease-in-out hover:bg-slate-100 hover:text-[#134799]"
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
              <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={draft.active}
                  onChange={(event) =>
                    setDraft((previous) => ({ ...previous, active: event.target.checked }))
                  }
                  className="h-4 w-4 rounded border-slate-300 text-[#134799] focus:ring-text-[#134799]0"
                />
                Active
              </label>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 ease-in-out hover:border-[#134799]/30 hover:bg-slate-100 hover:text-[#134799]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCity}
                className="rounded-xl bg-[#134799] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0f3b7f] hover:shadow-lg hover:shadow-blue-900/20"
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
