import { ButtonLink } from "../../components/ui/Button";
import { useI18n } from "../../i18n/useI18n";

function NotFoundPage() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center bg-gradient-to-b from-rose-100 to-blush px-6 pt-24 text-center">
      <h1 className="display mb-4 text-love">404</h1>
      <p className="mb-2 text-xl font-semibold tracking-[-0.02em]">
        {t("notfound.title")}
      </p>
      <p className="mb-8 text-rose-mid">{t("notfound.text")}</p>
      <ButtonLink to="/">{t("notfound.cta")}</ButtonLink>
    </div>
  );
}

export default NotFoundPage;
