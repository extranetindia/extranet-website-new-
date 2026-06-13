"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, GripVertical, Check, X } from "lucide-react";
import Link from "next/link";
import {
  getOttPackages,
  deleteOttPackage,
  updateOttPackage,
  reorderOttPackages,
  type OttPackageRow,
} from "@/lib/database/ott-packages";

interface DraggingItem {
  id: string;
  index: number;
}

export default function AdminOttPackagesPage() {
  const [packages, setPackages] = useState<OttPackageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draggingItem, setDraggingItem] = useState<DraggingItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Load packages on mount
  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await getOttPackages();
    if (err) {
      setError(`Failed to load packages: ${err.message}`);
    } else {
      setPackages(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this OTT package?")) {
      return;
    }

    const { error: err } = await deleteOttPackage(id);
    if (err) {
      setError(`Failed to delete package: ${err.message}`);
    } else {
      setPackages(packages.filter((p) => p.id !== id));
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    const { error: err } = await updateOttPackage(id, { is_active: !isActive });
    if (err) {
      setError(`Failed to update package: ${err.message}`);
    } else {
      setPackages(
        packages.map((p) => (p.id === id ? { ...p, is_active: !isActive } : p)),
      );
    }
  };

  const handleDragStart = (index: number, id: string) => {
    setDraggingItem({ id, index });
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (!draggingItem || draggingItem.index === dropIndex) {
      return;
    }

    // Reorder locally
    const newPackages = [...packages];
    const [movedPackage] = newPackages.splice(draggingItem.index, 1);
    newPackages.splice(dropIndex, 0, movedPackage);

    // Update display_order
    const reorderData = newPackages.map((p, idx) => ({
      id: p.id,
      display_order: idx,
    }));

    setPackages(newPackages);
    setDraggingItem(null);

    // Save to database
    const { error: err } = await reorderOttPackages(reorderData);
    if (err) {
      setError(`Failed to reorder packages: ${err.message}`);
      // Reload to restore correct order
      loadPackages();
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-slate-200" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">OTT Packages</h1>
        <Link
          href="/admin/ott-packages/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#134799] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0f3b7f]"
        >
          <Plus size={18} />
          New Package
        </Link>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {packages.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">No OTT packages yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="space-y-2 rounded-lg border border-slate-200 bg-white">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              draggable
              onDragStart={() => handleDragStart(index, pkg.id)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className={`flex items-center gap-4 border-b border-slate-200 p-4 transition-all last:border-0 ${
                draggingItem?.index === index ? "opacity-50" : ""
              } ${dragOverIndex === index ? "bg-blue-50" : ""}`}
            >
              <button
                type="button"
                className="cursor-grab p-1 text-slate-400 hover:text-slate-600 active:cursor-grabbing"
                aria-label="Drag to reorder"
              >
                <GripVertical size={18} />
              </button>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900">{pkg.name}</h3>
                {pkg.description && (
                  <p className="text-sm text-slate-600 truncate">{pkg.description}</p>
                )}
                {pkg.apps.length > 0 && (
                  <p className="text-xs text-slate-500 mt-1">
                    {pkg.apps.length} app{pkg.apps.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleActive(pkg.id, pkg.is_active)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                    pkg.is_active
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  title={pkg.is_active ? "Click to deactivate" : "Click to activate"}
                >
                  {pkg.is_active ? (
                    <>
                      <Check size={16} />
                      Active
                    </>
                  ) : (
                    <>
                      <X size={16} />
                      Inactive
                    </>
                  )}
                </button>

                <Link
                  href={`/admin/ott-packages/${pkg.id}/edit`}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-600 transition-all duration-200 ease-in-out hover:bg-slate-100 hover:text-[#134799]"
                  title="Edit package"
                >
                  <Pencil size={18} />
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(pkg.id)}
                  className="rounded-lg border border-red-200 bg-white px-3 py-2 text-red-600 transition-all duration-200 ease-in-out hover:bg-red-50 hover:text-red-700"
                  title="Delete package"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
