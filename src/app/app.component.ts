import { Component } from '@angular/core';
import { SpinnerService } from './core/services/spinner.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  template: '<div class="bg_spinner" *ngIf="showSpinner$ | async"><img class="spinner" src="/assets/images/spinner.gif"></div>' +
  '<app-toolbar></app-toolbar>' +
  '<router-outlet></router-outlet>',
  styles: [
    'div.bg_spinner {' +
      'position: fixed; z-index: 1000; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;' +
    '}',
    'img.spinner {width: 100px; height: 100px;}'
  ],
})
export class AppComponent {
  showSpinner$: Observable<boolean>;

  constructor(
      private spinnerService: SpinnerService,
  ) {
    this.showSpinner$ = this.spinnerService.showSpinner$;
  }
}
