import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private get calendarList(): gapi.client.calendar.CalendarListResource {
    // weird typecasts cause of type missmatches (https://github.com/Bolisov/google-api-typings-generator/issues/3)
    const client = (gapi.client as any);
    return client.calendar.calendarList as gapi.client.calendar.CalendarListResource;
  }

  public getAllCalendars(): Observable<gapi.client.calendar.CalendarListEntry[]> {

    return this.getCalendarList().pipe(
      concatMap(response => {

        const combineWithNextIfAvailable$ = !!response.result.nextPageToken
          ? this.getCalendarList(response.result.nextPageToken).pipe(
            map(nextPageItems => response.result.items.concat(nextPageItems.result.items))
          )
          : observableOf(response.result.items);

        return combineWithNextIfAvailable$;
      })
    );

  }

  private getCalendarList(pageToken: string = null): Observable<gapi.client.Response<gapi.client.calendar.CalendarList>> {
    const request = this.calendarList.list({ pageToken: pageToken });

    return new Observable(subscriber => {
      request.execute(response => {
        subscriber.next(response);
        subscriber.complete();
      });

    });

  }

  constructor() { }

}
