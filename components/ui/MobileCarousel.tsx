"use client";

import { Children, isValidElement, type ReactNode } from "react";

interface MobileCarouselProps {
  children: ReactNode;
  /** Width of each slide — default shows ~1.15 cards (85% of container). */
  slideClassName?: string;
  className?: string;
  ariaLabel?: string;
  gapClassName?: string;
}

export default function MobileCarousel({
  children,
  slideClassName = "w-[85%] max-w-[340px] shrink-0 snap-start snap-always",
  className = "",
  ariaLabel = "Swipeable carousel",
  gapClassName = "gap-4",
}: MobileCarouselProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div
      className={`mobile-carousel md:hidden -mx-4 sm:-mx-6 ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        className={`flex overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory px-4 sm:px-6 pb-1 ${gapClassName}`}
        style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" }}
      >
        {items.map((child, index) => (
          <div
            key={child.key ?? index}
            className={slideClassName}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${items.length}`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
