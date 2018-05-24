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
  InvoiceGetActions,
  InvoiceGetActionTypes,
  InvoiceGetSuccessAction,
  InvoiceGetFailAction,
} from '../actions';

@Injectable()
export class InvoiceGetRequestsEffects {

  @Effect()
  getInvoicesRequests$: Observable<Action> = this.actions$
  .ofType<InvoiceGetActions>(
    InvoiceGetActionTypes.REQUEST
  )
  .switchMap((action) =>
    this.invoiceService
    .getInvoiceRequest(action.payload)
    .map((invoices) => new InvoiceGetSuccessAction(invoices))
    .catch((error) => Observable.of(new InvoiceGetFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService,
  ) {}
}
