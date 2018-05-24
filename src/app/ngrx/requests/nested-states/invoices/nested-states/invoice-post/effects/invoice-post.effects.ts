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
  InvoicePostActions,
  InvoicePostActionTypes,
  InvoicePostSuccessAction,
  InvoicePostFailAction,
} from '../actions';

@Injectable()
export class InvoicePostRequestsEffects {

  @Effect()
  invoicePostRequest$: Observable<Action> = this.actions$
  .ofType<InvoicePostActions>(
    InvoicePostActionTypes.REQUEST
  )
  .switchMap((action) =>
    this.invoiceService
    .createInvoiceRequest(action.payload)
    .map((invoice) => new InvoicePostSuccessAction(invoice))
    .catch((error) => Observable.of(new InvoicePostFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService,
  ) {}
}
