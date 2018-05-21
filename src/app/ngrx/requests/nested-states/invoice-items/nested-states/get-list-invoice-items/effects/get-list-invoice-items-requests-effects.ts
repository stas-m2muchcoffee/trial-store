import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { InvoiceItemsService } from '../../../../../../../core/services/invoice-items.service';

import * as getListInvoiceItemsRequestsActions from '../actions';

@Injectable()
export class InvoiceItemsRequestsEffects {

  @Effect()
  customersRequests$: Observable<Action> = this.actions$
  .ofType(getListInvoiceItemsRequestsActions.GetListInvoiceItemsActionTypes.REQUEST)
  .switchMap((action) =>
    this.invoiceItemsService
    .getInvoiceItems(225)
    .map((items) => new getListInvoiceItemsRequestsActions.GetListInvoiceItemsSuccessAction(items))
    .catch((error) => Observable.of(new getListInvoiceItemsRequestsActions.GetListInvoiceItemsFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private invoiceItemsService: InvoiceItemsService,
  ) {}
}
