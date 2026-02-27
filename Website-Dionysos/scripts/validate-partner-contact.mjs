import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const page = await readFile(resolve("app/pages/partenaires.vue"), "utf8");
const endpoint = await readFile(resolve("server/api/partner-contact.post.ts"), "utf8");

const pageChecks = [
  "submitPartnerRequest",
  "/api/partner-contact",
  "Demander un échange partenaire",
  "mailto:partenariats@dionysos-bordeaux.fr",
  "id=\"contactName\"",
  "id=\"organization\"",
  "id=\"email\"",
  "id=\"objective\"",
  "Le nom du contact est requis.",
  "Le nom de l'organisation est requis.",
  "Le format de l'email est invalide.",
  "L'objectif de partenariat est requis.",
  "submitStatus === 'success'",
  "submitStatus === 'error'",
  "a bien été transmise",
];

const endpointChecks = [
  "partnerContactSchema",
  "contactName",
  "organization",
  "email",
  "objective",
  "safeParse",
  "statusCode: 400",
  "Le formulaire contient des informations invalides.",
  "ok: true",
  "data:",
  "a bien été transmise",
];

const missing = [];

for (const item of pageChecks) {
  if (!page.includes(item)) {
    missing.push(`app/pages/partenaires.vue manque: ${item}`);
  }
}

for (const item of endpointChecks) {
  if (!endpoint.includes(item)) {
    missing.push(`server/api/partner-contact.post.ts manque: ${item}`);
  }
}

if (missing.length > 0) {
  console.error("Validation canal contact partenaire KO.");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Validation canal contact partenaire OK");
