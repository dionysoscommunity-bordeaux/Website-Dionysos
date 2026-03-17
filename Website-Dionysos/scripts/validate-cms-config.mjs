import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const adminIndex = await readFile(resolve("public/admin/index.html"), "utf8");
const cmsConfig = await readFile(resolve("public/admin/config.yml"), "utf8");

const missing = [];

if (!adminIndex.includes("decap-cms")) {
  missing.push("public/admin/index.html doit charger Decap CMS");
}

const topLevelChecks = [
  "backend:",
  "name: git-gateway",
  "publish_mode: editorial_workflow",
  "collections:",
];

for (const item of topLevelChecks) {
  if (!cmsConfig.includes(item)) {
    missing.push(`public/admin/config.yml manque: ${item}`);
  }
}

const requiredCollections = ["pages", "announcements", "partners", "testimonials", "legal"];

const lines = cmsConfig.split("\n");

const getCollectionBlock = (collectionName) => {
  const marker = `  - name: "${collectionName}"`;
  const start = lines.findIndex((line) => line.trim() === marker.trim());
  if (start === -1) return "";
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (lines[i].startsWith("  - name: ")) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
};

for (const collectionName of requiredCollections) {
  const block = getCollectionBlock(collectionName);
  if (!block) {
    missing.push(`Collection CMS manquante: ${collectionName}`);
    continue;
  }

  if (!/^\s*slug:\s*["']?\{\{slug\}\}["']?\s*$/m.test(block)) {
    missing.push(`Collection ${collectionName} doit définir slug: "{{slug}}"`);
  }

  const seoTitleRequiredPattern = /^\s*-\s*\{[^}]*name:\s*"seo_title"[^}]*required:\s*true[^}]*\}\s*$/m;
  if (!seoTitleRequiredPattern.test(block)) {
    missing.push(`Collection ${collectionName} doit inclure seo_title requis`);
  }

  const seoDescriptionRequiredPattern = /^\s*-\s*\{[^}]*name:\s*"seo_description"[^}]*required:\s*true[^}]*\}\s*$/m;
  if (!seoDescriptionRequiredPattern.test(block)) {
    missing.push(`Collection ${collectionName} doit inclure seo_description requis`);
  }

  const checklistRequiredPattern = /name:\s*"publication_checklist"\s*\n\s*widget:\s*"object"\s*\n\s*required:\s*true/m;
  if (!checklistRequiredPattern.test(block)) {
    missing.push(`Collection ${collectionName} doit inclure publication_checklist requis`);
  }
}

if (missing.length > 0) {
  console.error("Validation config Decap CMS KO.");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Validation config Decap CMS OK");
