<script setup lang="ts">
import { useConversionTracking } from '~/composables/useConversionTracking'

type ActivityCategory = {
  title: string
  summary: string
  frequency: string
  format: string
  vibe: string
  examples: string[]
}

type ActivityMedia = {
  title: string
  src: string
  alt: string
  category: string
  publishedAt: string
  location: string
  format: string
  participants: string
}

const categories: ActivityCategory[] = [
  {
    title: 'Sorties food & bars',
    summary: 'Découvrir de bonnes adresses à Bordeaux en petit ou moyen groupe.',
    frequency: 'Hebdomadaire',
    format: 'IRL - soirée',
    vibe: 'Convivial, détendu',
    examples: ['Restau de quartier', 'Afterwork', 'Bar à thème']
  },
  {
    title: 'Balades & explorations',
    summary: 'Profiter de la ville et de ses spots en mode chill.',
    frequency: '1 à 2 fois par mois',
    format: 'IRL - journée ou fin de journée',
    vibe: 'Simple, accessible',
    examples: ['Balade quais', 'Parcs', 'Visite de lieux insolites']
  },
  {
    title: 'Jeux & activités ludiques',
    summary: 'Créer du lien rapidement autour de formats fun.',
    frequency: 'Hebdomadaire',
    format: 'IRL + parfois vocal Discord',
    vibe: 'Fun, inclusif',
    examples: ['Jeux de société', 'Blind test', 'Quiz']
  },
  {
    title: 'Culture & moments calmes',
    summary: 'Des activités pour les personnes qui préfèrent des formats plus posés.',
    frequency: 'Mensuel',
    format: 'IRL',
    vibe: 'Positif, bienveillant',
    examples: ['Club lecture', 'Expo', 'Cinéma en groupe']
  },
  {
    title: 'Temps forts communautaires',
    summary: 'Les gros rendez-vous qui marquent la vie du serveur.',
    frequency: 'Ponctuel',
    format: 'IRL - événement',
    vibe: 'Énergie collective',
    examples: ['Soirées spéciales', 'Anniversaires communautaires', 'Rencontres partenaires']
  }
]

type ActivityMediaResponse = {
  slug: string
  title: string
  src: string
  alt: string
  category: string
  published_at: string
  location: string
  format: string
  participants: string
}

const { data: activitiesResponse } = await useFetch<{ ok: boolean, data: ActivityMediaResponse[] }>('/api/activities')
const mediaItems = computed<ActivityMedia[]>(() =>
  (activitiesResponse.value?.data || []).map((item) => ({
    title: item.title,
    src: item.src,
    alt: item.alt,
    category: item.category,
    publishedAt: item.published_at,
    location: item.location,
    format: item.format,
    participants: item.participants
  }))
)
const { trackConversionClick } = useConversionTracking()

const formatPublishedDate = (date: string) =>
  new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

usePageSeo({
  title: 'Activités',
  description: 'Découvrez les activités Dionysos à Bordeaux : sorties, balades, jeux, culture et temps forts communautaires.',
  path: '/activites'
})
</script>

<template>
  <main class="relative min-h-screen overflow-x-hidden bg-[#070016] text-slate-100">
    <div class="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#23d9ff]/20 blur-3xl" />
    <div class="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#ff2bb5]/20 blur-3xl" />

    <section class="diony-reveal relative mx-auto w-full max-w-6xl px-6 pb-10 pt-14 md:pb-12 md:pt-20">
      <p class="mb-4 inline-flex rounded-full border border-[#23d9ff]/50 bg-[#23d9ff]/10 px-4 py-1 text-sm font-medium text-[#7be9ff]">
        Activités Dionysos
      </p>

      <h1 class="max-w-3xl bg-gradient-to-r from-[#23d9ff] via-[#7a2cff] to-[#ff2bb5] bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl">
        Des activités pour tous les styles.
      </h1>

      <p class="mt-5 max-w-3xl text-lg text-slate-200 md:text-xl">
        Voici les formats proposés par la communauté. Chaque bloc précise le rythme et l'ambiance pour t'aider à te projeter facilement.
      </p>
      <p class="mt-3 max-w-3xl text-base text-slate-300">
        Les activités se déroulent dans Bordeaux au sens large, selon les propositions des membres et les bons plans du moment.
      </p>

      <div class="mt-8 grid gap-3 sm:grid-cols-3">
        <article class="diony-card rounded-xl border border-white/10 bg-[#0b0322]/65 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-400">Fréquence</p>
          <p class="mt-1 text-sm text-slate-200">Formats réguliers + temps forts ponctuels.</p>
        </article>
        <article class="diony-card rounded-xl border border-white/10 bg-[#0b0322]/65 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-400">Accessibilité</p>
          <p class="mt-1 text-sm text-slate-200">Activités simples à rejoindre, même en solo.</p>
        </article>
        <article class="diony-card rounded-xl border border-white/10 bg-[#0b0322]/65 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-400">Local</p>
          <p class="mt-1 text-sm text-slate-200">Repères bordelais concrets sur chaque format.</p>
        </article>
      </div>
    </section>

    <section class="diony-reveal diony-reveal-delay-1 relative mx-auto w-full max-w-6xl px-6 py-10 md:py-12">
      <div class="mb-7 h-px w-full bg-gradient-to-r from-transparent via-[#23d9ff]/45 to-transparent" />
      <div class="grid gap-5 md:grid-cols-2">
      <p class="md:col-span-2 text-sm text-slate-300">
        Taxonomie des activités : chaque type indique un rythme, un format et une ambiance pour aider à choisir rapidement.
      </p>
      <article
        v-for="category in categories"
        :key="category.title"
        class="diony-card rounded-2xl border border-[#23d9ff]/20 bg-[#0b0322]/80 p-6 shadow-[0_0_18px_rgba(35,217,255,0.08)] transition hover:-translate-y-0.5 hover:border-[#23d9ff]/35"
      >
        <h2 class="text-2xl font-bold text-white">{{ category.title }}</h2>
        <p class="mt-3 text-slate-300">{{ category.summary }}</p>

        <dl class="mt-4 grid gap-2 text-sm">
          <div class="flex flex-wrap gap-2">
            <dt class="font-semibold text-[#7be9ff]">Rythme:</dt>
            <dd class="text-slate-200">{{ category.frequency }}</dd>
          </div>
          <div class="flex flex-wrap gap-2">
            <dt class="font-semibold text-[#7be9ff]">Format:</dt>
            <dd class="text-slate-200">{{ category.format }}</dd>
          </div>
          <div class="flex flex-wrap gap-2">
            <dt class="font-semibold text-[#7be9ff]">Ambiance:</dt>
            <dd class="text-slate-200">{{ category.vibe }}</dd>
          </div>
        </dl>

        <ul class="mt-4 flex flex-wrap gap-2">
          <li
            v-for="example in category.examples"
            :key="example"
            class="rounded-full border border-[#ff2bb5]/40 bg-[#ff2bb5]/10 px-3 py-1 text-xs font-medium text-[#ff7ad5]"
          >
            {{ example }}
          </li>
        </ul>
      </article>
      </div>
    </section>

    <section class="diony-reveal diony-reveal-delay-1 relative mx-auto w-full max-w-6xl px-6 py-10 md:py-12">
      <div class="mb-7 h-px w-full bg-gradient-to-r from-transparent via-[#ff2bb5]/45 to-transparent" />
      <h2 class="text-2xl font-bold text-white md:text-3xl">Repères bordelais fréquents</h2>
      <p class="mt-2 max-w-3xl text-slate-300">
        Sans page quartier dédiée, on garde des références concrètes pour montrer la réalité locale des sorties.
      </p>
      <ul class="mt-4 flex flex-wrap gap-2">
        <li class="rounded-full border border-[#23d9ff]/35 bg-[#23d9ff]/10 px-3 py-1 text-sm text-[#7be9ff]">Quais</li>
        <li class="rounded-full border border-[#23d9ff]/35 bg-[#23d9ff]/10 px-3 py-1 text-sm text-[#7be9ff]">Saint-Michel</li>
        <li class="rounded-full border border-[#23d9ff]/35 bg-[#23d9ff]/10 px-3 py-1 text-sm text-[#7be9ff]">Chartrons</li>
        <li class="rounded-full border border-[#23d9ff]/35 bg-[#23d9ff]/10 px-3 py-1 text-sm text-[#7be9ff]">Victoire</li>
        <li class="rounded-full border border-[#23d9ff]/35 bg-[#23d9ff]/10 px-3 py-1 text-sm text-[#7be9ff]">Gambetta</li>
        <li class="rounded-full border border-[#23d9ff]/35 bg-[#23d9ff]/10 px-3 py-1 text-sm text-[#7be9ff]">Bassins à flot</li>
      </ul>
    </section>

    <section class="diony-reveal diony-reveal-delay-2 relative mx-auto w-full max-w-6xl px-6 py-10 md:py-12">
      <div class="mb-7 h-px w-full bg-gradient-to-r from-transparent via-[#23d9ff]/45 to-transparent" />
      <div class="mb-6">
        <h2 class="text-3xl font-bold text-white md:text-4xl">Exemples concrets en images</h2>
        <p class="mt-2 max-w-3xl text-slate-300">
          Aperçu des formats organisés par la communauté. Chaque visuel est optimisé (lazy-load + dimensions + alt) et inclut des informations de contexte utiles.
        </p>
      </div>

      <div class="grid gap-5 md:grid-cols-6">
        <figure
          v-for="item in mediaItems"
          :key="item.title"
          class="diony-card overflow-hidden rounded-2xl border border-[#23d9ff]/20 bg-[#0b0322]/80 transition hover:-translate-y-0.5 hover:border-[#23d9ff]/35 md:col-span-3"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            loading="lazy"
            decoding="async"
            width="1200"
            height="800"
            class="h-auto w-full"
          >
          <figcaption class="space-y-1 p-4">
            <p class="font-semibold text-white">{{ item.title }}</p>
            <p class="text-sm text-slate-300">{{ item.category }}</p>
            <p class="text-xs text-slate-300">Format : {{ item.format }} · Participants : {{ item.participants }}</p>
            <p class="text-xs text-[#7be9ff]">
              Publié : {{ formatPublishedDate(item.publishedAt) }} · Lieu : {{ item.location }}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="diony-reveal diony-reveal-delay-2 relative mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:pb-20 md:pt-12">
      <div class="mb-7 h-px w-full bg-gradient-to-r from-transparent via-[#ff2bb5]/45 to-transparent" />
      <div class="rounded-2xl border border-[#23d9ff]/30 bg-[#0b0322]/85 p-6 md:p-8">
        <h2 class="text-2xl font-bold text-white md:text-3xl">Rejoindre la communauté</h2>
        <p class="mt-3 max-w-3xl text-slate-300">
          Tu peux rejoindre Dionysos en un clic via Discord ou Instagram. Aucun compte site n'est requis avant redirection.
        </p>
        <div class="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://discord.gg/sRzr3MucHS"
            target="_blank"
            rel="noopener noreferrer"
            @click="trackConversionClick('discord', { placement: 'activities_cta' })"
            class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#23d9ff] to-[#0fb8ff] px-5 py-3 font-semibold text-[#050014] transition hover:brightness-110"
          >
            Rejoindre sur Discord
          </a>
          <a
            href="https://www.instagram.com/dionysos_bordeaux?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            @click="trackConversionClick('instagram', { placement: 'activities_cta' })"
            class="inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/50 bg-[#ff2bb5]/10 px-5 py-3 font-semibold text-[#ff7ad5] transition hover:bg-[#ff2bb5]/20"
          >
            Voir Instagram
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
