import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/useI18n";

function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-rose-200/70 px-6 py-10 text-center text-sm text-rose-mid">
      <p>{t("footer.made")}</p>
      <Link
        to="/privacy"
        className="mt-2 inline-block underline-offset-4 hover:underline"
      >
        {t("footer.privacy")}
      </Link>
    </footer>
  );
}

export default Footer;
