import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import AnimatedCounter from "../ui/AnimatedCounter";
import { ButtonLink } from "../ui/Button";
import { useI18n } from "../../i18n/useI18n";
import { vibrate } from "../../utils/haptics";
import type { ExperienceProps } from "./types";

function Heart({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block bg-[var(--c-accent)] ${className}`}
      style={{
        maskImage: "url(/heart.svg)",
        WebkitMaskImage: "url(/heart.svg)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  );
}

// One reason per screen with scroll-snap; the background hue drifts as you go.
function ScrollExperience({ name, from, message, reasons }: ExperienceProps) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const currentSection = useRef(0);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const farHearts = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const nearHearts = useTransform(scrollYProgress, [0, 1], [0, -1100]);

  // The hue is written straight to the element: no state, so the 50+ sections never re-render
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const next = Math.round(el.scrollTop / el.clientHeight);
    if (next === currentSection.current) return;
    currentSection.current = next;
    glowRef.current?.style.setProperty("filter", `hue-rotate(${next * 3}deg)`);
    vibrate(6);
  };

  const reveal = {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { root: containerRef, amount: 0.55 },
    transition: { type: "spring", bounce: 0, duration: 0.7 },
  } as const;

  const sectionClass =
    "flex min-h-dvh snap-start flex-col items-center justify-center gap-6 px-8 text-center";

  return (
    <>
      {/* Drifting glow: hue rotates with the section */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 transition-[filter] duration-700 motion-reduce:transition-none"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 50%, color-mix(in srgb, var(--c-accent) 32%, transparent), transparent 70%)",
        }}
      />

      {/* Two hearts layers at different speeds give depth */}
      <motion.div
        aria-hidden="true"
        style={{ y: farHearts }}
        className="pointer-events-none fixed inset-x-0 top-[60vh] flex justify-around opacity-20 blur-[2px]"
      >
        <Heart className="h-16 w-16 -rotate-12" />
        <Heart className="h-10 w-10 translate-y-40 rotate-12" />
        <Heart className="h-14 w-14 translate-y-16" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ y: nearHearts }}
        className="pointer-events-none fixed inset-x-0 top-[90vh] flex justify-between px-6 opacity-30"
      >
        <Heart className="h-24 w-24 rotate-12" />
        <Heart className="h-20 w-20 -rotate-6 translate-y-72" />
      </motion.div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="fixed inset-0 snap-y snap-mandatory overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <section className={sectionClass}>
          <motion.div {...reveal} className="flex flex-col items-center gap-6">
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
            <motion.p
              aria-hidden="true"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="glass mt-6 rounded-full px-4 py-2 text-sm"
            >
              {t("exp.scrollHint")} ↓
            </motion.p>
          </motion.div>
        </section>

        {reasons.map((reason, i) => (
          <section key={i} className={sectionClass}>
            <motion.div {...reveal} className="flex max-w-3xl flex-col items-center gap-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)]">
                {t("exp.progress", { n: i + 1, total: reasons.length })}
              </p>
              <p className="text-[clamp(1.9rem,6vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.03em] [text-wrap:balance]">
                {reason}
              </p>
            </motion.div>
          </section>
        ))}

        <section className={sectionClass}>
          <motion.div {...reveal} className="flex flex-col items-center gap-6">
            <h2 className="title">{t("exp.endTitle")}</h2>
            {message && (
              <p className="glass max-w-xl whitespace-pre-line rounded-3xl px-6 py-4 text-lg leading-relaxed">
                {message}
              </p>
            )}
            {from && <p className="text-white/85">{t("love.from", { from })}</p>}
            <ButtonLink to="/create" className="mt-2 px-8 py-3.5 text-base">
              {t("love.makeYours")}
            </ButtonLink>
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default ScrollExperience;
