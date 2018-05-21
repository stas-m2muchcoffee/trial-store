import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as customersRequestsActions from '../../requests/nested-states/customers/actions';

import * as customersActions from '../actions';

@Injectable()
export class CustomersEffects {

  @Effect()
  productsRequest$: Observable<Action> = this.actions$
  .ofType(customersActions.ActionTypes.GET_LIST)
  .map(() =>
    new customersRequestsActions.GetListCustomersAction
  );

  @Effect()
  products$: Observable<Action> = this.actions$
  .ofType<customersActions.Actions>(customersRequestsActions.CustomersActionTypes.REQUEST_SUCCESS)
  .map((action) => new customersActions.GetListCustomerSuccessfulAction(action.payload));

  constructor(
    private actions$: Actions,
  ) {}
}
