import { Component, OnInit, Input } from '@angular/core';
import { Calendar } from 'src/app/models/calendar';

@Component({
  selector: 'app-free-calendars',
  templateUrl: './free-calendars.component.html',
  styleUrls: ['./free-calendars.component.css']
})
export class FreeCalendarsComponent implements OnInit {
  @Input() calendars: Calendar[] = [];

  constructor() { }

  ngOnInit() {
  }

}
