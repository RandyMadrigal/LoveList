import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ButtonLink } from "../ui/Button";
import { useI18n } from "../../i18n/useI18n";
import { vibrate } from "../../utils/haptics";
import { clamp } from "../../utils/physics";
import type { ExperienceProps } from "./types";

type Line =
  | { kind: "text"; text: string }
  | { kind: "cta" };

const STEP_MS = 4500;

// Reasons scroll like song lyrics: the current line is sharp, the rest fade and blur.
function LyricsExperience({ name, from, message, reasons }: ExperienceProps) {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  const lines = useMemo<Line[]>(() => {
    const list: Line[] = [
      { kind: "text", text: t("love.heading", { name }) },
      ...reasons.map((text) => ({ kind: "text" as const, text })),
    ];
    if (message) list.push({ kind: "text", text: message });
    if (from) list.push({ kind: "text", text: t("love.from", { from }) });
    list.push({ kind: "cta" });
    return list;
  }, [t, name, reasons, message, from]);

  const last = lines.length - 1;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(!reduced);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goTo = useCallback(
    (next: number, buzz = true) => {
      setActive((current) => {
        const target = clamp(next, 0, last);
        if (target !== current && buzz) vibrate(8);
        return target;
      });
    },
    [last],
  );

  // Autoplay: advance every few seconds and stop on the last line
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActive((current) => {
        if (current >= last) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, STEP_MS);
    return () => clearInterval(id);
  }, [playing, last]);

  // Keep the active line centered
  useEffect(() => {
    const container = containerRef.current;
    const el = lineRefs.current[active];
    if (!container || !el) return;
    container.scrollTo({
      top: el.offsetTop - container.clientHeight / 2 + el.clientHeight / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  return (
    <div className="fixed inset-0 flex flex-col">
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden px-8 [mask-image:linear-gradient(transparent,black_22%,black_70%,transparent)] sm:px-[12vw]"
      >
        <div className="py-[45dvh]">
          {lines.map((line, i) => {
            const distance = Math.abs(i - active);
            const isActive = distance === 0;
            return (
              <div
                key={i}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                onClick={() => goTo(i)}
                className="origin-left cursor-pointer py-3 transition-[opacity,filter,transform] duration-500 ease-[var(--ease-out-soft)] motion-reduce:transition-none"
                style={{
                  opacity: isActive ? 1 : Math.max(0.16, 0.55 - distance * 0.14),
                  // Lines beyond 4 are already faded out by the mask, so skip their blur layers
                  filter: isActive || distance > 4 ? "none" : `blur(${distance * 1.2}px)`,
                  transform: `scale(${isActive ? 1 : 0.92})`,
                }}
              >
                {line.kind === "text" ? (
                  <p className="text-[clamp(1.6rem,5vw,2.9rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                    {line.text}
                  </p>
                ) : (
                  <ButtonLink to="/create" className="mt-2 px-8 py-3.5 text-base">
                    {t("love.makeYours")}
                  </ButtonLink>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass mx-auto mb-[max(1.25rem,env(safe-area-inset-bottom))] flex items-center gap-2 rounded-full px-3 py-2">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label={t("exp.prev")}
          disabled={active === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full text-lg active:scale-90 disabled:opacity-30"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? t("exp.pause") : t("exp.play")}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg text-rose-ink active:scale-90"
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label={t("exp.next")}
          disabled={active === last}
          className="flex h-10 w-10 items-center justify-center rounded-full text-lg active:scale-90 disabled:opacity-30"
        >
          ↓
        </button>
        <span className="min-w-[4.5rem] text-center text-xs tabular-nums opacity-80">
          {t("exp.progress", { n: Math.min(active, reasons.length), total: reasons.length })}
        </span>
      </div>
    </div>
  );
}

export default LyricsExperience;
