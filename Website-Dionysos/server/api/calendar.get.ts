type DiscordScheduledEvent = {
  id: string
  name: string
  description: string | null
  scheduled_start_time: string
  scheduled_end_time: string | null
  status: 1 | 2 | 3 | 4
  entity_type: 1 | 2 | 3
  user_count?: number
  image?: string | null
  entity_metadata?: {
    location?: string
  } | null
}

type DiscordMessageEmbed = {
  title?: string
  description?: string
  url?: string
  fields?: Array<{
    name?: string
    value?: string
  }>
}

type DiscordMessage = {
  id: string
  content?: string
  timestamp: string
  embeds?: DiscordMessageEmbed[]
}

type BridgeCalendarEvent = {
  id?: string
  postId?: string
  title?: string
  name?: string
  description?: string | null
  date?: string
  startAt?: string
  scheduled_start_time?: string
  endAt?: string | null
  scheduled_end_time?: string | null
  status?: string
  participants?: number | Array<unknown>
  participantCount?: number
  user_count?: number
  location?: string
  imageUrl?: string | null
  image?: string | null
  eventUrl?: string
  url?: string
  link?: string
  permalink?: string
}

type BridgeCalendarResponse = {
  success?: boolean
  ok?: boolean
  data?: BridgeCalendarEvent[]
}

type CalendarEvent = {
  id: string
  title: string
  description: string
  startAt: string
  endAt: string | null
  status: 'scheduled' | 'active' | 'completed' | 'canceled'
  participants: number
  location: string
  imageUrl: string | null
  eventUrl: string | null
}

const STATUS_LABEL: Record<DiscordScheduledEvent['status'], CalendarEvent['status']> = {
  1: 'scheduled',
  2: 'active',
  3: 'completed',
  4: 'canceled'
}

const BRIDGE_STATUS_LABEL: Record<string, CalendarEvent['status']> = {
  active: 'active',
  in_progress: 'active',
  scheduled: 'scheduled',
  completed: 'completed',
  cancelled: 'canceled',
  canceled: 'canceled',
  terminated: 'canceled'
}

const STATUS_WHITELIST_DEFAULT = new Set<CalendarEvent['status']>(['scheduled', 'active'])
const DISCORD_API_BASE = 'https://discord.com/api/v10'
const DISCORD_USER_AGENT = 'DionysosCalendarBot/1.0 (+https://dionysos-bordeaux.fr)'
const CALENDAR_CACHE_TTL_MS = 60_000
const CALENDAR_RETRY_AFTER_FALLBACK_MS = 15_000
const FRENCH_MONTHS: Record<string, number> = {
  janvier: 0,
  fevrier: 1,
  février: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  aout: 7,
  août: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  decembre: 11,
  décembre: 11
}
const FRENCH_WEEKDAY_OFFSETS: Record<string, number> = {
  lundi: 0,
  mardi: 1,
  mercredi: 2,
  jeudi: 3,
  vendredi: 4,
  samedi: 5,
  dimanche: 6
}

type CalendarCacheEntry = {
  data: CalendarEvent[]
  updatedAt: number
}

const calendarCache = new Map<string, CalendarCacheEntry>()
let discordCooldownUntil = 0

const getCacheKey = (includePast: boolean, limit: number | null) => `${includePast ? '1' : '0'}:${limit === null ? 'all' : limit}`

const readCalendarCache = (key: string): CalendarEvent[] | null => {
  const entry = calendarCache.get(key)
  if (!entry) return null
  if (Date.now() - entry.updatedAt > CALENDAR_CACHE_TTL_MS) return null
  return entry.data
}

const writeCalendarCache = (key: string, data: CalendarEvent[]) => {
  calendarCache.set(key, {
    data,
    updatedAt: Date.now()
  })
}

const getErrorStatusCode = (error: unknown): number | null => {
  const maybeStatus = Number((error as { response?: { status?: number } })?.response?.status)
  return Number.isFinite(maybeStatus) && maybeStatus > 0 ? maybeStatus : null
}

const getRetryAfterMs = (error: unknown): number => {
  const retryAfterHeader = (error as { response?: { headers?: { get?: (name: string) => string | null } } })
    ?.response
    ?.headers
    ?.get?.('retry-after')
  const retryAfterHeaderMs = Number(retryAfterHeader) * 1000
  if (Number.isFinite(retryAfterHeaderMs) && retryAfterHeaderMs > 0) return retryAfterHeaderMs

  const retryAfterBodyMs = Number((error as { data?: { retry_after?: number | string } })?.data?.retry_after) * 1000
  if (Number.isFinite(retryAfterBodyMs) && retryAfterBodyMs > 0) return retryAfterBodyMs

  return CALENDAR_RETRY_AFTER_FALLBACK_MS
}

const normalizeFrenchText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const sanitizeDiscordLine = (line: string) =>
  line
    .replace(/^\s*[-*•]\s*/, '')
    .replace(/\*\*/g, '')
    .replace(/__/g, '')
    .trim()

const parseFrenchMonthDate = (dayRaw: string, monthRaw: string): Date | null => {
  const day = Number(dayRaw)
  if (!Number.isFinite(day) || day < 1 || day > 31) return null
  const monthIndex = FRENCH_MONTHS[normalizeFrenchText(monthRaw)]
  if (!Number.isFinite(monthIndex)) return null

  const now = new Date()
  const currentYear = now.getFullYear()
  let parsed = new Date(currentYear, monthIndex, day, 0, 0, 0, 0)

  // If parsed date is far in the past, assume the next year.
  if (parsed.getTime() < now.getTime() - 1000 * 60 * 60 * 24 * 120) {
    parsed = new Date(currentYear + 1, monthIndex, day, 0, 0, 0, 0)
  }

  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const parseWeekStartDate = (text: string): Date | null => {
  const normalized = normalizeFrenchText(text)
  const rangeMatch = normalized.match(/du\s+(\d{1,2})\s+([a-z]+)\s+au\s+(\d{1,2})\s+([a-z]+)/)
  if (!rangeMatch) return null
  return parseFrenchMonthDate(rangeMatch[1], rangeMatch[2])
}

const buildDiscordMessageUrl = (guildId: string, channelId: string, messageId: string) =>
  `https://discord.com/channels/${guildId}/${channelId}/${messageId}`

const parseEventUrlFromLine = (line: string): string | null => {
  const markdownLinkMatch = line.match(/\[[^\]]+\]\((https?:\/\/[^\s)]+)\)/i)
  if (markdownLinkMatch) return markdownLinkMatch[1]

  const directUrlMatch = line.match(/https?:\/\/[^\s)]+/i)
  return directUrlMatch ? directUrlMatch[0] : null
}

const cleanEventTitle = (line: string) =>
  line
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gi, '$1')
    .trim()

const parseEventsFromDiscordMessage = (opts: {
  message: DiscordMessage
  guildId: string
  channelId: string
}): CalendarEvent[] => {
  const embedText = (opts.message.embeds || [])
    .flatMap((embed) => {
      const fieldLines = (embed.fields || []).flatMap((field) => {
        const lines: string[] = []
        if (field.name) lines.push(field.name)
        if (field.value) lines.push(field.value)
        return lines
      })
      return [embed.title || '', embed.description || '', ...fieldLines]
    })
    .join('\n')
  const sourceText = `${opts.message.content || ''}\n${embedText}`.trim()
  if (!sourceText) return []

  const weekStart = parseWeekStartDate(sourceText)
  if (!weekStart) return []

  const messageUrl = buildDiscordMessageUrl(opts.guildId, opts.channelId, opts.message.id)
  const lines = sourceText
    .split('\n')
    .map((line) => sanitizeDiscordLine(line))
    .filter(Boolean)
  const events: CalendarEvent[] = []
  let currentDayOffset: number | null = null

  for (const line of lines) {
    const weekdayKey = normalizeFrenchText(line).replace(/:$/, '')
    if (weekdayKey in FRENCH_WEEKDAY_OFFSETS) {
      currentDayOffset = FRENCH_WEEKDAY_OFFSETS[weekdayKey]
      continue
    }

    const timeMatch = line.match(/^(\d{1,2})(?:\s*(?::|h)\s*(\d{2}))?\s*(?:[-–—]|:)?\s+(.+)$/i)
    if (!timeMatch || currentDayOffset === null) continue

    const hours = Number(timeMatch[1])
    const minutes = Number(timeMatch[2] || '00')
    const rawTitle = timeMatch[3].trim()
    const maybeLink = parseEventUrlFromLine(rawTitle)
    const eventTitle = cleanEventTitle(rawTitle)

    if (!eventTitle) continue

    const startAt = new Date(weekStart)
    startAt.setDate(weekStart.getDate() + currentDayOffset)
    startAt.setHours(hours, minutes, 0, 0)

    // If line explicitly contains a day/month (e.g. "20/03"), it overrides inferred weekday.
    const explicitDateMatch = rawTitle.match(/\b(\d{1,2})\/(\d{1,2})\b/)
    if (explicitDateMatch) {
      const explicitDay = Number(explicitDateMatch[1])
      const explicitMonth = Number(explicitDateMatch[2]) - 1
      if (explicitDay >= 1 && explicitDay <= 31 && explicitMonth >= 0 && explicitMonth <= 11) {
        startAt.setMonth(explicitMonth, explicitDay)
      }
    }

    if (Number.isNaN(startAt.getTime())) continue

    events.push({
      id: `${opts.message.id}-${currentDayOffset}-${hours}-${minutes}-${events.length}`,
      title: eventTitle,
      description: 'Details disponibles dans la sortie Discord.',
      startAt: startAt.toISOString(),
      endAt: null,
      status: startAt.getTime() >= Date.now() ? 'scheduled' : 'completed',
      participants: 0,
      location: 'Discord',
      imageUrl: null,
      eventUrl: maybeLink || (opts.message.embeds || []).find((embed) => embed.url)?.url || messageUrl
    })
  }

  return events
}

const toCalendarStatus = (status: string | undefined): CalendarEvent['status'] => {
  if (!status) return 'scheduled'
  return BRIDGE_STATUS_LABEL[String(status).toLowerCase()] || 'scheduled'
}

const toIsoDate = (value: string | undefined): string | null => {
  if (!value) return null
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed.toISOString()
}

const mapBridgeEvent = (item: BridgeCalendarEvent): CalendarEvent | null => {
  const id = item.postId || item.id
  const title = item.title || item.name
  const startAt = toIsoDate(item.startAt || item.date || item.scheduled_start_time)
  if (!id || !title || !startAt) return null

  const participants = Array.isArray(item.participants)
    ? item.participants.length
    : Number(item.participants ?? item.participantCount ?? item.user_count ?? 0)

  return {
    id: String(id),
    title: String(title),
    description: String(item.description || ''),
    startAt,
    endAt: toIsoDate(item.endAt || item.scheduled_end_time),
    status: toCalendarStatus(item.status),
    participants: Number.isFinite(participants) ? participants : 0,
    location: String(item.location || 'Discord'),
    imageUrl: item.imageUrl || item.image || null,
    eventUrl: item.eventUrl || item.url || item.link || item.permalink || null
  }
}

const filterAndSortEvents = (items: CalendarEvent[], includePast: boolean, limit: number | null) => {
  const now = Date.now()
  const filteredItems = items
    .filter((item) => (includePast ? item.status !== 'canceled' : STATUS_WHITELIST_DEFAULT.has(item.status)))
    .filter((item) => (includePast ? true : new Date(item.startAt).getTime() >= now))
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
  return limit === null ? filteredItems : filteredItems.slice(0, limit)
}

const fetchFromBridgeApi = async (opts: {
  url: string
  apiKey?: string
  includePast: boolean
  limit: number | null
}): Promise<CalendarEvent[]> => {
  const headers: Record<string, string> = {}
  if (opts.apiKey) {
    headers.Authorization = `Bearer ${opts.apiKey}`
    headers['x-api-key'] = opts.apiKey
  }

  const bridgeResponse = await $fetch<BridgeCalendarResponse>(opts.url, {
    query: {
      limit: opts.limit === null ? undefined : opts.limit,
      includePast: opts.includePast ? 'true' : 'false'
    },
    headers
  })

  const rawItems = bridgeResponse.data || []
  const mapped = rawItems
    .map(mapBridgeEvent)
    .filter((item): item is CalendarEvent => item !== null)

  return filterAndSortEvents(mapped, opts.includePast, opts.limit)
}

const fetchFromDiscordApi = async (opts: {
  token: string
  guildId: string
  includePast: boolean
  limit: number | null
}): Promise<CalendarEvent[]> => {
  const scheduledEvents = await $fetch<DiscordScheduledEvent[]>(
    `${DISCORD_API_BASE}/guilds/${opts.guildId}/scheduled-events?with_user_count=true`,
    {
      headers: {
        Authorization: `Bot ${opts.token}`,
        'User-Agent': DISCORD_USER_AGENT,
        Accept: 'application/json'
      }
    }
  )

  const mapped = scheduledEvents.map<CalendarEvent>((item) => {
    const status = STATUS_LABEL[item.status]
    const location = item.entity_metadata?.location || 'Discord'
    const imageUrl = item.image
      ? `https://cdn.discordapp.com/guild-events/${item.id}/${item.image}.png?size=1024`
      : null

    return {
      id: item.id,
      title: item.name,
      description: item.description || '',
      startAt: item.scheduled_start_time,
      endAt: item.scheduled_end_time,
      status,
      participants: item.user_count || 0,
      location,
      imageUrl,
      eventUrl: `https://discord.com/events/${opts.guildId}/${item.id}`
    }
  })

  return filterAndSortEvents(mapped, opts.includePast, opts.limit)
}

const fetchFromDiscordChannelMessages = async (opts: {
  token: string
  guildId: string
  channelId: string
  includePast: boolean
  limit: number | null
}): Promise<CalendarEvent[]> => {
  const messages = await $fetch<DiscordMessage[]>(
    `${DISCORD_API_BASE}/channels/${opts.channelId}/messages?limit=30`,
    {
      headers: {
        Authorization: `Bot ${opts.token}`,
        'User-Agent': DISCORD_USER_AGENT,
        Accept: 'application/json'
      }
    }
  )

  const mapped = messages.flatMap((message) =>
    parseEventsFromDiscordMessage({
      message,
      guildId: opts.guildId,
      channelId: opts.channelId
    })
  )

  return filterAndSortEvents(mapped, opts.includePast, opts.limit)
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const limitParam = String(query.limit || '').trim().toLowerCase()
  const limitRaw = Number(limitParam || 12)
  const limit = limitParam === 'all'
    ? null
    : Number.isFinite(limitRaw) ? Math.min(Math.max(Math.floor(limitRaw), 1), 50) : 12
  const includePast = query.includePast === 'true'
  const cacheKey = getCacheKey(includePast, limit)
  const cachedData = readCalendarCache(cacheKey)

  if (cachedData) {
    return {
      ok: true,
      data: cachedData,
      meta: {
        count: cachedData.length,
        source: 'memory_cache'
      }
    }
  }

  const bridgeApiUrl = String(process.env.BOT_CALENDAR_API_URL || '').trim()
  const bridgeApiKey = String(process.env.BOT_CALENDAR_API_KEY || '').trim()
  const botToken = String(process.env.DISCORD_BOT_TOKEN || process.env.DISCORD_TOKEN || '').trim()
  const guildId = String(process.env.DISCORD_GUILD_ID || '').trim()
  const calendarChannelId = String(process.env.DISCORD_CALENDAR_CHANNEL_ID || '').trim()

  try {
    if (bridgeApiUrl) {
      try {
        const bridgeData = await fetchFromBridgeApi({
          url: bridgeApiUrl,
          apiKey: bridgeApiKey || undefined,
          includePast,
          limit
        })
        writeCalendarCache(cacheKey, bridgeData)

        return {
          ok: true,
          data: bridgeData,
          meta: {
            count: bridgeData.length,
            source: 'bot_bridge_api'
          }
        }
      } catch (bridgeError) {
        console.warn('[calendar] bridge fetch failed, fallback to discord direct if configured', bridgeError)
      }
    }

    if (!botToken || !guildId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuration calendrier manquante',
        data: {
          message:
            'Ajoutez BOT_CALENDAR_API_URL (bridge) ou DISCORD_BOT_TOKEN/DISCORD_TOKEN + DISCORD_GUILD_ID (fallback Discord direct). Optionnel: DISCORD_CALENDAR_CHANNEL_ID pour parser le calendrier hebdo poste en channel.'
        }
      })
    }

    if (Date.now() < discordCooldownUntil) {
      return {
        ok: true,
        data: [],
        meta: {
          count: 0,
          source: 'discord_rate_limited_cooldown'
        }
      }
    }

    let discordData: CalendarEvent[] = []
    let calendarSource = 'discord_guild_scheduled_events'
    const canTryChannelFallback = calendarChannelId && calendarChannelId !== guildId
    try {
      discordData = await fetchFromDiscordApi({
        token: botToken,
        guildId,
        includePast,
        limit
      })

      if (discordData.length === 0 && canTryChannelFallback) {
        try {
          discordData = await fetchFromDiscordChannelMessages({
            token: botToken,
            guildId,
            channelId: calendarChannelId,
            includePast,
            limit
          })
          if (discordData.length > 0) {
            calendarSource = 'discord_channel_messages'
          }
        } catch (channelError) {
          const channelErrorStatus = getErrorStatusCode(channelError)
          if (channelErrorStatus === 404) {
            console.warn('[calendar] channel fallback returned 404; verify DISCORD_CALENDAR_CHANNEL_ID')
          } else {
            console.warn('[calendar] channel fallback failed; keeping empty calendar data', channelError)
          }
        }
      }

      writeCalendarCache(cacheKey, discordData)
    } catch (discordError) {
      const discordErrorStatus = getErrorStatusCode(discordError)
      if (discordErrorStatus === 429) {
        discordCooldownUntil = Date.now() + getRetryAfterMs(discordError)

        if (canTryChannelFallback) {
          try {
            discordData = await fetchFromDiscordChannelMessages({
              token: botToken,
              guildId,
              channelId: calendarChannelId,
              includePast,
              limit
            })
            calendarSource = 'discord_channel_messages_fallback_after_429'
            writeCalendarCache(cacheKey, discordData)
            return {
              ok: true,
              data: discordData,
              meta: {
                count: discordData.length,
                source: calendarSource
              }
            }
          } catch (channelError) {
            const channelErrorStatus = getErrorStatusCode(channelError)
            if (channelErrorStatus === 404) {
              console.warn('[calendar] channel fallback after 429 returned 404; verify DISCORD_CALENDAR_CHANNEL_ID and bot permissions')
            } else {
              console.warn('[calendar] channel fallback after 429 failed', channelError)
            }
          }
        }

        return {
          ok: true,
          data: [],
          meta: {
            count: 0,
            source: 'discord_rate_limited'
          }
        }
      }

      if (discordErrorStatus === 401 || discordErrorStatus === 403 || discordErrorStatus === 404) {
        return {
          ok: true,
          data: [],
          meta: {
            count: 0,
            source: 'discord_access_denied_or_not_found'
          }
        }
      }

      const staleData = calendarCache.get(cacheKey)?.data
      if (staleData) {
        return {
          ok: true,
          data: staleData,
          meta: {
            count: staleData.length,
            source: 'memory_cache_stale'
          }
        }
      }

      throw discordError
    }

    return {
      ok: true,
      data: discordData,
      meta: {
        count: discordData.length,
        source: calendarSource
      }
    }
  } catch (error) {
    console.error('[calendar] calendar fetch failed', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Calendrier indisponible',
      data: {
        message: 'Impossible de recuperer les sorties depuis la source calendrier configuree.'
      }
    })
  }
})
