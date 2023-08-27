import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.getLocationAndTime();
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

  private getLocationAndTime() {
    const { name, country, region } = this.forecastService.getTargetLocation();
    this.location = `${name}, ${region}, ${country}`;
    this.dateTime = this.forecastService.currentDateTime;
  }

  handleSearchBoxInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    if (query.length > 2) {
      this.forecastService
        .search(query)
        .subscribe((res) => (this.results = res));
    } else {
      this.results = [];
    }
  }

  handleOptionSelection(city: string, region: string, country: string) {
    this.forecastService.changeLocation(`${city}, ${region}, ${country}`);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.forecastService.changeLocation(
        (event.target as HTMLInputElement).value
      );
    }
  }
}
