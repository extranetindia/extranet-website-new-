"use client";

import { Children, isValidElement, type ReactNode } from "react";

interface MobileCarouselProps {
  children: ReactNode;
  slideClassName?: string;
  className?: string;
  ariaLabel?: string;
  gapClassName?: string;
  /** Top padding so elevated badges (e.g. "Most Popular") are not clipped. */
  trackPaddingTop?: string;
}

export default function MobileCarousel({
  children,
  slideClassName = "w-[85%] max-w-[340px] shrink-0 snap-start snap-always overflow-visible",
  className = "",
  ariaLabel = "Swipeable carousel",
  gapClassName = "gap-4",
  trackPaddingTop = "pt-6",
}: MobileCarouselProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div
      className={`mobile-carousel overflow-visible md:hidden -mx-4 sm:-mx-6 ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        className={`flex overflow-x-auto overflow-y-visible overscroll-x-contain scroll-smooth snap-x snap-mandatory px-4 sm:px-6 pb-2 ${trackPaddingTop} ${gapClassName}`}
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
