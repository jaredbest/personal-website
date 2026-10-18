// Date formatting for the resume and blog, in the current site language.
import type { Lang, YearMonth } from "../data/types";

const locales: Record<Lang, string> = { en: "en-US", de: "de-DE" };

/** "2023-07" → "Jul 2023" (en) or "Juli 2023" (de). "2009" stays "2009". */
export function formatYearMonth(value: YearMonth, lang: Lang): string {
  const [year, month] = value.split("-").map(Number);
  if (!month) return String(year);
  return new Intl.DateTimeFormat(locales[lang], { month: "short", year: "numeric", timeZone: "UTC" }).format(
    Date.UTC(year!, month - 1),
  );
}

/** "2021-03-17" → "Mar 17, 2021" (en) or "17.03.2021" (de). */
export function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(locales[lang], { dateStyle: "medium", timeZone: "UTC" }).format(new Date(iso));
}

/** Whole months from start to end, counting both ends, like LinkedIn does. No end means "now". */
export function monthsBetween(start: YearMonth, end?: YearMonth, now = new Date()): number {
  const [startYear, startMonth = 1] = start.split("-").map(Number);
  const [endYear, endMonth] = end
    ? (end.split("-").map(Number) as [number, number?])
    : [now.getFullYear(), now.getMonth() + 1];
  return (endYear - startYear!) * 12 + ((endMonth ?? 12) - startMonth) + 1;
}
