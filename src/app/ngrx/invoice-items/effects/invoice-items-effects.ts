import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as invoiceItemsRequestsActions from '../../requests/nested-states/invoice-items/actions';

import * as invoiceItemsActions from '../actions';

@Injectable()
export class InvoiceItemsEffects {

  @Effect()
  getListInvoiceItemsRequest$: Observable<Action> = this.actions$
  .ofType<invoiceItemsRequestsActions.InvoiceItemsGetListActions>(invoiceItemsActions.ActionTypes.GET_LIST)
  .map((action) =>
    new invoiceItemsRequestsActions.InvoiceItemsGetListRequestsAction(action.payload)
  );

  @Effect()
  invoiceItems$: Observable<Action> = this.actions$
  .ofType<invoiceItemsActions.GetListInvoiceItemsAction>(invoiceItemsRequestsActions.InvoiceItemsGetListRequestsActionTypes.REQUEST_SUCCESS)
  .map((action) =>
    new invoiceItemsActions.GetListInvoiceItemsSuccessfulAction(action.payload)
  );

  @Effect()
  createInvoiceItemRequest$: Observable<Action> = this.actions$
  .ofType<invoiceItemsActions.Actions>(invoiceItemsActions.ActionTypes.CREATE_INVOICE_ITEM)
  .map((action) =>
    new invoiceItemsRequestsActions.InvoiceItemsCreateRequestsAction(action.payload)
  );

  @Effect()
  addedInvoiceItem$: Observable<Action> = this.actions$
  .ofType<invoiceItemsActions.Actions>(invoiceItemsRequestsActions.InvoiceItemsCreateRequestsActionTypes.REQUEST_SUCCESS)
  .map((action) =>
    new invoiceItemsActions.CreateInvoiceItemSuccessfulAction(action.payload)
  );

  @Effect()
  updateInvoiceItemRequest$: Observable<Action> = this.actions$
  .ofType<invoiceItemsActions.Actions>(invoiceItemsActions.ActionTypes.UPDATE_INVOICE_ITEM)
  .map((action) =>
    new invoiceItemsRequestsActions.InvoiceItemsUpdateRequestsAction(action.payload)
  );

  @Effect()
  updatedInvoiceItem$: Observable<Action> = this.actions$
  .ofType<invoiceItemsActions.Actions>(invoiceItemsRequestsActions.InvoiceItemsUpdateRequestsActionTypes.REQUEST_SUCCESS)
  .map((action) =>
    new invoiceItemsActions.UpdateInvoiceItemSuccessfulAction(action.payload)
  );

  constructor(
    private actions$: Actions,
  ) {}
}
