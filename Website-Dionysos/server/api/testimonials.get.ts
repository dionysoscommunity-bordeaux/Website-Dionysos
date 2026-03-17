import { readCollection } from '../utils/content'

type Testimonial = {
  name: string
  role: string
  quote: string
  updated_at?: string
}

export default defineEventHandler(async () => {
  const testimonials = await readCollection<Testimonial>('testimonials')
  testimonials.sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || ''))

  return {
    ok: true,
    data: testimonials
  }
})
