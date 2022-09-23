import { TestBed } from '@angular/core/testing';
import { ForecastService } from './forecast.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GeoLocationForecast } from '../models/geolocation.model';
import { HttpParams } from '@angular/common/http';
import { Forecast, ForecastResponse } from '../models/forecast.model';

describe('ForecastService', () => {
  const geoLocationForecastMock: GeoLocationForecast = {
    id: 1,
    name: 'Madrid',
    latitude: 1234,
    longitude: 1234,
    country: 'Spain',
    admin1: 'Madrid',
  };

  const forecastResponseMock = {
    current_weather: {
      temperature: 12,
      weathercode: 0,
      time: '2022-09-22T17:00',
    },
    daily: {
      time: ['2022-09-22T17:00', '2022-09-22T17:00', '2022-09-22T17:00'],
      temperature_2m_max: [12, 12, 12],
      temperature_2m_min: [20, 20, 20],
      weathercode: [0, 0],
    },
  } as ForecastResponse;
  let service: ForecastService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ForecastService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('ForecastService instance', () => {
    it('should be created', () => {
      // Arrange
      // Act
      // Assert
      expect(service).toBeTruthy();
    });
  });

  describe('getForecast', () => {
    it('should make a GET request with the provided url and call getDailyWeather', () => {
      // Arrange
      const getDailyWeatherSpy = spyOn(
        service,
        <never>'getDailyWeather'
      ).and.callThrough();
      const url = 'https://api.open-meteo.com/v1/forecast?';
      const defaults: Record<string, string> = {
        current_weather: 'true',
        timezone: 'auto',
        daily: [
          'weathercode',
          'temperature_2m_max',
          'temperature_2m_min',
        ].join(),
      };
      const { latitude, longitude } = geoLocationForecastMock;
      const params = new HttpParams({
        fromObject: {
          latitude,
          longitude,
          ...defaults,
        },
      });

      // Act
      service
        .getForecast(geoLocationForecastMock)
        .subscribe((forecast: Forecast) => {
          // Assert
          expect(forecast.location.name).toEqual('Madrid');
          expect(getDailyWeatherSpy).toHaveBeenCalled();
        });

      const request = httpTestingController.expectOne(
        `${url}${params.toString()}`
      );

      // Assert
      expect(request.request.method).toEqual('GET');
      expect(request.request.urlWithParams.includes(latitude.toString())).toBe(
        true
      );
      expect(request.request.url.includes(url)).toBe(true);

      request.flush(forecastResponseMock);
    });
  });
});
