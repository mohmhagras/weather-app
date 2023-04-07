import { Component, OnInit } from '@angular/core';
import { Observable, timer, map, BehaviorSubject } from 'rxjs';
import { CurrentWeather } from '../shared/models/WeatherApiResponse';
import { ForecastService } from '../shared/services/forecast/forecast.service';
import { OptionsService } from '../shared/services/options/options.service';

@Component({
  selector: 'app-hours-forecast',
  templateUrl: './hours-forecast.component.html',
  styleUrls: ['./hours-forecast.component.scss'],
})
export class HoursForecastComponent implements OnInit {
  constructor(
    private forecastService: ForecastService,
    private optionsService: OptionsService
  ) {}
  leftHours: CurrentWeather[] = [];
  tempElement!: 'temp_c' | 'temp_f';
  dateTime!: Date;

  ngOnInit(): void {
    this.leftHours = this.forecastService.getHoursForecast();
    this.dateTime = this.forecastService.currentDateTime.value;
    this.optionsService.tempUnit.subscribe(
      (tempUnit) => (this.tempElement = tempUnit === 'C' ? 'temp_c' : 'temp_f')
    );
  }

  getIconPath(weatherCode: number, isDay: number) {
    return `../../assets/weather-icons/${weatherCode}${isDay ? 1 : 0}.svg`;
  }

  getHour(index: number) {
    const currentHour = this.dateTime.getHours();
    const hr24Format = currentHour + index;
    if (hr24Format + 1 > 12) return hr24Format - 12 + 1;
    return hr24Format + 1;
  }

  getPeriod(index: number) {
    const currentHour = this.dateTime.getHours();
    return currentHour + index + 1 >= 12 ? 'PM' : 'AM';
  }
}
