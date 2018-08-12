import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private get calendarList(): gapi.client.calendar.CalendarListResource {
    // weird typecasts cause of type missmatches (https://github.com/Bolisov/google-api-typings-generator/issues/3)
    const client = (gapi.client as any);
    return client.calendar.calendarList as gapi.client.calendar.CalendarListResource;
  }

  // TODO use next token in order to retrieve full list, return calendarListEntry instead
  public getCalendarsList(): Observable<gapi.client.Response<gapi.client.calendar.CalendarList>> {
    const request = this.calendarList.list({});

    return new Observable(subscriber => {
      request.execute(response => {
        subscriber.next(response);
        subscriber.complete();
      });

    });

  }

  constructor() { }

}
