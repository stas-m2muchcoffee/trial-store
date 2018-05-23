import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';

import { Store } from '@ngrx/store';

import { StateManagement } from '../../shared/utils/state-management';

import { AppState } from '../../ngrx';
import * as customers from '../../ngrx/customers/actions';
import * as customersGetterState from '../../ngrx/customers/states/customers-getter.state';
import * as customersRequestsGetterState from '../../ngrx/requests/nested-states/customers/states/customers-get-getter.state';

import { Customer } from '../interfaces/customer';

@Injectable()
export class CustomerService {
  state: StateManagement<Customer>;
  customers$: Observable<Customer[]>;
  isData$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {
    this.isData$ = this.store.select(customersRequestsGetterState.getIsLoadedCustomersRequests);

    this.customers$ = this.store.select(customersGetterState.getCustomers)
    .withLatestFrom(this.isData$)
    .filter(([products , isData]) => isData)
    .map(([products, isData]) => products);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('customers');
  }

  dispatchGetListCustomerAction(): Observable<Customer[]> {
    this.store.dispatch(new customers.GetCustomersAction);
    return this.customers$;
  }
}
