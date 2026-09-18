"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";
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
  coverage_type: "both",
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
      coverage_type: city.coverage_type,
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

  const removeCity = async (city: CityRow) => {
    if (!window.confirm(`Delete "${city.name}"? Plans priced for this city will fall back to default pricing. This cannot be undone.`)) {
      return;
    }
    const { error } = await deleteCity(city.id);
    if (error) {
      console.error("Failed to delete city:", error);
      return;
    }
    setCities((previous) => previous.filter((item) => item.id !== city.id));
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
      <section className="tele-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[#15366A]">
              Coverage Management
            </h2>
            <p className="text-sm hover:text-[#11418D]">
              Manage coverage cities, status, and the order of service regions.
            </p>
          </div>
          <button
            type="button"
            onClick={startAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-[#11418D] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0e3675] hover:shadow-lg hover:shadow-blue-900/20"
          >
            <Plus size={16} />
            Add City
          </button>
        </div>

        <div className="relative mt-4">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8ba0bb]" aria-hidden />
          <label htmlFor="coverage-search" className="sr-only">
            Search cities
          </label>
          <input
            id="coverage-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Search ${cities.length} ${cities.length === 1 ? "city" : "cities"}…`}
            className="w-full rounded-xl border border-[#DCE3EC] bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition-all placeholder:text-[#8ba0bb] focus:border-[#11418D] sm:max-w-xs"
          />
        </div>

<div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-[#DCE3EC] text-left hover:text-[#11418D]">
                <tr>
                  <th className="px-3 py-2 font-medium">City</th>
                  <th className="px-3 py-2 font-medium">Coverage Type</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
              {loading ? (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center hover:text-[#11418D]">
                      Loading cities...
                    </td>
                  </tr>
                ) : sortedCities.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center hover:text-[#11418D]">
                      No cities found.
                    </td>
                  </tr>
                ) : (
                  sortedCities.map((city) => (
                    <tr key={city.id} className="border-b border-[#EDF1F6]">
                      <td className="px-3 py-3 font-medium text-[#15366A]">{city.name}</td>
                      <td className="px-3 py-3 text-sm">
                        <span className="rounded-full bg-[#11418D]/10 px-2.5 py-1 text-xs font-semibold capitalize text-[#11418D]">
                          {city.coverage_type}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() => void toggleActive(city)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            city.active
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-[#F4F7FC] hover:text-[#11418D]"
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
                            className="rounded-lg border border-[#DCE3EC] p-1.5 text-[#5C6F89] transition-all duration-200 ease-in-out hover:border-[#11418D]/30 hover:bg-[#F4F7FC] hover:text-[#11418D]"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => void removeCity(city)}
                            aria-label={`Delete ${city.name}`}
                            className="rounded-lg border border-red-200 p-1.5 text-red-600 transition-all duration-200 ease-in-out hover:border-[#C1170C]/40 hover:bg-red-50 hover:text-[#a9140b]"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E2B57]/50 p-4">
          <div className="w-full max-w-lg rounded-xl border border-[#DCE3EC] bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#15366A]">
                {editingId ? "Edit City" : "Add City"}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 transition-all duration-200 ease-in-out hover:bg-[#F4F7FC] hover:text-[#11418D]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-[#475569]">
                  City Name
                </span>
                <input
                  value={draft.name}
                  onChange={(event) =>
                    setDraft((previous) => ({ ...previous, name: event.target.value }))
                  }
                  className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-[#475569]">
                  Coverage Type
                </span>
                <select
                  value={draft.coverage_type}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      coverage_type: event.target.value as "home" | "business" | "both",
                    }))
                  }
                  className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
                >
                  <option value="both">Both (Home & Business)</option>
                  <option value="home">Home Plans Only</option>
                  <option value="business">Business Plans Only</option>
                </select>
              </label>
              <label className="flex items-center gap-3 text-sm font-medium text-[#475569]">
                <input
                  type="checkbox"
                  checked={draft.active}
                  onChange={(event) =>
                    setDraft((previous) => ({ ...previous, active: event.target.checked }))
                  }
                  className="h-4 w-4 rounded border-[#DCE3EC] accent-[#11418D]"
                />
                Active
              </label>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[#DCE3EC] bg-[#F8F9FB] px-4 py-2 text-sm font-medium text-[#475569] transition-all duration-200 ease-in-out hover:border-[#11418D]/30 hover:bg-[#F4F7FC] hover:text-[#11418D]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCity}
                className="rounded-xl bg-[#11418D] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0e3675] hover:shadow-lg hover:shadow-blue-900/20"
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
