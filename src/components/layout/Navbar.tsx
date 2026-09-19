import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useI18n } from "../../i18n/useI18n";
import LanguageSelect from "../ui/LanguageSelect";

function Navbar() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);

  // The hero fills the viewport; once it scrolls away the bar sits on light content
  useMotionValueEvent(scrollY, "change", (y) =>
    setPastHero(y > window.innerHeight - 96),
  );

  const overHero = pathname === "/" && !pastHero;

  // Over the dark hero the bar is a dark glass; on light pages it flips to a light glass
  const material = overHero
    ? "glass text-white"
    : "glass-light text-rose-ink shadow-[0_8px_30px_-12px_rgba(122,34,71,0.35)]";

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full py-2 pl-5 pr-2 ${material}`}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold leading-none tracking-[-0.05em]"
        >
          <img src="/heart.svg" alt="" className="h-6 w-6" />
          <span>{t("nav.brand")}</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to={{ pathname: "/", hash: "how" }}
            className="hidden rounded-full px-3 py-2 text-sm font-medium opacity-80 transition-opacity hover:opacity-100 sm:inline"
          >
            {t("nav.how")}
          </Link>
          <LanguageSelect />
          <Link
            to="/create"
            className="rounded-full bg-love px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-love-deep active:scale-95"
          >
            {t("nav.create")}
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;
