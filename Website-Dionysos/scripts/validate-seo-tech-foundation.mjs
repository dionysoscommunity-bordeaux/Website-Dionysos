import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

const nuxtConfig = await readFile(resolve("nuxt.config.ts"), "utf8");
const robotsRoute = await readFile(resolve("server/routes/robots.txt.ts"), "utf8");
const sitemapRoute = await readFile(resolve("server/routes/sitemap.xml.ts"), "utf8");
const seoComposable = await readFile(resolve("app/composables/usePageSeo.ts"), "utf8");
const envExample = await readFile(resolve(".env.example"), "utf8");

const missing = [];

const nuxtChecks = ["siteUrl", "siteName", "robotsDisallow", "siteLastmod"];
for (const check of nuxtChecks) {
  if (!nuxtConfig.includes(check)) {
    missing.push(`nuxt.config.ts manque: ${check}`);
  }
}

const robotsChecks = ["Sitemap:", "robotsDisallow", "Allow: /", "Disallow:"];
for (const check of robotsChecks) {
  if (!robotsRoute.includes(check)) {
    missing.push(`server/routes/robots.txt.ts manque: ${check}`);
  }
}

const sitemapChecks = ["<?xml", "<urlset", "/mentions-legales", "/politique-de-confidentialite", "/politique-de-cookies", "<lastmod>"];
for (const check of sitemapChecks) {
  if (!sitemapRoute.includes(check)) {
    missing.push(`server/routes/sitemap.xml.ts manque: ${check}`);
  }
}
if (sitemapRoute.includes("new Date().toISOString()")) {
  missing.push("server/routes/sitemap.xml.ts ne doit pas générer lastmod dynamique à chaque requête.");
}
if (!sitemapRoute.includes("^\\d{4}-\\d{2}-\\d{2}$")) {
  missing.push("server/routes/sitemap.xml.ts doit valider le format YYYY-MM-DD de siteLastmod.");
}

const seoChecks = ["useSeoMeta", "robots:", "ogUrl", "canonical", "useHead"];
for (const check of seoChecks) {
  if (!seoComposable.includes(check)) {
    missing.push(`app/composables/usePageSeo.ts manque: ${check}`);
  }
}
if (!seoComposable.includes("https://dionysos-bordeaux.fr")) {
  missing.push("app/composables/usePageSeo.ts doit prévoir un fallback public non-localhost pour siteUrl.");
}

try {
  await access(resolve("public/robots.txt"), constants.F_OK);
  missing.push("public/robots.txt doit être absent pour éviter d'écraser la route dynamique /robots.txt");
} catch {
  // Expected: file should not exist.
}

if (!envExample.includes("NUXT_PUBLIC_SITE_URL")) {
  missing.push(".env.example doit documenter NUXT_PUBLIC_SITE_URL.");
}
if (!envExample.includes("NUXT_PUBLIC_SITE_LASTMOD")) {
  missing.push(".env.example doit documenter NUXT_PUBLIC_SITE_LASTMOD.");
}

if (missing.length > 0) {
  console.error("Validation socle SEO technique KO.");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Validation socle SEO technique OK");
