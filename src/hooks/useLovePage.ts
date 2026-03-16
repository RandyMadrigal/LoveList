// src/hooks/useLovePage.ts
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReasonsBySlug } from "../services/firebase/loveService";

export const useLovePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [name, setName] = useState("");
  const [reasons, setReasons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // estado loading inicial true

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true); // iniciar loading
      try {
        const data = await getReasonsBySlug(slug);
        if (data) {
          setName(data.name);
          setReasons(data.reasons);
        } else {
          // si no hay datos, dejamos vacíos
          setName("");
          setReasons([]);
        }
      } catch (error) {
        console.error("Error al obtener razones:", error);
        setName("");
        setReasons([]);
      } finally {
        setLoading(false); // terminar loading
      }
    };

    fetchData();
  }, [slug]);

  return { name, reasons, loading };
};
