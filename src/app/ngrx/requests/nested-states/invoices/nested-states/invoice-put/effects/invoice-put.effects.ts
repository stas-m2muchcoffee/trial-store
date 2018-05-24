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
  InvoicePutActions,
  InvoicePutActionTypes,
  InvoicePutSuccessAction,
  InvoicePutFailAction,
} from '../actions';

@Injectable()
export class InvoicePutRequestsEffects {

  @Effect()
  invoicePutRequest$: Observable<Action> = this.actions$
  .ofType<InvoicePutActions>(
    InvoicePutActionTypes.REQUEST
  )
  .switchMap((action) =>
    this.invoiceService
    .updateInvoiceRequest(action.payload)
    .map((invoice) => new InvoicePutSuccessAction(invoice))
    .catch((error) => Observable.of(new InvoicePutFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService,
  ) {}
}
