import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const pagesToCheck = [
  "app/app.vue",
  "app/pages/index.vue",
  "app/pages/activites.vue",
  "app/pages/partenaires.vue",
];

const requiredSnippets = [
  "discord.gg/sRzr3MucHS",
  "instagram.com/dionysos_bordeaux",
];

const errors = [];

for (const relativePath of pagesToCheck) {
  const absolutePath = resolve(relativePath);
  const source = await readFile(absolutePath, "utf8");

  for (const snippet of requiredSnippets) {
    if (!source.includes(snippet)) {
      errors.push(`${relativePath} manque le lien: ${snippet}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Validation CTA KO.");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Validation CTA OK");
