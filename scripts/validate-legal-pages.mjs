import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

const routeChecks = [
  { path: "app/app.vue", snippet: 'to="/mentions-legales"' },
  { path: "app/app.vue", snippet: 'to="/politique-de-confidentialite"' },
  { path: "app/app.vue", snippet: 'to="/politique-de-cookies"' },
];

const pageChecks = [
  {
    path: "app/pages/mentions-legales.vue",
    snippet: "/api/legal/mentions-legales",
  },
  {
    path: "app/pages/politique-de-confidentialite.vue",
    snippet: "/api/legal/politique-de-confidentialite",
  },
  {
    path: "app/pages/politique-de-cookies.vue",
    snippet: "/api/legal/politique-de-cookies",
  },
];

const mobileReadabilityChecks = [
  { path: "app/pages/mentions-legales.vue", snippet: "max-w-4xl px-6 py-12 md:py-16" },
  { path: "app/pages/politique-de-confidentialite.vue", snippet: "max-w-4xl px-6 py-12 md:py-16" },
  { path: "app/pages/politique-de-cookies.vue", snippet: "max-w-4xl px-6 py-12 md:py-16" },
  { path: "app/pages/mentions-legales.vue", snippet: "whitespace-pre-line leading-7" },
  { path: "app/pages/politique-de-confidentialite.vue", snippet: "whitespace-pre-line leading-7" },
  { path: "app/pages/politique-de-cookies.vue", snippet: "whitespace-pre-line leading-7" },
];

const pageBehaviorChecks = [
  { path: "app/pages/mentions-legales.vue", snippet: "v-else-if=\"pending\"" },
  { path: "app/pages/politique-de-confidentialite.vue", snippet: "v-else-if=\"pending\"" },
  { path: "app/pages/politique-de-cookies.vue", snippet: "v-else-if=\"pending\"" },
  { path: "app/pages/mentions-legales.vue", snippet: "Le contenu est en cours de mise à jour." },
  { path: "app/pages/politique-de-confidentialite.vue", snippet: "Le contenu est en cours de mise à jour." },
  { path: "app/pages/politique-de-cookies.vue", snippet: "Le contenu est en cours de mise à jour." },
];

const contentFiles = [
  "content/legal/mentions-legales.md",
  "content/legal/politique-de-confidentialite.md",
  "content/legal/politique-de-cookies.md",
];

const errors = [];

for (const check of [...routeChecks, ...pageChecks, ...mobileReadabilityChecks, ...pageBehaviorChecks]) {
  const source = await readFile(resolve(check.path), "utf8");
  if (!source.includes(check.snippet)) {
    errors.push(`${check.path} manque: ${check.snippet}`);
  }
}

for (const filePath of contentFiles) {
  try {
    await access(resolve(filePath), constants.F_OK);
  } catch {
    errors.push(`Fichier légal manquant: ${filePath}`);
  }
}

if (errors.length > 0) {
  console.error("Validation pages légales KO.");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Validation pages légales OK");
