import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as invoiceItemsRequests from '../../requests/nested-states/invoice-items/actions';
import * as invoiceItems from '../actions';

@Injectable()
export class InvoiceItemsEffects {

  @Effect()
  invoiceItemsGetRequest$: Observable<Action> = this.actions$
  .ofType<invoiceItems.Actions>(
    invoiceItems.ActionTypes.GET_LIST
  )
  .map((action) =>
    new invoiceItemsRequests.InvoiceItemsGetAction(action.payload)
  );

  @Effect()
  invoiceItems$: Observable<Action> = this.actions$
  .ofType<invoiceItemsRequests.InvoiceItemsGetActions>(
    invoiceItemsRequests.InvoiceItemsGetActionTypes.REQUEST_SUCCESS
  )
  .map((action) =>
    new invoiceItems.GetInvoiceItemsSuccessAction(action.payload)
  );

  @Effect()
  invoiceItemPostRequest$: Observable<Action> = this.actions$
  .ofType<invoiceItems.Actions>(
    invoiceItems.ActionTypes.CREATE
  )
  .map((action) =>
    new invoiceItemsRequests.InvoiceItemsPostAction(action.payload)
  );

  @Effect()
  addedInvoiceItem$: Observable<Action> = this.actions$
  .ofType<invoiceItemsRequests.InvoiceItemsPostActions>(
    invoiceItemsRequests.InvoiceItemsPostActionTypes.REQUEST_SUCCESS
  )
  .map((action) =>
    new invoiceItems.CreateInvoiceItemSuccessAction([action.payload])
  );

  @Effect()
  invoiceItemPutRequest$: Observable<Action> = this.actions$
  .ofType<invoiceItems.Actions>(
    invoiceItems.ActionTypes.UPDATE
  )
  .map((action) =>
    new invoiceItemsRequests.InvoiceItemsPutAction(action.payload)
  );

  @Effect()
  updatedInvoiceItem$: Observable<Action> = this.actions$
  .ofType<invoiceItemsRequests.InvoiceItemsPutActions>(
    invoiceItemsRequests.InvoiceItemsPutActionTypes.REQUEST_SUCCESS
  )
  .map((action) =>
    new invoiceItems.UpdateInvoiceItemSuccessAction([action.payload])
  );

  constructor(
    private actions$: Actions,
  ) {}
}
