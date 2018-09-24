import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, combineLatest, Subject } from 'rxjs';
import { AuthorisationService } from './services/authorisation.service';
import { CalendarService } from './services/calendar.service';
import { map } from 'rxjs/operators';
import { Calendar } from './models/calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public user: gapi.auth2.GoogleUser = null;
  public calendars$: Observable<Calendar[]>;
  public freeCalendars$: Observable<Calendar[]>; // TODO-NOW use this to visualise results
  public selectedCalendarIds: string[] = [];

  private freeCalendarIdsSubject = new Subject<string[]>();

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

      // calculate free calendars
      this.freeCalendars$ = combineLatest(this.calendars$, this.freeCalendarIdsSubject.asObservable()).pipe(
        map((data) => {
          const calendars = data[0];
          const freeCalendarIds = data[1];

          const freeCalendars = calendars.filter(calendar => freeCalendarIds.indexOf(calendar.id) > -1);
          return freeCalendars;
        })
      );

    });

  }

  public searchForFreeCalendarsResult(freeCalendarIds: string[]): void {
    this.freeCalendarIdsSubject.next(freeCalendarIds);
  }

}
