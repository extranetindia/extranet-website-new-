import { getActiveTestimonials } from "@/lib/database/testimonials";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";

export default async function Testimonials() {
  const { data, error } = await getActiveTestimonials();

  return (
    <TestimonialsSection
      testimonials={data}
      fetchError={error?.message ?? null}
    />
  );
}
