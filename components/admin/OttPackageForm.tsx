"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { OttPackageRow, OttPackageInsert, OttPackageUpdate } from "@/lib/database/schema";

interface OttPackageFormProps {
  initialData?: OttPackageRow;
  onSubmit: (data: OttPackageInsert | OttPackageUpdate) => Promise<void>;
  isLoading?: boolean;
}

export default function OttPackageForm({ initialData, onSubmit, isLoading = false }: OttPackageFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [apps, setApps] = useState<string[]>(initialData?.apps || []);
  const [appInput, setAppInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddApp = () => {
    if (appInput.trim() && !apps.includes(appInput.trim())) {
      setApps([...apps, appInput.trim()]);
      setAppInput("");
    }
  };

  const handleRemoveApp = (app: string) => {
    setApps(apps.filter((a) => a !== app));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Package name is required");
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim() || null,
        apps,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save package");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-slate-200 bg-white p-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Package Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#134799] focus:ring-2 focus:ring-[#134799]/20"
          placeholder="e.g., Premium Entertainment"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#134799] focus:ring-2 focus:ring-[#134799]/20"
          placeholder="e.g., Access to popular OTT apps"
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Included Apps
        </label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={appInput}
              onChange={(e) => setAppInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddApp();
                }
              }}
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#134799] focus:ring-2 focus:ring-[#134799]/20"
              placeholder="Enter app name and press Enter or click Add"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleAddApp}
              className="rounded-lg bg-[#134799] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0f3b7f] disabled:opacity-50"
              disabled={!appInput.trim() || isLoading}
            >
              Add App
            </button>
          </div>

          {apps.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {apps.map((app) => (
                <div
                  key={app}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-[#134799]"
                >
                  {app}
                  <button
                    type="button"
                    onClick={() => handleRemoveApp(app)}
                    className="p-0 hover:opacity-70"
                    disabled={isLoading}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-[#134799] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0f3b7f] disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : initialData ? "Update Package" : "Create Package"}
        </button>
      </div>
    </form>
  );
}
