import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as invoicesRequests from '../../requests/nested-states/invoices/actions';
import * as invoices from '../actions';
import {Router} from '@angular/router';
import {ModalService} from '../../../core/services/modal.service';

@Injectable()
export class InvoicesEffects {

  @Effect()
  invoicesGetRequest$: Observable<Action> = this.actions$
  .ofType<invoices.Actions>(
    invoices.ActionTypes.GET_LIST
  )
  .map((action) =>
    new invoicesRequests.InvoicesGetAction(action.payload)
  );

  @Effect()
  invoices$: Observable<Action> = this.actions$
  .ofType<invoicesRequests.InvoicesGetActions>(
    invoicesRequests.InvoicesGetActionTypes.REQUEST_SUCCESS
  )
  .map((action) =>
    new invoices.GetInvoicesSuccessAction(action.payload)
  );

  @Effect()
  invoicePostRequest$: Observable<Action> = this.actions$
  .ofType<invoices.Actions>(
    invoices.ActionTypes.CREATE
  )
  .map((action) =>
    new invoicesRequests.InvoicePostAction(action.payload)
  );

  @Effect()
  addedInvoice$: Observable<Action> = this.actions$
  .ofType<invoicesRequests.InvoicePostActions>(
    invoicesRequests.InvoicePostActionTypes.REQUEST_SUCCESS
  )
  .map((action) => {
      this.router.navigate(['./invoices']);
      return new invoices.CreateInvoiceSuccessAction([action.payload]);
    }
  );

  @Effect({dispatch: false})
  failAddInvoice$: Observable<Action> = this.actions$
  .ofType<invoicesRequests.InvoicePostActions>(
    invoicesRequests.InvoicePostActionTypes.REQUEST_FAIL
  )
  .do(() => {
      this.modalService.confirmModal('Error! Invoice was not added', false);
    }
  );

  @Effect()
  invoicePutRequest$: Observable<Action> = this.actions$
  .ofType<invoices.Actions>(
    invoices.ActionTypes.UPDATE
  )
  .map((action) =>
    new invoicesRequests.InvoicePutAction(action.payload)
  );

  @Effect()
  updatedInvoice$: Observable<Action> = this.actions$
  .ofType<invoicesRequests.InvoicePutActions>(
    invoicesRequests.InvoicePutActionTypes.REQUEST_SUCCESS
  )
  .map((action) =>
    new invoices.UpdateInvoiceSuccessAction([action.payload])
  );

  @Effect()
  invoiceDeleteRequest$: Observable<Action> = this.actions$
  .ofType<invoices.Actions>(
    invoices.ActionTypes.DELETE
  )
  .map((action) =>
    new invoicesRequests.InvoiceDeleteAction(action.payload)
  );

  @Effect()
  deletedInvoice$: Observable<Action> = this.actions$
  .ofType<invoicesRequests.InvoiceDeleteActions>(
    invoicesRequests.InvoiceDeleteActionTypes.REQUEST_SUCCESS
  )
  .map((action) =>
    new invoices.DeleteInvoiceSuccessAction([action.payload])
  );

  @Effect()
  invoiceGetRequest$: Observable<Action> = this.actions$
  .ofType<invoices.Actions>(
    invoices.ActionTypes.GET
  )
  .map((action) =>
    new invoicesRequests.InvoiceGetAction(action.payload)
  );

  @Effect()
  invoice$: Observable<Action> = this.actions$
  .ofType<invoicesRequests.InvoiceGetActions>(
    invoicesRequests.InvoiceGetActionTypes.REQUEST_SUCCESS
  )
  .map((action) =>
    new invoices.GetInvoiceSuccessAction(action.payload)
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private modalService: ModalService,
  ) {}
}
