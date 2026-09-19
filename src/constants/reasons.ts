import type { Lang } from "../i18n/translations";
import { REASONS_EN } from "./reasons.en";
import { REASONS_ES } from "./reasons.es";
import { REASONS_PT } from "./reasons.pt";
import { REASONS_FR } from "./reasons.fr";

export const REASONS: Record<Lang, { prefix: string; items: string[] }> = {
  en: { prefix: "Because", items: REASONS_EN },
  es: { prefix: "Porque", items: REASONS_ES },
  pt: { prefix: "Porque", items: REASONS_PT },
  fr: { prefix: "Parce que", items: REASONS_FR },
};
