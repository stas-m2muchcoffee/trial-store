import { Injectable } from '@angular/core';

import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class SpinnerService {
  showSpinner$: ConnectableObservable<boolean>;
  showSpinnerSub$: Subject<boolean>;

  constructor() {
    this.showSpinnerSub$ = new Subject<boolean>();

    this.showSpinner$ = this.showSpinnerSub$
        .map(res => res)
        .publish();
    this.showSpinner$.connect();
  }

  start() {
      this.showSpinnerSub$.next(true);
  }

  stop() {
      this.showSpinnerSub$.next(false);
  }
}
