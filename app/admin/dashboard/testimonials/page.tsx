import { getTestimonials } from '@/app/actions/testimonial'
import TestimonialAdminClient from './TestimonialAdminClient'

export const dynamic = 'force-dynamic'

export default async function TestimonialsAdminPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <TestimonialAdminClient initialTestimonials={testimonials} />
    </div>
  )
}
