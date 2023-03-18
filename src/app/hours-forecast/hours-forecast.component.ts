import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeather } from '../shared/models/WeatherApiResponse';
import { ForecastService } from '../shared/services/forecast/forecast.service';

@Component({
  selector: 'app-hours-forecast',
  templateUrl: './hours-forecast.component.html',
  styleUrls: ['./hours-forecast.component.scss'],
})
export class HoursForecastComponent implements OnInit {
  constructor(private forecastService: ForecastService) {}
  leftHours: CurrentWeather[] = [];

  ngOnInit(): void {
    this.leftHours = this.forecastService.getHoursForecast();
  }

  getIconPath(weatherCode: number, isDay: number) {
    return `../../assets/weather-icons/${weatherCode}${isDay ? 1 : 0}.svg`;
  }

  getHour(index: number) {
    const currentHour = new Date().getHours();
    return currentHour - 12 + index + 1;
  }

  getPeriod(index: number) {
    const currentHour = new Date().getHours();
    const targetHour = currentHour - 12 + index + 1;
    return currentHour + targetHour >= 12 ? 'PM' : 'AM';
  }
}
