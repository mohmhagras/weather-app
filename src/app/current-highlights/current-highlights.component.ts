import { Component, Input, OnInit } from '@angular/core';
import { SpeedUnit } from '../shared/enums/speed-unit';

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
  uvText = '';
  windDirectionText: any = {
    N: 'Heading from North to South',
    NNE: 'Heading from Northeast to Southwest',
    NE: 'Heading from Northeast to Southwest',
    ENE: 'Heading from Northeast to Southwest',
    E: 'Heading from East to West',
    ESE: 'Heading from Southeast to Northwest',
    SE: 'Heading from Southeast to Northwest',
    SSE: 'Heading from Southeast to Northwest',
    S: 'Heading from South to North',
    SSW: 'Heading from Southwest to Northeast',
    SW: 'Heading from Southwest to Northeast',
    WSW: 'Heading from Southwest to Northeast',
    W: 'Heading from West to East',
    WNW: 'Heading from Northwest to Southeast',
    NW: 'Heading from Northwest to Southeast',
    NNW: 'Heading from Northwest to Southeast',
  };
  ngOnInit(): void {
    this.setUvText();
  }

  private setUvText() {
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
}
