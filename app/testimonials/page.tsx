import React from "react";
import { getTestimonials } from "../actions/testimonial";
import TestimonialsClient from "./TestimonialsClient";

export const dynamic = 'force-dynamic'

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  // Convert Date fields to simple strings/serializable values before passing to Client Component if necessary
  const serializedTestimonials = testimonials.map(t => ({
    id: t.id,
    name: t.name,
    video: t.video,
    image: t.image
  }));

  return (
    <TestimonialsClient initialTestimonials={serializedTestimonials} />
  );
}

