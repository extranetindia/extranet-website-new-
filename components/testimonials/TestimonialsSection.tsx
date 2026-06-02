"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionPreview from "@/components/ui/SectionPreview";
import MobileCarousel from "@/components/ui/MobileCarousel";
import {
  getTestimonialInitials,
  type TestimonialRow,
} from "@/lib/database/testimonials";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
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
        className="h-10 w-10 shrink-0 rounded-full object-cover"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <Quote className="h-7 w-7 shrink-0 text-blue-200" />
      <StarRating rating={testimonial.rating} />
      <p className="flex-1 text-sm leading-relaxed text-slate-600">
        &ldquo;{testimonial.review}&rdquo;
      </p>
      <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <TestimonialAvatar name={testimonial.name} imageUrl={testimonial.image_url} />
        <div>
          <div className="text-sm font-semibold text-slate-900">{testimonial.name}</div>
          {testimonial.city && (
            <div className="text-xs text-slate-500">{testimonial.city}</div>
          )}
        </div>
      </div>
    </motion.div>
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
      eyebrow="Customer Stories"
      title="Trusted by 1,000+ customers"
      description="Real reviews from homes and businesses across India."
      href="/support"
      linkLabel="Customer support"
      className="bg-slate-50"
    >
      {fetchError && (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Testimonials are temporarily unavailable. Please try again later.
        </p>
      )}

      {!fetchError && !hasTestimonials && (
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">
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
