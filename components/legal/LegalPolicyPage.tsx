import LegalPage from "@/components/legal/LegalPage";
import LegalContentRenderer from "@/components/legal/LegalContentRenderer";
import { fetchLegalPageBySlug } from "@/lib/database/legal-pages";
import LegalPolicyFallback from "@/components/legal/LegalPolicyFallback";

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
        <LegalPolicyFallback />
      )}
    </LegalPage>
  );
}
