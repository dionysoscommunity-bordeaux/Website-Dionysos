<script setup lang="ts">
import { useConversionTracking } from '~/composables/useConversionTracking'

type Announcement = {
  slug: string
  title: string
  summary: string
  published_at?: string
}

const { data: announcementsResponse } = await useFetch<{ ok: boolean, data: Announcement[] }>('/api/announcements')
const announcements = computed(() => announcementsResponse.value?.data || [])
const { trackConversionClick } = useConversionTracking()

usePageSeo({
  title: 'Accueil',
  description: 'Communauté locale à Bordeaux pour sorties, rencontres amicales et activités conviviales.',
  path: '/'
})
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-[#070016] text-slate-100">
    <div class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#23d9ff]/20 blur-3xl" />
    <div class="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#ff2bb5]/20 blur-3xl" />

    <section class="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p class="mb-4 inline-flex rounded-full border border-[#23d9ff]/50 bg-[#23d9ff]/10 px-4 py-1 text-sm font-medium text-[#7be9ff]">
        Communauté locale à Bordeaux
      </p>

      <h1 class="max-w-3xl bg-gradient-to-r from-[#23d9ff] via-[#7a2cff] to-[#ff2bb5] bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl">
        Dionysos Bordeaux, la communauté qui te fait sortir.
      </h1>

      <p class="mt-6 max-w-3xl text-lg text-slate-200 md:text-xl">
        Ici, pas de dating : on crée du lien social simple et chaleureux autour d'activités comme restos, balades, apéros, jeux et clubs de lecture.
      </p>

      <p class="mt-3 max-w-3xl text-base text-slate-300">
        Nos valeurs : inclusion, bienveillance et authenticité.
      </p>

      <ul class="mt-4 flex flex-wrap gap-2">
        <li class="rounded-full border border-[#23d9ff]/35 bg-[#23d9ff]/10 px-3 py-1 text-sm text-[#7be9ff]">
          Sortir plus souvent
        </li>
        <li class="rounded-full border border-[#23d9ff]/35 bg-[#23d9ff]/10 px-3 py-1 text-sm text-[#7be9ff]">
          Rencontrer du monde
        </li>
        <li class="rounded-full border border-[#23d9ff]/35 bg-[#23d9ff]/10 px-3 py-1 text-sm text-[#7be9ff]">
          Participer à des activités conviviales
        </li>
      </ul>

      <p class="mt-3 max-w-3xl text-base text-slate-300">
        Tu arrives seul ou accompagné, tu es le bienvenu : tout le monde peut proposer une sortie et trouver sa place.
      </p>

      <p class="mt-3 max-w-3xl text-base text-slate-300">
        Nos sorties vivent dans tout Bordeaux : quais, Saint-Michel, Chartrons, Victoire, Gambetta et autour de la Garonne.
      </p>

      <p class="mt-3 max-w-3xl text-sm text-slate-300">
        Aucun compte site n'est requis avant redirection vers Discord ou Instagram.
      </p>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="https://discord.gg/sRzr3MucHS"
          target="_blank"
          rel="noopener noreferrer"
          @click="trackConversionClick('discord', { placement: 'home_hero' })"
          class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#23d9ff] to-[#0fb8ff] px-6 py-3 text-base font-semibold text-[#050014] shadow-[0_0_30px_rgba(35,217,255,0.35)] transition hover:brightness-110"
        >
          Rejoindre sur Discord
        </a>
        <a
          href="https://www.instagram.com/dionysos_bordeaux?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          @click="trackConversionClick('instagram', { placement: 'home_hero' })"
          class="inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/50 bg-[#ff2bb5]/10 px-6 py-3 text-base font-semibold text-[#ff7ad5] shadow-[0_0_24px_rgba(255,43,181,0.2)] transition hover:bg-[#ff2bb5]/20"
        >
          Voir Instagram
        </a>
      </div>
    </section>

    <section class="relative mx-auto max-w-6xl px-6 pb-16">
      <h2 class="text-2xl font-bold text-white md:text-3xl">Annonces communautaires</h2>
      <p class="mt-2 max-w-3xl text-slate-300">
        Les infos utiles de la semaine, mises à jour par l'équipe via le CMS.
      </p>

      <div v-if="announcements.length" class="mt-5 grid gap-4 md:grid-cols-2">
        <article
          v-for="item in announcements.slice(0, 4)"
          :key="item.slug"
          class="rounded-2xl border border-[#23d9ff]/20 bg-[#0b0322]/80 p-5"
        >
          <p class="text-lg font-semibold text-white">{{ item.title }}</p>
          <p class="mt-2 text-slate-300">{{ item.summary }}</p>
          <p v-if="item.published_at" class="mt-3 text-xs text-[#7be9ff]">Publié le {{ new Date(item.published_at).toLocaleDateString('fr-FR') }}</p>
        </article>
      </div>
    </section>
  </main>
</template>
