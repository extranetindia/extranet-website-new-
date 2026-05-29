import type { NextConfig } from "next";

function getSupabaseImagePattern():
  | { protocol: "https"; hostname: string }
  | undefined {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return undefined;
  try {
    return { protocol: "https", hostname: new URL(supabaseUrl).hostname };
  } catch {
    return undefined;
  }
}

const supabaseImagePattern = getSupabaseImagePattern();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      ...(supabaseImagePattern ? [supabaseImagePattern] : []),
    ],
  },
};

export default nextConfig;
