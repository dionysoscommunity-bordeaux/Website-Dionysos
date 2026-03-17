<script setup lang="ts">
import { useConversionTracking } from '~/composables/useConversionTracking'
import logoImage from '../image.png'

const { trackConversionClick } = useConversionTracking()
const iconOnlyLogo = '/images/branding/dionysos-logo-no-text.png'

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: iconOnlyLogo },
    { rel: 'shortcut icon', type: 'image/png', href: iconOnlyLogo },
    { rel: 'apple-touch-icon', href: iconOnlyLogo }
  ]
})
</script>

<template>
  <div class="relative isolate min-h-screen bg-[#070016] text-slate-100">
    <div class="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      <img
        src="/images/branding/dionysos-banner.png"
        alt=""
        class="absolute left-1/2 top-1/2 w-[1280px] max-w-[98vw] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.09] mix-blend-screen blur-[0.5px] saturate-125"
      >
    </div>
    <NuxtRouteAnnouncer />

    <header class="sticky top-0 z-50 border-b border-[#23d9ff]/20 bg-[#070016]/80 backdrop-blur">
      <nav class="mx-auto max-w-6xl px-4 py-3 md:px-6">
        <div class="md:hidden">
          <div class="flex items-center justify-between gap-2">
            <NuxtLink to="/" class="inline-flex min-w-0 items-center gap-2 text-sm font-semibold tracking-wide text-[#7be9ff]">
              <img
                :src="logoImage"
                alt="Logo Dionysos Bordeaux"
                class="h-9 w-9 rounded-full border border-[#23d9ff]/40 object-cover shadow-[0_0_18px_rgba(35,217,255,0.35)]"
              >
              <span class="truncate">DIONYSOS</span>
            </NuxtLink>
            <div class="flex items-center gap-2">
              <NuxtLink
                to="/activites"
                class="inline-flex items-center justify-center rounded-lg border border-[#23d9ff]/30 px-2.5 py-2 text-[11px] font-semibold text-[#7be9ff] transition hover:bg-[#23d9ff]/10"
              >
                Nos sorties
              </NuxtLink>
              <NuxtLink
                to="/partenaires"
                class="inline-flex items-center justify-center rounded-lg border border-[#23d9ff]/30 px-2.5 py-2 text-[11px] font-semibold text-[#7be9ff] transition hover:bg-[#23d9ff]/10"
              >
                Partenaires
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="hidden items-center justify-between md:flex">
          <NuxtLink to="/" class="inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-[#7be9ff] md:text-base">
            <img
              :src="logoImage"
              alt="Logo Dionysos Bordeaux"
              class="h-10 w-10 rounded-full border border-[#23d9ff]/40 object-cover shadow-[0_0_18px_rgba(35,217,255,0.35)]"
            >
            <span>DIONYSOS BORDEAUX</span>
          </NuxtLink>
          <div class="flex items-center gap-3">
            <NuxtLink
              to="/activites"
              class="inline-flex items-center justify-center rounded-lg border border-[#23d9ff]/30 px-4 py-2 text-sm font-semibold text-[#7be9ff] transition hover:bg-[#23d9ff]/10"
            >
              Nos sorties
            </NuxtLink>
            <NuxtLink
              to="/partenaires"
              class="inline-flex items-center justify-center rounded-lg border border-[#23d9ff]/30 px-4 py-2 text-sm font-semibold text-[#7be9ff] transition hover:bg-[#23d9ff]/10"
            >
              Partenaires
            </NuxtLink>
            <a
              href="https://discord.gg/sRzr3MucHS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rejoindre Dionysos sur Discord"
              @click="trackConversionClick('discord', { placement: 'header' })"
              class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#23d9ff] to-[#0fb8ff] px-4 py-2 text-sm font-semibold text-[#050014] shadow-[0_0_20px_rgba(35,217,255,0.35)] transition hover:brightness-110"
            >
              Rejoindre
            </a>
            <a
              href="https://www.instagram.com/dionysos_bordeaux?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir Dionysos sur Instagram"
              @click="trackConversionClick('instagram', { placement: 'header' })"
              class="inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/50 bg-[#ff2bb5]/10 px-4 py-2 text-sm font-semibold text-[#ff7ad5] transition hover:bg-[#ff2bb5]/20"
            >
              Instagram
            </a>
          </div>
        </div>
      </nav>
    </header>

    <div class="relative z-10">
      <NuxtPage />
    </div>

    <footer class="relative z-10 border-t border-[#ff2bb5]/20 bg-[#050012]/80">
      <div class="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-6 text-sm text-slate-300 md:flex-row md:items-center">
        <div class="space-y-2">
          <p>Communauté locale à Bordeaux. Sans dating, sans prise de tête.</p>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
            <NuxtLink to="/mentions-legales" class="text-slate-300 underline-offset-4 transition hover:text-[#7be9ff] hover:underline">
              Mentions légales
            </NuxtLink>
            <NuxtLink to="/politique-de-confidentialite" class="text-slate-300 underline-offset-4 transition hover:text-[#7be9ff] hover:underline">
              Confidentialité
            </NuxtLink>
            <NuxtLink to="/politique-de-cookies" class="text-slate-300 underline-offset-4 transition hover:text-[#7be9ff] hover:underline">
              Cookies
            </NuxtLink>
          </div>
        </div>
        <a
          href="https://discord.gg/sRzr3MucHS"
          target="_blank"
          rel="noopener noreferrer"
          @click="trackConversionClick('discord', { placement: 'footer' })"
          class="inline-flex items-center justify-center rounded-lg border border-[#23d9ff]/50 px-4 py-2 font-semibold text-[#7be9ff] transition hover:bg-[#23d9ff]/10"
        >
          Rejoindre sur Discord
        </a>
      </div>
    </footer>
  </div>
</template>
