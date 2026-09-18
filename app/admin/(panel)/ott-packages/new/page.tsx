"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createOttPackage, type OttPackageInsert, type OttPackageUpdate } from "@/lib/database/ott-packages";
import OttPackageForm from "@/components/admin/OttPackageForm";

export default function NewOttPackagePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: OttPackageInsert | OttPackageUpdate) => {
    setIsLoading(true);
    setError(null);

    const { error: err } = await createOttPackage({
      name: String(data.name || ""),
      apps: Array.isArray(data.apps) ? data.apps : [],
      description: data.description || null,
      display_order: 0,
      is_active: true,
    } as OttPackageInsert);

    if (err) {
      setError(`Failed to create package: ${err.message}`);
      setIsLoading(false);
    } else {
      router.push("/admin/ott-packages");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/ott-packages"
          className="rounded-lg border border-[#DCE3EC] bg-white p-2 text-[#5C6F89] transition-all duration-200 ease-in-out hover:bg-[#F4F7FC] hover:text-[#11418D]"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-[#15366A]">Create OTT Package</h1>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <OttPackageForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
