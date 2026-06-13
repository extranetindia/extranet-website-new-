"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import PlanCityPricingFields from "@/components/admin/PlanCityPricingFields";
import { getOttPackages, type OttPackageRow } from "@/lib/database/ott-packages";
import {
  normalizePlanType,
  normalizeHomePlanCategory,
  PLAN_TYPE_VALUES,
  HOME_PLAN_CATEGORY_VALUES,
  PLAN_TYPE_LABELS,
  HOME_PLAN_CATEGORY_LABELS,
  type PlanTypeValue,
  type HomePlanCategoryValue,
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
  tagline?: string | null;
  setup_fee?: string | null;
  security_deposit?: string | null;
  ott_apps?: string[] | string | null;
  ott_package_id?: string | null;
  monthly_price?: string | null;
  quarterly_price?: string | null;
  half_yearly_price?: string | null;
  annual_price?: string | null;
  plan_type?: "home" | "business";
  home_plan_category?: "wifi" | "wifi_ott" | null;
}

interface AdminPlan {
  id: string;
  name: string;
  planType: PlanTypeValue;
  homePlanCategory: HomePlanCategoryValue | null;
  speed: string;
  price: string;
  buttonText: string;
  popular: boolean;
  features: string[];
  description: string;
  setupFee?: string | null;
  securityDeposit?: string | null;
  ottPackageId?: string | null;
  // Billing-cycle specific pricing
  monthlyPrice?: string | null;
  quarterlyPrice?: string | null;
  halfYearlyPrice?: string | null;
  annualPrice?: string | null;
  // Billing-cycle specific setup fees
  monthlySetupFee?: string | null;
  quarterlySetupFee?: string | null;
  halfYearlySetupFee?: string | null;
  annualSetupFee?: string | null;
  // Billing-cycle specific security deposits
  monthlySecurityDeposit?: string | null;
  quarterlySecurityDeposit?: string | null;
  halfYearlySecurityDeposit?: string | null;
  annualSecurityDeposit?: string | null;
}

const defaultPlan: AdminPlan = {
  id: "",
  name: "",
  planType: "home",
  homePlanCategory: "wifi",
  speed: "",
  price: "",
  buttonText: "Get Started",
  popular: false,
  features: [],
  description: "",
  setupFee: null,
  securityDeposit: null,
  ottPackageId: null,
  // Billing-cycle specific pricing
  monthlyPrice: null,
  quarterlyPrice: null,
  halfYearlyPrice: null,
  annualPrice: null,
  // Billing-cycle specific setup fees
  monthlySetupFee: null,
  quarterlySetupFee: null,
  halfYearlySetupFee: null,
  annualSetupFee: null,
  // Billing-cycle specific security deposits
  monthlySecurityDeposit: null,
  quarterlySecurityDeposit: null,
  halfYearlySecurityDeposit: null,
  annualSecurityDeposit: null,
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
    planType: normalizePlanType(row.plan_type),
    homePlanCategory: row.home_plan_category ? normalizeHomePlanCategory(row.home_plan_category) : null,
    speed: row.speed,
    price: row.price,
    buttonText: row.button_text,
    popular: Boolean(row.popular),
    features: parseFeatures(row.features),
    description: row.description ?? "",
    setupFee: row.setup_fee ?? null,
    securityDeposit: row.security_deposit ?? null,
    ottPackageId: row.ott_package_id ?? null,
    // Billing-cycle specific pricing
    monthlyPrice: row.monthly_price ?? null,
    quarterlyPrice: row.quarterly_price ?? null,
    halfYearlyPrice: row.half_yearly_price ?? null,
    annualPrice: row.annual_price ?? null,
    // Billing-cycle specific setup fees
    monthlySetupFee: (row as any).monthly_setup_fee ?? null,
    quarterlySetupFee: (row as any).quarterly_setup_fee ?? null,
    halfYearlySetupFee: (row as any).half_yearly_setup_fee ?? null,
    annualSetupFee: (row as any).annual_setup_fee ?? null,
    // Billing-cycle specific security deposits
    monthlySecurityDeposit: (row as any).monthly_security_deposit ?? null,
    quarterlySecurityDeposit: (row as any).quarterly_security_deposit ?? null,
    halfYearlySecurityDeposit: (row as any).half_yearly_security_deposit ?? null,
    annualSecurityDeposit: (row as any).annual_security_deposit ?? null,
  };
}

function planToPayload(plan: AdminPlan, features: string[]) {
  const payload: Record<string, unknown> = {
    name: plan.name,
    speed: plan.speed,
    price: plan.price,
    description: plan.description || null,
    features,
    popular: plan.popular,
    category: plan.planType === "business" ? "Business Internet" : "Home Plans",
    plan_type: plan.planType,
    button_text: plan.buttonText,
    setup_fee: plan.setupFee || null,
    security_deposit: plan.securityDeposit || null,
    ott_package_id: plan.ottPackageId || null,
    // Billing-cycle specific pricing
    monthly_price: plan.monthlyPrice || null,
    quarterly_price: plan.quarterlyPrice || null,
    half_yearly_price: plan.halfYearlyPrice || null,
    annual_price: plan.annualPrice || null,
    // Billing-cycle specific setup fees
    monthly_setup_fee: plan.monthlySetupFee || null,
    quarterly_setup_fee: plan.quarterlySetupFee || null,
    half_yearly_setup_fee: plan.halfYearlySetupFee || null,
    annual_setup_fee: plan.annualSetupFee || null,
    // Billing-cycle specific security deposits
    monthly_security_deposit: plan.monthlySecurityDeposit || null,
    quarterly_security_deposit: plan.quarterlySecurityDeposit || null,
    half_yearly_security_deposit: plan.halfYearlySecurityDeposit || null,
    annual_security_deposit: plan.annualSecurityDeposit || null,
  };

  if (plan.planType === "home") {
    payload.home_plan_category = plan.homePlanCategory || "wifi";
  } else {
    payload.home_plan_category = null;
  }

  return payload;
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

  const [ottPackages, setOttPackages] = useState<OttPackageRow[]>([]);

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
          monthlyPrice: "",
          quarterlyPrice: "",
          halfYearlyPrice: "",
          annualPrice: "",
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

  // Load OTT packages on mount
  useEffect(() => {
    const loadOttPackages = async () => {
      const { data } = await getOttPackages();
      if (data) {
        setOttPackages(data);
      }
    };
    void loadOttPackages();
  }, []);

  // DEBUG: Log draft state changes
  useEffect(() => {
    if (open && (draft.setupFee || draft.securityDeposit)) {
      console.log("[draft change] setupFee:", draft.setupFee, "securityDeposit:", draft.securityDeposit);
    }
  }, [draft, open]);

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
    field: "monthlyPrice" | "quarterlyPrice" | "halfYearlyPrice" | "annualPrice",
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
    console.log("[openEdit] Loaded plan for editing:", {
      id: plan.id,
      name: plan.name,
      setupFee: plan.setupFee,
      securityDeposit: plan.securityDeposit,
    });
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
    
    // DIAGNOSTIC: Log complete draft state
    console.log("[submitPlan] ========== DIAGNOSTIC START ==========");
    console.log("[submitPlan] Current draft state:");
    console.log("  - id:", draft.id);
    console.log("  - name:", draft.name);
    console.log("  - speed:", draft.speed);
    console.log("  - price:", draft.price);
    console.log("  - setupFee:", draft.setupFee, `(type: ${typeof draft.setupFee})`);
    console.log("  - securityDeposit:", draft.securityDeposit, `(type: ${typeof draft.securityDeposit})`);
    console.log("  - buttonText:", draft.buttonText);
    console.log("  - planType:", draft.planType);
    console.log("[submitPlan] Full draft object:");
    console.log(draft);
    
    const payload = planToPayload({ ...draft, features }, features);

    console.log("[submitPlan] Payload created:");
    console.log(JSON.stringify(payload, null, 2));
    console.log("[submitPlan] ========== DIAGNOSTIC END ==========");
    console.log(
      `[submitPlan] Starting submit for planId=${editingId || "NEW"}`
    );

    let planId = editingId;

    if (editingId) {
      console.log(`[submitPlan] Updating existing plan: id=${editingId}`);
      console.log("[submitPlan] Update payload fields:", {
        setup_fee: payload.setup_fee,
        security_deposit: payload.security_deposit,
      });
      const { error } = await supabase
        .from("plans")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        const errorMsg = `Failed to update plan ${editingId}: code=${error.code}, message=${error.message}, hint=${error.hint}, details=${error.details}`;
        console.error(errorMsg);
        console.error("Full error object:", JSON.stringify(error, null, 2));
        setSaveError(errorMsg);
        setSaving(false);
        return;
      }
      console.log(`[submitPlan] Plan updated successfully: id=${editingId}`);
      
      // Verify update by fetching the updated record
      const { data: updated, error: fetchError } = await supabase
        .from("plans")
        .select("id, name, setup_fee, security_deposit")
        .eq("id", editingId)
        .single();
      
      if (!fetchError && updated) {
        console.log("[submitPlan] Verification - updated record:", updated);
      }
    } else {
      console.log(`[submitPlan] Inserting new plan`);
      console.log("[submitPlan] Insert payload fields:", {
        setup_fee: payload.setup_fee,
        security_deposit: payload.security_deposit,
      });
      const { data: inserted, error } = await supabase
        .from("plans")
        .insert(payload)
        .select("id")
        .single();

      if (error) {
        const errorMsg = `Failed to insert plan: code=${error.code}, message=${error.message}, hint=${error.hint}, details=${error.details}`;
        console.error(errorMsg);
        console.error("Full error object:", JSON.stringify(error, null, 2));
        setSaveError(errorMsg);
        setSaving(false);
        return;
      }

      planId = (inserted as { id: string }).id;
      console.log(`[submitPlan] Plan inserted successfully: id=${planId}`);
      
      // Verify insert by fetching the inserted record
      const { data: verifyInsert, error: fetchError } = await supabase
        .from("plans")
        .select("id, name, setup_fee, security_deposit")
        .eq("id", planId)
        .single();
      
      if (!fetchError && verifyInsert) {
        console.log("[submitPlan] Verification - inserted record:", verifyInsert);
      }
    }

    if (planId) {
      console.log(
        `[submitPlan] Saving city pricing for plan: id=${planId}, rows count=${cityPricingRows.length}`,
      );
      const { error: pricingSaveError } = await savePlanCityPricing(
        planId,
        cityPricingRows,
      );

      if (pricingSaveError) {
        const errorMsg = `City pricing save failed: ${pricingSaveError.message}`;
        console.error(errorMsg);
        setCityPricingError(errorMsg);
        setSaving(false);
        return;
      }
      console.log(`[submitPlan] City pricing saved successfully for plan: id=${planId}`);
    }

    await fetchPlans();
    setSaving(false);
    closeModal();
  };

  const removePlan = async (id: string) => {
    console.log(`[removePlan] Deleting plan: id=${id}`);
    const { error } = await supabase.from("plans").delete().eq("id", id);

    if (error) {
      const errorMsg = `Failed to delete plan ${id}: code=${error.code}, message=${error.message}, hint=${error.hint}, details=${error.details}`;
      console.error(errorMsg);
      console.error("Full error object:", JSON.stringify(error, null, 2));
      return;
    }

    console.log(`[removePlan] Plan deleted successfully: id=${id}`);
    await fetchPlans();
  };

  const togglePopular = async (plan: AdminPlan) => {
    console.log(
      `[togglePopular] Toggling popular flag for plan: id=${plan.id}, current=${plan.popular}`,
    );
    const { error } = await supabase
      .from("plans")
      .update({ popular: !plan.popular })
      .eq("id", plan.id);

    if (error) {
      const errorMsg = `Failed to update popular flag for plan ${plan.id}: code=${error.code}, message=${error.message}, hint=${error.hint}, details=${error.details}`;
      console.error(errorMsg);
      console.error("Full error object:", JSON.stringify(error, null, 2));
      return;
    }

    console.log(
      `[togglePopular] Popular flag updated successfully for plan: id=${plan.id}, new=${!plan.popular}`,
    );
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
                      {plan.planType === "business"
                        ? "Business Internet"
                        : plan.homePlanCategory === "wifi_ott"
                          ? "WiFi + OTT"
                          : "WiFi Only"}
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
                    Plan Type
                  </span>
                  <select
                    value={draft.planType}
                    onChange={(event) =>
                      setDraft((previous) => ({
                        ...previous,
                        planType: event.target.value as PlanTypeValue,
                        // Reset home plan category when switching to business
                        homePlanCategory: event.target.value === "business" ? null : previous.homePlanCategory,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  >
                    {PLAN_TYPE_VALUES.map((value) => (
                      <option key={value} value={value}>
                        {PLAN_TYPE_LABELS[value]}
                      </option>
                    ))}
                  </select>
                </label>
                {draft.planType === "home" && (
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">
                      Home Plan Category
                    </span>
                    <select
                      value={draft.homePlanCategory || "wifi"}
                      onChange={(event) =>
                        setDraft((previous) => ({
                          ...previous,
                          homePlanCategory: event.target.value as HomePlanCategoryValue,
                        }))
                      }
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                    >
                      {HOME_PLAN_CATEGORY_VALUES.map((value) => (
                        <option key={value} value={value}>
                          {HOME_PLAN_CATEGORY_LABELS[value]}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
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
                    One-time Setup Fee
                  </span>
                  <input
                    value={draft.setupFee ?? ""}
                    onChange={(event) =>
                      setDraft((previous) => ({
                        ...previous,
                        setupFee: event.target.value || null,
                      }))
                    }
                    placeholder="e.g., ₹1,000"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                  <span className="mt-1 block text-xs hover:text-[#134799]">
                    Optional. Leave empty to hide.
                  </span>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Security Deposit
                  </span>
                  <input
                    value={draft.securityDeposit ?? ""}
                    onChange={(event) =>
                      setDraft((previous) => ({
                        ...previous,
                        securityDeposit: event.target.value || null,
                      }))
                    }
                    placeholder="e.g., ₹1,000"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                  <span className="mt-1 block text-xs hover:text-[#134799]">
                    Optional. Will be marked as "Refundable". Leave empty to hide.
                  </span>
                </label>

                {/* Billing-Cycle Specific Pricing */}
                <div className="md:col-span-2">
                  <h4 className="mb-3 text-sm font-semibold text-slate-800">Billing-Cycle Specific Pricing & Fees</h4>
                  <p className="mb-4 text-xs text-slate-600">
                    Set pricing and fees for each billing cycle. Leave empty to use default values.
                  </p>
                  
                  {/* Monthly */}
                  <div className="mb-4 rounded-lg border border-slate-200 p-3">
                    <h5 className="mb-3 font-medium text-slate-700">Monthly</h5>
                    <div className="grid gap-3 md:grid-cols-3">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">Monthly Price</span>
                        <input
                          value={draft.monthlyPrice ?? ""}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              monthlyPrice: event.target.value || null,
                            }))
                          }
                          placeholder="e.g., ₹500"
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">Setup Fee</span>
                        <input
                          value={draft.monthlySetupFee ?? ""}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              monthlySetupFee: event.target.value || null,
                            }))
                          }
                          placeholder="e.g., ₹500"
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">Security Deposit</span>
                        <input
                          value={draft.monthlySecurityDeposit ?? ""}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              monthlySecurityDeposit: event.target.value || null,
                            }))
                          }
                          placeholder="e.g., ₹1,000"
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Quarterly */}
                  <div className="mb-4 rounded-lg border border-slate-200 p-3">
                    <h5 className="mb-3 font-medium text-slate-700">Quarterly</h5>
                    <div className="grid gap-3 md:grid-cols-3">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">Quarterly Price</span>
                        <input
                          value={draft.quarterlyPrice ?? ""}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              quarterlyPrice: event.target.value || null,
                            }))
                          }
                          placeholder="e.g., ₹1,400"
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">Setup Fee</span>
                        <input
                          value={draft.quarterlySetupFee ?? ""}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              quarterlySetupFee: event.target.value || null,
                            }))
                          }
                          placeholder="e.g., ₹500"
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">Security Deposit</span>
                        <input
                          value={draft.quarterlySecurityDeposit ?? ""}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              quarterlySecurityDeposit: event.target.value || null,
                            }))
                          }
                          placeholder="e.g., ₹1,000"
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Half-Yearly */}
                  <div className="mb-4 rounded-lg border border-slate-200 p-3">
                    <h5 className="mb-3 font-medium text-slate-700">Half-Yearly</h5>
                    <div className="grid gap-3 md:grid-cols-3">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">Half-Yearly Price</span>
                        <input
                          value={draft.halfYearlyPrice ?? ""}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              halfYearlyPrice: event.target.value || null,
                            }))
                          }
                          placeholder="e.g., ₹2,700"
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">Setup Fee</span>
                        <input
                          value={draft.halfYearlySetupFee ?? ""}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              halfYearlySetupFee: event.target.value || null,
                            }))
                          }
                          placeholder="e.g., ₹500"
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">Security Deposit</span>
                        <input
                          value={draft.halfYearlySecurityDeposit ?? ""}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              halfYearlySecurityDeposit: event.target.value || null,
                            }))
                          }
                          placeholder="e.g., ₹1,000"
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Annual */}
                  <div className="rounded-lg border border-slate-200 p-3">
                    <h5 className="mb-3 font-medium text-slate-700">Annual</h5>
                    <div className="grid gap-3 md:grid-cols-3">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">Annual Price</span>
                        <input
                          value={draft.annualPrice ?? ""}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              annualPrice: event.target.value || null,
                            }))
                          }
                          placeholder="e.g., ₹5,400"
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">Setup Fee</span>
                        <input
                          value={draft.annualSetupFee ?? ""}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              annualSetupFee: event.target.value || null,
                            }))
                          }
                          placeholder="e.g., ₹500"
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-slate-600">Security Deposit</span>
                        <input
                          value={draft.annualSecurityDeposit ?? ""}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              annualSecurityDeposit: event.target.value || null,
                            }))
                          }
                          placeholder="e.g., ₹1,000"
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <label className="block md:col-span-2">
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

                <label className="block md:col-span-2">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    OTT Package
                  </span>
                  <select
                    value={draft.ottPackageId || ""}
                    onChange={(event) =>
                      setDraft((previous) => ({
                        ...previous,
                        ottPackageId: event.target.value || null,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  >
                    <option value="">None</option>
                    {ottPackages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name}
                      </option>
                    ))}
                  </select>
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
