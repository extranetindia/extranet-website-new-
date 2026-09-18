"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionPreview from "@/components/ui/SectionPreview";
import MobileCarousel from "@/components/ui/MobileCarousel";
import {
  getTestimonialInitials,
  type TestimonialRow,
} from "@/lib/database/testimonials";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: Math.max(0, Math.min(5, rating)) }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
      ))}
    </div>
  );
}

function TestimonialAvatar({ name, imageUrl }: { name: string; imageUrl: string | null }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !imageFailed;

  if (showImage && imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        className="h-11 w-11 shrink-0 rounded-full border border-[#DCE3EC] object-cover"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#11418D] text-sm font-extrabold text-white"
    >
      {getTestimonialInitials(name)}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: TestimonialRow;
  index: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index, 5) * 0.07 }}
      className="tele-card tele-card-hover flex h-full flex-col p-6"
    >
      <StarRating rating={testimonial.rating} />
      <blockquote className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-[#33475f]">
        &ldquo;{testimonial.review}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-[#EDF1F6] pt-4">
        <TestimonialAvatar name={testimonial.name} imageUrl={testimonial.image_url} />
        <div className="min-w-0">
          <div className="truncate text-sm font-extrabold text-[#15366A]">{testimonial.name}</div>
          {testimonial.city && (
            <div className="text-xs font-medium text-[#5C6F89]">{testimonial.city}</div>
          )}
        </div>
      </figcaption>
    </motion.figure>
  );
}

interface TestimonialsSectionProps {
  testimonials: TestimonialRow[];
  fetchError?: string | null;
}

export default function TestimonialsSection({
  testimonials,
  fetchError = null,
}: TestimonialsSectionProps) {
  const hasTestimonials = testimonials.length > 0;

  return (
    <SectionPreview
      eyebrow="Customer stories"
      title="Trusted by 1,000+ customers"
      description="Real reviews from homes and businesses running on Extranet."
      href="/support"
      linkLabel="Customer support"
      className="bg-[#F4F7FC]"
    >
      {fetchError && (
        <p className="mb-4 rounded-[10px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Testimonials are temporarily unavailable. Please try again later.
        </p>
      )}

      {!fetchError && !hasTestimonials && (
        <p className="rounded-[10px] border border-[#DCE3EC] bg-white px-4 py-8 text-center text-sm text-[#5C6F89]">
          Customer stories will appear here soon.
        </p>
      )}

      {hasTestimonials && (
        <>
          <MobileCarousel
            ariaLabel="Customer testimonials"
            slideClassName="w-[90%] max-w-[340px] shrink-0 snap-start snap-always"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </MobileCarousel>

          <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </>
      )}
    </SectionPreview>
  );
}
