import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  DailyResponse,
  DailyWeather,
  DaysInFuture,
  Forecast,
  ForecastResponse,
} from '../models/forecast.model';
import { map, Observable } from 'rxjs';
import { GeoLocationForecast } from '../models/geolocation.model';
import { weathercodeIcons } from './weathercode-icons';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private weathercodeIcons: Map<number, string> = new Map(weathercodeIcons);
  constructor(private http: HttpClient) {}

  private getDailyWeather(
    dailyResponse: DailyResponse,
    days: DaysInFuture
  ): DailyWeather[] {
    return Array.from(new Array(days), (day: undefined, dayIndex: number) => {
      const nextDayIndex = dayIndex + 1;
      return {
        time: dailyResponse.time[nextDayIndex],
        max: dailyResponse.temperature_2m_max[nextDayIndex],
        min: dailyResponse.temperature_2m_min[nextDayIndex],
        weathercode: dailyResponse.weathercode[nextDayIndex],
      };
    });
  }

  getForecast(
    geoLocationForecast: GeoLocationForecast,
    days: DaysInFuture = 3
  ): Observable<Forecast> {
    const defaults: Record<string, string> = {
      current_weather: 'true',
      timezone: 'auto',
      daily: ['weathercode', 'temperature_2m_max', 'temperature_2m_min'].join(),
    };
    const params = new HttpParams({
      fromObject: {
        latitude: geoLocationForecast.latitude,
        longitude: geoLocationForecast.longitude,
        ...defaults,
      },
    });
    return this.http
      .get<ForecastResponse>(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`
      )
      .pipe(
        map((forecastResponse: ForecastResponse) => {
          const currentWeatherResponse = forecastResponse.current_weather;
          const dailyResponse = forecastResponse.daily;
          const daily = this.getDailyWeather(dailyResponse, days);

          return {
            daily,
            location: geoLocationForecast,
            weather: {
              temperature: currentWeatherResponse.temperature,
              weathercode: currentWeatherResponse.weathercode,
              time: currentWeatherResponse.time,
              max: dailyResponse.temperature_2m_max[0],
              min: dailyResponse.temperature_2m_min[0],
            },
          };
        })
      );
  }

  getWeathercodeIcon(weathercode: number): string | undefined {
    return this.weathercodeIcons.get(weathercode);
  }
}
