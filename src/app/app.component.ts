import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorisationService } from './services/authorisation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private auth: AuthorisationService) { }
  public ngOnInit(): void {
    this.auth.init();
  }

}
