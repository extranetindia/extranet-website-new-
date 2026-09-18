"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, GripVertical, Check, X, ChevronUp, ChevronDown } from "lucide-react";
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

  // Button-based reorder — drag-and-drop doesn't exist on touch screens,
  // so mobile admins get explicit move controls using the same save path.
  const handleMove = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= packages.length) return;

    const previous = packages;
    const reordered = [...packages];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(target, 0, moved);
    setPackages(reordered);

    const { error: err } = await reorderOttPackages(
      reordered.map((p, idx) => ({ id: p.id, display_order: idx })),
    );
    if (err) {
      setError(`Failed to reorder packages: ${err.message}`);
      setPackages(previous);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-[#DCE3EC]" />
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-[#DCE3EC]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#15366A]">OTT Packages</h1>
        <Link
          href="/admin/ott-packages/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#11418D] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0e3675]"
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
        <div className="rounded-lg border border-[#DCE3EC] bg-white p-8 text-center">
          <p className="text-[#5C6F89]">No OTT packages yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="space-y-2 rounded-lg border border-[#DCE3EC] bg-white">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              draggable
              onDragStart={() => handleDragStart(index, pkg.id)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className={`flex items-center gap-4 border-b border-[#DCE3EC] p-4 transition-all last:border-0 ${
                draggingItem?.index === index ? "opacity-50" : ""
              } ${dragOverIndex === index ? "bg-blue-50" : ""}`}
            >
              <button
                type="button"
                className="hidden cursor-grab p-1 text-[#8ba0bb] hover:text-[#5C6F89] active:cursor-grabbing sm:block"
                aria-label="Drag to reorder"
              >
                <GripVertical size={18} />
              </button>
              <div className="flex flex-col sm:hidden" aria-label="Reorder package">
                <button
                  type="button"
                  onClick={() => void handleMove(index, -1)}
                  disabled={index === 0}
                  className="rounded-md p-1 text-[#5C6F89] hover:bg-[#F4F7FC] hover:text-[#11418D] disabled:opacity-30"
                  aria-label={`Move ${pkg.name} up`}
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => void handleMove(index, 1)}
                  disabled={index === packages.length - 1}
                  className="rounded-md p-1 text-[#5C6F89] hover:bg-[#F4F7FC] hover:text-[#11418D] disabled:opacity-30"
                  aria-label={`Move ${pkg.name} down`}
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#15366A]">{pkg.name}</h3>
                {pkg.description && (
                  <p className="text-sm text-[#5C6F89] truncate">{pkg.description}</p>
                )}
                {pkg.apps.length > 0 && (
                  <p className="text-xs text-[#5C6F89] mt-1">
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
                      : "bg-[#F4F7FC] text-[#5C6F89] hover:bg-[#DCE3EC]"
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
                  className="rounded-lg border border-[#DCE3EC] bg-white px-3 py-2 text-[#5C6F89] transition-all duration-200 ease-in-out hover:bg-[#F4F7FC] hover:text-[#11418D]"
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
