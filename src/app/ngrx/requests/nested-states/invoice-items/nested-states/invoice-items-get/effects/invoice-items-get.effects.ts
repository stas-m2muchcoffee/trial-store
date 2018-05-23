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
  InvoiceItemsGetActions,
  InvoiceItemsGetActionTypes,
  InvoiceItemsGetSuccessAction,
  InvoiceItemsGetFailAction,
} from '../actions';

@Injectable()
export class InvoiceItemsGetRequestsEffects {

  @Effect()
  getListInvoiceItemsRequests$: Observable<Action> = this.actions$
  .ofType<InvoiceItemsGetActions>(
    InvoiceItemsGetActionTypes.REQUEST
  )
  .switchMap((action) =>
    this.invoiceItemsService
    .getInvoiceItems(action.payload)
    .map((items) => new InvoiceItemsGetSuccessAction(items))
    .catch((error) => Observable.of(new InvoiceItemsGetFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private invoiceItemsService: InvoiceItemsService,
  ) {}
}
