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
  InvoiceItemDeleteActions,
  InvoiceItemDeleteActionTypes,
  InvoiceItemDeleteSuccessAction,
  InvoiceItemDeleteFailAction,
} from '../actions';

@Injectable()
export class InvoiceItemDeleteRequestsEffects {

  @Effect()
  invoiceItemDeleteRequest$: Observable<Action> = this.actions$
  .ofType<InvoiceItemDeleteActions>(
    InvoiceItemDeleteActionTypes.REQUEST
  )
  .switchMap((action) =>
    this.invoiceItemsService
    .deleteInvoiceItemRequest(action.payload)
    .map((item) => new InvoiceItemDeleteSuccessAction(item))
    .catch((error) => Observable.of(new InvoiceItemDeleteFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private invoiceItemsService: InvoiceItemsService,
  ) {}
}
