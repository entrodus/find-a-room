import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Calendar } from 'src/app/models/calendar';

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.css']
})
export class CalendarsComponent implements OnInit, OnChanges {
  @Input() calendars: Calendar[];

  constructor() { }

  public ngOnInit() {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(this.calendars);
  }

}
