<script setup lang="ts">
import { useConversionTracking } from '~/composables/useConversionTracking'

const { trackConversionClick } = useConversionTracking()
</script>

<template>
  <div class="min-h-screen bg-[#070016] text-slate-100">
    <NuxtRouteAnnouncer />

    <header class="sticky top-0 z-50 border-b border-[#23d9ff]/20 bg-[#070016]/80 backdrop-blur">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <NuxtLink to="/" class="text-sm font-semibold tracking-wide text-[#7be9ff] md:text-base">
          DIONYSOS BORDEAUX
        </NuxtLink>

        <div class="flex items-center gap-2 md:gap-3">
          <NuxtLink
            to="/communaute"
            class="hidden sm:inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/35 px-3 py-2 text-xs font-semibold text-[#ff7ad5] transition hover:bg-[#ff2bb5]/10 md:px-4 md:text-sm"
          >
            Avis
          </NuxtLink>
          <NuxtLink
            to="/activites"
            class="hidden sm:inline-flex items-center justify-center rounded-lg border border-[#23d9ff]/30 px-3 py-2 text-xs font-semibold text-[#7be9ff] transition hover:bg-[#23d9ff]/10 md:px-4 md:text-sm"
          >
            Activités
          </NuxtLink>
          <NuxtLink
            to="/partenaires"
            class="hidden sm:inline-flex items-center justify-center rounded-lg border border-[#23d9ff]/30 px-3 py-2 text-xs font-semibold text-[#7be9ff] transition hover:bg-[#23d9ff]/10 md:px-4 md:text-sm"
          >
            Partenaires
          </NuxtLink>
          <a
            href="https://discord.gg/sRzr3MucHS"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rejoindre Dionysos sur Discord"
            @click="trackConversionClick('discord', { placement: 'header' })"
            class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#23d9ff] to-[#0fb8ff] px-3 py-2 text-xs font-semibold text-[#050014] shadow-[0_0_20px_rgba(35,217,255,0.35)] transition hover:brightness-110 md:px-4 md:text-sm"
          >
            Rejoindre
          </a>
          <a
            href="https://www.instagram.com/dionysos_bordeaux?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voir Dionysos sur Instagram"
            @click="trackConversionClick('instagram', { placement: 'header' })"
            class="inline-flex items-center justify-center rounded-lg border border-[#ff2bb5]/50 bg-[#ff2bb5]/10 px-3 py-2 text-xs font-semibold text-[#ff7ad5] transition hover:bg-[#ff2bb5]/20 md:px-4 md:text-sm"
          >
            Instagram
          </a>
        </div>
      </nav>
    </header>

    <NuxtPage />

    <footer class="border-t border-[#ff2bb5]/20 bg-[#050012]/80">
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
