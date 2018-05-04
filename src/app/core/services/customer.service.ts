import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/publishReplay';

import { StateManagement } from '../../shared/state-management';
import { Customer } from '../interfaces/customer';

@Injectable()
export class CustomerService {

  stateManagement: StateManagement<Customer> = new StateManagement<Customer>();
  customers$: ConnectableObservable<Customer[]>;

  constructor(
    private http: HttpClient
  ) {
    this.customers$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.collectionIds$
    )
      .map(([entities, ids]: [{ [index: number]: Customer }, number[]]) => ids.map((id) => entities[id]))
      .publishReplay(1);
    this.customers$.connect();
  }

  getCustomers(): Observable<Customer[]> {
    this.stateManagement.getList$.next(this.http.get<Customer[]>('customers'));
    return this.customers$;
  }
}
