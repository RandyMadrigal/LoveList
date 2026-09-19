import { EXPERIENCES, type Experience } from "../../constants/experiences";
import { NAME_MODES, type NameMode } from "../../constants/nameMode";
import {
  PALETTES,
  PALETTE_IDS,
  paletteBackground,
  type PaletteId,
} from "../../constants/palettes";
import { useI18n } from "../../i18n/useI18n";

const ICONS: Record<Experience, string> = {
  // stacked cards
  story: "M6 7h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm2-3h8",
  // envelope
  envelope: "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm0 0 8 6 8-6",
  // lyric lines
  lyrics: "M5 6h14M5 12h10M5 18h6",
  // scroll arrows
  scroll: "M12 4v16m0 0-4-4m4 4 4-4M8 8l4-4 4 4",
};

type ExperiencePickerProps = {
  value: Experience;
  palette: PaletteId;
  onChange: (value: Experience) => void;
};

export function ExperiencePicker({ value, palette, onChange }: ExperiencePickerProps) {
  const { t } = useI18n();

  return (
    <fieldset>
      <legend className="mb-3 block text-sm font-semibold">
        {t("create.styleTitle")}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {EXPERIENCES.map((id) => (
          <label key={id} className="relative cursor-pointer">
            <input
              type="radio"
              name="experience"
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
              className="peer sr-only"
            />
            <div
              className="flex h-full items-start gap-3 rounded-2xl p-4 text-white ring-2 ring-transparent transition-all duration-200 peer-checked:ring-love peer-checked:ring-offset-2 peer-focus-visible:ring-love peer-active:scale-[0.98]"
              style={{ background: paletteBackground(palette) }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mt-0.5 h-6 w-6 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={ICONS[id]} />
              </svg>
              <span>
                <span className="block font-semibold tracking-[-0.01em]">
                  {t(`exp.${id}.name`)}
                </span>
                <span className="block text-sm leading-snug text-white/80">
                  {t(`exp.${id}.desc`)}
                </span>
              </span>
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

type NameModePickerProps = {
  value: NameMode;
  onChange: (value: NameMode) => void;
};

// Segmented control: one option is always selected
export function NameModePicker({ value, onChange }: NameModePickerProps) {
  const { t } = useI18n();

  return (
    <fieldset>
      <legend className="mb-3 block text-sm font-semibold">
        {t("create.nameModeTitle")}
      </legend>
      <div className="inline-flex rounded-full border border-rose-200 bg-white p-1">
        {NAME_MODES.map((mode) => (
          <label key={mode} className="relative cursor-pointer">
            <input
              type="radio"
              name="nameMode"
              value={mode}
              checked={value === mode}
              onChange={() => onChange(mode)}
              className="peer sr-only"
            />
            <span className="block rounded-full px-4 py-2 text-sm font-medium text-rose-mid transition-colors duration-200 peer-checked:bg-love peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-love peer-active:scale-95">
              {t(`nameMode.${mode}`)}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

type PalettePickerProps = {
  value: PaletteId;
  onChange: (value: PaletteId) => void;
};

export function PalettePicker({ value, onChange }: PalettePickerProps) {
  const { t } = useI18n();

  return (
    <fieldset>
      <legend className="mb-3 block text-sm font-semibold">
        {t("create.paletteTitle")}
      </legend>
      <div className="flex flex-wrap gap-4">
        {PALETTE_IDS.map((id) => (
          <label key={id} className="relative flex cursor-pointer flex-col items-center gap-1.5">
            <input
              type="radio"
              name="palette"
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
              className="peer sr-only"
            />
            <span
              className="h-11 w-11 rounded-full ring-2 ring-transparent ring-offset-2 transition-all duration-200 peer-checked:ring-love peer-focus-visible:ring-love peer-active:scale-90"
              style={{
                background: `linear-gradient(135deg, ${PALETTES[id].from}, ${PALETTES[id].to} 60%, ${PALETTES[id].accent})`,
              }}
            />
            <span className="text-xs text-rose-mid">{t(`palette.${id}`)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
