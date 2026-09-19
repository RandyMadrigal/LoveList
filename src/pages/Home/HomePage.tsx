import { motion, type Variants } from "motion/react";
import { useI18n } from "../../i18n/useI18n";
import { ButtonLink } from "../../components/ui/Button";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0, duration: 0.8 },
  },
};

function HomePage() {
  const { t } = useI18n();

  const steps = [1, 2, 3] as const;

  return (
    <>
      {/* Full-screen hero */}
      <section
        className="relative flex h-dvh min-h-[560px] items-center justify-center overflow-hidden bg-rose-950 bg-cover bg-center px-6 text-center text-white"
        style={{ backgroundImage: "url(/hero.jpg)" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/55"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto flex max-w-3xl flex-col items-center gap-6"
        >
          <motion.p
            variants={item}
            className="glass rounded-full px-4 py-1.5 text-sm font-medium"
          >
            {t("hero.eyebrow")}
          </motion.p>

          <motion.h1
            variants={item}
            className="display drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-2 flex flex-col items-center gap-3 sm:flex-row"
          >
            <ButtonLink to="/create" className="px-8 py-3.5 text-base">
              {t("hero.cta")}
            </ButtonLink>
            <ButtonLink
              to={{ pathname: "/", hash: "how" }}
              variant="glass"
              className="px-8 py-3.5 text-base"
            >
              {t("hero.secondary")}
            </ButtonLink>
          </motion.div>
        </motion.div>

        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 1.2 },
            y: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
          }}
          className="absolute bottom-6 text-2xl"
        >
          ↓
        </motion.span>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="title mb-12 text-center">{t("how.title")}</h2>

        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((n, i) => (
            <motion.li
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ type: "spring", bounce: 0, duration: 0.6, delay: i * 0.08 }}
              className="rounded-3xl border border-rose-100 bg-white p-7 shadow-[0_10px_30px_-18px_rgba(122,34,71,0.45)]"
            >
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-love/10 text-sm font-bold text-love">
                {n}
              </span>
              <h3 className="mb-2 text-xl font-semibold tracking-[-0.02em]">
                {t(`how.${n}.title`)}
              </h3>
              <p className="leading-relaxed text-rose-mid">{t(`how.${n}.text`)}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Closing call to action */}
      <section className="px-6 pb-24">
        <div
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-rose-950 bg-cover bg-center px-6 py-20 text-center text-white"
          style={{ backgroundImage: "url(/hero.jpg)" }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-black/30" />
          <div className="relative flex flex-col items-center gap-4">
            <h2 className="title">{t("cta.title")}</h2>
            <p className="text-white/85">{t("cta.text")}</p>
            <ButtonLink to="/create" className="mt-2 px-8 py-3.5 text-base">
              {t("hero.cta")}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
