import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { CustomerService } from '../../../../../core/services/customer.service';

import * as customersRequestsActions from '../actions';

@Injectable()
export class CustomersRequestsEffects {

  @Effect()
  customersRequests$: Observable<Action> = this.actions$
  .ofType(customersRequestsActions.CustomersActionTypes.REQUEST)
  .switchMap(() =>
    this.customerService
    .getCustomers()
    .map((customers) => new customersRequestsActions.GetListSuccessCustomersAction(customers))
    .catch((error) => Observable.of(new customersRequestsActions.GetListFailCustomersAction(error)))
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
  ) {}
}
