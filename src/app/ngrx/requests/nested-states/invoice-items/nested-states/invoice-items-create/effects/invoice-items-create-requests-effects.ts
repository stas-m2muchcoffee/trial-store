import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { InvoiceItemsService } from '../../../../../../../core/services/invoice-items.service';

import * as invoiceItemsCreateRequestsActions from '../actions';

@Injectable()
export class InvoiceItemsCreateRequestsEffects {

  @Effect()
  createInvoiceItemsRequests$: Observable<Action> = this.actions$
  .ofType<invoiceItemsCreateRequestsActions.InvoiceItemsCreateRequestsAction>(invoiceItemsCreateRequestsActions
  .InvoiceItemsCreateRequestsActionTypes.REQUEST)
  .switchMap((action) =>
    this.invoiceItemsService
    .createInvoiceItem(action.payload)
    .map((item) => new invoiceItemsCreateRequestsActions.InvoiceItemsCreateRequestsSuccessAction([item]))
    .catch((error) => Observable.of(new invoiceItemsCreateRequestsActions.InvoiceItemsCreateRequestsFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private invoiceItemsService: InvoiceItemsService,
  ) {}
}
