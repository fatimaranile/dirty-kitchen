import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CalendarComponentOptions } from 'ion2-calendar';
import * as moment from 'moment';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  today = new Date();
  firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  selectedDay: string;
  date: string;
  type: 'string';
  isTodaySelected = false;
  optionsMulti: CalendarComponentOptions = {
    from: this.firstDay,
    to: new Date()
  };
  dailyScrumUpdate = {
    date: '',
    didDo: '',
    toDo: '',
    blockers: ''
  };

  constructor(private router: Router, private storageService: StorageService) {
  }

  onChangeDate($event) {
    const now = moment(moment().format('YYYY-MM-DD'));
    const selected = moment($event.format('YYYY-MM-DD'));
    const dateString = moment($event).format('L');

    if (now.isSame(selected)) {
      this.selectedDay = dateString;
    }

    this.isTodaySelected = now.isSame(selected);
    this.getUpdatesFromStorage(dateString);
  }

  getUpdatesFromStorage(selectedDate: string) {
    this.storageService.getFromStorage(selectedDate).then(response => {
      if (response) {
        this.dailyScrumUpdate = response;
      }
      else {
        this.dailyScrumUpdate = {
          date: selectedDate,
          didDo: '',
          toDo: '',
          blockers: ''
        };
      }
    });
  }

  goToAddEntry() {
    const navigationExtras: NavigationExtras = {
      state: {
        dailyScrumUpdate: this.dailyScrumUpdate
      }
    };

    this.router.navigate(['/add-entry'], navigationExtras);
  }
}
