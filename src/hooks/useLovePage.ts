import { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateReasons } from "../utils/generateReasons";

export function useLovePage() {
  const { slug } = useParams();

  const [visibleCount, setVisibleCount] = useState(0);

  const { name, reasons } = useMemo(() => {
    if (!slug) return { name: "", reasons: [] };

    const parts = slug.split("-");
    const name = parts.slice(0, -1).join(" ");

    const reasons = generateReasons(name, slug, 30);

    return { name, reasons };
  }, [slug]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;

      setVisibleCount(index);

      if (index >= reasons.length) {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [reasons.length]);

  return {
    name,
    reasons: reasons.slice(0, visibleCount),
  };
}
