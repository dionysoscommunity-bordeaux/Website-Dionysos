import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import matter from "gray-matter";

const cmsConfig = await readFile(resolve("public/admin/config.yml"), "utf8");
const contentRoot = resolve("content");
const requiredChecklistKeys = ["message_ok", "legal_ok", "data_ok", "seo_ok"];
const checklistCollections = ["pages", "testimonials", "partners", "announcements", "legal"];
const missing = [];

const configLines = cmsConfig.split("\n");

const getCollectionBlock = (collectionName) => {
  const marker = `  - name: "${collectionName}"`;
  const start = configLines.findIndex((line) => line.trim() === marker.trim());
  if (start === -1) return "";
  let end = configLines.length;
  for (let i = start + 1; i < configLines.length; i += 1) {
    if (configLines[i].startsWith("  - name: ")) {
      end = i;
      break;
    }
  }
  return configLines.slice(start, end).join("\n");
};

for (const collectionName of checklistCollections) {
  const block = getCollectionBlock(collectionName);
  if (!block) {
    missing.push(`Collection CMS manquante pour la checklist: ${collectionName}`);
    continue;
  }

  const checklistBlockPattern = /name:\s*"publication_checklist"\s*\n\s*widget:\s*"object"\s*\n\s*required:\s*true[\s\S]*?fields:/m;
  if (!checklistBlockPattern.test(block)) {
    missing.push(`Collection ${collectionName} doit déclarer publication_checklist en required: true.`);
    continue;
  }

  for (const key of requiredChecklistKeys) {
    const keyPattern = new RegExp(`name:\\s*"${key}"[^\\n]*required:\\s*true`, "m");
    if (!keyPattern.test(block)) {
      missing.push(`Collection ${collectionName} doit exiger publication_checklist.${key} en required: true.`);
    }
  }
}

const walkMarkdown = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) return walkMarkdown(fullPath);
      if (entry.isFile() && entry.name.endsWith(".md")) return [fullPath];
      return [];
    }),
  );
  return nested.flat();
};

const markdownFiles = await walkMarkdown(contentRoot);
for (const filePath of markdownFiles) {
  const raw = await readFile(filePath, "utf8");
  const parsed = matter(raw);
  const checklist = parsed.data.publication_checklist;

  if (!checklist || typeof checklist !== "object") {
    missing.push(`${filePath} doit contenir publication_checklist.`);
    continue;
  }

  for (const key of requiredChecklistKeys) {
    if (checklist[key] !== true) {
      missing.push(`${filePath} doit définir publication_checklist.${key}: true.`);
    }
  }
}

if (missing.length > 0) {
  console.error("Validation publication checklist KO.");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log(`Validation publication checklist OK (${markdownFiles.length} fichiers)`);
