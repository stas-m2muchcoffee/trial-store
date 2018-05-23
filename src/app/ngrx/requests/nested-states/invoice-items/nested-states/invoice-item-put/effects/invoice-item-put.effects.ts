import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { InvoiceItemsService } from '../../../../../../../core/services/invoice-items.service';

import {
  InvoiceItemsPutActions,
  InvoiceItemsPutActionTypes,
  InvoiceItemsPutSuccessAction,
  InvoiceItemsPutFailAction,
} from '../actions';

@Injectable()
export class InvoiceItemPutRequestsEffects {

  @Effect()
  invoiceItemsPutRequest$: Observable<Action> = this.actions$
  .ofType<InvoiceItemsPutActions>(
    InvoiceItemsPutActionTypes.REQUEST
  )
  .switchMap((action) =>
    this.invoiceItemsService
    .updateInvoiceItem(action.payload)
    .map((item) => new InvoiceItemsPutSuccessAction([item]))
    .catch((error) => Observable.of(new InvoiceItemsPutFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private invoiceItemsService: InvoiceItemsService,
  ) {}
}
