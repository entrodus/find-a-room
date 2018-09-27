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

    public getFreeBusy(selectedCalendarIds: string[], timeFrom: string, timeTo: string): Observable<string[]> {
        const typeLessfreebusy = this.freebusy as any;
        const items = selectedCalendarIds.map(id => ({ id }));

        return new Observable(subscriber => {

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

}
