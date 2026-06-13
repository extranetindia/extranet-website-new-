"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getOttPackageById,
  updateOttPackage,
  type OttPackageRow,
  type OttPackageUpdate,
} from "@/lib/database/ott-packages";
import OttPackageForm from "@/components/admin/OttPackageForm";

export default function EditOttPackagePage() {
  const router = useRouter();
  const params = useParams();
  const packageId = params.id as string;

  const [packageData, setPackageData] = useState<OttPackageRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!packageId) return;

    const loadPackage = async () => {
      setIsLoading(true);
      setError(null);

      const { data, error: err } = await getOttPackageById(packageId);

      if (err) {
        setError(`Failed to load package: ${err.message}`);
      } else if (!data) {
        setError("Package not found");
      } else {
        setPackageData(data);
      }

      setIsLoading(false);
    };

    loadPackage();
  }, [packageId]);

  const handleSubmit = async (data: OttPackageUpdate) => {
    setIsSaving(true);
    setError(null);

    const { error: err } = await updateOttPackage(packageId, data);

    if (err) {
      setError(`Failed to update package: ${err.message}`);
      setIsSaving(false);
    } else {
      router.push("/admin/ott-packages");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-slate-200" />
          ))}
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        {error || "Package not found"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/ott-packages"
          className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition-all duration-200 ease-in-out hover:bg-slate-100 hover:text-[#134799]"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Edit OTT Package</h1>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <OttPackageForm initialData={packageData} onSubmit={handleSubmit} isLoading={isSaving} />
    </div>
  );
}
