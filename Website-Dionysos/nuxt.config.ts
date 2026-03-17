export default defineNuxtConfig({
  compatibilityDate: "2026-02-27",
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://dionysos-bordeaux.fr",
      siteName: "Dionysos Bordeaux",
      robotsDisallow: process.env.NUXT_PUBLIC_ROBOTS_DISALLOW || "",
      siteLastmod: process.env.NUXT_PUBLIC_SITE_LASTMOD || "2026-02-26"
    }
  },
  tailwindcss: {
    configPath: "tailwind.config.ts",
    viewer: false,
  },
});
