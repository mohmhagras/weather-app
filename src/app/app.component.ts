import { Component, OnInit } from '@angular/core';
import { ForecastService } from './shared/services/forecast/forecast.service';
import {
  WeatherApiResponse,
  Location,
  CurrentWeather,
} from './shared/models/WeatherApiResponse';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private forecastService: ForecastService) {}
  location: Location = null;
  currentWeather: CurrentWeather = null;
  forecastedWeather = {};

  private setWeatherData(ApiResponse: WeatherApiResponse) {
    this.location = ApiResponse!.location;
    this.currentWeather = ApiResponse!.current;
    this.forecastedWeather = ApiResponse!.forecast;
  }

  ngOnInit(): void {
    this.forecastService
      .get()
      .subscribe((result) => this.setWeatherData(result));
  }
}
