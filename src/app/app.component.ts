import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorisationService } from './services/authorisation.service';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public user: gapi.auth2.GoogleUser = null;
  public calendars$: Observable<gapi.client.calendar.CalendarListEntry[]>;
  public test = false;

  constructor(
    private authService: AuthorisationService,
    private calendarService: CalendarService,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.authService.init().subscribe((user) => {
      this.user = user;
      this.calendars$ = this.calendarService.getAllCalendars();
      // weird but change detection is broken probably cause something operatos outside ngZone
      this.cdr.detectChanges();
    });
  }

}
