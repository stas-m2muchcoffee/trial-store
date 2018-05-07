import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';

import { StateManagement } from '../../shared/state-management';

import { Customer } from '../interfaces/customer';

@Injectable()
export class CustomerService {
  state: StateManagement<Customer>;
  customers$: Observable<Customer[]>;

  constructor(
    private http: HttpClient
  ) {
    this.state = new StateManagement<Customer>();

    this.customers$ = Observable.combineLatest(
      this.state.entities$,
      this.state.collectionIds$
    )
    .map(([entities, ids]: [{ [index: number]: Customer }, number[]]) =>
      ids.filter((id) => entities[id]).map((id) => entities[id])
    );
  }

  getCustomers(): Observable<Customer[]> {
    this.state.getList$.next(this.http.get<Customer[]>('customers'));
    return this.customers$;
  }
}
