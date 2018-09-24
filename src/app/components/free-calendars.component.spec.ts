import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeCalendarsComponent } from './free-calendars.component';

describe('FreeCalendarsComponent', () => {
  let component: FreeCalendarsComponent;
  let fixture: ComponentFixture<FreeCalendarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeCalendarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeCalendarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
