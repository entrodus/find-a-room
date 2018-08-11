import { Injectable } from '@angular/core';
import { CLIENT_ID, API_KEY } from 'src/app.config';
import { Observable, from as observableFrom, of as observableOf } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {

  constructor() { }

  public init(): void {
    this.loadClient().subscribe(() => {
      // alert('loaded');
      this.initClient().subscribe(() => {
        // alert('initialised');
        this.signIn().subscribe(signedIn => {
          // alert(`signed in ${signedIn}`);

          console.log('gapi client', gapi.client);
          // console.log('calendar list', gapi.client.calendar.calendarList);
          const request = gapi.client.calendar.calendarList.list({});
          console.log('request', request);
          request.execute((response) => {
            console.log('response', response);
          });
        });
      });

    });
  }

  private loadClient(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      gapi.load('client:auth2', () => {
        subscriber.next(true);
        subscriber.complete();
      });
    });
  }

  private initClient(): Observable<void> {
    // Initialize the client with API key and People API, and initialize OAuth with an
    // OAuth 2.0 client ID and scopes (space delimited string) to request access.

    const initPromise = gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      clientId: CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/calendar.readonly'
    });

    return observableFrom(initPromise);
  }

  private signIn(): Observable<boolean> {
    const auth = gapi.auth2.getAuthInstance();
    const signIn$ = observableFrom(auth.signIn());
    return signIn$.pipe(mapTo(true))
  }

}
