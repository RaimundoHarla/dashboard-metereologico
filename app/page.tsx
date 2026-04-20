'use client';
import { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import HistoryChart from '../components/HistoryChart';

export default function Dashboard() {
  const [station, setStation] = useState('A701');
  const [weather, setWeather] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    setWeather(null);

    try {
      const res = await fetch(`/api/clima?estacao=${station}`);
      const data = await res.json();

      setWeather(data);

      if (data.hourly) {
        const history = data.hourly.time
          .slice(0, 12)
          .map((t: string, i: number) => ({
            time: new Date(t).getHours() + 'h',
            temp: data.hourly?.temperature_2m[i] ?? 0
          }));

  setChartData(history);
}
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [station]);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-5xl mx-auto">

        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            🌙 Weather Lab
          </h1>
          <p className="text-gray-400 mt-2">
            Monitoramento climático em tempo real
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg flex gap-4 items-center">
            <span className="text-sm text-gray-300">Cidade:</span>

            <select
              value={station}
              onChange={(e) => setStation(e.target.value)}
              className="bg-transparent border border-white/30 rounded-lg p-2 text-white focus:outline-none"
            >
              <option value="A701" className="text-black">São Paulo</option>
              <option value="A201" className="text-black">Rio de Janeiro</option>
              <option value="A301" className="text-black">Belo Horizonte</option>
            </select>
          </div>
        </div>

        <WeatherCard data={weather} loading={loading} />
        <HistoryChart historyData={chartData} />

      </div>
    </main>
  );
}