import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalendarsComponent } from './components/calendars.component';
import { SelectableCalendarComponent } from './components/selectable-calendar.component';
import { SearchFreeSlotsComponent } from './components/search-free-slots.component';
import { FreeCalendarsComponent } from './components/free-calendars.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarsComponent,
    SelectableCalendarComponent,
    SearchFreeSlotsComponent,
    FreeCalendarsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
