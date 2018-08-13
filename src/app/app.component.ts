import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorisationService } from './services/authorisation.service';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  public user: gapi.auth2.GoogleUser = null;
  public calendars$: Observable<gapi.client.calendar.CalendarListEntry[]>;
  public test = false;

  constructor(
    private authService: AuthorisationService,
    private calendarService: CalendarService,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngAfterViewInit(): void {
    // this.test = true;
    this.authService.init().subscribe((user) => {
      this.calendars$ = this.calendarService.getAllCalendars();
      this.user = user;
      this.cdr.detectChanges();
    });
  }

  public ngOnInit(): void {

  }

}
