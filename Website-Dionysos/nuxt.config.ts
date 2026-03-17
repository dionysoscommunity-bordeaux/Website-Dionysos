export default defineNuxtConfig({
  compatibilityDate: "2026-02-27",
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  tailwindcss: {
    configPath: "tailwind.config.ts",
    viewer: false,
  },
});
