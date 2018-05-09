import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: '<div class="bg_spinner" *ngIf="showSpinner$ | async"><img class="spinner" src="/assets/images/spinner.gif"></div>',
  styles: [
      'div.bg_spinner {' +
      'position: fixed; z-index: 1000; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;' +
      '}',
      'img.spinner {width: 100px; height: 100px;}',
  ],
})
export class SpinnerComponent {
    showSpinner$: Observable<boolean>;

    constructor(
        private spinnerService: SpinnerService,
    ) {
        this.showSpinner$ = this.spinnerService.showSpinner$;
    }
}
