import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import AnimatedCounter from "../ui/AnimatedCounter";
import { ButtonLink } from "../ui/Button";
import { useI18n } from "../../i18n/useI18n";
import { celebrate } from "../../utils/celebrate";
import { vibrate } from "../../utils/haptics";
import { clamp, project } from "../../utils/physics";
import type { ExperienceProps } from "./types";

const slide = {
  enter: (dir: number) => ({ x: dir * 70, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -70, opacity: 0 }),
};

// One full-screen card at a time. Drag it, flick it, tap the edges or use the arrows.
function StoryExperience({ name, from, message, reasons }: ExperienceProps) {
  const { t } = useI18n();
  const steps = reasons.length + 2; // intro, every reason, closing card
  const last = steps - 1;

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (next: number) => {
      const target = clamp(next, 0, last);
      if (target === index) return;
      setDir(target > index ? 1 : -1);
      setIndex(target);
      vibrate(8);
      if (target === last) celebrate(80);
    },
    [index, last],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        go(index + 1);
      } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        go(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  // Decide from where the flick would land, not just where the finger let go
  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    const projected = info.offset.x + project(info.velocity.x);
    if (projected < -110) go(index + 1);
    else if (projected > 110) go(index - 1);
  };

  // A tap is a press and release that barely moved; anything longer is a drag
  const pressStart = useRef<{ x: number; y: number } | null>(null);
  const handlePointerDown = (e: React.PointerEvent) => {
    pressStart.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    const start = pressStart.current;
    pressStart.current = null;
    if (!start || Math.hypot(e.clientX - start.x, e.clientY - start.y) > 8) return;
    go(e.clientX > window.innerWidth * 0.35 ? index + 1 : index - 1);
  };

  const isEnd = index === last;
  const isReason = index > 0 && index < last;

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" custom={dir} initial={false}>
        <motion.div
          key={index}
          custom={dir}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", bounce: 0, duration: 0.45 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={handleDragEnd}
          onPointerDown={isEnd ? undefined : handlePointerDown}
          onPointerUp={isEnd ? undefined : handlePointerUp}
          className="flex h-full w-full cursor-grab items-center justify-center active:cursor-grabbing"
        >
          <div className="flex w-full max-w-3xl flex-col items-center gap-6 px-8 text-center">
          {index === 0 && (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)]">
                {t("exp.introFor", { name })}
              </p>
              <AnimatedCounter
                target={reasons.length}
                className="text-8xl font-bold tracking-[-0.05em] sm:text-9xl"
              />
              <h1 className="display text-[clamp(2rem,6vw,3.75rem)]">
                {t("love.heading", { name })}
              </h1>
              <p className="glass mt-4 rounded-full px-4 py-2 text-sm">
                {t("exp.swipe")}
              </p>
            </>
          )}

          {isReason && (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)]">
                {t("exp.progress", { n: index, total: reasons.length })}
              </p>
              <p className="text-[clamp(1.9rem,6.2vw,3.6rem)] font-semibold leading-[1.12] tracking-[-0.03em] [text-wrap:balance]">
                {reasons[index - 1]}
              </p>
            </>
          )}

          {isEnd && (
            <>
              <h2 className="title">{t("exp.endTitle")}</h2>
              {message && (
                <p className="glass max-w-xl whitespace-pre-line rounded-3xl px-6 py-4 text-lg leading-relaxed">
                  {message}
                </p>
              )}
              {from && (
                <p className="text-white/85">{t("love.from", { from })}</p>
              )}
              <ButtonLink to="/create" className="mt-2 px-8 py-3.5 text-base">
                {t("love.makeYours")}
              </ButtonLink>
            </>
          )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mouse users get explicit arrows; touch users just swipe */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label={t("exp.prev")}
        disabled={index === 0}
        className="glass absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-lg transition-opacity disabled:opacity-0 md:flex"
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label={t("exp.next")}
        disabled={isEnd}
        className="glass absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-lg transition-opacity disabled:opacity-0 md:flex"
      >
        →
      </button>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={last}
        aria-valuenow={index}
        className="fixed inset-x-6 bottom-[max(1.5rem,env(safe-area-inset-bottom))] mx-auto h-1 max-w-3xl overflow-hidden rounded-full bg-white/20"
      >
        <motion.div
          className="h-full origin-left rounded-full bg-[var(--c-accent)]"
          initial={false}
          animate={{ scaleX: index / last }}
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        />
      </div>
    </div>
  );
}

export default StoryExperience;
