import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GeoLocationResult,
  GeoLocationResponse,
  GeoLocationForecast,
} from '../models/geolocation.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  constructor(private http: HttpClient) {}

  getGeoLocationsByText(text: string): Observable<GeoLocationForecast[]> {
    return this.http
      .get<GeoLocationResponse>(
        `https://geocoding-api.open-meteo.com/v1/search?name=${text}`
      )
      .pipe(
        map((locationResponse: GeoLocationResponse) =>
          locationResponse?.results.map(
            (geolocationResult: GeoLocationResult) => ({
              id: geolocationResult.id,
              name: geolocationResult.name,
              country: geolocationResult.country,
              admin1: geolocationResult.admin1,
              latitude: geolocationResult.latitude,
              longitude: geolocationResult.longitude,
            })
          )
        )
      );
  }
}
