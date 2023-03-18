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
  private _tempUnit = TempratrueUnit.C;
  private _speedUnit = SpeedUnit.KM;
  requestStatus = RequestStatus.LOADING;
  location!: Location;
  currentWeather!: CurrentWeather;
  forecastedWeather!: Forecast[];
  tempElement: 'temp_c' | 'temp_f' = 'temp_c';
  maxTempElement: 'maxtemp_c' | 'maxtemp_f' = 'maxtemp_c';
  minTempElement: 'mintemp_c' | 'mintemp_f' = 'mintemp_c';
  speedElement: 'wind_kph' | 'wind_mph' = 'wind_kph';
  feelsLikeElement: 'feelslike_c' | 'feelslike_f' = 'feelslike_c';
  visibilityElement: 'vis_km' | 'vis_miles' = 'vis_km';

  public get tempUnit() {
    return this._tempUnit;
  }

  public set tempUnit(tempUnit: TempratrueUnit) {
    this._tempUnit = tempUnit;
    this.tempElement = tempUnit === 'C' ? 'temp_c' : 'temp_f';
    this.maxTempElement = tempUnit === 'C' ? 'maxtemp_c' : 'maxtemp_f';
    this.minTempElement = tempUnit === 'C' ? 'mintemp_c' : 'mintemp_f';
    this.feelsLikeElement = tempUnit === 'C' ? 'feelslike_c' : 'feelslike_f';
  }

  public get speedUnit() {
    return this._speedUnit;
  }

  public set speedUnit(speedUnit: SpeedUnit) {
    this._speedUnit = speedUnit;
    this.speedElement = speedUnit === 'km/h' ? 'wind_kph' : 'wind_mph';
    this.visibilityElement = speedUnit === 'km/h' ? 'vis_km' : 'vis_miles';
  }

  private setWeatherData(ApiResponse: WeatherApiResponse) {
    if (ApiResponse[0] === 'success') {
      this.location = ApiResponse[1].location;
      this.currentWeather = ApiResponse[1].current;
      this.forecastedWeather = ApiResponse[1].forecast.forecastday;
      this.requestStatus = RequestStatus.SUCCESS;
    } else if (ApiResponse[0] === 'error') {
      this.requestStatus = RequestStatus.ERROR;
      alert(ApiResponse[1].message);
    }
  }

  ngOnInit(): void {
    /*
    this.forecastService.get().subscribe({
      next: (result) => this.setWeatherData([RequestStatus.SUCCESS, result]),
      error: (error) => this.setWeatherData([RequestStatus.ERROR, error]),
    });
  }
  */
    this.forecastService.data.subscribe(
      (result) => (this.requestStatus = result[0])
    );
  }
}
