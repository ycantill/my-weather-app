import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormControlStatus } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { GeoLocationForecast } from 'src/app/models/geolocation.model';
import { GeoLocationService } from 'src/app/services/geolocation.service';

type SearchTextChange = [FormControlStatus, string | null];

@Component({
  selector: 'app-geolocation-search',
  templateUrl: './geolocation-search.component.html',
  styleUrls: ['./geolocation-search.component.scss'],
})
export class GeolocationSearchComponent {
  public searchText = new FormControl('', [Validators.pattern('^([^0-9]*)$')]);
  public geoLocations$: Observable<GeoLocationForecast[]> = of([]);
  @Output() onGeoLocationSelected = new EventEmitter<GeoLocationForecast>();

  constructor(private locationService: GeoLocationService) {
    this.onSearchTextChanged();
  }

  private onSearchTextChanged(): void {
    this.geoLocations$ = combineLatest([
      this.searchText.statusChanges,
      this.searchText.valueChanges,
    ]).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(([status, searchedText]: SearchTextChange) => {
        return searchedText && status !== 'INVALID'
          ? this.locationService.getGeoLocationsByText(searchedText)
          : of([]);
      })
    );
  }

  public onGeoLocationChanged(geoLocation: GeoLocationForecast): void {
    this.onGeoLocationSelected.emit(geoLocation);
  }
}
