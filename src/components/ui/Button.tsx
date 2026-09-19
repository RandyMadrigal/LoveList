import type { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

type Variant = "primary" | "glass" | "soft";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold tracking-[-0.01em] select-none touch-manipulation transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-love text-white shadow-[0_8px_24px_-8px_rgba(225,29,99,0.6)] hover:bg-love-deep",
  glass: "glass text-white hover:bg-white/25",
  soft: "bg-white text-rose-ink border border-rose-200 hover:bg-rose-50",
};

// Pressed feedback fires on pointer-down, and the spring can be interrupted mid-flight
const press = {
  whileTap: { scale: 0.96 },
  transition: { type: "spring", bounce: 0, duration: 0.25 },
} as const;

type ButtonProps = Omit<ComponentProps<typeof motion.button>, "ref"> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...press}
      {...props}
    />
  );
}

const MotionLink = motion.create(Link);

type ButtonLinkProps = Omit<ComponentProps<typeof MotionLink>, "ref"> & {
  variant?: Variant;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <MotionLink
      className={`${base} ${variants[variant]} ${className}`}
      {...press}
      {...props}
    />
  );
}
