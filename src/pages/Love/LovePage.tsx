import { useEffect } from "react";
import confetti from "canvas-confetti";
import { toast } from "react-hot-toast";

import AnimatedCounter from "../../components/ui/AnimatedCounter";
import { useLovePage } from "../../hooks/useLovePage";
import ReasonsList from "../../components/love/ReasonsList";
import Button from "../../components/ui/Button";

function LovePage() {
  const { name, reasons } = useLovePage();

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      // Intentar share nativo
      if (navigator.share) {
        await navigator.share({
          title: `30 razones por las que amo a ${name}`,
          text: `Descubre por qué ${name} es tan especial para mí ❤️`,
          url,
        });
        return;
      }
    } catch {
      // si falla share seguimos al copy
    }

    try {
      // Intentar clipboard API moderna
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        toast.success("Link copiado 📎");
        return;
      }
    } catch {
      // seguimos al fallback
    }

    // Fallback universal (funciona en todos lados)
    const textarea = document.createElement("textarea");
    textarea.value = url;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
      toast.success("Link copiado 📎");
    } catch {
      toast.error("No se pudo copiar el link");
    }

    document.body.removeChild(textarea);
  };

  return (
    <>
      <header className="text-center mb-12">
        <AnimatedCounter target={30} />

        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mt-4">
          razones por las que amo a {name} ❤️
        </h1>

        <div className="mt-6">
          <Button onClick={handleShare}>
            {"share" in navigator ? "Compartir ❤️" : "Copiar link 📎"}
          </Button>
        </div>
      </header>

      <ReasonsList reasons={reasons} />
    </>
  );
}

export default LovePage;
