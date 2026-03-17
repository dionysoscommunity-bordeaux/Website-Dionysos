<script setup lang="ts">
import { useConversionTracking } from '~/composables/useConversionTracking'

type Announcement = {
  slug: string
  title: string
  summary: string
  published_at?: string
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

const { data: announcementsResponse } = await useFetch<{ ok: boolean, data: Announcement[] }>('/api/announcements')
const { data: calendarResponse } = await useFetch<{ ok: boolean, data: CalendarEvent[] }>('/api/calendar', {
  query: { limit: 'all' }
})

const announcements = computed(() => announcementsResponse.value?.data || [])
const weekEvents = computed(() => {
  const source = calendarResponse.value?.data || []
  const now = new Date()
  const weekLimit = new Date()
  weekLimit.setDate(weekLimit.getDate() + 7)
  return source
    .filter((item) => {
      const eventDate = new Date(item.startAt)
      return eventDate >= now && eventDate <= weekLimit
    })
})

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
  title: 'Accueil',
  description: 'Communauté locale à Bordeaux pour sorties, rencontres amicales et activités conviviales.',
  path: '/'
})
</script>

<template>
  <main class="relative min-h-screen overflow-x-hidden bg-[#070016] text-slate-100">
    <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <img
        src="/images/branding/dionysos-banner.png"
        alt=""
        loading="lazy"
        decoding="async"
        width="1200"
        height="675"
        class="absolute left-1/2 top-1/2 w-[1200px] max-w-[96vw] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.2] mix-blend-screen"
      >
    </div>
    <div class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#23d9ff]/20 blur-3xl" />
    <div class="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#ff2bb5]/20 blur-3xl" />

    <section class="diony-reveal relative z-10 mx-auto w-full max-w-6xl px-6 pb-10 pt-14 md:pb-12 md:pt-20">

      <h1 class="max-w-4xl bg-gradient-to-r from-[#23d9ff] via-[#7a2cff] to-[#ff2bb5] bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl">
        Une communauté créée par ses membres, organisée par ses membres.
      </h1>

      <p class="mt-5 max-w-3xl text-lg text-slate-200 md:text-xl">
        Dionysos Bordeaux te permet de sortir, rencontrer du monde et proposer tes propres activités.
      </p>

      <p class="mt-3 max-w-3xl text-base text-slate-300">
        Ici, chacun peut prendre l'initiative: proposer une sortie, co-organiser un format, ou simplement rejoindre les événements.
      </p>

      <p class="mt-3 max-w-3xl text-sm text-slate-300">
        Rejoins la communauté directement sur Discord ou Instagram.
      </p>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="https://discord.gg/sRzr3MucHS"
          target="_blank"
          rel="noopener noreferrer"
          @click="trackConversionClick('discord', { placement: 'home_hero' })"
          class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#23d9ff] to-[#0fb8ff] px-6 py-3 text-base font-semibold text-[#050014] shadow-[0_0_30px_rgba(35,217,255,0.35)] transition hover:brightness-110"
        >
          Rejoindre la communauté
        </a>
        <a
          href="https://www.instagram.com/dionysos_bordeaux?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          @click="trackConversionClick('instagram', { placement: 'home_hero' })"
          class="inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/50 bg-[#ff2bb5]/10 px-6 py-3 text-base font-semibold text-[#ff7ad5] shadow-[0_0_24px_rgba(255,43,181,0.2)] transition hover:bg-[#ff2bb5]/20"
        >
          Suivre sur Instagram
        </a>
      </div>

      <div class="mt-8 grid gap-3 sm:grid-cols-3">
        <article class="diony-card rounded-xl border border-white/10 bg-[#0b0322]/65 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-400">Ambiance</p>
          <p class="mt-1 text-sm text-slate-200">Conviviale, locale, sans pression.</p>
        </article>
        <article class="diony-card rounded-xl border border-white/10 bg-[#0b0322]/65 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-400">Formats</p>
          <p class="mt-1 text-sm text-slate-200">Restos, balades, jeux, initiatives membres.</p>
        </article>
        <article class="diony-card rounded-xl border border-white/10 bg-[#0b0322]/65 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-400">Ancrage</p>
          <p class="mt-1 text-sm text-slate-200">Quais, Chartrons, Saint-Michel, Bordeaux.</p>
        </article>
      </div>
    </section>

    <section class="diony-reveal diony-reveal-delay-1 relative z-10 mx-auto w-full max-w-6xl px-6 py-10 md:py-12">
      <div class="mb-7 h-px w-full bg-gradient-to-r from-transparent via-[#23d9ff]/45 to-transparent" />
      <div class="rounded-2xl border border-[#23d9ff]/30 bg-[#0b0322]/75 p-6 shadow-[0_0_40px_rgba(35,217,255,0.08)]">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-[#7be9ff]">A ne pas rater</p>
            <h2 class="mt-2 text-2xl font-bold text-white md:text-4xl">Sorties de la semaine</h2>
            <p class="mt-2 max-w-2xl text-slate-300">
              Voici les prochains rendez-vous prevus cette semaine, avec acces direct a chaque sortie.
            </p>
            <p v-if="weekEvents.length" class="mt-2 text-sm font-semibold text-[#7be9ff]">
              {{ weekEvents.length }} sortie(s) cette semaine.
            </p>
          </div>
          <NuxtLink
            to="/calendrier"
            class="inline-flex items-center justify-center rounded-lg border border-[#23d9ff]/45 px-4 py-2 text-sm font-semibold text-[#7be9ff] transition hover:bg-[#23d9ff]/10"
          >
            Voir toutes les sorties a venir
          </NuxtLink>
        </div>

        <div
          v-if="weekEvents.length"
          class="mt-5 grid max-h-[34rem] gap-4 overflow-y-auto pr-1 md:grid-cols-2"
        >
          <article
            v-for="item in weekEvents"
            :key="item.id"
            class="diony-card rounded-2xl border border-[#23d9ff]/20 bg-[#090220]/80 p-5"
          >
            <p class="text-lg font-semibold text-white">{{ item.title }}</p>
            <p class="mt-2 text-sm text-slate-300">{{ formatDate(item.startAt) }} · {{ item.location }}</p>
            <a
              v-if="item.eventUrl"
              :href="item.eventUrl"
              target="_blank"
              rel="noopener noreferrer"
              @click="trackConversionClick('discord', { placement: 'home_weekly_events' })"
              class="mt-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#23d9ff] to-[#0fb8ff] px-4 py-2 text-sm font-semibold text-[#050014] transition hover:brightness-110"
            >
              Voir la sortie sur Discord
            </a>
          </article>
        </div>

        <div v-else class="mt-5 rounded-xl border border-white/10 bg-[#0b0322]/60 p-4 text-sm text-slate-300">
          Aucune sortie planifiee cette semaine pour le moment. Consulte tout de meme le calendrier complet.
        </div>
      </div>
    </section>

    <section class="diony-reveal diony-reveal-delay-1 relative z-10 mx-auto w-full max-w-6xl px-6 py-10 md:py-12">
      <div class="mb-7 h-px w-full bg-gradient-to-r from-transparent via-[#23d9ff]/45 to-transparent" />
      <h2 class="text-2xl font-bold text-white md:text-4xl">Ce qui nous différencie</h2>
      <p class="mt-4 max-w-3xl text-lg text-slate-200">
        Notre communauté n'est pas animée "pour" ses membres: elle est construite et animée "par" ses membres.
      </p>
      <div class="mt-6 grid gap-4 md:grid-cols-6">
        <article class="diony-card rounded-2xl border border-[#23d9ff]/25 bg-[#0b0322]/70 p-5 md:col-span-2">
          <p class="text-base font-semibold text-[#7be9ff]">Proposer</p>
          <p class="mt-2 text-slate-300">Tu peux lancer une idée de sortie et trouver des gens motivés.</p>
        </article>
        <article class="diony-card rounded-2xl border border-[#ff2bb5]/30 bg-[#120427]/75 p-5 md:col-span-2">
          <p class="text-base font-semibold text-[#7be9ff]">Co-organiser</p>
          <p class="mt-2 text-slate-300">Les formats évoluent selon les envies réelles des membres.</p>
        </article>
        <article class="diony-card rounded-2xl border border-[#23d9ff]/25 bg-[#0b0322]/70 p-5 md:col-span-2">
          <p class="text-base font-semibold text-[#7be9ff]">Participer</p>
          <p class="mt-2 text-slate-300">Tu arrives seul ou accompagné: l'objectif reste de créer du lien social.</p>
        </article>
      </div>
    </section>

    <section class="diony-reveal diony-reveal-delay-2 relative z-10 mx-auto w-full max-w-6xl px-6 py-10 md:py-12">
      <div class="mb-7 h-px w-full bg-gradient-to-r from-transparent via-[#ff2bb5]/45 to-transparent" />
      <h2 class="text-2xl font-bold text-white md:text-4xl">Explore en un scroll</h2>
      <p class="mt-3 max-w-3xl text-slate-300">
        Chaque section du site répond à une question simple: quoi faire, avec qui, et comment rejoindre.
      </p>
      <div class="mt-6 grid gap-4 md:grid-cols-6">
        <NuxtLink to="/activites" class="diony-card group rounded-2xl border border-[#23d9ff]/25 bg-[#0b0322]/70 p-5 transition hover:-translate-y-0.5 hover:border-[#23d9ff]/50 hover:bg-[#0f0730]/80 md:col-span-4">
          <p class="text-lg font-semibold text-white">Activités</p>
          <p class="mt-2 text-slate-300">Preview des sorties: restos, balades, jeux et formats hebdo.</p>
          <p class="mt-4 text-sm font-semibold text-[#7be9ff] group-hover:text-[#9df1ff]">Voir les activités →</p>
        </NuxtLink>
        <NuxtLink to="/communaute" class="diony-card group rounded-2xl border border-[#ff2bb5]/30 bg-[#0b0322]/70 p-5 transition hover:-translate-y-0.5 hover:border-[#ff2bb5]/55 hover:bg-[#13052f]/80 md:col-span-2">
          <p class="text-lg font-semibold text-white">Communauté</p>
          <p class="mt-2 text-slate-300">Preuve sociale, ambiance et retours des membres.</p>
          <p class="mt-4 text-sm font-semibold text-[#ff7ad5] group-hover:text-[#ff9de2]">Découvrir la communauté →</p>
        </NuxtLink>
        <NuxtLink to="/partenaires" class="diony-card group rounded-2xl border border-[#23d9ff]/25 bg-[#0b0322]/70 p-5 transition hover:-translate-y-0.5 hover:border-[#23d9ff]/50 hover:bg-[#0f0730]/80 md:col-span-3">
          <p class="text-lg font-semibold text-white">Partenaires</p>
          <p class="mt-2 text-slate-300">Collaborations locales à Bordeaux et opportunités B2B.</p>
          <p class="mt-4 text-sm font-semibold text-[#7be9ff] group-hover:text-[#9df1ff]">Voir les partenaires →</p>
        </NuxtLink>
        <article class="diony-card rounded-2xl border border-[#ff2bb5]/25 bg-[#120427]/70 p-5 md:col-span-3">
          <p class="text-sm font-semibold uppercase tracking-wide text-[#ff9de2]">Repères locaux</p>
          <p class="mt-2 text-slate-300">
            On garde un ADN bordelais concret: lieux accessibles, horaires réalistes, et formats simples à rejoindre.
          </p>
        </article>
      </div>
    </section>

    <section class="diony-reveal diony-reveal-delay-2 relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:pb-20 md:pt-12">
      <div class="mb-7 h-px w-full bg-gradient-to-r from-transparent via-[#23d9ff]/45 to-transparent" />
      <h2 class="text-2xl font-bold text-white md:text-4xl">Annonces communautaires</h2>
      <p class="mt-3 max-w-3xl text-slate-300">
        Les infos utiles de la semaine, publiées par les membres et l'équipe d'orga.
      </p>
      <div v-if="announcements.length" class="mt-5 grid gap-4 md:grid-cols-2">
        <article
          v-for="item in announcements.slice(0, 4)"
          :key="item.slug"
          class="diony-card rounded-2xl border border-[#23d9ff]/20 bg-[#0b0322]/80 p-5"
        >
          <p class="text-lg font-semibold text-white">{{ item.title }}</p>
          <p class="mt-2 text-slate-300">{{ item.summary }}</p>
          <p v-if="item.published_at" class="mt-3 text-xs text-[#7be9ff]">Publié le {{ new Date(item.published_at).toLocaleDateString('fr-FR') }}</p>
        </article>
      </div>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="https://discord.gg/sRzr3MucHS"
          target="_blank"
          rel="noopener noreferrer"
          @click="trackConversionClick('discord', { placement: 'home_bottom' })"
          class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#23d9ff] to-[#0fb8ff] px-6 py-3 text-base font-semibold text-[#050014] shadow-[0_0_30px_rgba(35,217,255,0.35)] transition hover:brightness-110"
        >
          Je rejoins le Discord
        </a>
        <a
          href="https://www.instagram.com/dionysos_bordeaux?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          @click="trackConversionClick('instagram', { placement: 'home_bottom' })"
          class="inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/50 bg-[#ff2bb5]/10 px-6 py-3 text-base font-semibold text-[#ff7ad5] shadow-[0_0_24px_rgba(255,43,181,0.2)] transition hover:bg-[#ff2bb5]/20"
        >
          Je regarde Instagram
        </a>
      </div>
    </section>
  </main>
</template>
