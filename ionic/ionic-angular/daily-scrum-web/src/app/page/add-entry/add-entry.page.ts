import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.page.html',
  styleUrls: ['./add-entry.page.scss'],
})
export class AddEntryPage implements OnInit {
  dailyScrumUpdate = {
    date: '',
    didDo: '',
    toDo: '',
    blockers: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService) {
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.dailyScrumUpdate = this.router.getCurrentNavigation().extras.state.dailyScrumUpdate;
      }
    });
  }

  submitUpdate() {
    this.storageService.setToStorage(this.dailyScrumUpdate.date, this.dailyScrumUpdate);
    alert('Your update is submitted!');

    this.router.navigate(['/home']);
  }
}
