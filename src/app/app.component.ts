import { Component, OnInit } from '@angular/core';
import { ForecastService } from './shared/services/forecast/forecast.service';
import { WeatherApiResponse } from './shared/models/WeatherApiResponse';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private forecastService: ForecastService) {}
  weatherData: WeatherApiResponse = null;

  ngOnInit(): void {
    this.forecastService
      .get()
      .subscribe((result) => (this.weatherData = result));
  }
}
