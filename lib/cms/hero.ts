export interface HeroBannerRow {
  id: string;
  created_at?: string;
  /** @deprecated Legacy single-image column — used as desktop fallback */
  image_url?: string | null;
  desktop_image_url?: string | null;
  mobile_image_url?: string | null;
}

export interface ResolvedHeroUrls {
  desktop: string | null;
  mobile: string | null;
}

/** Resolve desktop/mobile URLs with safe fallbacks for legacy rows. */
export function resolveHeroBannerUrls(
  row: HeroBannerRow | null | undefined,
): ResolvedHeroUrls {
  if (!row) {
    return { desktop: null, mobile: null };
  }

  const desktop =
    row.desktop_image_url ?? row.image_url ?? null;
  const mobile = row.mobile_image_url ?? desktop;

  return { desktop, mobile };
}

export const HERO_ASPECT = {
  desktop: { width: 1600, height: 600, className: "aspect-[8/3]" },
  mobile: { width: 1080, height: 720, className: "aspect-[3/2]" },
} as const;

/** How many of the most recent banners rotate in the homepage slideshow. */
export const HERO_SLIDE_LIMIT = 5;

/** Auto-rotation interval for the homepage slideshow. */
export const HERO_AUTOPLAY_MS = 6000;
