"use client";

import { useState } from "react";
import CmsHeroBanner from "@/components/hero/CmsHeroBanner";
import { initialHeroConfig } from "@/lib/admin/mock-data";

export default function AdminHeroPage() {
  const [heroConfig, setHeroConfig] = useState(initialHeroConfig);

  const updateField = <K extends keyof typeof heroConfig>(
    key: K,
    value: (typeof heroConfig)[K],
  ) => {
    setHeroConfig((previous) => ({ ...previous, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Hero Banner Management</h2>
        <p className="mt-1 text-sm text-slate-500">
          Configure homepage cinematic banner content for desktop and mobile.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Heading
            </span>
            <input
              value={heroConfig.title}
              onChange={(event) => updateField("title", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Subtitle
            </span>
            <input
              value={heroConfig.subtitle}
              onChange={(event) => updateField("subtitle", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Supporting Text
            </span>
            <textarea
              value={heroConfig.supportingText}
              onChange={(event) => updateField("supportingText", event.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Primary CTA Text
            </span>
            <input
              value={heroConfig.primaryCtaText}
              onChange={(event) => updateField("primaryCtaText", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Secondary CTA Text
            </span>
            <input
              value={heroConfig.secondaryCtaText}
              onChange={(event) => updateField("secondaryCtaText", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              CTA Link
            </span>
            <input
              value={heroConfig.ctaLink}
              onChange={(event) => updateField("ctaLink", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Pricing Teaser
            </span>
            <input
              value={heroConfig.pricingTeaser}
              onChange={(event) => updateField("pricingTeaser", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Desktop Hero Image URL
            </span>
            <input
              value={heroConfig.desktopBannerImage}
              onChange={(event) =>
                updateField("desktopBannerImage", event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Mobile Hero Image URL
            </span>
            <input
              value={heroConfig.mobileBannerImage}
              onChange={(event) =>
                updateField("mobileBannerImage", event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </label>
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              id="hero-active"
              type="checkbox"
              checked={heroConfig.isActive}
              onChange={(event) => updateField("isActive", event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-700"
            />
            <label htmlFor="hero-active" className="text-sm font-medium text-slate-700">
              Banner active
            </label>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-3">
          <h3 className="text-sm font-semibold text-slate-900">Live Preview</h3>
        </div>
        <CmsHeroBanner banner={heroConfig} />
      </section>
    </div>
  );
}
