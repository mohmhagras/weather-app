import { Component, OnInit } from '@angular/core';
import { ForecastService } from './shared/services/forecast/forecast.service';
import {
  WeatherApiResponse,
  Location,
  CurrentWeather,
} from './shared/models/WeatherApiResponse';
import { TempratrueUnit } from './shared/enums/tempratrue-unit';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private forecastService: ForecastService) {}
  private _tempUnit: TempratrueUnit = TempratrueUnit.C;
  temp = 0;
  location: Location = null;
  currentWeather: CurrentWeather = null;
  forecastedWeather = {};
  tempElement: 'temp_c' | 'temp_f' = 'temp_c';

  public get tempUnit() {
    return this._tempUnit;
  }
  public set tempUnit(tempUnit: TempratrueUnit) {
    this._tempUnit = tempUnit;
    this.tempElement = tempUnit === 'C' ? 'temp_c' : 'temp_f';
  }

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
