import { TestBed } from '@angular/core/testing';
import { GeoLocationService } from './geolocation.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  GeoLocationForecast,
  GeoLocationResponse,
} from '../models/geolocation.model';

describe('LocationService', () => {
  const geoLocationResponseMock = {
    generationtime_ms: 1,
    results: [
      {
        id: 1,
        name: 'Madrid',
        latitude: 1234,
        longitude: 1234,
        country: 'Spain',
        admin1: 'Madrid',
      },
    ],
  } as GeoLocationResponse;
  let service: GeoLocationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GeoLocationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('GeoLocationService instance', () => {
    it('should be created', () => {
      // Arrange
      // Act
      // Assert
      expect(service).toBeTruthy();
    });
  });

  describe('getGeoLocationsByText', () => {
    it('should make a GET request with the provided url and params', () => {
      // Arrange
      const text = 'Madrid';
      const url = 'https://geocoding-api.open-meteo.com/v1/search?name=';

      // Act
      service
        .getGeoLocationsByText(text)
        .subscribe((geoLocationForecast: GeoLocationForecast[]) => {
          // Assert
          expect(geoLocationForecast[0].name).toEqual('Madrid');
        });

      const request = httpTestingController.expectOne(`${url}${text}`);

      // Assert
      expect(request.request.method).toEqual('GET');
      expect(request.request.urlWithParams.includes(text)).toBe(true);
      expect(request.request.url.includes(url)).toBe(true);

      request.flush(geoLocationResponseMock);
    });
  });
});
