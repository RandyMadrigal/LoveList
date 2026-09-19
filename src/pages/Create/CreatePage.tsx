import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import toast from "react-hot-toast";

import { Button } from "../../components/ui/Button";
import LanguageSelect from "../../components/ui/LanguageSelect";
import ReasonCard from "../../components/love/ReasonCard";
import {
  ExperiencePicker,
  NameModePicker,
  PalettePicker,
} from "../../components/create/StylePickers";
import {
  DEFAULT_EXPERIENCE,
  LINK_TTL_MS,
  type Experience,
} from "../../constants/experiences";
import { DEFAULT_PALETTE, type PaletteId } from "../../constants/palettes";
import { DEFAULT_NAME_MODE, type NameMode } from "../../constants/nameMode";
import { useI18n } from "../../i18n/useI18n";
import type { Lang } from "../../i18n/translations";
import { celebrate } from "../../utils/celebrate";
import { generateReasons } from "../../utils/generateReasons";
import {
  LIMITS,
  buildLoveUrl,
  randomSeed,
  type LovePayload,
} from "../../utils/lovePayload";
import { copyText, shareLink } from "../../utils/shareLink";

const fieldClass =
  "w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-base outline-offset-2 transition-shadow placeholder:text-rose-mid/50 focus:border-love focus:shadow-[0_0_0_4px_rgba(225,29,99,0.12)]";

function CreatePage() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [pageLang, setPageLang] = useState<Lang>(lang);
  const [nameMode, setNameMode] = useState<NameMode>(DEFAULT_NAME_MODE);
  const [nickname, setNickname] = useState("");
  const [experience, setExperience] = useState<Experience>(DEFAULT_EXPERIENCE);
  const [palette, setPalette] = useState<PaletteId>(DEFAULT_PALETTE);
  const [seed, setSeed] = useState<string | null>(null);
  // The 24 hour clock starts when the link is generated
  const [expiresAt, setExpiresAt] = useState(0);
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
            experience,
            palette,
            nameMode,
            nickname: nickname.trim(),
            expiresAt,
          }
        : null,
    [seed, name, from, message, pageLang, experience, palette, nameMode, nickname, expiresAt],
  );

  const reasons = useMemo(
    () =>
      payload
        ? generateReasons(payload.name, payload.seed, payload.lang, {
            mode: payload.nameMode,
            nickname: payload.nickname,
          })
        : [],
    [payload],
  );

  const generate = () => {
    setSeed(randomSeed());
    setExpiresAt(Date.now() + LINK_TTL_MS);
    celebrate(90);
  };

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError(true);
      toast.error(t("create.needName"));
      return;
    }
    setNameError(false);
    generate();
  };

  const link = payload ? buildLoveUrl(payload) : "";

  const handleShare = async () => {
    if (!payload) return;
    const result = await shareLink({
      title: t("love.shareTitle", { name: payload.name }),
      text: t("love.shareText", { name: payload.name }),
      url: link,
    });
    if (result === "copied") toast.success(t("create.copied"));
    else if (result === "failed") toast.error(t("love.failed"));
  };

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

          <NameModePicker value={nameMode} onChange={setNameMode} />

          {nameMode !== "never" && (
            <div>
              <label htmlFor="nickname" className="mb-2 block text-sm font-semibold">
                {t("create.nickname")}
              </label>
              <input
                id="nickname"
                value={nickname}
                maxLength={LIMITS.nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={t("create.nicknamePh")}
                autoComplete="off"
                className={fieldClass}
              />
              <p className="mt-2 text-xs text-rose-mid">{t("create.nicknameHint")}</p>
            </div>
          )}

          <ExperiencePicker
            value={experience}
            palette={palette}
            onChange={setExperience}
          />
          <PalettePicker value={palette} onChange={setPalette} />

          <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-mid">
            ⏳ {t("create.expiryNote")}
          </p>

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
                {"share" in navigator && (
                  <Button variant="soft" onClick={handleShare}>
                    {t("create.share")}
                  </Button>
                )}
                <Button variant="soft" onClick={handleOpen}>
                  {t("create.open")}
                </Button>
                <Button variant="soft" onClick={generate}>
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
