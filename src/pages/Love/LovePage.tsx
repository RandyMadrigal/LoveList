import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import ExperienceShell from "../../components/experience/ExperienceShell";
import StoryExperience from "../../components/experience/StoryExperience";
import EnvelopeExperience from "../../components/experience/EnvelopeExperience";
import LyricsExperience from "../../components/experience/LyricsExperience";
import ScrollExperience from "../../components/experience/ScrollExperience";
import { I18nContext, type I18nValue } from "../../i18n/context";
import { translate } from "../../i18n/translations";
import { useI18n } from "../../i18n/useI18n";
import { generateReasons } from "../../utils/generateReasons";
import { decodePayload } from "../../utils/lovePayload";
import InvalidLinkPage from "./InvalidLinkPage";
import ExpiredLinkPage from "./ExpiredLinkPage";

const REASON_COUNT = 50;

const EXPERIENCE_COMPONENTS = {
  story: StoryExperience,
  envelope: EnvelopeExperience,
  lyrics: LyricsExperience,
  scroll: ScrollExperience,
} as const;

function LovePage() {
  const { token } = useParams<{ token: string }>();
  const { t } = useI18n();

  const payload = useMemo(() => decodePayload(token), [token]);
  const reasons = useMemo(
    () =>
      payload
        ? generateReasons(payload.name, payload.seed, payload.lang, {
            mode: payload.nameMode,
            nickname: payload.nickname,
            count: REASON_COUNT,
          })
        : [],
    [payload],
  );

  // Time is read once on mount; the countdown in the shell takes over from there
  const [mountedAt] = useState(() => Date.now());
  const [expired, setExpired] = useState(false);
  const handleExpire = useCallback(() => setExpired(true), []);

  // The page speaks the language chosen when it was created, not the viewer's
  const pageLang = payload?.lang;
  const pageI18n = useMemo<I18nValue | null>(
    () =>
      pageLang
        ? {
            lang: pageLang,
            setLang: () => {},
            t: (key, vars) => translate(pageLang, key, vars),
          }
        : null,
    [pageLang],
  );

  useEffect(() => {
    if (!payload) return;
    document.title = t("love.title", { count: REASON_COUNT, name: payload.name });
  }, [payload, t]);

  if (!payload || !pageI18n) return <InvalidLinkPage />;
  if (expired || payload.expiresAt <= mountedAt) return <ExpiredLinkPage />;

  const Experience = EXPERIENCE_COMPONENTS[payload.experience];

  return (
    <I18nContext.Provider value={pageI18n}>
      <ExperienceShell
        palette={payload.palette}
        expiresAt={payload.expiresAt}
        onExpire={handleExpire}
      >
        <Experience
          name={payload.name}
          from={payload.from}
          message={payload.message}
          reasons={reasons}
        />
      </ExperienceShell>
    </I18nContext.Provider>
  );
}

export default LovePage;
