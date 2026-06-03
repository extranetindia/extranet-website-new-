import LegalPage from "@/components/legal/LegalPage";
import LegalContentRenderer from "@/components/legal/LegalContentRenderer";
import { fetchLegalPageBySlug } from "@/lib/database/legal-pages";

interface LegalPolicyPageProps {
  slug: string;
  title: string;
  description?: string;
  summary?: string;
}

export default async function LegalPolicyPage({
  slug,
  title,
  description,
  summary,
}: LegalPolicyPageProps) {
  const { data } = await fetchLegalPageBySlug(slug);

  return (
    <LegalPage
      title={data?.title ?? title}
      summary={data?.title ? (summary ?? description ?? "") : description ?? ""}
      lastUpdated={data?.last_updated ?? "TBD"}
    >
      {data?.content ? (
        <LegalContentRenderer content={data.content} />
      ) : (
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">Policy content is not available</h2>
          <p className="mt-4 text-base leading-8">
            The requested policy page has not been published yet. Please contact support at
            help.extranet@gmail.com for the latest terms and service details.
          </p>
        </section>
      )}
    </LegalPage>
  );
}
