interface StatCardProps {
  title: string;
  value: number;
  color?: string;
}

export default function StatCard({
  title,
  value,
  color = "text-blue-600",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h3 className="text-gray-500">
        {title}
      </h3>

      <p
        className={`text-3xl font-bold ${color}`}
      >
        {value}
      </p>
    </div>
  );
}