import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const source = await readFile(resolve("app/pages/communaute.vue"), "utf8");

const requiredSnippets = [
  "/api/testimonials",
  "/api/partners",
  "v-for=\"item in testimonials\"",
  "v-for=\"partner in partners\"",
  "Impact:",
  "Observer avant de rejoindre",
  "intégration est progressive",
  "sans engagement",
  "Observer sur Instagram",
  "Rejoindre le Discord",
];

const missing = requiredSnippets.filter((snippet) => !source.includes(snippet));

if (missing.length > 0) {
  console.error("Validation preuve sociale KO.");
  for (const snippet of missing) {
    console.error(`- Élément manquant: ${snippet}`);
  }
  process.exit(1);
}

console.log("Validation preuve sociale OK");
