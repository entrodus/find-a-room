import { sandboxOf } from 'angular-playground';
import { SelectableCalendarComponent } from './selectable-calendar.component';
import { Calendar } from '../models/calendar';
import { FormsModule } from '@angular/forms';

class MyUtils {
  public static getMockedCalendar(): Calendar {
    const cal = new Calendar();
    cal.summary = 'just a summary';
    cal.backgroundColor = '#16a765';
    cal.foregroundColor = '#000000';
    return cal;
  }
}

export default sandboxOf(SelectableCalendarComponent, {
  imports: [
    FormsModule
  ]
}).add('Selectable calendar (colour scheme #1)', {
  template: `<app-selectable-calendar [calendar]="calendar"></app-selectable-calendar>`,
  context: {
    calendar: MyUtils.getMockedCalendar(),
  }
});
