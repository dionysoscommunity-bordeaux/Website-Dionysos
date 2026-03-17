import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const cmsConfig = await readFile(resolve("public/admin/config.yml"), "utf8");
const lines = cmsConfig.split("\n");
const missing = [];

if (!cmsConfig.includes("publish_mode: editorial_workflow")) {
  missing.push("Le workflow éditorial Git doit être activé (publish_mode: editorial_workflow).");
}

const sections = [
  {
    name: "testimonials",
    folder: "content/testimonials",
    requiredFields: ["name", "role", "quote", "seo_title", "seo_description", "publication_checklist", "updated_at"],
    requiredTrueFields: ["name", "role", "quote", "seo_title", "seo_description", "updated_at"],
  },
  {
    name: "partners",
    folder: "content/partners",
    requiredFields: ["name", "sector", "collaboration", "impact", "seo_title", "seo_description", "publication_checklist", "updated_at"],
    requiredTrueFields: ["name", "sector", "collaboration", "impact", "seo_title", "seo_description", "updated_at"],
  },
  {
    name: "announcements",
    folder: "content/announcements",
    requiredFields: ["title", "summary", "body", "published_at", "seo_title", "seo_description", "publication_checklist", "updated_at"],
    requiredTrueFields: ["title", "summary", "body", "published_at", "seo_title", "seo_description", "updated_at"],
  },
];

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

for (const section of sections) {
  const block = getCollectionBlock(section.name);
  if (!block) {
    missing.push(`Collection manquante: ${section.name}`);
    continue;
  }

  if (!new RegExp(`folder:\\s*"${section.folder}"`, "m").test(block)) {
    missing.push(`Collection ${section.name} doit pointer vers ${section.folder}`);
  }
  if (!/^\s*create:\s*true\s*$/m.test(block)) {
    missing.push(`Collection ${section.name} doit autoriser la création (create: true).`);
  }
  if (!/^\s*delete:\s*true\s*$/m.test(block)) {
    missing.push(`Collection ${section.name} doit autoriser la suppression (delete: true).`);
  }
  if (!/^\s*slug:\s*["']?\{\{slug\}\}["']?\s*$/m.test(block)) {
    missing.push(`Collection ${section.name} doit définir slug: "{{slug}}".`);
  }

  for (const field of section.requiredFields) {
    if (!new RegExp(`name:\\s*"${field}"`, "m").test(block)) {
      missing.push(`Collection ${section.name} doit inclure le champ ${field}.`);
    }
  }

  for (const field of section.requiredTrueFields) {
    const requiredPattern = new RegExp(
      `^\\s*-\\s*\\{[^}]*name:\\s*"${field}"[^}]*required:\\s*true[^}]*\\}\\s*$`,
      "m",
    );
    if (!requiredPattern.test(block)) {
      missing.push(`Collection ${section.name} doit avoir ${field} en required: true.`);
    }
  }

  const checklistRequiredPattern = /name:\s*"publication_checklist"\s*\n\s*widget:\s*"object"\s*\n\s*required:\s*true/m;
  if (!checklistRequiredPattern.test(block)) {
    missing.push(`Collection ${section.name} doit avoir publication_checklist en required: true.`);
  }
}

if (missing.length > 0) {
  console.error("Validation CMS CRUD sections KO.");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Validation CMS CRUD sections OK");
