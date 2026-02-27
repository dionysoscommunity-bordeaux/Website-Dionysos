<script setup lang="ts">
import { useConversionTracking } from '~/composables/useConversionTracking'

type Testimonial = {
  slug: string
  name: string
  role: string
  quote: string
}

type PartnerApi = {
  slug: string
  name: string
  type: string
  contribution: string
  impact: string
  sector?: string
  collaboration?: string
}

type PartnerView = {
  slug: string
  name: string
  type: string
  contribution: string
  impactLabel: string
}

const { data: testimonialsResponse } = await useFetch<{ ok: boolean, data: Testimonial[] }>('/api/testimonials')
const testimonials = computed(() => testimonialsResponse.value?.data || [])

const { data: partnersResponse } = await useFetch<{ ok: boolean, data: PartnerApi[] }>('/api/partners')
const partners = computed<PartnerView[]>(() =>
  (partnersResponse.value?.data || []).map((partner) => ({
    slug: partner.slug,
    name: partner.name,
    type: partner.sector || partner.type || 'Partenaire local',
    contribution: partner.collaboration || partner.contribution || '',
    impactLabel: partner.impact ? `Impact: ${partner.impact}` : ''
  }))
)
const { trackConversionClick } = useConversionTracking()

usePageSeo({
  title: 'Avis et communauté',
  description: 'Retours membres, preuves sociales et partenaires locaux de la communauté Dionysos Bordeaux.',
  path: '/communaute'
})
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-[#070016] text-slate-100">
    <div class="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#ff2bb5]/20 blur-3xl" />
    <div class="pointer-events-none absolute -right-10 top-1/4 h-80 w-80 rounded-full bg-[#23d9ff]/20 blur-3xl" />

    <section class="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
      <p class="mb-4 inline-flex rounded-full border border-[#ff2bb5]/40 bg-[#ff2bb5]/10 px-4 py-1 text-sm font-medium text-[#ff7ad5]">
        Preuve sociale
      </p>
      <h1 class="max-w-3xl bg-gradient-to-r from-[#ff2bb5] via-[#7a2cff] to-[#23d9ff] bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl">
        Avis membres et partenaires visibles.
      </h1>
      <p class="mt-5 max-w-3xl text-lg text-slate-200 md:text-xl">
        Des retours concrets et des collaborations locales pour rassurer avant de rejoindre la communauté.
      </p>
      <p class="mt-3 max-w-3xl text-base text-slate-300">
        Les retours viennent de membres qui se croisent dans différents coins de Bordeaux, pas d'un seul secteur.
      </p>
    </section>

    <section class="relative mx-auto max-w-6xl px-6 pb-12">
      <h2 class="text-2xl font-bold text-white md:text-3xl">Ils racontent leur expérience</h2>
      <div class="mt-5 grid gap-4 md:grid-cols-3">
        <article
          v-for="item in testimonials"
          :key="item.slug"
          class="rounded-2xl border border-[#23d9ff]/20 bg-[#0b0322]/80 p-5"
        >
          <p class="text-slate-200">"{{ item.quote }}"</p>
          <p class="mt-4 font-semibold text-[#7be9ff]">{{ item.name }}</p>
          <p class="text-sm text-slate-400">{{ item.role }}</p>
        </article>
      </div>
    </section>

    <section class="relative mx-auto max-w-6xl px-6 pb-12">
      <h2 class="text-2xl font-bold text-white md:text-3xl">Partenaires locaux</h2>
      <p class="mt-2 max-w-3xl text-slate-300">Des structures bordelaises qui contribuent à faire vivre les activités Dionysos.</p>
      <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="partner in partners"
          :key="partner.slug"
          class="rounded-2xl border border-[#ff2bb5]/25 bg-[#11062d]/85 p-5"
        >
          <p class="text-sm font-medium text-[#ff7ad5]">{{ partner.type }}</p>
          <p class="mt-2 text-lg font-bold text-white">{{ partner.name }}</p>
          <p class="mt-2 text-sm text-slate-300">{{ partner.contribution }}</p>
          <p v-if="partner.impactLabel" class="mt-2 text-xs text-[#7be9ff]">{{ partner.impactLabel }}</p>
        </article>
      </div>
    </section>

    <section class="relative mx-auto max-w-6xl px-6 pb-20">
      <div class="rounded-2xl border border-[#23d9ff]/30 bg-[#0b0322]/85 p-6 md:p-8">
        <h2 class="text-2xl font-bold text-white md:text-3xl">Observer avant de rejoindre</h2>
        <p class="mt-3 max-w-3xl text-slate-300">
          Tu peux commencer par regarder les activités, lire les retours et nous suivre sur Instagram. L'intégration est progressive: tu observes, sans engagement, puis tu rejoins le Discord quand tu te sens prêt.
        </p>
        <div class="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://www.instagram.com/dionysos_bordeaux?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            @click="trackConversionClick('instagram', { placement: 'community_cta' })"
            class="inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/50 bg-[#ff2bb5]/10 px-5 py-3 font-semibold text-[#ff7ad5] transition hover:bg-[#ff2bb5]/20"
          >
            Observer sur Instagram
          </a>
          <a
            href="https://discord.gg/sRzr3MucHS"
            target="_blank"
            rel="noopener noreferrer"
            @click="trackConversionClick('discord', { placement: 'community_cta' })"
            class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#23d9ff] to-[#0fb8ff] px-5 py-3 font-semibold text-[#050014] transition hover:brightness-110"
          >
            Rejoindre le Discord
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
