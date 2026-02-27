export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl as string
  const sitemapUrl = new URL('/sitemap.xml', siteUrl).toString()
  const robotsDisallow = String(config.public.robotsDisallow || '').trim()
  const disallowLine = robotsDisallow.length > 0 ? `Disallow: ${robotsDisallow}` : 'Disallow:'

  const content = `User-agent: *
Allow: /
${disallowLine}
Sitemap: ${sitemapUrl}
`

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return content
})
