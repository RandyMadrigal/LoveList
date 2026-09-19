import { useI18n } from "../../i18n/useI18n";

function PrivacyPage() {
  const { t } = useI18n();

  return (
    <div className="bg-gradient-to-b from-rose-100 via-blush to-white px-6 pb-20 pt-32">
      <article className="mx-auto max-w-2xl space-y-5 leading-relaxed">
        <h1 className="title">{t("privacy.title")}</h1>
        <p>{t("privacy.p1")}</p>
        <p>{t("privacy.p2")}</p>
        <p>{t("privacy.p3")}</p>
        <p>{t("privacy.p4")}</p>
      </article>
    </div>
  );
}

export default PrivacyPage;
