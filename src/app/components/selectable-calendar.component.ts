import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Calendar } from '../models/calendar';

@Component({
  selector: 'app-selectable-calendar',
  templateUrl: './selectable-calendar.component.html',
  styleUrls: ['./selectable-calendar.component.scss']
})
export class SelectableCalendarComponent implements OnInit {
  @Input() calendar: Calendar;
  @Input() selected: boolean;
  @Output() selectedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  public id = `sc-${this.uuidv4()}`;

  constructor() { }

  public ngOnInit(): void {
  }

  public uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
