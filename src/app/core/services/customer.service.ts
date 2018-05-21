import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishBehavior';

import { StateManagement, StateRequests } from '../../shared/utils/state-management';

import { Customer } from '../interfaces/customer';
import {Store} from '@ngrx/store';
import * as productsGetterState from '../../ngrx/products/states/products-getter.state';
import * as customersActions from '../../ngrx/customers/actions';
import * as customersGetterState from '../../ngrx/customers/states/customers-getter.state';
import * as customersRequestsGetterState from '../../ngrx/requests/nested-states/customers/states/customers-requests-getter.state';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import {Product} from '../interfaces/product';
import * as productsActions from '../../ngrx/products/actions';
import {AppState} from '../../ngrx/app-state/app-state';

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
    this.store.dispatch(new customersActions.GetListCustomerAction);
    return this.customers$;
  }
}
