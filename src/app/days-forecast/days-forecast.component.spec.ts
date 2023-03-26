import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysForecastComponent } from './days-forecast.component';

describe('DaysForecastComponent', () => {
  let component: DaysForecastComponent;
  let fixture: ComponentFixture<DaysForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysForecastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
