import { GeoLocationForecast } from './geolocation.model';

export interface ForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeatherResponse;
  daily: DailyResponse;
  daily_units: DailyUnitsResponse;
}

export interface DailyResponse {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface DailyUnitsResponse {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
}

export interface CurrentWeatherResponse {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

export interface Forecast {
  daily: DailyWeather[];
  location: GeoLocationForecast;
  weather: CurrentWeather;
}

export interface CurrentWeather
  extends Pick<CurrentWeatherResponse, 'temperature' | 'weathercode' | 'time'> {
  max: number;
  min: number;
}

export interface DailyWeather {
  time: string;
  max: number;
  min: number;
  weathercode: number;
}

export type DaysInFuture = 1 | 2 | 3 | 4 | 5 | 6;
