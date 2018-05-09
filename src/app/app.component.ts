import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-spinner></app-spinner>' +
  '<app-toolbar></app-toolbar>' +
  '<router-outlet></router-outlet>',
})
export class AppComponent {}
