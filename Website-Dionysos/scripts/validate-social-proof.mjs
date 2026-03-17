import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const source = await readFile(resolve("app/pages/index.vue"), "utf8");

const requiredSnippets = [
  "Temoignage membre",
  "Membre Dionysos Bordeaux",
  "disboard.org/server/1095026129619918981",
  "Nos partenaires",
  "Ragnarok Bordeaux",
  "Wash Bar Bordeaux",
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
