import { Injectable, NgZone } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { Calendar } from 'src/app/models/calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private ngZone: NgZone) { }

  private get calendarList(): gapi.client.calendar.CalendarListResource {
    // weird typecasts cause of type missmatches (https://github.com/Bolisov/google-api-typings-generator/issues/3)
    const client = (gapi.client as any);
    return client.calendar.calendarList as gapi.client.calendar.CalendarListResource;
  }

  public getAllCalendars(): Observable<Calendar[]> {

    return this.getCalendarList().pipe(
      concatMap(response => {

        const combineWithNextIfAvailable$ = !!response.result.nextPageToken
          ? this.getCalendarList(response.result.nextPageToken).pipe(
            map(nextPageItems => response.result.items.concat(nextPageItems.result.items))
          )
          : observableOf(response.result.items);

        return combineWithNextIfAvailable$;
      }),
      map(entries => entries.map(entry => this.mapToCalendar(entry)))
    );

  }

  private mapToCalendar(source: gapi.client.calendar.CalendarListEntry): Calendar {
    const calendar = new Calendar();
    calendar.id = source.id;
    calendar.summary = source.summary;
    calendar.description = source.description;
    calendar.backgroundColor = source.backgroundColor;
    calendar.foregroundColor = source.foregroundColor;
    calendar.etag = source.etag;
    return calendar;
  }

  private getCalendarList(pageToken: string = null): Observable<gapi.client.Response<gapi.client.calendar.CalendarList>> {
    const request = this.calendarList.list({ pageToken: pageToken });

    return new Observable(subscriber => {
      request.execute(response => {

        this.ngZone.run(() => {
          subscriber.next(response);
          subscriber.complete();
        });

      });

    });

  }

}
