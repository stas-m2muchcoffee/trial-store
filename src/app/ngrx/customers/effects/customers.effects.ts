import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as customersRequests from '../../requests/nested-states/customers/actions';
import * as customers from '../actions';

@Injectable()
export class CustomersEffects {

  @Effect()
  customersGetRequest$: Observable<Action> = this.actions$
  .ofType(customers.ActionTypes.GET_LIST)
  .map(() =>
    new customersRequests.GetCustomersAction
  );

  @Effect()
  customers$: Observable<Action> = this.actions$
  .ofType<customersRequests.CustomersActions>(
    customersRequests.CustomersActionTypes.REQUEST_SUCCESS
  )
  .map((action) =>
    new customers.GetCustomersSuccessAction(action.payload)
  );

  constructor(
    private actions$: Actions,
  ) {}
}
