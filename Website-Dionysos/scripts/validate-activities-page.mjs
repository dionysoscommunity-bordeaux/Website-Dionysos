import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const pagePath = resolve("app/pages/activites.vue");
const source = await readFile(pagePath, "utf8");

const requiredSnippets = [
  "Taxonomie des activités",
  "Sorties food & bars",
  "Balades & explorations",
  "Jeux & activités ludiques",
  "Culture & moments calmes",
  "Temps forts communautaires",
  "publishedAt",
  "Publié :",
  "Lieu :",
];

const missing = requiredSnippets.filter((snippet) => !source.includes(snippet));

if (missing.length > 0) {
  console.error("Validation page activités KO.");
  for (const snippet of missing) {
    console.error(`- Élément manquant: ${snippet}`);
  }
  process.exit(1);
}

console.log("Validation page activités OK");
