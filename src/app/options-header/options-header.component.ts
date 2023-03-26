import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, timer, map } from 'rxjs';
import { SpeedUnit } from '../shared/enums/speed-unit';
import { TempratrueUnit } from '../shared/enums/tempratrue-unit';
import { OptionsService } from '../shared/services/options/options.service';

@Component({
  selector: 'app-options-header',
  templateUrl: './options-header.component.html',
  styleUrls: ['./options-header.component.scss'],
})
export class OptionsHeaderComponent implements OnInit {
  constructor(private optionsService: OptionsService) {}
  dateTime!: Observable<Date>;
  @Input() city = '';
  @Input() country = '';
  tempUnit!: TempratrueUnit;
  speedUnit!: SpeedUnit;
  ngOnInit(): void {
    this.dateTime = timer(0, 1000).pipe(map(() => new Date()));
    this.optionsService.tempUnit.subscribe(
      (tempUnit) => (this.tempUnit = tempUnit)
    );
    this.optionsService.speedUnit.subscribe(
      (speedUnit) => (this.speedUnit = speedUnit)
    );
  }

  handleTempUnitToggle() {
    this.optionsService.toggleTempUnit();
  }

  handleSpeedUnitToggle() {
    this.optionsService.toggleSpeedUnit();
  }
}
