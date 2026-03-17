import { readFile } from "node:fs/promises";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

const partnersPage = await readFile(resolve("app/pages/partenaires.vue"), "utf8");
const partnersContentDir = resolve("content/partners");

const requiredSnippets = ["Ils nous font confiance", "evenements exclusifs", "v-for=\"partner in trustedPartners\""];

const missing = requiredSnippets.filter((snippet) => !partnersPage.includes(snippet));

const partnerFiles = (await readdir(partnersContentDir)).filter((name) => name.endsWith(".md"));
if (partnerFiles.length === 0) {
  missing.push("content/partners doit contenir au moins un fichier .md");
}

let validPartnerEntries = 0;
for (const fileName of partnerFiles) {
  const filePath = resolve("content/partners", fileName);
  const raw = await readFile(filePath, "utf8");
  const hasName = /^\s*name:\s*["']?.+["']?\s*$/m.test(raw);
  const hasCollaboration = /^\s*collaboration:\s*["']?.+["']?\s*$/m.test(raw);
  const hasImpact = /^\s*impact:\s*["']?.+["']?\s*$/m.test(raw);
  if (hasName && hasCollaboration && hasImpact) {
    validPartnerEntries += 1;
  }
}

if (validPartnerEntries < 1) {
  missing.push("content/partners doit fournir au moins une preuve partenaire exploitable (name/collaboration/impact)");
}

if (missing.length > 0) {
  console.error("Validation partenaires B2B KO.");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Validation partenaires B2B OK");
