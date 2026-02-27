import { readCollection } from '../../utils/content'

type LegalContent = {
  title: string
  seo_title: string
  seo_description: string
  updated_at?: string
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      data: { message: 'Slug manquant.' }
    })
  }

  const entries = await readCollection<LegalContent>('legal')
  const entry = entries.find((item) => item.slug === slug)

  if (!entry) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not found',
      data: { message: 'Contenu légal introuvable.' }
    })
  }

  return {
    ok: true,
    data: entry
  }
})
