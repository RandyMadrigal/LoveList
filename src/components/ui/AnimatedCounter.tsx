import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

type AnimatedCounterProps = {
  target: number;
  className?: string;
};

function AnimatedCounter({ target, className = "" }: AnimatedCounterProps) {
  const reduced = useReducedMotion();

  // The number is a motion value: it updates the DOM directly, with no React re-renders
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    if (reduced) {
      value.set(target);
      return;
    }
    const controls = animate(value, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [target, reduced, value]);

  return (
    <motion.span className={`tabular-nums ${className}`} aria-label={String(target)}>
      {rounded}
    </motion.span>
  );
}

export default AnimatedCounter;
