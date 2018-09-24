import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { FreeBusyService } from '../services/free.busy.service';

@Component({
  selector: 'app-search-free-slots',
  templateUrl: './search-free-slots.component.html',
  styleUrls: ['./search-free-slots.component.css']
})
export class SearchFreeSlotsComponent implements OnInit {
  @Input() selectedCalendarIds: string[] = [];
  @Output() freeCalendarIdsEmitter = new EventEmitter<string[]>();

  public dateTimeString: string = new Date().toString();
  public duration = 60; // in minutes

  constructor(private freeBusyService: FreeBusyService) { }

  public ngOnInit(): void {
  }

  public searchForFreeCalendars(): void {
    const timeFrom = moment(new Date(this.dateTimeString));
    const timeTo = moment(new Date(this.dateTimeString)).add(this.duration, 'minutes');

    this.freeBusyService.getFreeBusy(this.selectedCalendarIds, timeFrom.toISOString(), timeTo.toISOString())
      .subscribe(result => this.freeCalendarIdsEmitter.emit(result));
  }

}
