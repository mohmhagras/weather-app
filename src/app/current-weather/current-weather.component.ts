import { Component, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpeedUnit } from '../shared/enums/speed-unit';
import { TempratrueUnit } from '../shared/enums/tempratrue-unit';
import { ForecastService } from '../shared/services/forecast/forecast.service';
import { OptionsService } from '../shared/services/options/options.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  constructor(
    private forecastService: ForecastService,
    private optionsService: OptionsService
  ) {}
  private tempC!: number;
  private tempF!: number;
  private maxTempC!: number;
  private minTempC!: number;
  private maxTempF!: number;
  private minTempF!: number;
  weatherText = '';
  weatherIcon = '';
  weatherCode = 0;
  temp = 0;
  maxTemp = 0;
  minTemp = 0;
  city = '';
  country = '';
  isDay = 0;
  tempUnit = TempratrueUnit.C;
  iconPath = '';

  ngOnInit(): void {
    this.getData();
    this.iconPath = `../../assets/weather-icons/${this.weatherCode}${
      this.isDay ? 1 : 0
    }.svg`;
    this.optionsService.tempUnit.subscribe((tempUnit) => {
      this.tempUnit = tempUnit;
      this.temp = this[`temp${tempUnit}`];
      this.maxTemp = this[`maxTemp${tempUnit}`];
      this.minTemp = this[`minTemp${tempUnit}`];
    });
  }

  private getData() {
    const {
      weatherCode,
      weatherIcon,
      weatherText,
      temp_c,
      temp_f,
      maxtemp_c,
      mintemp_c,
      maxtemp_f,
      mintemp_f,
      city,
      country,
      is_day,
    } = this.forecastService.getCurrentWeather();
    this.weatherCode = weatherCode;
    this.weatherIcon = weatherIcon;
    this.weatherText = weatherText;
    this.tempC = temp_c;
    this.tempF = temp_f;
    this.maxTempC = maxtemp_c;
    this.minTempC = mintemp_c;
    this.maxTempF = maxtemp_f;
    this.minTempF = mintemp_f;
    this.city = city;
    this.country = country;
    this.isDay = is_day;
  }
}
