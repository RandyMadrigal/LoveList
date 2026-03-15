import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import ReasonsList from "../../components/love/ReasonsList";
import { generateSlug } from "../../utils/generateSlug";
import { generateReasons } from "../../utils/generateReasons";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";

function CreatePage() {
  const [name, setName] = useState("");
  const [reasons, setReasons] = useState<string[]>([]);
  const [slug, setSlug] = useState("");

  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!name.trim()) {
      toast.error("Debes escribir un nombre ❤️");
      return;
    }

    const newSlug = generateSlug(name);
    const newReasons = generateReasons(name, newSlug, 30);

    setSlug(newSlug);
    setReasons(newReasons);
    toast.success("Página creada ❤️");

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleOpenPage = () => {
    if (!slug) return;
    navigate(`/love/${slug}`);
  };

  return (
    <div className="min-h-screen p-6 bg-pink-50 flex flex-col items-center">
      <h1 className="text-4xl text-pink-600 mb-6 text-center">
        Crear página de amor 💖
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-xl">
        <input
          type="text"
          placeholder="Escribe su nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <Button onClick={handleGenerate}>Generar</Button>
      </div>

      {reasons.length > 0 && (
        <>
          <ReasonsList reasons={reasons} />

          <div className="flex gap-4 mt-6">
            <Button onClick={handleOpenPage}>Ver página ❤️</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CreatePage;
