import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export default function HistoryChart({ historyData }: { historyData: any[] }) {
  if (!historyData || historyData.length === 0) return null;

  return (
    <div className="w-full p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
      <h3 className="text-gray-300 mb-4">
        📈 Temperatura nas últimas horas
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={historyData}>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}