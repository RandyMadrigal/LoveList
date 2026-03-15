import Card from "../ui/Card";

interface ReasonCardProps {
  reason: string;
  index: number;
}

function ReasonCard({ reason, index }: ReasonCardProps) {
  return (
    <Card className="animate-fadeIn hover:scale-105 transition-transform duration-300">
      <p className="text-pink-500 font-semibold mb-2">Razón #{index}</p>

      <p className="text-gray-700">{reason}</p>
    </Card>
  );
}

export default ReasonCard;
