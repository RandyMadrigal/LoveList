import { createContext } from "react";
import type { Lang, TranslationKey } from "./translations";

export type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

export const I18nContext = createContext<I18nValue | null>(null);
