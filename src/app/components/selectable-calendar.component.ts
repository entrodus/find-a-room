import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Calendar } from '../models/calendar';

@Component({
  selector: 'app-selectable-calendar',
  templateUrl: './selectable-calendar.component.html',
  styleUrls: ['./selectable-calendar.component.css']
})
export class SelectableCalendarComponent implements OnInit {
  @Input() calendar: Calendar;
  @Input() selected: boolean;
  @Output() selectedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
