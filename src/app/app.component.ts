import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import * from '@types/gapi.client';

// declare var gapi: gapi;
// declare var gapi : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public ngOnInit(): void {
    this.loadClient().subscribe ( () => {
      alert('loaded');
    })
  }

  public loadClient(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      gapi.load('client', () => {
        subscriber.next(true);
        subscriber.complete();
      });
    });
  }

  public authorise(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      // TODO introduce auth2.0
      subscriber.next();
      subscriber.complete();
    });
  }

  private clientLoaded(): void {
    alert('client loaded swity');
  }


}
