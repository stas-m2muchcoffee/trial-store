import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/scan';

import { StateManagement, StateRequests } from '../../shared/utils/state-management';

import { Product } from '../interfaces/product';

@Injectable()
export class ProductService {
  products$: Observable<Product[]>;
  state: StateManagement<Product>;
  isData$: ConnectableObservable<boolean>;

  constructor(
    private http: HttpClient
  ) {
    this.state = new StateManagement<Product>();

    this.isData$ = this.state.responseDataRequests$
    .scan((isData: boolean, {type}) => {
      if (type === StateRequests.GetList) {
        return true;
      }
    }, false)
    .publishBehavior(false);
    this.isData$.connect();

    this.products$ = Observable.combineLatest(
      this.state.entities$,
      this.state.collectionIds$
    )
      .map(([entities, ids]: [{ [index: number]: Product }, number[]]) =>
        ids.filter((id) => entities[id]).map(id => entities[id])
      );
  }

  getProducts(): Observable<Product[]> {
    this.state.getList$.next(this.http.get<Product[]>('products'));
    return this.products$;
  }
}
