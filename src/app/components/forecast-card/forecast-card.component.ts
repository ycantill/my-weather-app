import { Component, Input } from '@angular/core';
import { Forecast } from 'src/app/models/forecast.model';
import { ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss'],
})
export class ForecastCardComponent {
  @Input() forecast: Forecast = {} as Forecast;
  constructor(private forecastService: ForecastService) {}

  public getWeathercodeIcon(weathercode: number): string | undefined {
    return this.forecastService.getWeathercodeIcon(weathercode);
  }
}
