import axios from 'axios';
import type { CurrentWeather, DailyForecast, ForecastPoint, WeatherPayload } from '../types/weather';

const key = process.env.OPENWEATHER_API_KEY;
const api = 'https://api.openweathermap.org/data/2.5';
const iconUrl = (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

const demo = (query: string, lat = 13.0827, lon = 80.2707): WeatherPayload => {
  const now = new Date();
  const conditions = ['Clear sky', 'Partly cloudy', 'Light rain', 'Clear sky', 'Cloudy'];
  const hourly: ForecastPoint[] = Array.from({ length: 12 }, (_, i) => ({ time: new Date(now.getTime() + i * 3600000).toISOString(), temp: 28 + Math.round(Math.sin(i / 2) * 3), feelsLike: 31, humidity: 68 + i % 5, windSpeed: 3.4 + i * 0.15, rainProbability: i > 6 ? 35 : 12, condition: conditions[i % conditions.length], icon: i % 3 === 2 ? '10d' : '02d' }));
  const daily: DailyForecast[] = Array.from({ length: 7 }, (_, i) => { const date = new Date(now.getTime() + i * 86400000); return { day: date.toLocaleDateString('en-US', { weekday: 'short' }), date: date.toISOString(), high: 31 + (i % 3), low: 24 + (i % 2), rainProbability: i === 2 ? 72 : 15 + i * 4, condition: conditions[i % conditions.length], icon: i === 2 ? '10d' : '02d' }; });
  return { location: { name: query || 'Chennai', country: 'IN', state: 'Tamil Nadu', lat, lon }, current: { temp: 29, feelsLike: 32, humidity: 72, windSpeed: 4.1, pressure: 1008, visibility: 8.2, cloudiness: 36, uvIndex: 6, rainProbability: 18, condition: 'Partly cloudy', description: 'scattered clouds', icon: '02d', sunrise: '05:58 AM', sunset: '06:24 PM' }, hourly, daily, demoMode: true, fetchedAt: now.toISOString() };
};

const normalize = (current: any, forecast: any, name: string, country: string, state: string | undefined, lat: number, lon: number, demoMode = false): WeatherPayload => {
  const points = (forecast.list ?? []).slice(0, 12).map((item: any): ForecastPoint => ({ time: new Date(item.dt * 1000).toISOString(), temp: Math.round(item.main.temp), feelsLike: Math.round(item.main.feels_like), humidity: item.main.humidity, windSpeed: item.wind.speed, rainProbability: Math.round((item.pop ?? 0) * 100), condition: item.weather[0].main, icon: item.weather[0].icon }));
  const groups = new Map<string, any[]>();
  (forecast.list ?? []).forEach((item: any) => { const date = new Date(item.dt * 1000).toISOString().slice(0, 10); groups.set(date, [...(groups.get(date) ?? []), item]); });
  const daily: DailyForecast[] = Array.from(groups.entries()).slice(0, 7).map(([date, items]) => { const temps = items.map(item => item.main.temp); const representative = items[Math.floor(items.length / 2)]; return { date, day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }), high: Math.round(Math.max(...temps)), low: Math.round(Math.min(...temps)), rainProbability: Math.round(Math.max(...items.map(item => (item.pop ?? 0) * 100))), condition: representative.weather[0].main, icon: representative.weather[0].icon }; });
  const weather = current.weather[0];
  const result: CurrentWeather = { temp: Math.round(current.main.temp), feelsLike: Math.round(current.main.feels_like), humidity: current.main.humidity, windSpeed: current.wind.speed, pressure: current.main.pressure, visibility: (current.visibility ?? 0) / 1000, cloudiness: current.clouds.all, uvIndex: 0, rainProbability: points[0]?.rainProbability ?? 0, condition: weather.main, description: weather.description, icon: weather.icon, sunrise: new Date(current.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), sunset: new Date(current.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
  return { location: { name, country, state, lat, lon }, current: result, hourly: points, daily, demoMode, fetchedAt: new Date().toISOString() };
};

export async function getWeatherByCity(city: string): Promise<WeatherPayload> {
  if (!key) return demo(city);
  try { const [currentResponse, forecastResponse] = await Promise.all([axios.get(`${api}/weather`, { params: { q: city, appid: key, units: 'metric' }, timeout: 8000 }), axios.get(`${api}/forecast`, { params: { q: city, appid: key, units: 'metric' }, timeout: 8000 })]); const current = currentResponse.data; return normalize(current, forecastResponse.data, current.name, current.sys.country, undefined, current.coord.lat, current.coord.lon); } catch { throw new Error('Weather service is unavailable for that location.'); }
}

export async function getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherPayload> {
  if (!key) return demo('Your location', lat, lon);
  try { const [currentResponse, forecastResponse] = await Promise.all([axios.get(`${api}/weather`, { params: { lat, lon, appid: key, units: 'metric' }, timeout: 8000 }), axios.get(`${api}/forecast`, { params: { lat, lon, appid: key, units: 'metric' }, timeout: 8000 })]); const current = currentResponse.data; return normalize(current, forecastResponse.data, current.name, current.sys.country, undefined, lat, lon); } catch { throw new Error('Weather service is unavailable for these coordinates.'); }
}
