"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_AUTOPLAY_MS } from "@/lib/cms/hero";

export interface HeroSlide {
  desktop: string;
  mobile: string;
}

const SWIPE_PX = 48;

/**
 * Homepage banner slideshow — calm crossfades (never carousels that fling),
 * with autoplay, swipe, dots and arrows. Fully operable by keyboard and
 * screen readers; autoplay yields to reduced-motion and to hover/focus.
 */
export default function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => (current + direction + count) % count);
    },
    [count],
  );

  const goTo = useCallback(
    (slide: number) => {
      setIndex(((slide % count) + count) % count);
    },
    [count],
  );

  // Auto-rotation. Re-armed on every manual navigation so the timer
  // never yanks a slide away right after the visitor chose one.
  useEffect(() => {
    if (count < 2 || paused || reducedMotion) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % count);
    }, HERO_AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [count, paused, reducedMotion, index]);

  if (count === 0) return null;

  const handleTouchStart = (event: React.TouchEvent) => {
    touchX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchX.current;
    const delta = endX - touchX.current;
    touchX.current = null;
    if (Math.abs(delta) < SWIPE_PX) return;
    go(delta < 0 ? 1 : -1);
  };

  return (
    <div
      className="relative aspect-[3/2] w-full overflow-hidden md:aspect-[8/3]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured broadband offers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <p className="sr-only" aria-live="polite">
        Offer {index + 1} of {count}
      </p>

      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <Link
            key={`${slide.desktop}-${i}`}
            href="/plans"
            aria-label={`View broadband plans — offer ${i + 1} of ${count}`}
            aria-hidden={!active}
            tabIndex={active ? 0 : -1}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              active ? "z-[1] opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <picture>
              <source media="(min-width: 768px)" srcSet={slide.desktop} />
              <img
                src={slide.mobile}
                alt={active ? "Extranet broadband plans and offers" : ""}
                fetchPriority={i === 0 ? "high" : "auto"}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className={`absolute inset-0 h-full w-full object-cover object-center ${
                  active ? "ken-burns" : ""
                }`}
              />
            </picture>
          </Link>
        );
      })}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous offer"
            className="absolute left-3 top-1/2 z-[2] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 md:flex"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next offer"
            className="absolute right-3 top-1/2 z-[2] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 md:flex"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>

          {/* Dots ride above the overlap zone so the plan card never covers them */}
          <div className="absolute bottom-14 left-1/2 z-[2] flex -translate-x-1/2 items-center gap-2 sm:bottom-16">
            {slides.map((slide, i) => (
              <button
                key={`${slide.desktop}-dot-${i}`}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to offer ${i + 1}`}
                aria-current={i === index}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-7 bg-white shadow-[0_0_10px_rgba(0,0,0,0.45)]"
                    : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
