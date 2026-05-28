"use client";

import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { AdminPlan, PlanCategory } from "@/lib/admin/mock-data";
import { initialPlans } from "@/lib/admin/mock-data";

const defaultPlan: AdminPlan = {
  id: "",
  name: "",
  category: "Home Broadband",
  speed: "",
  price: "",
  buttonText: "Get Started",
  popular: false,
  features: [],
};

export default function AdminPlansPage() {
  const [plans, setPlans] = useState(initialPlans);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<AdminPlan>(defaultPlan);
  const [featuresInput, setFeaturesInput] = useState("");

  const sortedPlans = useMemo(
    () => [...plans].sort((a, b) => Number(b.popular) - Number(a.popular)),
    [plans],
  );

  const openNew = () => {
    setEditingId(null);
    setDraft({ ...defaultPlan, id: `plan-${Date.now()}` });
    setFeaturesInput("");
    setOpen(true);
  };

  const openEdit = (plan: AdminPlan) => {
    setEditingId(plan.id);
    setDraft(plan);
    setFeaturesInput(plan.features.join(", "));
    setOpen(true);
  };

  const submitPlan = () => {
    const features = featuresInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const nextPlan = { ...draft, features };

    setPlans((previous) =>
      editingId
        ? previous.map((plan) => (plan.id === editingId ? nextPlan : plan))
        : [...previous, nextPlan],
    );
    setOpen(false);
  };

  const removePlan = (id: string) => {
    setPlans((previous) => previous.filter((plan) => plan.id !== id));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Plans Management</h2>
            <p className="text-sm text-slate-500">
              Add, edit, and publish home and enterprise plans.
            </p>
          </div>
          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <Plus size={16} />
            Add New Plan
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-3 py-2 font-medium">Plan</th>
                <th className="px-3 py-2 font-medium">Category</th>
                <th className="px-3 py-2 font-medium">Speed</th>
                <th className="px-3 py-2 font-medium">Pricing</th>
                <th className="px-3 py-2 font-medium">Popular</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlans.map((plan) => (
                <tr key={plan.id} className="border-b border-slate-100">
                  <td className="px-3 py-3 font-medium text-slate-900">{plan.name}</td>
                  <td className="px-3 py-3 text-slate-700">{plan.category}</td>
                  <td className="px-3 py-3 text-slate-700">{plan.speed}</td>
                  <td className="px-3 py-3 text-slate-700">{plan.price}</td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        setPlans((previous) =>
                          previous.map((item) =>
                            item.id === plan.id
                              ? { ...item, popular: !item.popular }
                              : item,
                          ),
                        )
                      }
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        plan.popular
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-500"
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
                        className="rounded-lg border border-slate-200 p-1.5 text-slate-600 transition hover:bg-slate-100"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removePlan(plan.id)}
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
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                {editingId ? "Edit Plan" : "Add New Plan"}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

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
                  Category
                </span>
                <select
                  value={draft.category}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      category: event.target.value as PlanCategory,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                >
                  <option>Home Broadband</option>
                  <option>Business</option>
                  <option>Enterprise</option>
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
                  Pricing
                </span>
                <input
                  value={draft.price}
                  onChange={(event) =>
                    setDraft((previous) => ({ ...previous, price: event.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
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
                onClick={submitPlan}
                className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Save Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
