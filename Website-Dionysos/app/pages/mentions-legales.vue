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
  <main class="mx-auto w-full max-w-4xl px-6 py-12 md:py-16">
    <h1 class="text-3xl font-bold text-[#7be9ff] md:text-4xl">{{ legal?.title || 'Mentions légales' }}</h1>

    <section class="mt-8 rounded-2xl border border-[#23d9ff]/20 bg-[#0b0322]/70 p-6 text-slate-200">
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
    </section>
  </main>
</template>
