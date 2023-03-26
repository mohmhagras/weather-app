import { Component, OnInit } from '@angular/core';
import { CurrentWeather, Forecast } from '../shared/models/WeatherApiResponse';
import { ForecastService } from '../shared/services/forecast/forecast.service';

@Component({
  selector: 'app-days-forecast',
  templateUrl: './days-forecast.component.html',
  styleUrls: ['./days-forecast.component.scss'],
})
export class DaysForecastComponent implements OnInit {
  constructor(private forecastService: ForecastService) {}

  days!: Forecast[];

  ngOnInit(): void {
    this.days = this.forecastService.getDaysForecast();
  }
}
