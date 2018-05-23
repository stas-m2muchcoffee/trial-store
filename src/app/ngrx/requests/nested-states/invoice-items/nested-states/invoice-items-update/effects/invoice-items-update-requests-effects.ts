import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { InvoiceItemsService } from '../../../../../../../core/services/invoice-items.service';

import * as invoiceItemsUpdateRequestsActions from '../actions';

@Injectable()
export class InvoiceItemsUpdateRequestsEffects {

  @Effect()
  updateInvoiceItemsRequests$: Observable<Action> = this.actions$
  .ofType<invoiceItemsUpdateRequestsActions.InvoiceItemsUpdateRequestsAction>(invoiceItemsUpdateRequestsActions
  .InvoiceItemsUpdateRequestsActionTypes.REQUEST)
  .switchMap((action) =>
    this.invoiceItemsService
    .updateInvoiceItem(action.payload)
    .map((item) => new invoiceItemsUpdateRequestsActions.InvoiceItemsUpdateRequestsSuccessAction([item]))
    .catch((error) => Observable.of(new invoiceItemsUpdateRequestsActions.InvoiceItemsUpdateRequestsFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private invoiceItemsService: InvoiceItemsService,
  ) {}
}
