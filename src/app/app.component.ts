import { Component, OnInit } from '@angular/core';
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
    this.test();
  }

  public test(): void {
    gapi.load('client', () => this.clientLoaded());
  }

  private clientLoaded(): void {
    alert('client loaded swity');
  }


}
