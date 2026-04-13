export default function WeatherCard({ data, loading }) {
  if (loading) {
    return (
      <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center animate-pulse">
        Carregando...
      </div>
    );
  }

  if (!data) return null;

  const temp = data.current_weather?.temperature || data?.TEM_INS || 0;
  const umidade = data.hourly?.relativehumidity_2m?.[0] || data?.UMD_INS || 0;
  const vento = data.current_weather?.windspeed || data?.VEN_VEL || 0;

  let color = "text-blue-400";
  if (temp >= 25 && temp <= 35) color = "text-yellow-400";
  if (temp > 35) color = "text-red-400";

  return (
    <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl mb-8">
      <h2 className="text-lg text-gray-300 mb-4">Condições atuais</h2>

      <div className={`text-6xl font-extrabold ${color}`}>
        {temp}°
      </div>

      <div className="flex justify-between mt-6 text-gray-300">
        <p>💧 {umidade}%</p>
        <p>💨 {vento} km/h</p>
      </div>
    </div>
  );
}