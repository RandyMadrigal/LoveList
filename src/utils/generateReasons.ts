import { REASONS } from "../constants/reasons";
import type { Lang } from "../i18n/translations";
import { seededRandom } from "./seededRandom";

export function generateReasons(
  name: string,
  seed: string,
  lang: Lang,
  count = 50,
): string[] {
  const random = seededRandom(seed);
  const { prefix, items } = REASONS[lang];

  // Fisher–Yates: unbiased, unlike sorting with a random comparator
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count).map((reason) => `${prefix} ${reason}, ${name}.`);
}
