<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useConversionTracking } from '~/composables/useConversionTracking'

type PartnerProof = {
  slug: string
  name: string
  sector: string
  collaboration: string
  impact: string
}

const fallbackPartnerProofs: PartnerProof[] = [
  {
    slug: 'fallback-local-1',
    name: 'Partenaire local bordelais',
    sector: 'Commerce de proximité',
    collaboration: 'Activation communautaire en cours de planification sur des formats afterwork.',
    impact: 'Premiers retours positifs et intérêt confirmé côté membres.'
  }
]

const { data: partnersResponse } = await useFetch<{ ok: boolean, data: PartnerProof[] }>('/api/partners')
const hasApiPartnerProofs = computed(() => (partnersResponse.value?.data || []).length > 0)
const partnerProofs = computed<PartnerProof[]>(() =>
  hasApiPartnerProofs.value ? (partnersResponse.value?.data || []) : fallbackPartnerProofs
)
const { trackConversionClick } = useConversionTracking()

const audienceFacts = [
  'Communauté locale active à Bordeaux et alentours',
  'Public varié : étudiants, jeunes actifs, nouveaux arrivants, locaux',
  'Positionnement 100% communautaire : pas de dating, pas de média passif'
]

const b2bHighlights = [
  {
    title: 'Visibilité locale qualifiée',
    detail: 'Présence auprès d\'une audience bordelaise qui sort réellement en ville.'
  },
  {
    title: 'Activation rapide',
    detail: 'Formats simples à lancer: afterwork, offres ponctuelles, co-organisation.'
  },
  {
    title: 'Relation terrain',
    detail: 'Des interactions concrètes en contexte réel, pas uniquement du reach digital.'
  }
]

const collaborationFormats = [
  'Afterwork co-brandé',
  'Avantage membre en point de vente',
  'Animation thématique locale',
  'Mise en avant partenaire sur nos canaux'
]

type PartnerContactForm = {
  contactName: string
  organization: string
  email: string
  objective: string
}

type FieldErrors = Record<keyof PartnerContactForm, string>

const partnerForm = reactive<PartnerContactForm>({
  contactName: '',
  organization: '',
  email: '',
  objective: ''
})

const formErrors = reactive<FieldErrors>({
  contactName: '',
  organization: '',
  email: '',
  objective: ''
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const submitMessage = ref('')

const resetErrors = () => {
  formErrors.contactName = ''
  formErrors.organization = ''
  formErrors.email = ''
  formErrors.objective = ''
}

const validateClient = () => {
  resetErrors()

  if (!partnerForm.contactName.trim()) formErrors.contactName = 'Le nom du contact est requis.'
  if (!partnerForm.organization.trim()) formErrors.organization = "Le nom de l'organisation est requis."
  if (!partnerForm.email.trim()) {
    formErrors.email = "L'email est requis."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(partnerForm.email)) {
    formErrors.email = "Le format de l'email est invalide."
  }
  if (!partnerForm.objective.trim()) {
    formErrors.objective = "L'objectif de partenariat est requis."
  } else if (partnerForm.objective.trim().length < 10) {
    formErrors.objective = 'Merci de préciser votre objectif de partenariat.'
  }

  return !Object.values(formErrors).some(Boolean)
}

const submitPartnerRequest = async () => {
  submitStatus.value = 'idle'
  submitMessage.value = ''

  if (!validateClient()) return

  isSubmitting.value = true

  try {
    const response = await $fetch<{ ok: boolean, data: { message: string } }>('/api/partner-contact', {
      method: 'POST',
      body: {
        contactName: partnerForm.contactName,
        organization: partnerForm.organization,
        email: partnerForm.email,
        objective: partnerForm.objective
      }
    })

    submitStatus.value = 'success'
    submitMessage.value = response.data.message || 'Votre demande de partenariat a bien été transmise.'
    partnerForm.contactName = ''
    partnerForm.organization = ''
    partnerForm.email = ''
    partnerForm.objective = ''
    resetErrors()
  } catch (error: unknown) {
    const serverError = error as {
      data?: {
        message?: string
        details?: Array<{ field: keyof PartnerContactForm, message: string }>
      }
    }
    const serverMessage = serverError.data?.message || 'Une erreur est survenue pendant la transmission.'
    const serverDetails = serverError.data?.details || []
    for (const detail of serverDetails) {
      formErrors[detail.field] = detail.message
    }
    submitStatus.value = 'error'
    submitMessage.value = serverMessage
  } finally {
    isSubmitting.value = false
  }
}

usePageSeo({
  title: 'Partenaires',
  description: 'Proposition de collaboration locale avec Dionysos Bordeaux : audience, preuves de collaboration et contact partenaire.',
  path: '/partenaires'
})
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-[#070016] text-slate-100">
    <div class="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#23d9ff]/20 blur-3xl" />
    <div class="pointer-events-none absolute -right-10 top-1/3 h-80 w-80 rounded-full bg-[#ff2bb5]/20 blur-3xl" />

    <section class="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
      <p class="mb-4 inline-flex rounded-full border border-[#23d9ff]/50 bg-[#23d9ff]/10 px-4 py-1 text-sm font-medium text-[#7be9ff]">
        Partenariats locaux
      </p>
      <h1 class="max-w-4xl bg-gradient-to-r from-[#23d9ff] via-[#7a2cff] to-[#ff2bb5] bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl">
        Touchez une communauté bordelaise engagée en moins de 20 secondes.
      </h1>
      <p class="mt-5 max-w-3xl text-lg text-slate-200 md:text-xl">
        Dionysos connecte des membres réels à des lieux et acteurs locaux via des activités régulières, conviviales et organisées.
      </p>
      <p class="mt-3 max-w-3xl text-base text-slate-300">
        En moins de 20 secondes, un partenaire comprend qui nous touchons, comment nous activons une collaboration et quels résultats locaux sont déjà visibles.
      </p>

      <div class="mt-6 grid gap-3 md:grid-cols-3">
        <div
          v-for="fact in audienceFacts"
          :key="fact"
          class="rounded-xl border border-[#23d9ff]/25 bg-[#0b0322]/80 p-4 text-sm text-slate-200"
        >
          {{ fact }}
        </div>
      </div>
    </section>

    <section class="relative mx-auto max-w-6xl px-6 pb-12">
      <h2 class="text-2xl font-bold text-white md:text-3xl">Pourquoi collaborer avec Dionysos ?</h2>
      <p class="mt-2 max-w-3xl text-slate-300">
        Trois repères rapides pour évaluer la pertinence d'un partenariat local.
      </p>
      <div class="mt-5 grid gap-4 md:grid-cols-3">
        <article
          v-for="highlight in b2bHighlights"
          :key="highlight.title"
          class="rounded-2xl border border-[#23d9ff]/25 bg-[#0b0322]/80 p-5"
        >
          <h3 class="text-lg font-bold text-white">{{ highlight.title }}</h3>
          <p class="mt-2 text-sm text-slate-300">{{ highlight.detail }}</p>
        </article>
      </div>
    </section>

    <section class="relative mx-auto max-w-6xl px-6 pb-12">
      <h2 class="text-2xl font-bold text-white md:text-3xl">Preuves de collaboration</h2>
      <p class="mt-2 max-w-3xl text-slate-300">
        Exemples de collaborations déjà activées avec des partenaires bordelais.
      </p>
      <p v-if="!hasApiPartnerProofs" class="mt-2 text-sm text-slate-400">
        Des collaborations supplémentaires seront publiées au fil des prochaines activations locales.
      </p>

      <div class="mt-5 grid gap-4 md:grid-cols-3">
        <article
          v-for="proof in partnerProofs"
          :key="proof.slug"
          class="rounded-2xl border border-[#ff2bb5]/25 bg-[#11062d]/85 p-5"
        >
          <p class="text-sm font-medium text-[#ff7ad5]">{{ proof.sector }}</p>
          <h3 class="mt-2 text-lg font-bold text-white">{{ proof.name }}</h3>
          <p class="mt-2 text-sm text-slate-300">{{ proof.collaboration }}</p>
          <p class="mt-3 text-sm text-[#7be9ff]">{{ proof.impact }}</p>
        </article>
      </div>
    </section>

    <section class="relative mx-auto max-w-6xl px-6 pb-12">
      <h2 class="text-2xl font-bold text-white md:text-3xl">Formats de collaboration possibles</h2>
      <p class="mt-2 max-w-3xl text-slate-300">
        Des options concrètes et activables selon votre secteur et votre objectif.
      </p>
      <ul class="mt-5 grid gap-3 md:grid-cols-2">
        <li
          v-for="format in collaborationFormats"
          :key="format"
          class="rounded-xl border border-[#ff2bb5]/25 bg-[#11062d]/85 px-4 py-3 text-sm text-slate-200"
        >
          {{ format }}
        </li>
      </ul>
    </section>

    <section class="relative mx-auto max-w-6xl px-6 pb-20">
      <div class="rounded-2xl border border-[#23d9ff]/30 bg-[#0b0322]/85 p-6 md:p-8">
        <h2 class="text-2xl font-bold text-white md:text-3xl">Demander un échange partenaire</h2>
        <p class="mt-3 max-w-3xl text-slate-300">
          Partagez votre besoin en quelques lignes. Les champs essentiels sont vérifiés avant envoi, puis vous recevez une confirmation explicite.
        </p>
        <form class="mt-5 grid gap-4 md:grid-cols-2" @submit.prevent="submitPartnerRequest">
          <div>
            <label for="contactName" class="mb-1 block text-sm font-medium text-slate-200">Nom du contact</label>
            <input
              id="contactName"
              v-model="partnerForm.contactName"
              type="text"
              autocomplete="name"
              class="w-full rounded-lg border border-[#23d9ff]/35 bg-[#070016] px-3 py-2 text-slate-100 outline-none transition focus:border-[#23d9ff]"
              placeholder="Prénom Nom"
            >
            <p v-if="formErrors.contactName" class="mt-1 text-xs text-rose-300">{{ formErrors.contactName }}</p>
          </div>

          <div>
            <label for="organization" class="mb-1 block text-sm font-medium text-slate-200">Organisation</label>
            <input
              id="organization"
              v-model="partnerForm.organization"
              type="text"
              autocomplete="organization"
              class="w-full rounded-lg border border-[#23d9ff]/35 bg-[#070016] px-3 py-2 text-slate-100 outline-none transition focus:border-[#23d9ff]"
              placeholder="Nom de la structure"
            >
            <p v-if="formErrors.organization" class="mt-1 text-xs text-rose-300">{{ formErrors.organization }}</p>
          </div>

          <div class="md:col-span-2">
            <label for="email" class="mb-1 block text-sm font-medium text-slate-200">Email professionnel</label>
            <input
              id="email"
              v-model="partnerForm.email"
              type="email"
              autocomplete="email"
              class="w-full rounded-lg border border-[#23d9ff]/35 bg-[#070016] px-3 py-2 text-slate-100 outline-none transition focus:border-[#23d9ff]"
              placeholder="contact@organisation.fr"
            >
            <p v-if="formErrors.email" class="mt-1 text-xs text-rose-300">{{ formErrors.email }}</p>
          </div>

          <div class="md:col-span-2">
            <label for="objective" class="mb-1 block text-sm font-medium text-slate-200">Objectif du partenariat</label>
            <textarea
              id="objective"
              v-model="partnerForm.objective"
              rows="4"
              class="w-full rounded-lg border border-[#23d9ff]/35 bg-[#070016] px-3 py-2 text-slate-100 outline-none transition focus:border-[#23d9ff]"
              placeholder="Ex : organiser une soirée commune, proposer une offre partenaire..."
            />
            <p v-if="formErrors.objective" class="mt-1 text-xs text-rose-300">{{ formErrors.objective }}</p>
          </div>

          <div class="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#23d9ff] to-[#0fb8ff] px-5 py-3 font-semibold text-[#050014] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {{ isSubmitting ? 'Transmission...' : 'Envoyer la demande partenaire' }}
            </button>
            <a
              href="mailto:partenariats@dionysos-bordeaux.fr?subject=Demande%20de%20partenariat%20Dionysos"
              class="inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/50 bg-[#ff2bb5]/10 px-5 py-3 font-semibold text-[#ff7ad5] transition hover:bg-[#ff2bb5]/20"
            >
              Contacter directement par email
            </a>
          </div>
        </form>

        <p v-if="submitStatus === 'success'" class="mt-4 text-sm font-medium text-emerald-300">
          {{ submitMessage }}
        </p>
        <p v-else-if="submitStatus === 'error'" class="mt-4 text-sm font-medium text-rose-300">
          {{ submitMessage }}
        </p>
      </div>
    </section>

    <section class="relative mx-auto max-w-6xl px-6 pb-20">
      <div class="rounded-2xl border border-[#ff2bb5]/30 bg-[#11062d]/85 p-6 md:p-8">
        <h2 class="text-2xl font-bold text-white md:text-3xl">Rejoindre aussi comme membre</h2>
        <p class="mt-3 max-w-3xl text-slate-300">
          En parallèle du parcours partenaire, la communauté reste accessible immédiatement via Discord et Instagram, sans création de compte sur le site.
        </p>
        <div class="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://discord.gg/sRzr3MucHS"
            target="_blank"
            rel="noopener noreferrer"
            @click="trackConversionClick('discord', { placement: 'partners_member_cta' })"
            class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#23d9ff] to-[#0fb8ff] px-5 py-3 font-semibold text-[#050014] transition hover:brightness-110"
          >
            Rejoindre sur Discord
          </a>
          <a
            href="https://www.instagram.com/dionysos_bordeaux?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            @click="trackConversionClick('instagram', { placement: 'partners_member_cta' })"
            class="inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/50 bg-[#ff2bb5]/10 px-5 py-3 font-semibold text-[#ff7ad5] transition hover:bg-[#ff2bb5]/20"
          >
            Voir Instagram
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
