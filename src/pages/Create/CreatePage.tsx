import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";

import { Button } from "../../components/ui/Button";
import LanguageSelect from "../../components/ui/LanguageSelect";
import ReasonCard from "../../components/love/ReasonCard";
import { useI18n } from "../../i18n/useI18n";
import type { Lang } from "../../i18n/translations";
import { generateReasons } from "../../utils/generateReasons";
import {
  LIMITS,
  buildLoveUrl,
  randomSeed,
  type LovePayload,
} from "../../utils/lovePayload";
import { copyText } from "../../utils/shareLink";

const fieldClass =
  "w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-base outline-offset-2 transition-shadow placeholder:text-rose-mid/50 focus:border-love focus:shadow-[0_0_0_4px_rgba(225,29,99,0.12)]";

function CreatePage() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [pageLang, setPageLang] = useState<Lang>(lang);
  const [seed, setSeed] = useState<string | null>(null);
  const [nameError, setNameError] = useState(false);

  const payload: LovePayload | null = useMemo(
    () =>
      seed
        ? {
            name: name.trim(),
            from: from.trim(),
            message: message.trim(),
            seed,
            lang: pageLang,
          }
        : null,
    [seed, name, from, message, pageLang],
  );

  const reasons = useMemo(
    () => (payload ? generateReasons(payload.name, payload.seed, payload.lang) : []),
    [payload],
  );

  const burst = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
  };

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError(true);
      toast.error(t("create.needName"));
      return;
    }
    setNameError(false);
    setSeed(randomSeed());
    burst();
  };

  const handleShuffle = () => {
    setSeed(randomSeed());
    burst();
  };

  const link = payload ? buildLoveUrl(payload) : "";

  const handleCopy = async () => {
    const ok = await copyText(link);
    if (ok) toast.success(t("create.copied"));
    else toast.error(t("create.copyFailed"));
  };

  const handleOpen = () => {
    if (!payload) return;
    navigate(new URL(link).pathname);
  };

  return (
    <div className="bg-gradient-to-b from-rose-100 via-blush to-white px-6 pb-20 pt-32">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <h1 className="title">{t("create.title")}</h1>
          <p className="mt-3 text-rose-mid">{t("create.subtitle")}</p>
        </header>

        <form
          onSubmit={handleGenerate}
          className="space-y-5 rounded-[2rem] border border-rose-100 bg-white/80 p-6 shadow-[0_20px_50px_-30px_rgba(122,34,71,0.5)] sm:p-8"
          noValidate
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold">
              {t("create.name")}
            </label>
            <input
              id="name"
              value={name}
              maxLength={LIMITS.name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError(false);
              }}
              placeholder={t("create.namePh")}
              aria-invalid={nameError}
              autoComplete="off"
              className={`${fieldClass} ${nameError ? "border-red-400" : ""}`}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="from" className="mb-2 block text-sm font-semibold">
                {t("create.from")}
              </label>
              <input
                id="from"
                value={from}
                maxLength={LIMITS.from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder={t("create.fromPh")}
                autoComplete="off"
                className={fieldClass}
              />
            </div>
            <div>
              <span className="mb-2 block text-sm font-semibold">
                {t("create.lang")}
              </span>
              <LanguageSelect
                value={pageLang}
                onChange={setPageLang}
                label={t("create.lang")}
                className="w-full rounded-2xl border border-rose-200 bg-white py-3"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-semibold">
              {t("create.message")}
            </label>
            <textarea
              id="message"
              rows={3}
              value={message}
              maxLength={LIMITS.message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("create.messagePh")}
              className={`${fieldClass} resize-none`}
            />
          </div>

          <Button type="submit" className="w-full py-3.5 text-base">
            {t("create.generate")}
          </Button>
        </form>

        {payload && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
            className="mt-12"
            aria-live="polite"
          >
            <h2 className="title mb-6 text-center">{t("create.previewTitle")}</h2>

            <div className="mb-8 rounded-3xl border border-rose-100 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(122,34,71,0.45)]">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-love">
                {t("create.link")}
              </p>
              <p className="mb-4 line-clamp-2 break-all rounded-xl bg-rose-50 px-3 py-2 font-mono text-xs text-rose-mid">
                {link}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleCopy}>{t("create.copy")}</Button>
                <Button variant="soft" onClick={handleOpen}>
                  {t("create.open")}
                </Button>
                <Button variant="soft" onClick={handleShuffle}>
                  {t("create.shuffle")}
                </Button>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {reasons.map((reason, i) => (
                <ReasonCard key={`${seed}-${i}`} reason={reason} index={i} />
              ))}
            </ul>
          </motion.section>
        )}
      </div>
    </div>
  );
}

export default CreatePage;
