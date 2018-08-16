import { sandboxOf } from 'angular-playground';
import { SelectableCalendarComponent } from './selectable-calendar.component';

export default sandboxOf(SelectableCalendarComponent)
  .add('Selectable calendar', {
    template: `<app-selectable-calendar></app-selectable-calendar>`
  });
