import { sandboxOf } from 'angular-playground';
import { FormsModule } from '@angular/forms';
import { SearchFreeSlotsComponent } from './search-free-slots.component';


export default sandboxOf(SearchFreeSlotsComponent, {
  imports: [
    FormsModule
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
