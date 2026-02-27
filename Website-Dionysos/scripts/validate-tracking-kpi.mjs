import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import matter from "gray-matter";

const root = process.cwd();

const requiredFiles = [
  "app/composables/useConversionTracking.ts",
  "app/pages/kpi-seo.vue",
  "server/api/kpi/seo.get.ts",
  "content/kpi-seo/2026-02.md",
];

const trackedPages = [
  "app/app.vue",
  "app/pages/index.vue",
  "app/pages/activites.vue",
  "app/pages/communaute.vue",
  "app/pages/partenaires.vue",
];

const checks = [];
const failures = [];

const readText = async (relativePath) => readFile(resolve(root, relativePath), "utf8");
const hasTrackCall = (content, channel) =>
  new RegExp(`trackConversionClick\\((['"])${channel}\\1`, "m").test(content);

for (const file of requiredFiles) {
  try {
    await readText(file);
    checks.push({
      label: `${file} exists`,
      pass: true,
    });
  } catch {
    checks.push({
      label: `${file} exists`,
      pass: false,
    });
  }
}

for (const page of trackedPages) {
  const content = await readText(page);
  checks.push({
    label: `${page} tracks conversion_click`,
    pass: hasTrackCall(content, "discord") && hasTrackCall(content, "instagram"),
  });
}

const composableContent = await readText("app/composables/useConversionTracking.ts");
checks.push({
  label: "Composable sends plausible conversion_click event",
  pass:
    /window\.plausible\((['"])conversion_click\1/.test(composableContent) &&
    composableContent.includes("placement"),
});

const kpiApiContent = await readText("server/api/kpi/seo.get.ts");
checks.push({
  label: "KPI API exposes positions, impressions, clicks, conversions",
  pass:
    kpiApiContent.includes("positions") &&
    kpiApiContent.includes("impressions") &&
    kpiApiContent.includes("clicks") &&
    kpiApiContent.includes("conversions"),
});

const kpiPageContent = await readText("app/pages/kpi-seo.vue");
checks.push({
  label: "KPI dashboard page renders required metrics",
  pass:
    kpiPageContent.includes("Position moyenne") &&
    kpiPageContent.includes("Impressions") &&
    kpiPageContent.includes("Clics") &&
    kpiPageContent.includes("Conversions"),
});

const kpiMarkdown = await readText("content/kpi-seo/2026-02.md");
const { data: kpiFrontmatter } = matter(kpiMarkdown);
checks.push({
  label: "KPI monthly content has required keys",
  pass:
    typeof kpiFrontmatter.month === "string" &&
    typeof kpiFrontmatter.positions === "number" &&
    typeof kpiFrontmatter.impressions === "number" &&
    typeof kpiFrontmatter.clicks === "number" &&
    typeof kpiFrontmatter.conversions === "number",
});

for (const check of checks) {
  if (!check.pass) failures.push(check.label);
}

if (failures.length) {
  throw new Error(`Tracking/KPI validation failed:\n- ${failures.join("\n- ")}`);
}

console.log("Tracking/KPI validation passed.");
