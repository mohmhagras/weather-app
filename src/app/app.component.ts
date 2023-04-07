import { Component, OnInit } from '@angular/core';
import { ForecastService } from './shared/services/forecast/forecast.service';
import {
  WeatherApiResponse,
  Location,
  CurrentWeather,
  Forecast,
} from './shared/models/WeatherApiResponse';
import { TempratrueUnit } from './shared/enums/tempratrue-unit';
import { SpeedUnit } from './shared/enums/speed-unit';
import { RequestStatus } from './shared/enums/request-status';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private forecastService: ForecastService) {}
  requestStatus = RequestStatus.LOADING;
  ngOnInit(): void {
    this.forecastService.data.subscribe(
      (result) => (this.requestStatus = result[0])
    );
  }
}
