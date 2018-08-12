import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorisationService } from './services/authorisation.service';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public authInitialised = false;

  constructor(
    private authService: AuthorisationService,
    private calendarService: CalendarService,
  ) { }

  public ngOnInit(): void {
    this.authService.init().subscribe(() => {
      this.authInitialised = true;

      this.calendarService.getCalendarsList().subscribe ( calendarsList => {
        console.log('calendarsList', calendarsList);
      });

    });
  }

}
