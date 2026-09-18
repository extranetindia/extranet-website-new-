import { getActiveTestimonials } from "@/lib/database/testimonials";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";

export default async function Testimonials() {
  const { data, error } = await getActiveTestimonials();

  // No sad placeholder on the homepage — the section appears
  // automatically once the admin publishes the first testimonial.
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <TestimonialsSection
      testimonials={data}
      fetchError={error?.message ?? null}
    />
  );
}
