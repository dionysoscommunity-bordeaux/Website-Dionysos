import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const seoComposable = await readFile(resolve("app/composables/usePageSeo.ts"), "utf8");
const pageFiles = [
  "app/pages/index.vue",
  "app/pages/activites.vue",
  "app/pages/partenaires.vue",
  "app/pages/mentions-legales.vue",
  "app/pages/politique-de-confidentialite.vue",
  "app/pages/politique-de-cookies.vue",
];

const missing = [];

const composableChecks = [
  "useSeoMeta",
  "ogTitle",
  "ogDescription",
  "ogUrl",
  "ogImage",
  "twitterTitle",
  "twitterDescription",
  "twitterImage",
  "application/ld+json",
  "'@type': 'Organization'",
  "'@type': 'Event'",
  "isValidEventSchema",
  "input.eventSchema",
  "input.eventSchema.name",
  "input.eventSchema.startDate",
  "input.eventSchema.location",
];

for (const item of composableChecks) {
  if (!seoComposable.includes(item)) {
    missing.push(`app/composables/usePageSeo.ts manque: ${item}`);
  }
}

if (seoComposable.includes("if (true)") && seoComposable.includes("'@type': 'Event'")) {
  missing.push("app/composables/usePageSeo.ts ne doit pas injecter Event de manière inconditionnelle.");
}

for (const pagePath of pageFiles) {
  const source = await readFile(resolve(pagePath), "utf8");
  if (!source.includes("usePageSeo(")) {
    missing.push(`${pagePath} doit appeler usePageSeo(...)`);
  }
}

if (missing.length > 0) {
  console.error("Validation métadonnées sociales + schema.org KO.");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Validation métadonnées sociales + schema.org OK");
