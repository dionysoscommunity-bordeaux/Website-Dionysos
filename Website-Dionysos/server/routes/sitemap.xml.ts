const ROUTES = [
  '/',
  '/activites',
  '/communaute',
  '/partenaires',
  '/mentions-legales',
  '/politique-de-confidentialite',
  '/politique-de-cookies'
]

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl || '').trim() || 'https://dionysos-bordeaux.fr'
  const rawLastmod = String(config.public.siteLastmod || '').trim()
  const isIsoDate = /^\d{4}-\d{2}-\d{2}$/.test(rawLastmod)
  const siteLastmod = isIsoDate ? rawLastmod : '2026-02-26'

  const urls = ROUTES.map((path) => {
    const loc = new URL(path, siteUrl).toString()
    return `<url><loc>${loc}</loc><lastmod>${siteLastmod}</lastmod></url>`
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
