import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFreeSlotsComponent } from './search-free-slots.component';

describe('SearchFreeSlotsComponent', () => {
  let component: SearchFreeSlotsComponent;
  let fixture: ComponentFixture<SearchFreeSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFreeSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFreeSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
