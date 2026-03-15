import ReasonCard from "./ReasonCard";

interface ReasonsListProps {
  reasons: string[];
}

function ReasonsList({ reasons }: ReasonsListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {" "}
      {reasons.map((reason, index) => (
        <ReasonCard key={index} reason={reason} index={index + 1} />
      ))}
    </div>
  );
}

export default ReasonsList;
