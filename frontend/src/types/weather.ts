export interface WeatherLocation { name: string; country: string; state?: string; lat: number; lon: number; }
export interface CurrentWeather { temp: number; feelsLike: number; humidity: number; windSpeed: number; pressure: number; visibility: number; cloudiness: number; uvIndex: number; rainProbability: number; condition: string; description: string; icon: string; sunrise: string; sunset: string; }
export interface ForecastPoint { time: string; temp: number; feelsLike: number; humidity: number; windSpeed: number; rainProbability: number; condition: string; icon: string; }
export interface DailyForecast { day: string; date: string; high: number; low: number; rainProbability: number; condition: string; icon: string; }
export interface WeatherPayload { location: WeatherLocation; current: CurrentWeather; hourly: ForecastPoint[]; daily: DailyForecast[]; demoMode: boolean; fetchedAt: string; }
