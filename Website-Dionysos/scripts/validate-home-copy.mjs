import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const homePath = resolve("app/pages/index.vue");
const source = await readFile(homePath, "utf8");

const requiredPhrases = [
  "Ici, pas de dating",
  "Nos valeurs : inclusion, bienveillance et authenticité.",
  "Sortir plus souvent",
  "Rencontrer du monde",
  "Participer à des activités conviviales",
];

const missing = requiredPhrases.filter((phrase) => !source.includes(phrase));

if (missing.length > 0) {
  console.error("Validation home copy KO.");
  for (const phrase of missing) {
    console.error(`- Texte manquant: ${phrase}`);
  }
  process.exit(1);
}

console.log("Validation home copy OK");
