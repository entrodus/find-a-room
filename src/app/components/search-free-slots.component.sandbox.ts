import { sandboxOf } from 'angular-playground';
import { FormsModule } from '@angular/forms';
import { SearchFreeSlotsComponent } from './search-free-slots.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';


export default sandboxOf(SearchFreeSlotsComponent, {
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    PanelModule,
    ButtonModule
  ]
}).add('Search free slots', {
  template: `
    <app-search-free-slots></app-search-free-slots>
  `,
  // context: {
  //   calendars: MyUtils.getCalendars(),
  //   selectedCalendarIds: ['2', '3']
  //   // selectedCalendarIds: new Array<string>(),
  // }
});
