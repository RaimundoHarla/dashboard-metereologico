import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const estacao = searchParams.get('estacao');
  
  try {
    const res = await fetch(
      `https://apitempo.inmet.gov.br/estacao/dados/${estacao}`,
      { headers: { 'Authorization': process.env.INMET_TOKEN || '' } }
    );
    
    if (!res.ok) throw new Error('Falha no INMET');
    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    const coordenadas = {
      'A701': { lat: -23.5505, lon: -46.6333 }, // São Paulo
      'A201': { lat: -22.9068, lon: -43.1729 }, // Rio de Janeiro
      'A301': { lat: -19.9208, lon: -43.9378 }  // Belo Horizonte
    };

    const local = coordenadas[estacao] || coordenadas['A701'];

    // Fallback gratuito usando Open-Meteo dinâmico
    const fallbackRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${local.lat}&longitude=${local.lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
    );
    
    const fallbackData = await fallbackRes.json();
    return NextResponse.json(fallbackData);
  }
}