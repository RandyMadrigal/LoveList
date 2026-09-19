import { motion } from "motion/react";
import { useI18n } from "../../i18n/useI18n";

type ReasonCardProps = {
  reason: string;
  index: number;
};

function ReasonCard({ reason, index }: ReasonCardProps) {
  const { t } = useI18n();

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{
        type: "spring",
        bounce: 0,
        duration: 0.5,
        delay: (index % 3) * 0.05,
      }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-3xl border border-rose-100 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(122,34,71,0.45)]"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-love">
        {t("love.reason", { n: index + 1 })}
      </p>
      <p className="text-[1.05rem] leading-snug tracking-[-0.01em]">{reason}</p>
    </motion.li>
  );
}

export default ReasonCard;
