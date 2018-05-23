import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { CustomerService } from '../../../../../core/services/customer.service';

import {
  CustomersActionTypes,
  GetCustomersSuccessAction,
  GetCustomersFailAction
} from '../actions';

@Injectable()
export class CustomersRequestsEffects {

  @Effect()
  customersGetRequests$: Observable<Action> = this.actions$
  .ofType(CustomersActionTypes.REQUEST)
  .switchMap(() =>
    this.customerService
    .getCustomers()
    .map((customers) => new GetCustomersSuccessAction(customers))
    .catch((error) => Observable.of(new GetCustomersFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
  ) {}
}
