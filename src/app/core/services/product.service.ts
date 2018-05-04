import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/scan';

import { StateManagement, StateRequests } from '../../shared/state-management';

import { Product } from '../interfaces/product';
import { Action } from '../interfaces/action';

@Injectable()
export class ProductService {
  products$: ConnectableObservable<Product[]>;
  isData$: ConnectableObservable<boolean>;
  stateManagement: StateManagement<Product> = new StateManagement<Product>();
  private newAddProduct = { name: 'newAddProduct', price: 13 };

  constructor(
    private http: HttpClient
  ) {
    this.isData$ = this.stateManagement.responseData$
      .scan((isData: boolean, {type}: Action) => {
      if (type === StateRequests.GetList) {
        return true;
      }
    }, false)
      .publishBehavior(false);
    this.isData$.connect();

    this.products$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.collectionIds$
    )
      .map(([entities, ids]: [{ [index: number]: Product }, number[]]) => ids.map(id => entities[id]))
      .publishReplay(1);
    this.products$.connect();
  }

  getProducts(): Observable<Product[]> {
    this.stateManagement.getList$.next(this.http.get<Product[]>('products'));
    return this.products$;
  }
}
