import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import matter from "gray-matter";

const source = await readFile(resolve("app/pages/activites.vue"), "utf8");

const requiredSnippets = [
  "Exemples concrets en images",
  "loading=\"lazy\"",
  "decoding=\"async\"",
  "width=\"1200\"",
  "height=\"800\"",
  ":alt=\"item.alt\"",
  "Format :",
  "Participants :",
  "Publié :",
  "Lieu :",
];

const missing = requiredSnippets.filter((snippet) => !source.includes(snippet));

const activitiesDir = resolve("content/activities");
const files = (await readdir(activitiesDir)).filter((name) => name.endsWith(".md"));
if (files.length < 4) {
  missing.push("Au moins 4 contenus activités attendus dans content/activities");
}

for (const file of files) {
  const raw = await readFile(resolve(activitiesDir, file), "utf8");
  const parsed = matter(raw);
  const alt = String(parsed.data.alt || "").trim();
  const publishedAt = String(parsed.data.published_at || "").trim();
  const src = String(parsed.data.src || "").trim();

  if (!alt) {
    missing.push(`${file}: alt manquant ou vide`);
  }
  if (!publishedAt) {
    missing.push(`${file}: published_at manquant ou vide`);
  }
  if (!src.startsWith("/images/activities/")) {
    missing.push(`${file}: src doit commencer par /images/activities/`);
  }
}

if (missing.length > 0) {
  console.error("Validation galerie activités KO.");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Validation galerie activités OK");
