import { Component, Input } from '@angular/core';
import { SpeedUnit } from '../shared/enums/speed-unit';
import { TempratrueUnit } from '../shared/enums/tempratrue-unit';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent {
  @Input() temp = 0;
  @Input() weatherText = '';
  @Input() cityName = '';
  @Input() iconCode = 0;
  @Input() tempUnit = TempratrueUnit.C;
  @Input() speedMode = SpeedUnit.KM;
  dateTime = new Date();
}
