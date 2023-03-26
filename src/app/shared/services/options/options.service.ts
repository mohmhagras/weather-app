import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SpeedUnit } from '../../enums/speed-unit';
import { TempratrueUnit } from '../../enums/tempratrue-unit';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  tempUnit = new BehaviorSubject(TempratrueUnit.C);
  speedUnit = new BehaviorSubject(SpeedUnit.KM);

  toggleTempUnit() {
    this.tempUnit.next(
      this.tempUnit.getValue() === 'C' ? TempratrueUnit.F : TempratrueUnit.C
    );
  }

  toggleSpeedUnit() {
    this.speedUnit.next(
      this.speedUnit.getValue() === 'km/h' ? SpeedUnit.MI : SpeedUnit.KM
    );
  }
}
