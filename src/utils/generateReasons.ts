import { REASONS } from "../constants/reasons";
import type { NameMode } from "../constants/nameMode";
import type { Lang } from "../i18n/translations";
import { seededRandom } from "./seededRandom";

export type ReasonOptions = {
  mode: NameMode;
  /** Used instead of the name inside the reasons when present. */
  nickname?: string;
  count?: number;
};

// Roughly one reason in six mentions the name when the mode is "sometimes"
const SOMETIMES_RATE = 1 / 6;

export function generateReasons(
  name: string,
  seed: string,
  lang: Lang,
  { mode, nickname = "", count = 50 }: ReasonOptions,
): string[] {
  const random = seededRandom(seed);
  const { prefix, items } = REASONS[lang];

  // Fisher–Yates: unbiased, unlike sorting with a random comparator
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const addressee = nickname.trim() || name;

  // Its own random stream, so changing the mode never reshuffles the reasons.
  // Both rolls are drawn for every reason to keep the stream stable.
  const mention = seededRandom(`${seed}:name`);

  return pool.slice(0, count).map((reason) => {
    const roll = mention();
    const side = mention();

    const named =
      mode === "always" || (mode === "sometimes" && roll < SOMETIMES_RATE);
    if (!named) return `${prefix} ${reason}.`;

    // "sometimes" alternates between opening and closing with the name
    const atStart = mode === "sometimes" && side < 0.5;
    return atStart
      ? `${addressee}, ${prefix.toLowerCase()} ${reason}.`
      : `${prefix} ${reason}, ${addressee}.`;
  });
}
