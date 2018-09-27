import { sandboxOf } from 'angular-playground';
import { FormsModule } from '@angular/forms';
import { SearchFreeSlotsComponent } from './search-free-slots.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

export default sandboxOf(SearchFreeSlotsComponent, {
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    PanelModule,
    ButtonModule,
    InputTextModule
  ]
}).add('Search free slots', {
  template: `
    <app-search-free-slots></app-search-free-slots>
  `
});
