import { Component } from '@angular/core';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { DaysInFuture, Forecast } from './models/forecast.model';
import { GeoLocationForecast } from './models/geolocation.model';
import { ForecastService } from './services/forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public forecast$: Observable<Forecast> = of({} as Forecast);
  private geolocation$: Subject<GeoLocationForecast>;
  private days: DaysInFuture = 3;
  constructor(private forecastService: ForecastService) {
    this.geolocation$ = new Subject<GeoLocationForecast>();
    this.onGeolocationChanged();
  }

  public onGeoLocationSelected(geoLocationForecast: GeoLocationForecast): void {
    this.geolocation$.next(geoLocationForecast);
  }

  private onGeolocationChanged(): void {
    this.forecast$ = this.geolocation$.pipe(
      switchMap((geoLocationForecast: GeoLocationForecast) =>
        this.forecastService.getForecast(geoLocationForecast, this.days)
      )
    );
  }
}
