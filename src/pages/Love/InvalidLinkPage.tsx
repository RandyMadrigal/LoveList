import { ButtonLink } from "../../components/ui/Button";
import { useI18n } from "../../i18n/useI18n";

function InvalidLinkPage() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center bg-gradient-to-b from-rose-100 to-blush px-6 pt-24 text-center">
      <p className="mb-4 text-5xl" aria-hidden="true">
        💔
      </p>
      <h1 className="title mb-3">{t("invalid.title")}</h1>
      <p className="mb-8 max-w-md text-rose-mid">{t("invalid.text")}</p>
      <ButtonLink to="/create">{t("love.makeYours")}</ButtonLink>
    </div>
  );
}

export default InvalidLinkPage;
