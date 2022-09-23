import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { GeoLocationForecast } from 'src/app/models/geolocation.model';
import { GeoLocationService } from 'src/app/services/geolocation.service';
import { GeolocationSearchComponent } from './geolocation-search.component';

describe('GeolocationSearchComponent', () => {
  const geoLocationForecastMock: GeoLocationForecast = {
    id: 1,
    name: 'Madrid',
    latitude: 1234,
    longitude: 1234,
    country: 'Spain',
    admin1: 'Madrid',
  };
  const geoLocationServiceSpy: jasmine.SpyObj<GeoLocationService> =
    jasmine.createSpyObj('GeoLocationService', ['getGeoLocationsByText']);
  geoLocationServiceSpy.getGeoLocationsByText.and.returnValue(
    of([geoLocationForecastMock])
  );
  let component: GeolocationSearchComponent;
  let fixture: ComponentFixture<GeolocationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatAutocompleteModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [GeolocationSearchComponent],
      providers: [
        { provide: GeoLocationService, useValue: geoLocationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('GeolocationSearchComponent instance', () => {
    it('should be created', () => {
      // Arrange
      // Act
      // Assert
      expect(component).toBeTruthy();
    });
  });

  describe('onGeoLocationChanged', () => {
    it('should emit an event', () => {
      // Arrange
      const emitSpy = spyOn(component.onGeoLocationSelected, 'emit');
      // Act
      component.onGeoLocationChanged(geoLocationForecastMock);
      // Assert
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('onSearchTextChanged', () => {
    it('should return a GeoLocationForecast object when text is not empty', waitForAsync(() => {
      // Arrange
      component.geoLocations$.subscribe(
        (geoLocations: GeoLocationForecast[]) => {
          // Assert
          expect(geoLocations[0].name).toBe('Madrid');
        }
      );
      // Act
      component.searchText.setValue('Madrid');
    }));

    it('should return an empty array when text is empty', waitForAsync(() => {
      // Arrange
      component.geoLocations$.subscribe(
        (geoLocations: GeoLocationForecast[]) => {
          // Assert
          expect(geoLocations.length).toEqual(0);
        }
      );
      // Act
      component.searchText.setValue('');
    }));
  });
});
