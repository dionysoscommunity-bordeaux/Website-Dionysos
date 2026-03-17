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

const { data: calendarResponse } = await useFetch<{ ok: boolean, data: CalendarEvent[] }>('/api/calendar', {
  query: { limit: 'all' }
})

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
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-[#7be9ff]">A ne pas rater</p>
          <h2 class="mt-2 text-2xl font-bold text-white md:text-4xl">Sorties à venir</h2>
          <p class="mt-2 max-w-2xl text-slate-300">
            Voici les prochains rendez-vous de la communauté, avec accès direct à chaque sortie.
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
      <div class="space-y-10">
        <section class="text-center">
          <p class="text-base font-semibold uppercase tracking-[0.2em] text-[#7be9ff] md:text-lg">Nos partenaires</p>
          <div class="mt-8 flex flex-wrap items-start justify-center gap-14 md:gap-24">
            <div class="flex flex-col items-center text-center">
              <img
                src="/images/partners/ragnarok.png"
                alt="Logo Ragnarok Bordeaux"
                loading="lazy"
                decoding="async"
                class="h-40 w-40 object-contain md:h-48 md:w-48"
              >
              <p class="mt-4 text-lg font-bold text-white">Ragnarok Bordeaux</p>
            </div>
            <div class="flex flex-col items-center text-center">
              <img
                src="/images/partners/wash-bar.png"
                alt="Logo Wash Bar Bordeaux"
                loading="lazy"
                decoding="async"
                class="h-40 w-40 object-contain md:h-48 md:w-48"
              >
              <p class="mt-4 text-lg font-bold text-white">Wash Bar Bordeaux</p>
            </div>
          </div>
          <NuxtLink
            to="/partenaires"
            class="mt-6 inline-flex items-center justify-center rounded-lg border border-[#23d9ff]/55 px-5 py-2.5 text-sm font-semibold text-[#7be9ff] transition hover:bg-[#23d9ff]/10"
          >
            Voir tous les partenaires
          </NuxtLink>
        </section>
        <div class="mx-auto h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-[#ff9de2]/45 to-transparent" />
        <section>
          <p class="text-sm font-semibold uppercase tracking-wide text-[#ff9de2]">Temoignage membre</p>
          <p class="mt-2 text-slate-300">Un retour partage par un membre actif de la communaute :</p>
          <blockquote class="mt-4 border-l-2 border-[#ff9de2]/45 pl-4 text-slate-200">
            <p class="whitespace-pre-line">"Depuis que j’ai rejoint ce serveur je n’ai plus beaucoup de temps libre, ce qui est une bonne nouvelle!

Ses membres sont des gens absolument fantastiques et c’est toujours un immense plaisir de voir de nouvelles têtes!

Je tenais également à remercier l’équipe de modération pour le taff conséquent qu’elle fait! On sait que c’est pas simple de gérer un serveur de 1000 membres, mais vous vous en sortez très bien!

Encore une fois merci à tous et on se retrouve à une prochaine soirée! 🤍"</p>
          </blockquote>
          <p class="mt-3 text-sm font-semibold text-[#ff9de2]">- Membre Dionysos Bordeaux</p>
          <a
            href="https://disboard.org/server/1095026129619918981"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/45 bg-[#ff2bb5]/10 px-4 py-2 text-sm font-semibold text-[#ff9de2] transition hover:bg-[#ff2bb5]/20"
          >
            Voir davantage d'avis sur Disboard
          </a>
        </section>
      </div>
    </section>

  </main>
</template>
