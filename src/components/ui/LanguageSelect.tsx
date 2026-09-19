import { useI18n } from "../../i18n/useI18n";
import { LANGS, LANG_LABELS, type Lang } from "../../i18n/translations";

type LanguageSelectProps = {
  value?: Lang;
  onChange?: (lang: Lang) => void;
  label?: string;
  className?: string;
};

// Controlled when `value`/`onChange` are passed; otherwise it drives the app language.
function LanguageSelect({ value, onChange, label, className = "" }: LanguageSelectProps) {
  const { lang, setLang, t } = useI18n();
  const current = value ?? lang;

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label ?? t("nav.language")}</span>
      <select
        value={current}
        onChange={(e) => (onChange ?? setLang)(e.target.value as Lang)}
        className={`appearance-none cursor-pointer rounded-full bg-transparent py-2 pl-9 pr-4 text-sm font-medium outline-offset-2 ${className}`}
      >
        {LANGS.map((code) => (
          <option key={code} value={code} className="text-rose-ink">
            {LANG_LABELS[code]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-3 h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
      </svg>
    </label>
  );
}

export default LanguageSelect;
