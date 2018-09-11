import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Calendar } from 'src/app/models/calendar';

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.scss']
})
export class CalendarsComponent implements OnInit, OnChanges {
  @Input() calendars: Calendar[];
  @Output() selectedCalendarIdsChange = new EventEmitter<string[]>();

  public selectedCalendarIds = new Set<string>();

  constructor() { }

  public ngOnInit() {

  }

  public isCalendarSelected(id: string): boolean {
    return this.selectedCalendarIds.has(id);
  }

  public setCalendarSelected(id: string, selected: boolean): void {
    if (selected) {
      this.selectedCalendarIds = this.selectedCalendarIds.add(id);
    } else {
      this.selectedCalendarIds.delete(id);
    }
    console.log('about to emit', this.selectedCalendarIds);
    this.selectedCalendarIdsChange.emit(Array.from(this.selectedCalendarIds.values()));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!this.calendars) {
      this.selectedCalendarIds = new Set<string>(this.calendars.map(calendar => calendar.id));
    }
    console.log(this.calendars);
  }

}
