<script setup lang="ts">
type SeoKpiRow = {
  slug: string
  month: string
  positions: number
  impressions: number
  clicks: number
  conversions: number
  source: string
  updated_at: string | null
}

type SeoKpiResponse = {
  ok: boolean
  data: SeoKpiRow[]
  meta: {
    total: number
    latestMonth: string | null
  }
}

const { data: kpiResponse } = await useFetch<SeoKpiResponse>('/api/kpi/seo')
const rows = computed(() => kpiResponse.value?.data || [])

const formatNumber = (value: number) => new Intl.NumberFormat('fr-FR').format(value)

usePageSeo({
  title: 'KPI SEO',
  description: 'Tableau mensuel des KPI SEO et conversions de Dionysos Bordeaux.',
  path: '/kpi-seo',
  robots: 'noindex, nofollow'
})
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-[#070016] text-slate-100">
    <div class="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#23d9ff]/15 blur-3xl" />
    <section class="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
      <p class="mb-4 inline-flex rounded-full border border-[#23d9ff]/50 bg-[#23d9ff]/10 px-4 py-1 text-sm font-medium text-[#7be9ff]">
        Pilotage mensuel
      </p>
      <h1 class="max-w-4xl bg-gradient-to-r from-[#23d9ff] via-[#7a2cff] to-[#ff2bb5] bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl">
        Tableau de bord KPI SEO
      </h1>
      <p class="mt-4 max-w-3xl text-slate-300">
        Suivi consolidé des positions, impressions, clics et conversions par mois.
      </p>

      <div class="mt-8 overflow-x-auto rounded-2xl border border-[#23d9ff]/25 bg-[#0b0322]/80">
        <table class="min-w-full text-sm">
          <thead class="border-b border-[#23d9ff]/20 bg-[#070016]/70 text-left text-[#7be9ff]">
            <tr>
              <th class="px-4 py-3 font-semibold">Mois</th>
              <th class="px-4 py-3 font-semibold">Position moyenne</th>
              <th class="px-4 py-3 font-semibold">Impressions</th>
              <th class="px-4 py-3 font-semibold">Clics</th>
              <th class="px-4 py-3 font-semibold">Conversions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.slug" class="border-b border-[#23d9ff]/10 last:border-b-0">
              <td class="px-4 py-3 text-white">{{ row.month }}</td>
              <td class="px-4 py-3">{{ row.positions.toFixed(1) }}</td>
              <td class="px-4 py-3">{{ formatNumber(row.impressions) }}</td>
              <td class="px-4 py-3">{{ formatNumber(row.clicks) }}</td>
              <td class="px-4 py-3 font-semibold text-[#ff7ad5]">{{ formatNumber(row.conversions) }}</td>
            </tr>
            <tr v-if="rows.length === 0">
              <td colspan="5" class="px-4 py-6 text-center text-slate-300">
                Aucun KPI mensuel disponible pour le moment.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>
