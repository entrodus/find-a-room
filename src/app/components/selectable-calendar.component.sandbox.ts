import { sandboxOf } from 'angular-playground';
import { SelectableCalendarComponent } from './selectable-calendar.component';
import { Calendar } from '../models/calendar';


// Calendar {id: "classroom108056428347941102767@group.calendar.google.com", summary: "My first class Test Section", description: undefined, backgroundColor: "#16a765", foregroundColor: "#000000", …}
// Calendar {id: "thisiscodebase.com_jj7ep6p8uf9t8b3mp9o8sdunac@group.calendar.google.com", summary: "Floor D - Hillwood Park (5)", description: undefined, backgroundColor: "#ff7537", foregroundColor: "#000000", …}
// Calendar {id: "thisiscodebase.com_tkrtmcn3jt3i5rac8o5cdj0nlo@group.calendar.google.com", summary: "Floor J - Tyninghame Beach (6)", description: undefined, backgroundColor: "#4986e7", foregroundColor: "#000000", …}


class MyUtils {
  public static getMockedCalendar(): Calendar {
    const cal = new Calendar();
    cal.summary = 'just a summary';
    cal.backgroundColor = '#16a765';
    cal.foregroundColor = '#000000';
    return cal;
  }
}
export default sandboxOf(SelectableCalendarComponent)
  .add('Selectable calendar (colour scheme #1)', {
    template: `<app-selectable-calendar [calendar]="calendar"></app-selectable-calendar>`,
    context: {
      calendar: MyUtils.getMockedCalendar(),
    }
  });
