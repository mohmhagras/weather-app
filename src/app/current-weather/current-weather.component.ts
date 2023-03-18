import { identifierName } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpeedUnit } from '../shared/enums/speed-unit';
import { TempratrueUnit } from '../shared/enums/tempratrue-unit';
import { CurrentWeather } from '../shared/models/WeatherApiResponse';
import { ForecastService } from '../shared/services/forecast/forecast.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  constructor(private forecastService: ForecastService) {}
  /*
  @Input() weatherText = '';
  @Input() weatherIcon = '';
  @Input() weatherCode = 0;
  @Input() temp = 0;
  @Input() maxTemp = 0;
  @Input() minTemp = 0;
  @Input() city = '';
  @Input() country = '';
  @Input() isDay = 0;
  @Input() tempUnit = TempratrueUnit.C;
  @Input() speedMode = SpeedUnit.KM;
  */
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
  speedMode = SpeedUnit.KM;
  dateTime!: Observable<Date>;
  iconPath = '';

  ngOnInit(): void {
    this.getData();
    this.dateTime = timer(0, 1000).pipe(map(() => new Date()));
    this.iconPath = `../../assets/weather-icons/${this.weatherCode}${
      this.isDay ? 1 : 0
    }.svg`;
  }

  private getData() {
    const {
      weatherCode,
      weatherIcon,
      weatherText,
      temp_c,
      maxtemp_c,
      mintemp_c,
      city,
      country,
      is_day,
    } = this.forecastService.getCurrentWeather();
    this.weatherCode = weatherCode;
    this.weatherIcon = weatherIcon;
    this.weatherText = weatherText;
    this.temp = temp_c;
    this.maxTemp = maxtemp_c;
    this.minTemp = mintemp_c;
    this.city = city;
    this.country = country;
    this.isDay = is_day;
  }
}
