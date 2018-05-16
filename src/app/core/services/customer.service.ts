import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {ConnectableObservable} from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishBehavior';

import {StateManagement, StateRequests} from '../../shared/utils/state-management';

import {Customer} from '../interfaces/customer';

@Injectable()
export class CustomerService {
  state: StateManagement<Customer>;
  customers$: Observable<Customer[]>;
  isData$: ConnectableObservable<boolean>;

  constructor(private http: HttpClient) {
    this.state = new StateManagement<Customer>();

    this.isData$ = this.state.responseDataRequests$
    .scan((isData: boolean, {type}) => {
      if (type === StateRequests.GetList) {
        return true;
      }
    }, false)
    .publishBehavior(false);
    this.isData$.connect();

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
