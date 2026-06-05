"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import PlanCityPricingFields from "@/components/admin/PlanCityPricingFields";
import {
  getPlanCategoryLabel,
  normalizePlanCategory,
  PLAN_CATEGORY_VALUES,
  type PlanCategoryValue,
} from "@/lib/plans/categories";
import {
  buildCityPricingFormRows,
  fetchCities,
  fetchPlanPricingForPlan,
  savePlanCityPricing,
  type CityPricingFormRow,
} from "@/lib/database/plan-pricing";

interface PlanRow {
  id: string;
  created_at?: string;
  name: string;
  speed: string;
  price: string;
  description: string | null;
  features: string[] | string | null;
  popular: boolean;
  category: string;
  button_text: string;
  plan_type?: "wifi_only" | "wifi_ott";
}

interface AdminPlan {
  id: string;
  name: string;
  planType: PlanCategoryValue;
  speed: string;
  price: string;
  buttonText: string;
  popular: boolean;
  features: string[];
  description: string;
}

const defaultPlan: AdminPlan = {
  id: "",
  name: "",
  planType: "wifi_only",
  speed: "",
  price: "",
  buttonText: "Get Started",
  popular: false,
  features: [],
  description: "",
};

function parseFeatures(features: PlanRow["features"]): string[] {
  if (!features) return [];
  if (Array.isArray(features)) return features;
  if (typeof features === "string") {
    try {
      const parsed = JSON.parse(features) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item));
      }
    } catch {
      // fall through to comma-separated parsing
    }
    return features
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function rowToAdminPlan(row: PlanRow): AdminPlan {
  return {
    id: row.id,
    name: row.name,
    planType: normalizePlanCategory(row.plan_type),
    speed: row.speed,
    price: row.price,
    buttonText: row.button_text,
    popular: Boolean(row.popular),
    features: parseFeatures(row.features),
    description: row.description ?? "",
  };
}

function planToPayload(plan: AdminPlan, features: string[]) {
  return {
    name: plan.name,
    speed: plan.speed,
    price: plan.price,
    description: plan.description || null,
    features,
    popular: plan.popular,
    category: getPlanCategoryLabel(plan.planType),
    plan_type: normalizePlanCategory(plan.planType),
    button_text: plan.buttonText,
  };
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<AdminPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<AdminPlan>(defaultPlan);
  const [featuresInput, setFeaturesInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [cityPricingRows, setCityPricingRows] = useState<CityPricingFormRow[]>(
    [],
  );
  const [cityPricingLoading, setCityPricingLoading] = useState(false);
  const [cityPricingError, setCityPricingError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    const { data, error } = await supabase
      .from("plans")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch plans:", error);
      setPlans([]);
      return;
    }

    setPlans((data as PlanRow[]).map(rowToAdminPlan));
  }, []);

  const loadCityPricing = useCallback(async (planId: string | null) => {
    setCityPricingLoading(true);
    setCityPricingError(null);

    const { data: cities, error: citiesError } = await fetchCities();

    if (citiesError) {
      setCityPricingRows([]);
      setCityPricingError(citiesError.message);
      setCityPricingLoading(false);
      return;
    }

    if (!planId) {
      setCityPricingRows(
        cities.map((city) => ({
          cityId: city.id,
          cityName: city.name,
          pricingId: null,
          price: "",
          originalPrice: "",
        })),
      );
      setCityPricingLoading(false);
      return;
    }

    const { data: existing, error: pricingError } =
      await fetchPlanPricingForPlan(planId);

    if (pricingError) {
      setCityPricingRows(buildCityPricingFormRows(cities, []));
      setCityPricingError(pricingError.message);
      setCityPricingLoading(false);
      return;
    }

    setCityPricingRows(buildCityPricingFormRows(cities, existing));
    setCityPricingLoading(false);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchPlans();
      setLoading(false);
    };
    void load();
  }, [fetchPlans]);

  useEffect(() => {
    if (!open) return;
    void loadCityPricing(editingId);
  }, [open, editingId, loadCityPricing]);

  const sortedPlans = useMemo(
    () => [...plans].sort((a, b) => Number(b.popular) - Number(a.popular)),
    [plans],
  );

  const handleCityPricingChange = (
    cityId: string,
    field: "price" | "originalPrice",
    value: string,
  ) => {
    setCityPricingRows((previous) =>
      previous.map((row) =>
        row.cityId === cityId ? { ...row, [field]: value } : row,
      ),
    );
  };

  const openNew = () => {
    setEditingId(null);
    setDraft({ ...defaultPlan });
    setFeaturesInput("");
    setSaveError(null);
    setCityPricingError(null);
    setOpen(true);
  };

  const openEdit = (plan: AdminPlan) => {
    setEditingId(plan.id);
    setDraft(plan);
    setFeaturesInput(plan.features.join(", "));
    setSaveError(null);
    setCityPricingError(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSaveError(null);
    setCityPricingError(null);
  };

  const submitPlan = async () => {
    setSaving(true);
    setSaveError(null);
    setCityPricingError(null);

    const features = featuresInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const payload = planToPayload({ ...draft, features }, features);

    let planId = editingId;

    if (editingId) {
      const { error } = await supabase
        .from("plans")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        console.error("Failed to update plan:", error);
        setSaveError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { data: inserted, error } = await supabase
        .from("plans")
        .insert(payload)
        .select("id")
        .single();

      if (error) {
        console.error("Failed to insert plan:", error);
        setSaveError(error.message);
        setSaving(false);
        return;
      }

      planId = (inserted as { id: string }).id;
    }

    if (planId) {
      const { error: pricingSaveError } = await savePlanCityPricing(
        planId,
        cityPricingRows,
      );

      if (pricingSaveError) {
        setCityPricingError(pricingSaveError.message);
        setSaving(false);
        return;
      }
    }

    await fetchPlans();
    setSaving(false);
    closeModal();
  };

  const removePlan = async (id: string) => {
    const { error } = await supabase.from("plans").delete().eq("id", id);

    if (error) {
      console.error("Failed to delete plan:", error);
      return;
    }

    await fetchPlans();
  };

  const togglePopular = async (plan: AdminPlan) => {
    const { error } = await supabase
      .from("plans")
      .update({ popular: !plan.popular })
      .eq("id", plan.id);

    if (error) {
      console.error("Failed to update popular flag:", error);
      return;
    }

    await fetchPlans();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Plans Management</h2>
            <p className="text-sm hover:text-[#134799]">
              Add, edit, and publish WiFi plans with OTT bundle options.
            </p>
          </div>
          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-xl bg-[#134799] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0f3b7f] hover:shadow-lg hover:shadow-blue-900/20"
          >
            <Plus size={16} />
            Add New Plan
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 hover:text-[#134799]">
              <tr>
                <th className="px-3 py-2 font-medium">Plan</th>
                <th className="px-3 py-2 font-medium">Plan Category</th>
                <th className="px-3 py-2 font-medium">Speed</th>
                <th className="px-3 py-2 font-medium">Pricing</th>
                <th className="px-3 py-2 font-medium">Popular</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center hover:text-[#134799]">
                    Loading plans...
                  </td>
                </tr>
              ) : sortedPlans.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center hover:text-[#134799]">
                    No plans found. Add your first plan.
                  </td>
                </tr>
              ) : (
                sortedPlans.map((plan) => (
                  <tr key={plan.id} className="border-b border-slate-100">
                    <td className="px-3 py-3 font-medium text-slate-900">{plan.name}</td>
                    <td className="px-3 py-3 text-slate-700">
                      {getPlanCategoryLabel(plan.planType)}
                    </td>
                    <td className="px-3 py-3 text-slate-700">{plan.speed}</td>
                    <td className="px-3 py-3 text-slate-700">{plan.price}</td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => void togglePopular(plan)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          plan.popular
                            ? "bg-blue-100 text-[#134799]"
                            : "bg-slate-100 hover:text-[#134799]"
                        }`}
                      >
                        {plan.popular ? "Popular" : "Not Popular"}
                      </button>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(plan)}
                          className="rounded-lg border border-slate-200 p-1.5 text-slate-600 transition-all duration-200 ease-in-out hover:border-[#134799]/30 hover:bg-slate-100 hover:text-[#134799]"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => void removePlan(plan.id)}
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
          <div className="flex max-h-[min(92dvh,900px)] w-full max-w-2xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="text-base font-semibold text-slate-900">
                {editingId ? "Edit Plan" : "Add New Plan"}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-1 transition-all duration-200 ease-in-out hover:bg-slate-100 hover:text-[#134799]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {saveError && (
                <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {saveError}
                </p>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Plan Name
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
                    Plan Category
                  </span>
                  <select
                    value={draft.planType}
                    onChange={(event) =>
                      setDraft((previous) => ({
                        ...previous,
                        planType: normalizePlanCategory(event.target.value),
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  >
                    {PLAN_CATEGORY_VALUES.map((value) => (
                      <option key={value} value={value}>
                        {getPlanCategoryLabel(value)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Speed
                  </span>
                  <input
                    value={draft.speed}
                    onChange={(event) =>
                      setDraft((previous) => ({ ...previous, speed: event.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Default Pricing (fallback)
                  </span>
                  <input
                    value={draft.price}
                    onChange={(event) =>
                      setDraft((previous) => ({ ...previous, price: event.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                  <span className="mt-1 block text-xs hover:text-[#134799]">
                    Used when no city-specific price is set.
                  </span>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Button Text
                  </span>
                  <input
                    value={draft.buttonText}
                    onChange={(event) =>
                      setDraft((previous) => ({
                        ...previous,
                        buttonText: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </label>
                <label className="mt-7 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={draft.popular}
                    onChange={(event) =>
                      setDraft((previous) => ({
                        ...previous,
                        popular: event.target.checked,
                      }))
                    }
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Mark as Popular
                  </span>
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Features (comma-separated)
                  </span>
                  <input
                    value={featuresInput}
                    onChange={(event) => setFeaturesInput(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </label>

                <PlanCityPricingFields
                  rows={cityPricingRows}
                  loading={cityPricingLoading}
                  error={cityPricingError}
                  disabled={saving}
                  fallbackPrice={draft.price}
                  onChange={handleCityPricingChange}
                />
              </div>
            </div>

            <div className="flex shrink-0 justify-end gap-2 border-t border-slate-100 px-5 py-4">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 ease-in-out hover:border-[#134799]/30 hover:bg-slate-100 hover:text-[#134799] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void submitPlan()}
                disabled={saving}
                className="rounded-xl bg-[#134799] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0f3b7f] hover:shadow-lg hover:shadow-blue-900/20 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
