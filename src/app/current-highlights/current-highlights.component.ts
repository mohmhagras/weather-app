import { Component, Input } from '@angular/core';
import { SpeedUnit } from '../shared/enums/speed-unit';

@Component({
  selector: 'app-current-highlights',
  templateUrl: './current-highlights.component.html',
  styleUrls: ['./current-highlights.component.scss'],
})
export class CurrentHighlightsComponent {
  @Input() speedUnit = SpeedUnit.KM;
  @Input() windSpeed = 0;
  @Input() windDir!: string;
  @Input() humidity = 0;
  @Input() uv = 0;
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
}
