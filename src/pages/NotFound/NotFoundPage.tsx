import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-center p-6">
      <h1 className="text-6xl font-bold text-pink-600 mb-4">404</h1>

      <p className="text-gray-700 mb-8">This love page does not exist 💔</p>

      <Button onClick={() => navigate("/")}>home page</Button>
    </div>
  );
}

export default NotFoundPage;
