import { Component, OnInit } from '@angular/core';
import { ForecastService } from './shared/services/forecast/forecast.service';
import {
  WeatherApiResponse,
  Location,
  CurrentWeather,
} from './shared/models/WeatherApiResponse';
import { TempratrueUnit } from './shared/enums/tempratrue-unit';
import { SpeedUnit } from './shared/enums/speed-unit';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private forecastService: ForecastService) {}
  private _tempUnit = TempratrueUnit.C;
  private _speedUnit = SpeedUnit.KM;
  location: Location = null;
  currentWeather: CurrentWeather = null;
  forecastedWeather = {};
  tempElement: 'temp_c' | 'temp_f' = 'temp_c';
  speedElement: 'wind_kph' | 'wind_mph' = 'wind_kph';

  public get tempUnit() {
    return this._tempUnit;
  }
  public set tempUnit(tempUnit: TempratrueUnit) {
    this._tempUnit = tempUnit;
    this.tempElement = tempUnit === 'C' ? 'temp_c' : 'temp_f';
  }

  public set speedUnit(speedUnit: SpeedUnit) {
    this._speedUnit = speedUnit;
    this.speedElement = speedUnit === 'km/h' ? 'wind_kph' : 'wind_mph';
  }

  public get speedUnit() {
    return this._speedUnit;
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
