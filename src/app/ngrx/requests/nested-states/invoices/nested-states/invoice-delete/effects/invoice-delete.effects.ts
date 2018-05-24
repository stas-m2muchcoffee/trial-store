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
  InvoiceDeleteActions,
  InvoiceDeleteActionTypes,
  InvoiceDeleteSuccessAction,
  InvoiceDeleteFailAction,
} from '../actions';

@Injectable()
export class InvoiceDeleteRequestsEffects {

  @Effect()
  invoiceDeleteRequest$: Observable<Action> = this.actions$
  .ofType<InvoiceDeleteActions>(
    InvoiceDeleteActionTypes.REQUEST
  )
  .switchMap((action) =>
    this.invoiceService
    .deleteInvoiceRequest(action.payload)
    .map((item) => new InvoiceDeleteSuccessAction(item))
    .catch((error) => Observable.of(new InvoiceDeleteFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService,
  ) {}
}
