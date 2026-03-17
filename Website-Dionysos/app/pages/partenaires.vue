<script setup lang="ts">
type TrustedPartner = {
  slug: string
  name: string
  logo: string
  description: string
  address: string
  exclusiveEvents: string
  instagramUrl: string
  instagramLabel: string
  openingHours: string[]
}

const trustedPartners: TrustedPartner[] = [
  {
    slug: 'ragnarok-bordeaux',
    name: 'Ragnarok Bordeaux',
    logo: '/images/partners/ragnarok.png',
    description: 'Bar bordelais reconnu pour ses soirees conviviales et son ambiance communautaire.',
    address: "70 cours de l'Argonne, 33000 Bordeaux",
    exclusiveEvents: 'Nous organisons des evenements exclusifs avec eux pour la communaute Dionysos.',
    instagramUrl: 'https://www.instagram.com/ragnarok_bar_bordeaux?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    instagramLabel: '@ragnarokbordeaux',
    openingHours: [
      'Lundi: 17:00 - 02:00',
      'Mardi: 17:00 - 02:00',
      'Mercredi: 17:00 - 02:00',
      'Jeudi: 17:00 - 02:00',
      'Vendredi: 17:00 - 02:00',
      'Samedi: 17:00 - 02:00',
      'Dimanche: 17:00 - 00:00'
    ]
  },
  {
    slug: 'wash-bar-bordeaux',
    name: 'Wash Bar Bordeaux',
    logo: '/images/partners/wash-bar.png',
    description: 'Lieu local hybride et chaleureux, ideal pour des formats afterwork et des rencontres en petit groupe.',
    address: '39 Rue Ausone, 33000 Bordeaux',
    exclusiveEvents: 'Nous co-creons des evenements exclusifs avec eux sur des formats jeux et soirees thematiques.',
    instagramUrl: 'https://www.instagram.com/wash.bar.bdx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    instagramLabel: '@washbar_bordeaux',
    openingHours: [
      'Lundi: 16:30 - 23:00',
      'Mardi: 16:30 - 22:00',
      'Mercredi: 16:30 - 23:00',
      'Jeudi: 16:30 - 23:00',
      'Vendredi: ferme',
      'Samedi: ferme',
      'Dimanche: 16:30 - 22:00'
    ]
  }
]

usePageSeo({
  title: 'Partenaires',
  description: 'Ils nous font confiance : partenaires locaux, adresses et evenements exclusifs a Bordeaux.',
  path: '/partenaires'
})
</script>

<template>
  <main class="relative min-h-screen overflow-x-hidden bg-[#070016] text-slate-100">

    <section class="diony-reveal relative mx-auto w-full max-w-6xl px-6 pb-4 pt-12 md:pb-6 md:pt-16">
      <p class="mb-4 inline-flex rounded-full border border-[#23d9ff]/50 bg-[#23d9ff]/10 px-4 py-1 text-sm font-medium text-[#7be9ff]">
        Partenariats locaux
      </p>
      <h1 class="max-w-5xl bg-gradient-to-r from-[#23d9ff] via-[#7a2cff] to-[#ff2bb5] bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-7xl">
        Ils nous font confiance.
      </h1>
      <p class="mt-4 max-w-4xl text-lg text-slate-200 md:text-xl">
        Voici les partenaires avec qui nous travaillons, leurs adresses et les formats exclusifs que nous co-organisons.
      </p>
    </section>

    <section class="diony-reveal diony-reveal-delay-1 relative mx-auto w-full max-w-5xl px-6 pb-12 pt-2 md:pb-14 md:pt-4">
      <div class="mt-1 space-y-12">
        <article
          v-for="partner in trustedPartners"
          :key="partner.slug"
          class="pb-10 last:pb-0 border-b border-white/10 last:border-b-0"
        >
          <div class="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
            <img
              :src="partner.logo"
              :alt="`Logo ${partner.name}`"
              loading="lazy"
              decoding="async"
              class="h-40 w-40 shrink-0 object-contain md:h-48 md:w-48"
            >
            <div class="w-full">
              <h3 class="text-3xl font-bold text-white">{{ partner.name }}</h3>
              <p class="mt-3 text-base leading-relaxed text-slate-300">{{ partner.description }}</p>
              <p class="mt-3 text-base font-medium text-[#ff9de2]">{{ partner.address }}</p>
              <p class="mt-2 text-base text-[#7be9ff]">{{ partner.exclusiveEvents }}</p>
              <a
                :href="partner.instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-4 inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/45 bg-[#ff2bb5]/10 px-4 py-2 text-sm font-semibold text-[#ff9de2] transition hover:bg-[#ff2bb5]/20"
              >
                Instagram {{ partner.instagramLabel }}
              </a>
              <details class="group ml-4 mt-4 inline-block">
                <summary class="inline-flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-[#7be9ff] transition hover:text-white">
                  Voir les horaires d'ouverture
                  <span class="transition group-open:rotate-180">▾</span>
                </summary>
                <ul class="mt-2 space-y-1.5 border-l border-white/20 pl-3 text-sm text-slate-300">
                  <li v-for="line in partner.openingHours" :key="line">
                    {{ line }}
                  </li>
                </ul>
              </details>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
