<script setup lang="ts">
import { useConversionTracking } from '~/composables/useConversionTracking'

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

type CalendarResponse = {
  ok: boolean
  data: CalendarEvent[]
  meta?: {
    count: number
    source: string
  }
}

const { data, pending, error, refresh } = await useFetch<CalendarResponse>('/api/calendar', {
  query: { limit: 'all' }
})

const events = computed(() => data.value?.data || [])

const statusLabel: Record<CalendarEvent['status'], string> = {
  scheduled: 'A venir',
  active: 'En cours',
  completed: 'Termine',
  canceled: 'Annule'
}

const statusClass: Record<CalendarEvent['status'], string> = {
  scheduled: 'border-[#23d9ff]/40 bg-[#23d9ff]/10 text-[#7be9ff]',
  active: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
  completed: 'border-slate-400/30 bg-slate-400/10 text-slate-300',
  canceled: 'border-rose-400/30 bg-rose-400/10 text-rose-300'
}

const formatDate = (input: string) =>
  new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(input))

const { trackConversionClick } = useConversionTracking()

usePageSeo({
  title: 'Calendrier des sorties',
  description: 'Consultez les prochaines sorties Dionysos Bordeaux synchronisees depuis le calendrier Discord.',
  path: '/calendrier'
})
</script>

<template>
  <main class="relative min-h-screen overflow-x-hidden bg-[#070016] text-slate-100">
    <div class="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#23d9ff]/20 blur-3xl" />
    <div class="pointer-events-none absolute -right-10 top-1/3 h-80 w-80 rounded-full bg-[#ff2bb5]/20 blur-3xl" />

    <section class="diony-reveal relative mx-auto w-full max-w-6xl px-6 pb-10 pt-14 md:pb-12 md:pt-20">
      <p class="mb-4 inline-flex rounded-full border border-[#23d9ff]/50 bg-[#23d9ff]/10 px-4 py-1 text-sm font-medium text-[#7be9ff]">
        Calendrier communautaire
      </p>
      <h1 class="max-w-4xl bg-gradient-to-r from-[#23d9ff] via-[#7a2cff] to-[#ff2bb5] bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl">
        Les prochaines sorties, en temps reel depuis Discord.
      </h1>
      <p class="mt-5 max-w-3xl text-lg text-slate-200 md:text-xl">
        Ce calendrier reprend automatiquement les evenements planifies sur le serveur Dionysos.
      </p>

    </section>

    <section class="diony-reveal diony-reveal-delay-1 relative mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:pb-20 md:pt-12">
      <div class="mb-7 h-px w-full bg-gradient-to-r from-transparent via-[#23d9ff]/45 to-transparent" />

      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-2xl font-bold text-white md:text-3xl">Toutes les sorties a venir</h2>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-lg border border-[#23d9ff]/40 px-4 py-2 text-sm font-semibold text-[#7be9ff] transition hover:bg-[#23d9ff]/10"
          @click="refresh"
        >
          Rafraichir
        </button>
      </div>

      <p v-if="pending" class="rounded-xl border border-white/10 bg-[#0b0322]/60 p-4 text-slate-300">
        Chargement du calendrier...
      </p>

      <div v-else-if="error" class="rounded-xl border border-rose-300/30 bg-rose-300/10 p-4 text-rose-200">
        <p class="font-semibold">Le calendrier est temporairement indisponible.</p>
        <p class="mt-1 text-sm text-rose-100/90">
          Verifiez la configuration Discord (token/guild) ou reessayez dans quelques instants.
        </p>
      </div>

      <div v-else-if="events.length === 0" class="rounded-xl border border-white/10 bg-[#0b0322]/60 p-4 text-slate-300">
        Aucune sortie planifiee pour le moment.
      </div>

      <div v-else class="grid gap-4 md:grid-cols-6">
        <article
          v-for="item in events"
          :key="item.id"
          class="diony-card rounded-2xl border border-[#23d9ff]/20 bg-[#0b0322]/80 p-5 md:col-span-3"
        >
          <div class="flex flex-wrap items-start justify-between gap-3">
            <h3 class="text-lg font-bold text-white">{{ item.title }}</h3>
            <span class="rounded-full border px-2.5 py-1 text-xs font-semibold" :class="statusClass[item.status]">
              {{ statusLabel[item.status] }}
            </span>
          </div>

          <p class="mt-2 text-sm text-slate-200">{{ formatDate(item.startAt) }}</p>
          <p v-if="item.endAt" class="text-xs text-slate-400">Fin: {{ formatDate(item.endAt) }}</p>

          <p class="mt-3 text-sm text-slate-300">{{ item.description || 'Description a venir.' }}</p>

          <div class="mt-4">
            <a
              v-if="item.eventUrl"
              :href="item.eventUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center rounded-lg border border-[#23d9ff]/45 px-3 py-2 text-xs font-semibold text-[#7be9ff] transition hover:bg-[#23d9ff]/10"
            >
              Ouvrir la sortie sur Discord
            </a>
          </div>
        </article>
      </div>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="https://discord.gg/sRzr3MucHS"
          target="_blank"
          rel="noopener noreferrer"
          @click="trackConversionClick('discord', { placement: 'calendar_bottom' })"
          class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#23d9ff] to-[#0fb8ff] px-6 py-3 text-base font-semibold text-[#050014] shadow-[0_0_30px_rgba(35,217,255,0.35)] transition hover:brightness-110"
        >
          Rejoindre le Discord
        </a>
        <NuxtLink
          to="/activites"
          class="inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/50 bg-[#ff2bb5]/10 px-6 py-3 text-base font-semibold text-[#ff7ad5] transition hover:bg-[#ff2bb5]/20"
        >
          Voir les types d activites
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
