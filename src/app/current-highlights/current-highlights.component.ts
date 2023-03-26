import { Component, Input, OnInit } from '@angular/core';
import { SpeedUnit } from '../shared/enums/speed-unit';
import { SunCoordinates } from '../shared/constants/SunCoordinates';
import { WindDirectionText } from '../shared/constants/WindDirection';
import { ForecastService } from '../shared/services/forecast/forecast.service';
import { OptionsService } from '../shared/services/options/options.service';
@Component({
  selector: 'app-current-highlights',
  templateUrl: './current-highlights.component.html',
  styleUrls: ['./current-highlights.component.scss'],
})
export class CurrentHighlightsComponent implements OnInit {
  constructor(
    private forecastService: ForecastService,
    private optionsService: OptionsService
  ) {}
  private feelsLikeC!: number;
  private feelsLikeF!: number;
  private visKm!: number;
  private visMiles!: number;
  private windSpeedKm!: number;
  private windSpeedMi!: number;
  speedUnit = SpeedUnit.KM;
  windSpeed = 0;
  windDir!: string;
  humidity = 0;
  uvNumber = 0;
  sunrise = '';
  sunset = '';
  feelsLike = 0;
  visibility = 0;
  readonly windDirectionText: any = WindDirectionText;
  readonly sunCoordinates = SunCoordinates;
  dayTimePercent = 0;
  uvText = '';
  visibilityUnit!: 'km' | 'mi';
  ngOnInit(): void {
    this.getData();
    this.setUvText();
    this.setDayTimePercent();
    this.visibilityUnit = this.speedUnit === 'km/h' ? 'km' : 'mi';
    this.optionsService.tempUnit.subscribe(
      (tempUnit) =>
        (this.feelsLike = tempUnit === 'C' ? this.feelsLikeC : this.feelsLikeF)
    );
    this.optionsService.speedUnit.subscribe((speedUnit) =>
      this.setSpeedUnits(speedUnit)
    );
  }

  private getData() {
    const {
      wind_kph,
      wind_mph,
      wind_dir,
      humidity,
      uvNumber,
      sunrise,
      sunset,
      feelslike_c,
      feelslike_f,
      vis_km,
      vis_miles,
    } = this.forecastService.getHighlights();
    this.windSpeedKm = wind_kph;
    this.windSpeedMi = wind_mph;
    this.windDir = wind_dir;
    this.humidity = humidity;
    this.uvNumber = uvNumber;
    this.sunrise = sunrise;
    this.sunset = sunset;
    this.feelsLikeC = feelslike_c;
    this.feelsLikeF = feelslike_f;
    this.visKm = vis_km;
    this.visMiles = vis_miles;
  }

  private setSpeedUnits(speedUnit: SpeedUnit) {
    this.speedUnit = speedUnit;
    if (speedUnit === 'km/h') {
      this.windSpeed = this.windSpeedKm;
      this.visibilityUnit = 'km';
      this.visibility = this.visKm;
    } else {
      this.windSpeed = this.windSpeedMi;
      this.visibilityUnit = 'mi';
      this.visibility = this.visMiles;
    }
  }

  private setUvText(): void {
    if (this.uvNumber < 3) {
      this.uvText = 'Low. You can safely stay outside';
    } else if (this.uvNumber < 6) {
      this.uvText = 'Moderate. Seek shade and use sunscreen';
    } else if (this.uvNumber < 8) {
      this.uvText = 'High. Seek shade and use sunscreen';
    } else if (this.uvNumber < 11) {
      this.uvText = 'Very High. Avoid being outside if possible';
    } else if (this.uvNumber >= 11) {
      this.uvText = 'Extreme. Avoid being outside if possible';
    }
  }

  private setDayTimePercent() {
    const dateRef = new Date();
    const sunriseTimestamp = new Date(
      dateRef.getFullYear(),
      dateRef.getMonth(),
      dateRef.getDate(),
      parseInt(this.sunrise.slice(0, 2)),
      parseInt(this.sunrise.slice(3, 5))
    ).valueOf();
    const sunsetTimestamp = new Date(
      dateRef.getFullYear(),
      dateRef.getMonth(),
      dateRef.getDate(),
      parseInt(this.sunset.slice(0, 2)) + 12,
      parseInt(this.sunset.slice(3, 5))
    ).valueOf();
    const dayTime = sunsetTimestamp - sunriseTimestamp;
    const value = Math.floor(((Date.now() - sunriseTimestamp) * 100) / dayTime);
    if (value < 100) this.dayTimePercent = value;
  }
}
