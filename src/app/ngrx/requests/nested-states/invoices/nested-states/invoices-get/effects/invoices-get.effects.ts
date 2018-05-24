import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { InvoiceService } from '../../../../../../../core/services/invoice.service';

import {
  InvoicesGetActions,
  InvoicesGetActionTypes,
  InvoicesGetSuccessAction,
  InvoicesGetFailAction,
} from '../actions';

@Injectable()
export class InvoicesGetRequestsEffects {

  @Effect()
  getInvoicesRequests$: Observable<Action> = this.actions$
  .ofType<InvoicesGetActions>(
    InvoicesGetActionTypes.REQUEST
  )
  .switchMap(() =>
    this.invoiceService
    .getInvoicesRequest()
    .map((invoices) => new InvoicesGetSuccessAction(invoices))
    .catch((error) => Observable.of(new InvoicesGetFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService,
  ) {}
}
