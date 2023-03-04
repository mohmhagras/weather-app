import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentHighlightsComponent } from './current-highlights.component';

describe('CurrentHighlightsComponent', () => {
  let component: CurrentHighlightsComponent;
  let fixture: ComponentFixture<CurrentHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentHighlightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
