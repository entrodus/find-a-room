import { sandboxOf } from 'angular-playground';
import { CalendarsComponent } from './calendars.component';
import { Calendar } from '../models/calendar';
import { SelectableCalendarComponent } from './selectable-calendar.component';


class MyUtils {
  public static getCalendars(): Calendar[] {
    const colours: { background: string, foreground: string }[] = [
      { background: '#16a765', foreground: '#000000' },
      { background: '#ff7537', foreground: '#000000' },
      { background: '#4986e7', foreground: '#000000' }
    ];

    const ITEM_COUNT = 10;

    const calendars = new Array<Calendar>();

    for (let index = 0; index < ITEM_COUNT; index++) {

      const calendar = new Calendar();
      calendar.summary = `Calendar summary Number #${index}`;

      const colourIndex =  index % colours.length;

      calendar.backgroundColor = colours[colourIndex].background;
      calendar.foregroundColor = colours[colourIndex].foreground;
      calendars.push(calendar);
    }

    return calendars;
  }
}

export default sandboxOf(CalendarsComponent, {
  declarations: [
    SelectableCalendarComponent
  ]
}).add('Display calendars', {
  template: `
    <app-calendars [calendars]="calendars" (selectedCalendarIdsChange)="selectedCalendarIds=$event"></app-calendars>
    <p *ngIf="selectedCalendarIds.length > 0">Selected Calendar Ids: {{selectedCalendarIds.join(',')}}</p>
  `,
  context: {
    calendars: MyUtils.getCalendars(),
    selectedCalendarIds: new Array<string>(),
  }
});
