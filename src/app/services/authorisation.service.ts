import { Injectable } from '@angular/core';
import { CLIENT_ID, API_KEY } from 'src/app.config';
import { Observable, from as observableFrom, of as observableOf } from 'rxjs';
import { mapTo, concatMap } from 'rxjs/operators';

const SCOPE = 'https://www.googleapis.com/auth/calendar.readonly';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {

  constructor() { }

  public init(): Observable<gapi.auth2.GoogleUser> {
    return observableOf(null).pipe(
      concatMap(() => this.loadClient()),
      concatMap(() => this.initClient()),
      concatMap(() => this.signIn()),
      concatMap(() => observableOf(this.retrieveGoogleUser()))
    );
  }

  private retrieveGoogleUser(): gapi.auth2.GoogleUser {
    const authInstance = gapi.auth2.getAuthInstance();
    if (!authInstance) {
      throw new Error('Auth2 not properly initialised');
    }
    const currentUser = authInstance.currentUser;
    if (!currentUser) {
      throw new Error('Auth2 user not set');
    }

    return currentUser.get();
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
      scope: SCOPE
    });

    return observableFrom(initPromise);
  }

  private signIn(): Observable<boolean> {
    const auth = gapi.auth2.getAuthInstance();

    if (auth.isSignedIn && auth.currentUser.get().hasGrantedScopes(SCOPE)) {
      return observableOf(true);
    }

    const signIn$ = observableFrom(auth.signIn());
    return signIn$.pipe(mapTo(true));
  }

}
