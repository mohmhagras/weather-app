import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.leftHours = this.forecastService.getHoursForecast();
    this.optionsService.tempUnit.subscribe(
      (tempUnit) => (this.tempElement = tempUnit === 'C' ? 'temp_c' : 'temp_f')
    );
  }

  getIconPath(weatherCode: number, isDay: number) {
    return `../../assets/weather-icons/${weatherCode}${isDay ? 1 : 0}.svg`;
  }

  getHour(index: number) {
    const currentHour = new Date().getHours();
    if (currentHour > 12) return currentHour - 12 + index + 1;
    return currentHour + index + 1;
  }

  getPeriod(index: number) {
    const currentHour = new Date().getHours();
    const targetHour = currentHour - 12 + index + 1;
    return currentHour + targetHour >= 12 ? 'PM' : 'AM';
  }
}
