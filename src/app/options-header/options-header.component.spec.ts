import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsHeaderComponent } from './options-header.component';

describe('OptionsHeaderComponent', () => {
  let component: OptionsHeaderComponent;
  let fixture: ComponentFixture<OptionsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
