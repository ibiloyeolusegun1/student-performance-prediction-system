interface Props {
  prediction: string;
}

export default function PredictionBadge({
  prediction,
}: Props) {
  const styles = {
    Excellent: "bg-green-500",
    Average: "bg-yellow-500",
    Poor: "bg-red-500",
  };

  return (
    <span
      className={`px-3 py-1 rounded text-white ${
        styles[
          prediction as keyof typeof styles
        ] || "bg-gray-500"
      }`}
    >
      {prediction}
    </span>
  );
}