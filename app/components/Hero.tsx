export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default async function Hero() {
  const { data, error } = await supabase
    .from("hero_banner")
    .select("image_url")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch hero banner:", error);
  }

  const imageUrl = data?.image_url;

  if (!imageUrl) {
    return null;
  }

  return (
    <Link
      href="/plans"
      className="relative block w-full overflow-hidden cursor-pointer
        aspect-[16/10] max-h-[240px]
        min-[400px]:max-h-[280px]
        sm:aspect-[16/9] sm:max-h-[340px]
        md:aspect-auto md:h-[85vh] md:min-h-[620px] md:max-h-[980px]"
      aria-label="View plans"
    >
      <Image
        src={imageUrl}
        alt="Extranet hero banner"
        fill
        priority
        className="object-cover object-center max-md:object-[center_20%] md:object-center"
        sizes="(max-width: 768px) 100vw, 100vw"
      />
    </Link>
  );
}
