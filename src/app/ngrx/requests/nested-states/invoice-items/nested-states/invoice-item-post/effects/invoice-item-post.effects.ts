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
  InvoiceItemsPostActions,
  InvoiceItemsPostActionTypes,
  InvoiceItemsPostSuccessAction,
  InvoiceItemsPostFailAction,
} from '../actions';

@Injectable()
export class InvoiceItemPostRequestsEffects {

  @Effect()
  invoiceItemsPostRequest$: Observable<Action> = this.actions$
  .ofType<InvoiceItemsPostActions>(
    InvoiceItemsPostActionTypes.REQUEST
  )
  .switchMap((action) =>
    this.invoiceItemsService
    .createInvoiceItem(action.payload)
    .map((item) => new InvoiceItemsPostSuccessAction([item]))
    .catch((error) => Observable.of(new InvoiceItemsPostFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private invoiceItemsService: InvoiceItemsService,
  ) {}
}