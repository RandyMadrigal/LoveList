import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  target: number;
}

function AnimatedCounter({ target }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start += 1;
      setCount(start);

      if (start === target) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [target]);

  return <span className="text-pink-600 font-bold text-5xl">{count}</span>;
}

export default AnimatedCounter;
