<script setup lang="ts">
type LegalContent = {
  title: string
  body: string
}

const { data, error, pending } = await useFetch<{ ok: boolean, data: LegalContent }>('/api/legal/mentions-legales')
const legal = computed(() => data.value?.data)

usePageSeo({
  title: 'Mentions légales',
  description: 'Informations légales du site Dionysos Bordeaux.',
  path: '/mentions-legales'
})
</script>

<template>
  <main class="relative min-h-screen overflow-x-hidden bg-[#070016] text-slate-100">
    <div class="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#23d9ff]/15 blur-3xl" />
    <div class="pointer-events-none absolute -right-10 top-1/3 h-80 w-80 rounded-full bg-[#ff2bb5]/15 blur-3xl" />
    <div class="mx-auto w-full max-w-4xl px-6 py-12 md:py-16">

      <section class="diony-reveal relative pb-10 pt-2 md:pb-12 md:pt-4">
      <p class="mb-4 inline-flex rounded-full border border-[#23d9ff]/50 bg-[#23d9ff]/10 px-4 py-1 text-sm font-medium text-[#7be9ff]">
        Informations légales
      </p>
      <h1 class="bg-gradient-to-r from-[#23d9ff] via-[#7a2cff] to-[#ff2bb5] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
        {{ legal?.title || 'Mentions légales' }}
      </h1>
      <p class="mt-3 max-w-3xl text-sm text-slate-300">
        Cette page centralise les informations d'identification et les mentions obligatoires du site.
      </p>
      </section>

      <section class="diony-reveal diony-reveal-delay-1 relative pb-4 pt-10 md:pb-6 md:pt-12">
      <div class="mb-7 h-px w-full bg-gradient-to-r from-transparent via-[#23d9ff]/45 to-transparent" />
      <div class="rounded-2xl border border-[#23d9ff]/20 bg-[#0b0322]/70 p-6 text-slate-200">
      <p v-if="legal?.body" class="whitespace-pre-line leading-7">{{ legal.body }}</p>
      <p v-else-if="pending" class="text-slate-300">
        Chargement du contenu légal...
      </p>
      <p v-else-if="error" class="text-rose-300">
        Le contenu légal n'est pas disponible pour le moment.
      </p>
      <p v-else class="text-slate-300">
        Le contenu est en cours de mise à jour.
      </p>
      </div>
      </section>
    </div>
  </main>
</template>
