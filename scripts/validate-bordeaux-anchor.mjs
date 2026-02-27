import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const activitiesPage = await readFile(resolve("app/pages/activites.vue"), "utf8");
const announcement = await readFile(resolve("content/announcements/lancement-semaine.md"), "utf8");
const homeContent = await readFile(resolve("content/pages/home.md"), "utf8");

const missing = [];

const normalize = (text) =>
  text
    .normalize("NFD")
    .replaceAll(/\p{Diacritic}/gu, "")
    .toLowerCase();

const hasToken = (text, token) => normalize(text).includes(normalize(token));

const checkEditorialAnchor = (label, text) => {
  if (!hasToken(text, "Bordeaux")) {
    missing.push(`${label} doit contenir "Bordeaux"`);
  }
  const localRefs = ["quais", "chartrons", "saint-michel", "gambetta", "victoire", "bassins à flot"];
  const foundRef = localRefs.some((ref) => hasToken(text, ref));
  if (!foundRef) {
    missing.push(`${label} doit contenir au moins une référence locale de quartier/lieu`);
  }
};

checkEditorialAnchor("content/announcements/lancement-semaine.md", announcement);
checkEditorialAnchor("content/pages/home.md", homeContent);

if (!hasToken(activitiesPage, "bordelais")) {
  missing.push("app/pages/activites.vue doit contenir un repère textuel local (mot-clé: bordelais)");
}

const landmarks = ["quais", "saint-michel", "chartrons", "victoire", "gambetta", "bassins à flot"];
const foundLandmarks = landmarks.filter((item) => hasToken(activitiesPage, item)).length;
if (foundLandmarks < 4) {
  missing.push("app/pages/activites.vue doit conserver au moins 4 repères locaux explicites");
}

if (missing.length > 0) {
  console.error("Validation ancrage Bordeaux KO.");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Validation ancrage Bordeaux OK");
