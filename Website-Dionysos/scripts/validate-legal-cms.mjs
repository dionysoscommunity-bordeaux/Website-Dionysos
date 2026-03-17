import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";
import matter from "gray-matter";

const cmsConfig = await readFile(resolve("public/admin/config.yml"), "utf8");
const legalApiRoute = await readFile(resolve("server/api/legal/[slug].get.ts"), "utf8");

const missing = [];

if (!cmsConfig.includes("publish_mode: editorial_workflow")) {
  missing.push("public/admin/config.yml doit activer publish_mode: editorial_workflow.");
}

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

const legalBlock = getCollectionBlock("legal");
if (!legalBlock) {
  missing.push('Collection "legal" manquante dans public/admin/config.yml.');
} else {
  const legalChecks = [
    { label: "folder légal", pattern: /folder:\s*"content\/legal"/m },
    { label: "create légal", pattern: /^\s*create:\s*true\s*$/m },
    { label: "slug légal", pattern: /^\s*slug:\s*["']?\{\{slug\}\}["']?\s*$/m },
    { label: "title requis", pattern: /^\s*-\s*\{[^}]*name:\s*"title"[^}]*required:\s*true[^}]*\}\s*$/m },
    { label: "body requis", pattern: /^\s*-\s*\{[^}]*name:\s*"body"[^}]*required:\s*true[^}]*\}\s*$/m },
    { label: "seo_title requis", pattern: /^\s*-\s*\{[^}]*name:\s*"seo_title"[^}]*required:\s*true[^}]*\}\s*$/m },
    { label: "seo_description requis", pattern: /^\s*-\s*\{[^}]*name:\s*"seo_description"[^}]*required:\s*true[^}]*\}\s*$/m },
    { label: "updated_at requis", pattern: /^\s*-\s*\{[^}]*name:\s*"updated_at"[^}]*required:\s*true[^}]*\}\s*$/m },
  ];
  for (const check of legalChecks) {
    if (!check.pattern.test(legalBlock)) {
      missing.push(`Collection legal manque: ${check.label}`);
    }
  }

  const checklistBlockPattern = /name:\s*"publication_checklist"\s*\n\s*widget:\s*"object"\s*\n\s*required:\s*true[\s\S]*?fields:/m;
  if (!checklistBlockPattern.test(legalBlock)) {
    missing.push('Collection legal doit inclure publication_checklist en required: true.');
  } else {
    const checklistKeys = ["message_ok", "legal_ok", "data_ok", "seo_ok"];
    for (const key of checklistKeys) {
      const keyPattern = new RegExp(`name:\\s*"${key}"[^\\n]*required:\\s*true`, "m");
      if (!keyPattern.test(legalBlock)) {
        missing.push(`Collection legal doit exiger publication_checklist.${key} en required: true.`);
      }
    }
  }
}

const requiredLegalFiles = [
  "content/legal/mentions-legales.md",
  "content/legal/politique-de-confidentialite.md",
  "content/legal/politique-de-cookies.md",
];

for (const filePath of requiredLegalFiles) {
  try {
    await access(resolve(filePath), constants.F_OK);
  } catch {
    missing.push(`Fichier légal manquant: ${filePath}`);
    continue;
  }
  const raw = await readFile(resolve(filePath), "utf8");
  const parsed = matter(raw);
  if (!parsed.data.updated_at) {
    missing.push(`${filePath} doit contenir updated_at pour historisation.`);
  }
}

if (!legalApiRoute.includes("readCollection<LegalContent>('legal')")) {
  missing.push("server/api/legal/[slug].get.ts doit lire la collection legal.");
}
if (!legalApiRoute.includes("item.slug === slug")) {
  missing.push("server/api/legal/[slug].get.ts doit mapper slug -> contenu légal.");
}

if (missing.length > 0) {
  console.error("Validation legal CMS KO.");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Validation legal CMS OK");
