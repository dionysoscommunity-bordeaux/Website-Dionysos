import { readCollection } from '../utils/content'

type Partner = {
  name: string
  sector: string
  collaboration: string
  impact: string
  url?: string
  logo?: string
  updated_at?: string
}

export default defineEventHandler(async () => {
  const partners = await readCollection<Partner>('partners')
  partners.sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || ''))

  return {
    ok: true,
    data: partners
  }
})
