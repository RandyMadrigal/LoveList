import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "motion/react";

type AnimatedCounterProps = {
  target: number;
  className?: string;
};

function AnimatedCounter({ target, className = "" }: AnimatedCounterProps) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setCount(Math.round(value)),
    });
    return () => controls.stop();
  }, [target, reduced]);

  return (
    <span className={`tabular-nums ${className}`} aria-label={String(target)}>
      {count}
    </span>
  );
}

export default AnimatedCounter;
