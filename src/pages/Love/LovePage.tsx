import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";

import AnimatedCounter from "../../components/ui/AnimatedCounter";
import { Button, ButtonLink } from "../../components/ui/Button";
import ReasonCard from "../../components/love/ReasonCard";
import { useI18n } from "../../i18n/useI18n";
import { generateReasons } from "../../utils/generateReasons";
import { decodePayload } from "../../utils/lovePayload";
import { shareLink } from "../../utils/shareLink";
import InvalidLinkPage from "./InvalidLinkPage";

const REASON_COUNT = 50;

function LovePage() {
  const { token } = useParams<{ token: string }>();
  const { t } = useI18n();

  const payload = useMemo(() => decodePayload(token), [token]);
  const reasons = useMemo(
    () =>
      payload ? generateReasons(payload.name, payload.seed, payload.lang, REASON_COUNT) : [],
    [payload],
  );

  useEffect(() => {
    if (!payload) return;
    document.title = t("love.title", { count: REASON_COUNT, name: payload.name });
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.55 } });
    }
  }, [payload, t]);

  if (!payload) return <InvalidLinkPage />;

  const canShare = "share" in navigator;

  const handleShare = async () => {
    const result = await shareLink({
      title: t("love.shareTitle", { name: payload.name }),
      text: t("love.shareText", { name: payload.name }),
      url: window.location.href,
    });
    if (result === "copied") toast.success(t("love.copied"));
    else if (result === "failed") toast.error(t("love.failed"));
  };

  return (
    <>
      <section
        className="relative flex min-h-[85dvh] items-center justify-center overflow-hidden bg-rose-950 bg-cover bg-center px-6 pb-16 pt-32 text-center text-white"
        style={{ backgroundImage: "url(/hero.jpg)" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/50"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.8 }}
          className="relative mx-auto flex max-w-3xl flex-col items-center gap-5"
        >
          <AnimatedCounter
            target={REASON_COUNT}
            className="text-7xl font-bold tracking-[-0.04em] sm:text-8xl"
          />
          <h1 className="display text-[clamp(2rem,6vw,4rem)]">
            {t("love.title", { count: REASON_COUNT, name: payload.name })}
          </h1>

          {payload.message && (
            <p className="glass max-w-xl whitespace-pre-line rounded-3xl px-6 py-4 text-lg leading-relaxed">
              {payload.message}
            </p>
          )}
          {payload.from && (
            <p className="text-white/85">{t("love.from", { from: payload.from })}</p>
          )}

          <Button onClick={handleShare} className="mt-2 px-8 py-3.5 text-base">
            {canShare ? t("love.share") : t("love.copyLink")}
          </Button>
        </motion.div>
      </section>

      <section className="bg-gradient-to-b from-rose-100 via-blush to-white px-6 py-16">
        <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <ReasonCard key={i} reason={reason} index={i} />
          ))}
        </ul>

        <div className="mt-14 text-center">
          <ButtonLink to="/create" variant="soft">
            {t("love.makeYours")}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

export default LovePage;
