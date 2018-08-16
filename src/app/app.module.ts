import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarsComponent } from './components/calendars.component';
import { SelectableCalendarComponent } from './components/selectable-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarsComponent,
    SelectableCalendarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
