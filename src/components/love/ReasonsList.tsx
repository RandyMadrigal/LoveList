import { useEffect, useState } from "react";
import ReasonCard from "./ReasonCard";

interface ReasonsListProps {
  reasons: string[];
}

function ReasonsList({ reasons }: ReasonsListProps) {
  const [visibleCount, setVisibleCount] = useState(() => 0);

  useEffect(() => {
    let current = 0;
    setVisibleCount(0); // Schedule reset after render, not synchronously
    const timeout = setTimeout(function showNext() {
      if (current < reasons.length) {
        setVisibleCount((prev) => prev + 1);
        current += 1;
        setTimeout(showNext, 100);
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      current = reasons.length;
    };
  }, [reasons]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reasons.slice(0, visibleCount).map((reason, index) => (
        <ReasonCard key={index} reason={reason} index={index + 1} />
      ))}
    </div>
  );
}

export default ReasonsList;
