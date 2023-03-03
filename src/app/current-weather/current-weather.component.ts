import { Component, Input, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpeedUnit } from '../shared/enums/speed-unit';
import { TempratrueUnit } from '../shared/enums/tempratrue-unit';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  @Input() temp = 0;
  @Input() weatherText = '';
  @Input() weatherIcon = '';
  @Input() cityName = '';
  @Input() iconCode = 0;
  @Input() tempUnit = TempratrueUnit.C;
  @Input() speedMode = SpeedUnit.KM;
  dateTime!: Observable<Date>;

  ngOnInit(): void {
    this.dateTime = timer(0, 1000).pipe(map(() => new Date()));
  }
}
