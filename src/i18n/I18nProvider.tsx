import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { I18nContext, type I18nValue } from "./context";
import { TRANSLATIONS, detectLang, type Lang } from "./translations";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (key, vars) => {
        let text = TRANSLATIONS[lang][key];
        if (vars) {
          for (const [k, v] of Object.entries(vars)) {
            text = text.replaceAll(`{${k}}`, String(v));
          }
        }
        return text;
      },
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
