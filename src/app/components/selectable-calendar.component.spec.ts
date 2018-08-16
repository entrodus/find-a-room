import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableCalendarComponent } from './selectable-calendar.component';

describe('SelectableCalendarComponent', () => {
  let component: SelectableCalendarComponent;
  let fixture: ComponentFixture<SelectableCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectableCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectableCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
