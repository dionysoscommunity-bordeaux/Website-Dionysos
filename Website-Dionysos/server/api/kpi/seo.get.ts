import { readCollection } from "../../utils/content";

type SeoKpiRecord = {
  month: string;
  positions: number;
  impressions: number;
  clicks: number;
  conversions: number;
  source?: string;
  updated_at?: string;
};

const monthRegex = /^\d{4}-\d{2}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const toFiniteNumber = (value: unknown): number | null => {
  const numeric = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const toOptionalDate = (value: unknown): string | null =>
  typeof value === "string" && dateRegex.test(value) ? value : null;

export default defineEventHandler(async () => {
  const records = await readCollection<SeoKpiRecord>("kpi-seo");

  const data = records
    .filter((record) => monthRegex.test(record.month))
    .map((record) => {
      const positions = toFiniteNumber(record.positions);
      const impressions = toFiniteNumber(record.impressions);
      const clicks = toFiniteNumber(record.clicks);
      const conversions = toFiniteNumber(record.conversions);

      if (
        positions === null ||
        impressions === null ||
        clicks === null ||
        conversions === null
      ) {
        return null;
      }

      return {
        slug: record.slug,
        month: record.month,
        positions,
        impressions,
        clicks,
        conversions,
        source: typeof record.source === "string" && record.source.trim().length > 0 ? record.source : "manual",
        updated_at: toOptionalDate(record.updated_at),
      };
    })
    .filter((record): record is NonNullable<typeof record> => record !== null)
    .sort((a, b) => b.month.localeCompare(a.month));

  return {
    ok: true,
    data,
    meta: {
      total: data.length,
      latestMonth: data[0]?.month || null,
    },
  };
});
