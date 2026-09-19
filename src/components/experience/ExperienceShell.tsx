import { useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { PALETTES, paletteBackground, type PaletteId } from "../../constants/palettes";
import { formatRemaining, useCountdown } from "../../hooks/useCountdown";
import { useI18n } from "../../i18n/useI18n";
import {
  hapticsEnabled,
  hapticsSupported,
  setHapticsEnabled,
  vibrate,
} from "../../utils/haptics";

type ExperienceShellProps = {
  palette: PaletteId;
  expiresAt: number;
  onExpire: () => void;
  children: ReactNode;
};

// Shared frame for every experience: palette, countdown and the vibration toggle.
function ExperienceShell({ palette, expiresAt, onExpire, children }: ExperienceShellProps) {
  const { t } = useI18n();
  const remaining = useCountdown(expiresAt, onExpire);
  const [haptics, setHaptics] = useState(hapticsEnabled);
  const p = PALETTES[palette];

  const vars = {
    "--c-from": p.from,
    "--c-to": p.to,
    "--c-accent": p.accent,
    "--c-glow": p.glow,
  } as CSSProperties;

  const toggleHaptics = () => {
    const next = !haptics;
    setHaptics(next);
    setHapticsEnabled(next);
    if (next) vibrate(12);
  };

  return (
    <div style={vars} className="relative min-h-dvh text-white">
      <div
        aria-hidden="true"
        className="fixed inset-0"
        style={{ background: paletteBackground(palette) }}
      />

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <Link
          to="/"
          className="glass flex items-center gap-2 rounded-full py-1.5 pl-3 pr-4 text-lg font-bold leading-none tracking-[-0.05em]"
        >
          <img src="/heart.svg" alt="" className="h-5 w-5" />
          why?
        </Link>

        <div className="flex items-center gap-2">
          <p
            className="glass rounded-full px-3 py-1.5 text-xs font-medium tabular-nums"
            aria-label={t("exp.expiresIn", { time: formatRemaining(remaining) })}
          >
            {t("exp.expiresIn", { time: formatRemaining(remaining) })}
          </p>
          {hapticsSupported() && (
            <button
              type="button"
              onClick={toggleHaptics}
              aria-pressed={haptics}
              aria-label={haptics ? t("exp.vibrationOn") : t("exp.vibrationOff")}
              className="glass flex h-8 w-8 items-center justify-center rounded-full text-sm active:scale-90"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="8" y="4" width="8" height="16" rx="2" />
                <path d="M4.5 8v8M19.5 8v8" />
                {!haptics && <path d="M3 3l18 18" />}
              </svg>
            </button>
          )}
        </div>
      </header>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default ExperienceShell;
