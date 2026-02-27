import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const failures = [];

const readText = async (relativePath) => readFile(resolve(root, relativePath), "utf8");

const getPageFiles = async () => {
  const pageDir = resolve(root, "app/pages");
  const entries = await readdir(pageDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".vue"))
    .map((entry) => `app/pages/${entry.name}`);
};

const validateSecurityHeaders = async () => {
  const content = await readText("server/middleware/security-headers.ts");
  const requiredHeaders = [
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Referrer-Policy",
    "Permissions-Policy",
    "Cross-Origin-Opener-Policy",
  ];

  for (const header of requiredHeaders) {
    if (!content.includes(header)) {
      failures.push(`server/middleware/security-headers.ts manque: ${header}`);
    }
  }
};

const validateExternalLinkSecurity = async (filePath) => {
  const content = await readText(filePath);
  const targetBlankAnchors = content.match(/<a[\s\S]*?target="_blank"[\s\S]*?>/g) || [];

  for (const anchor of targetBlankAnchors) {
    const relMatch = anchor.match(/rel="([^"]*)"/);
    const relValue = relMatch?.[1] || "";
    if (!relValue.includes("noopener") || !relValue.includes("noreferrer")) {
      failures.push(`${filePath} contient un lien target="_blank" sans rel sécurisé noopener noreferrer`);
      break;
    }
  }
};

const validateAccessibilityBaseline = async (filePath) => {
  const content = await readText(filePath);
  const h1Count = (content.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) {
    failures.push(`${filePath} doit contenir exactement un h1 (actuel: ${h1Count})`);
  }
};

const validateImagePerformance = async (filePath) => {
  const content = await readText(filePath);
  const imageTags = content.match(/<img[\s\S]*?>/g) || [];

  for (const image of imageTags) {
    const hasAlt = /\s(:?alt|v-bind:alt)=/.test(image);
    const hasLazy = /\sloading="lazy"/.test(image);
    const hasWidth = /\swidth=/.test(image);
    const hasHeight = /\sheight=/.test(image);
    if (!hasAlt || !hasLazy || !hasWidth || !hasHeight) {
      failures.push(
        `${filePath} contient une image sans baseline perf/access (alt + loading="lazy" + width + height)`
      );
      break;
    }
  }
};

const validatePipelineRegistration = async () => {
  const packageJson = await readText("package.json");
  const requiredChecks = [
    "validate:seo-tech-foundation",
    "validate:social-metadata-schema",
    "validate:pipeline-guards",
  ];

  for (const check of requiredChecks) {
    if (!packageJson.includes(check)) {
      failures.push(`package.json doit inclure ${check} dans les scripts/pipeline`);
    }
  }
};

const run = async () => {
  await validateSecurityHeaders();
  await validatePipelineRegistration();

  const pageFiles = await getPageFiles();
  for (const page of pageFiles) {
    await validateAccessibilityBaseline(page);
    await validateExternalLinkSecurity(page);
    await validateImagePerformance(page);
  }
  await validateExternalLinkSecurity("app/app.vue");

  if (failures.length > 0) {
    throw new Error(`Validation pipeline guards KO:\n- ${failures.join("\n- ")}`);
  }

  console.log("Validation pipeline guards OK");
};

run().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
