import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeather } from '../shared/models/WeatherApiResponse';

@Component({
  selector: 'app-hours-forecast',
  templateUrl: './hours-forecast.component.html',
  styleUrls: ['./hours-forecast.component.scss'],
})
export class HoursForecastComponent implements OnInit {
  @Input() hours!: CurrentWeather[];
  leftHours: CurrentWeather[] = [];

  ngOnInit(): void {
    const currentHour = new Date().getHours();
    this.leftHours = this.hours.slice(currentHour + 1);
    console.log(this.leftHours);
  }
}
