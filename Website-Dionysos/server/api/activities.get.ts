import { readCollection } from '../utils/content'

type Activity = {
  title: string
  src: string
  alt: string
  category: string
  published_at: string
  location: string
  format: string
  participants: string
  updated_at?: string
}

export default defineEventHandler(async () => {
  const activities = await readCollection<Activity>('activities')
  activities.sort((a, b) => (b.published_at || '').localeCompare(a.published_at || ''))

  return {
    ok: true,
    data: activities
  }
})
