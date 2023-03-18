import { Component, Input, OnInit } from '@angular/core';
import { SpeedUnit } from '../shared/enums/speed-unit';
import { SunCoordinates } from '../shared/constants/SunCoordinates';
import { WindDirectionText } from '../shared/constants/WindDirection';
import { ForecastService } from '../shared/services/forecast/forecast.service';
@Component({
  selector: 'app-current-highlights',
  templateUrl: './current-highlights.component.html',
  styleUrls: ['./current-highlights.component.scss'],
})
export class CurrentHighlightsComponent implements OnInit {
  constructor(private forecastService: ForecastService) {}
  /*
  @Input() speedUnit = SpeedUnit.KM;
  @Input() windSpeed = 0;
  @Input() windDir!: string;
  @Input() humidity = 0;
  @Input() uvNumber = 0;
  @Input() sunrise = '';
  @Input() sunset = '';
  @Input() feelsLike = 0;
  @Input() visibility = 0;
  */
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
  visibilityUnit: 'km' | 'mi' = 'km';
  ngOnInit(): void {
    this.getData();
    this.setUvText();
    this.setDayTimePercent();
    this.visibilityUnit = this.speedUnit === 'km/h' ? 'km' : 'mi';
  }

  private getData() {
    const {
      wind_kph,
      wind_dir,
      humidity,
      uvNumber,
      sunrise,
      sunset,
      feelslike_c,
      vis_km,
    } = this.forecastService.getHighlights();
    this.windSpeed = wind_kph;
    this.windDir = wind_dir;
    this.humidity = humidity;
    this.uvNumber = uvNumber;
    this.sunrise = sunrise;
    this.sunset = sunset;
    this.feelsLike = feelslike_c;
    this.visibility = vis_km;
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
