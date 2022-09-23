import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { GeolocationSearchComponent } from './components/geolocation-search/geolocation-search.component';
import { Forecast } from './models/forecast.model';
import { GeoLocationForecast } from './models/geolocation.model';
import { ForecastService } from './services/forecast.service';
import { GeoLocationService } from './services/geolocation.service';

describe('AppComponent', () => {
  const forecastServiceSpy: jasmine.SpyObj<ForecastService> =
    jasmine.createSpyObj('ForecastService', ['getForecast']);
  const geoLocationServiceSpy: jasmine.SpyObj<GeoLocationService> =
    jasmine.createSpyObj('GeoLocationService', ['getGeoLocationsByText']);
  forecastServiceSpy.getForecast.and.returnValue(
    of({ location: { name: 'Madrid' } } as Forecast)
  );
  const geoLocationForecastMock: GeoLocationForecast = {
    id: 1,
    name: 'Madrid',
    latitude: 1234,
    longitude: 1234,
    country: 'Spain',
    admin1: 'Madrid',
  };
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
      ],
      declarations: [AppComponent, GeolocationSearchComponent],
      providers: [
        { provide: ForecastService, useValue: forecastServiceSpy },
        { provide: GeoLocationService, useValue: geoLocationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('AppComponent instance', () => {
    it('should be created', () => {
      // Arrange
      // Act
      // Assert
      expect(component).toBeTruthy();
    });
  });

  describe('onGeoLocationSelected', () => {
    it('should retrieve a forecast object', () => {
      // Arrange
      component.forecast$.subscribe((forecast: Forecast) => {
        // Assert
        expect(forecast.location.name).toBe('Madrid');
      });
      // Act
      component.onGeoLocationSelected(geoLocationForecastMock);
    });
  });
});
