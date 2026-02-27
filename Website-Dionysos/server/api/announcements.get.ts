import { readCollection } from '../utils/content'

type Announcement = {
  title: string
  summary: string
  published_at?: string
  updated_at?: string
}

export default defineEventHandler(async () => {
  const announcements = await readCollection<Announcement>('announcements')
  announcements.sort((a, b) => (b.published_at || '').localeCompare(a.published_at || ''))

  return {
    ok: true,
    data: announcements
  }
})
