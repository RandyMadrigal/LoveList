import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ButtonLink, Button } from "../ui/Button";
import { useI18n } from "../../i18n/useI18n";
import { celebrate } from "../../utils/celebrate";
import { vibrate } from "../../utils/haptics";
import type { ExperienceProps } from "./types";

type Stage = "closed" | "letter" | "notes";

const spring = { type: "spring", bounce: 0, duration: 0.6 } as const;

// A sealed envelope: tap to open, read the letter, then the reasons drop in as notes.
function EnvelopeExperience({ name, from, message, reasons }: ExperienceProps) {
  const { t } = useI18n();
  const [stage, setStage] = useState<Stage>("closed");
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    vibrate([12, 40, 18]);
    setOpening(true);
  };

  const showNotes = () => {
    vibrate(10);
    celebrate(90);
    setStage("notes");
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center px-6 pb-20 pt-28">
      <AnimatePresence mode="wait" initial={false}>
        {stage === "closed" && (
          <motion.div
            key="closed"
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={spring}
            className="my-auto flex flex-col items-center gap-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--c-accent)]">
              {t("exp.introFor", { name })}
            </p>

            <motion.button
              type="button"
              onClick={open}
              whileTap={{ scale: 0.97 }}
              aria-label={t("exp.tapToOpen")}
              className="relative h-52 w-[19rem] max-w-full [perspective:900px] sm:h-60 sm:w-[23rem]"
            >
              {/* back of the envelope */}
              <div
                className="absolute inset-0 rounded-2xl shadow-2xl"
                style={{ background: "color-mix(in srgb, var(--c-accent) 62%, black)" }}
              />
              {/* the pocket in front */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "var(--c-accent)",
                  clipPath: "polygon(0 100%, 0 28%, 50% 62%, 100% 28%, 100% 100%)",
                }}
              />
              {/* the flap that swings open */}
              <motion.div
                className="absolute inset-x-0 top-0 h-full origin-top rounded-t-2xl"
                style={{
                  background: "color-mix(in srgb, var(--c-accent) 82%, white)",
                  clipPath: "polygon(0 0, 100% 0, 50% 62%)",
                }}
                animate={{ rotateX: opening ? 180 : 0 }}
                transition={{ type: "spring", bounce: 0.1, duration: 0.7 }}
                onAnimationComplete={() => opening && setStage("letter")}
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[52%] -translate-x-1/2 text-3xl drop-shadow"
              >
                {opening ? "" : "❤️"}
              </span>
            </motion.button>

            <p className="glass select-none rounded-full px-4 py-2 text-sm">
              {t("exp.tapToOpen")}
            </p>
          </motion.div>
        )}

        {stage === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 40, rotate: -1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={spring}
            className="my-auto w-full rounded-[1.75rem] bg-[#fffaf5] p-8 text-[#3b0d22] shadow-2xl sm:p-10"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-love">
              {t("exp.introFor", { name })}
            </p>
            <p className="whitespace-pre-line text-2xl font-medium leading-snug tracking-[-0.02em]">
              {message || t("exp.letterFallback")}
            </p>
            {from && (
              <p className="mt-6 text-right text-lg italic">{t("love.from", { from })}</p>
            )}
            <Button onClick={showNotes} className="mt-8 w-full py-3.5 text-base">
              {t("exp.readReasons")}
            </Button>
          </motion.div>
        )}

        {stage === "notes" && (
          <motion.div
            key="notes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={spring}
            className="w-full"
          >
            <h1 className="title mb-10 text-center">{t("love.heading", { name })}</h1>

            <ul className="space-y-4">
              {reasons.map((reason, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: -28, rotate: i % 2 ? 2.5 : -2.5 }}
                  animate={{ opacity: 1, y: 0, rotate: i % 2 ? 0.8 : -0.8 }}
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                    delay: Math.min(i, 8) * 0.06,
                  }}
                  className="rounded-2xl bg-[#fffaf5] px-6 py-5 text-lg font-medium leading-snug tracking-[-0.01em] text-[#3b0d22] shadow-xl"
                >
                  {reason}
                </motion.li>
              ))}
            </ul>

            <div className="mt-14 text-center">
              <h2 className="title mb-6">{t("exp.endTitle")}</h2>
              <ButtonLink to="/create" className="px-8 py-3.5 text-base">
                {t("love.makeYours")}
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EnvelopeExperience;
