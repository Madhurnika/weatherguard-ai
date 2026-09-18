import axios from 'axios';
import type { WeatherPayload } from '../types/weather';
const client = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api' });
export const fetchCityWeather = async (city: string) => (await client.get<WeatherPayload>(`/weather/city/${encodeURIComponent(city)}`)).data;
export const fetchCoordinateWeather = async (lat: number, lon: number) => (await client.get<WeatherPayload>('/weather/coordinates', { params: { lat, lon } })).data;
