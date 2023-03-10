import { Component, Input, OnInit } from '@angular/core';
import { SpeedUnit } from '../shared/enums/speed-unit';
import { SunCoordinates } from '../shared/constants/SunCoordinates';
import { WindDirectionText } from '../shared/constants/WindDirection';
@Component({
  selector: 'app-current-highlights',
  templateUrl: './current-highlights.component.html',
  styleUrls: ['./current-highlights.component.scss'],
})
export class CurrentHighlightsComponent implements OnInit {
  @Input() speedUnit = SpeedUnit.KM;
  @Input() windSpeed = 0;
  @Input() windDir!: string;
  @Input() humidity = 0;
  @Input() uvNumber = 0;
  @Input() sunrise = '';
  @Input() sunset = '';
  readonly windDirectionText: any = WindDirectionText;
  readonly sunCoordinates = SunCoordinates;
  dayTimePercent = 0;
  uvText = '';
  ngOnInit(): void {
    this.setUvText();
    this.setDayTimePercent();
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
