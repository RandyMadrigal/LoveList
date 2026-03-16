import { useEffect } from "react";
import confetti from "canvas-confetti";
import { toast } from "react-hot-toast";

import AnimatedCounter from "../../components/ui/AnimatedCounter";
import { useLovePage } from "../../hooks/useLovePage";
import Button from "../../components/ui/Button";
import LoadingPage from "./LoadingPage";

function LovePage() {
  const { name, reasons, loading } = useLovePage();

  useEffect(() => {
    if (!loading) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [loading]);

  const handleShare = async () => {
    const url = window.location.href;

    if ("share" in navigator) {
      try {
        await navigator.share({
          title: `30 razones por las que amo a ${name}`,
          text: `Descubre por qué ${name} es tan especial para mí ❤️`,
          url,
        });
        return;
      } catch (error) {
        console.error("Error Web Share API:", error);
        toast.error("No se pudo compartir con la API nativa");
      }
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copiado 📎");
        return;
      } catch (error) {
        console.error("Error Clipboard API:", error);
      }
    }

    const textarea = document.createElement("textarea");
    textarea.value = url;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        toast.success("Link copiado 📎");
      } else {
        throw new Error("Fallback copy failed");
      }
    } catch (error) {
      console.error("Error fallback copy:", error);
      toast.error("No se pudo copiar el link");
    }

    document.body.removeChild(textarea);
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-b from-pink-50 via-white to-pink-100">
      <header className="text-center mb-12">
        <AnimatedCounter target={50} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 mt-4">
          reasons why I love {name} ❤️
        </h1>
        <div className="mt-6">
          <Button onClick={handleShare} className="px-6 py-3">
            {"share" in navigator ? "Share ❤️" : "Copy link 📎"}
          </Button>
        </div>
      </header>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {reasons.map((reason, index) => (
          <span
            key={index}
            className="
              relative group bg-pink-200 rounded-full px-5 py-3 text-pink-900 font-semibold shadow-md
              cursor-pointer transform transition-all duration-300
              hover:scale-105 hover:-translate-y-1 hover:shadow-xl
              motion-reduce:transition-none
            "
          >
            {reason}
            <span
              className="
                absolute -top-2 -right-2 w-6 h-6 bg-pink-500 text-white rounded-full
                flex items-center justify-center text-xs opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              "
            >
              {index + 1}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default LovePage;
