type PageSeoInput = {
  title: string
  description: string
  path?: string
  robots?: string
  image?: string
  appendSiteName?: boolean
  includeOrganization?: boolean
  eventSchema?: EventSchemaInput
  extraSchemas?: Array<Record<string, unknown>>
}

type EventSchemaInput = {
  '@type': 'Event'
  name: string
  startDate: string
  location: string | Record<string, unknown>
} & Record<string, unknown>

export function usePageSeo(input: PageSeoInput) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl || '').trim() || 'https://dionysosbordeaux.com'
  const siteName = config.public.siteName as string
  const canonicalPath = input.path || route.path
  const canonicalUrl = new URL(canonicalPath, siteUrl).toString()
  const fullTitle = input.appendSiteName === false ? input.title : `${input.title} | ${siteName}`
  const robotsDirective = input.robots || 'index,follow'
  const absoluteImage = input.image ? new URL(input.image, siteUrl).toString() : undefined
  const isValidEventSchema =
    !!input.eventSchema &&
    input.eventSchema['@type'] === 'Event' &&
    typeof input.eventSchema.name === 'string' &&
    input.eventSchema.name.trim().length > 0 &&
    typeof input.eventSchema.startDate === 'string' &&
    input.eventSchema.startDate.trim().length > 0 &&
    !!input.eventSchema.location

  useSeoMeta({
    title: fullTitle,
    description: input.description,
    robots: robotsDirective,
    ogTitle: fullTitle,
    ogDescription: input.description,
    ogType: 'website',
    ogUrl: canonicalUrl,
    ogSiteName: siteName,
    ogImage: absoluteImage,
    twitterTitle: fullTitle,
    twitterDescription: input.description,
    twitterImage: absoluteImage,
    twitterCard: absoluteImage ? 'summary_large_image' : 'summary'
  })

  const schemaNodes: Array<Record<string, unknown>> = []

  if (input.includeOrganization !== false) {
    schemaNodes.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: siteUrl
    })
  }

  if (isValidEventSchema) {
    schemaNodes.push({
      '@context': 'https://schema.org',
      ...input.eventSchema
    })
  }

  for (const schema of input.extraSchemas || []) {
    schemaNodes.push({
      '@context': 'https://schema.org',
      ...schema
    })
  }

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
    script: schemaNodes.map((schema, index) => ({
      key: `schema-org-${index}`,
      type: 'application/ld+json',
      children: JSON.stringify(schema)
    }))
  })
}
