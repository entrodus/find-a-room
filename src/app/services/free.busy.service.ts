import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FreeBusyService {

    constructor(private ngZone: NgZone) { }

    private get freebusy(): gapi.client.calendar.FreebusyResource {
        // weird typecasts cause of type missmatches (https://github.com/Bolisov/google-api-typings-generator/issues/3)
        const client = (gapi.client as any);
        return client.calendar.freebusy as gapi.client.calendar.FreebusyResource;
    }

    public getFreeBusy(selectedCalendarIds: string[], timeFrom: string, timeTo: string): Observable<any> {
        const typeLessfreebusy = this.freebusy as any;
        const items = selectedCalendarIds.map(id => ({ id }));

        return new Observable(subscriber => {

            const d: gapi.client.calendar.FreeBusyResponse = null;

            typeLessfreebusy.query({ items: items, timeMin: timeFrom, timeMax: timeTo })
                .execute((response: gapi.client.calendar.FreeBusyResponse) => {
                    const freeCalendarIds = this.mapToFreeCalendarIds(response);

                    this.ngZone.run(() => {
                        subscriber.next(freeCalendarIds);
                        subscriber.complete();
                    });

                });

        });

    }


    private mapToFreeCalendarIds(response: gapi.client.calendar.FreeBusyResponse): string[] {

        const freeCalendarIds: string[] = [];

        for (const record in response.calendars) {
            if (!record) { continue; }

            const calendarId = record;
            const calendar = response.calendars[record] as gapi.client.calendar.FreeBusyCalendar;

            if (!!calendar.errors) {
                console.error('error while query calendars free busy state', calendar);
                continue;
            }

            if (calendar.busy.length > 0) { continue; }

            freeCalendarIds.push(calendarId);
        }

        return freeCalendarIds;
    }

    // example of busy:


    // {
    //     "kind": "calendar#freeBusy",
    //     "timeMin": "2018-09-21T09:00:56.000Z",
    //     "timeMax": "2018-09-21T20:00:56.000Z",
    //     "calendars": {
    //      "ntsokos@gmail.com": {
    //       "busy": [
    //        {
    //         "start": "2018-09-21T18:00:00Z",
    //         "end": "2018-09-21T18:30:00Z"
    //        }
    //       ]
    //      },
    //      "thisiscodebase.com_9a78qfas6fa05d5f1u6nmuel4g@group.calendar.google.com": {
    //       "busy": [
    //        {
    //         "start": "2018-09-21T10:00:00Z",
    //         "end": "2018-09-21T15:30:00Z"
    //        }
    //       ]
    //      },
    //      "thisiscodebase.com_35bn0vlvff60e398th13nj34r0@group.calendar.google.com": {
    //       "busy": [
    //        {
    //         "start": "2018-09-21T09:00:56Z",
    //         "end": "2018-09-21T09:30:00Z"
    //        },
    //        {
    //         "start": "2018-09-21T10:00:00Z",
    //         "end": "2018-09-21T11:00:00Z"
    //        },
    //        {
    //         "start": "2018-09-21T12:00:00Z",
    //         "end": "2018-09-21T14:00:00Z"
    //        },
    //        {
    //         "start": "2018-09-21T15:00:00Z",
    //         "end": "2018-09-21T16:00:00Z"
    //        }
    //       ]
    //      }
    //     }
    //    }

}
