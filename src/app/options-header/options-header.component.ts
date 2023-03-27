import { Component, OnInit } from '@angular/core';
import { Observable, timer, map } from 'rxjs';
import { SpeedUnit } from '../shared/enums/speed-unit';
import { Location } from '../shared/models/WeatherApiResponse';
import { TempratrueUnit } from '../shared/enums/tempratrue-unit';
import { ForecastService } from '../shared/services/forecast/forecast.service';
import { OptionsService } from '../shared/services/options/options.service';

@Component({
  selector: 'app-options-header',
  templateUrl: './options-header.component.html',
  styleUrls: ['./options-header.component.scss'],
})
export class OptionsHeaderComponent implements OnInit {
  constructor(
    private forecastService: ForecastService,
    private optionsService: OptionsService
  ) {}
  dateTime!: Observable<Date>;
  location = '';
  searchQuery = '';
  results: Location[] = [];
  tempUnit!: TempratrueUnit;
  speedUnit!: SpeedUnit;
  ngOnInit(): void {
    this.getLocation();
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

  private getLocation() {
    const { name, country, region } = this.forecastService.getTargetLocation();
    this.location = `${name}, ${region}, ${country}`;
  }

  handleSearchBoxInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    if (query.length > 1) {
      this.forecastService
        .search(query)
        .subscribe((res) => (this.results = res));
    } else {
      this.results = [];
    }
  }
}
