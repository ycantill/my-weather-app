import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { Forecast } from 'src/app/models/forecast.model';
import { ForecastService } from 'src/app/services/forecast.service';

import { ForecastCardComponent } from './forecast-card.component';

describe('ForecastCardComponent', () => {
  const forecastMock = {
    location: {
      id: 1,
      name: 'Madrid',
      latitude: 1234,
      longitude: 1234,
      country: 'Spain',
      admin1: 'Madrid',
    },
    daily: [
      {
        time: '2022-09-23',
        max: 12,
        min: 12,
        weathercode: 0,
      },
    ],
    weather: {
      temperature: 12,
      weathercode: 0,
      time: '2022-09-23',
      max: 12,
      min: 12,
    },
  } as Forecast;
  let component: ForecastCardComponent;
  let fixture: ComponentFixture<ForecastCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForecastCardComponent],
      imports: [HttpClientTestingModule, MatCardModule],
      providers: [ForecastService],
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastCardComponent);
    component = fixture.componentInstance;
    component.forecast = forecastMock;
    fixture.detectChanges();
  });

  describe('ForecastCardComponent instance', () => {
    it('should be created', () => {
      // Arrange
      // Act
      // Assert
      expect(component).toBeTruthy();
    });
  });

  describe('getWeathercodeIcon', () => {
    it('should return a weathercode icon', () => {
      // Arrange
      // Act
      // Assert
      expect(component.getWeathercodeIcon(0)).toBe('sunny');
    });
  });
});
