import { RealTimeData } from '../src/types/realTimeData';

const API_ENDPOINT = 'https://api.gemini.google.com/v1/query'; // Replace with actual endpoint

export const fetchRealTimeData = async (query: string): Promise<RealTimeData> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: query }),
    });
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { weather: { weather: 'N/A', temperature: 0 }, budget: { estimate: 'N/A', currency: 'USD' }, alerts: { alerts: ['No alerts'] } };
  }
};

export const getWeather = (destination: string): Promise<{ weather: string; temperature: number }> =>
  fetchRealTimeData(`Real-time weather for ${destination}`).then(data => data.weather || { weather: 'N/A', temperature: 0 });

export const getBudget = (destination: string): Promise<{ estimate: string; currency: string }> =>
  fetchRealTimeData(`Budget estimate for ${destination}`).then(data => data.budget || { estimate: 'N/A', currency: 'USD' });

export const getAlerts = (): Promise<{ alerts: string[] }> =>
  fetchRealTimeData('Current travel alerts').then(data => data.alerts || { alerts: ['No alerts'] });