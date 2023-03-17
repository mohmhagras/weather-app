import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursForecastComponent } from './hours-forecast.component';

describe('HoursForecastComponent', () => {
  let component: HoursForecastComponent;
  let fixture: ComponentFixture<HoursForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoursForecastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoursForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
