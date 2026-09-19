import MinimalHeader from "../../components/layout/MinimalHeader";
import { ButtonLink } from "../../components/ui/Button";
import { useI18n } from "../../i18n/useI18n";

function ExpiredLinkPage() {
  const { t } = useI18n();

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-rose-100 to-blush px-6 text-center">
      <MinimalHeader />
      <p className="mb-4 text-5xl" aria-hidden="true">
        ⏳
      </p>
      <h1 className="title mb-3">{t("expired.title")}</h1>
      <p className="mb-8 max-w-md text-rose-mid">{t("expired.text")}</p>
      <ButtonLink to="/create">{t("love.makeYours")}</ButtonLink>
    </div>
  );
}

export default ExpiredLinkPage;
