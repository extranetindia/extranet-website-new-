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
      className="relative block h-[85vh] min-h-[620px] max-h-[980px] w-full overflow-hidden cursor-pointer"
      aria-label="View plans"
    >
      <Image
        src={imageUrl}
        alt="Extranet hero banner"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
    </Link>
  );
}
