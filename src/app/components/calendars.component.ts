import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.css']
})
export class CalendarsComponent implements OnInit {
  @Input() calendars: gapi.client.calendar.CalendarListEntry[];

  constructor() { }

  ngOnInit() {
    // this.calendars.length
  }

}
