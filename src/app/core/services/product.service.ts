import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

import { StateManagement, StateRequests } from '../../shared/state-management';
import { Product } from '../interfaces/product';
import { Action } from '../interfaces/action';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8'
  })
};

@Injectable()
export class ProductService {
  products$: ConnectableObservable<Product[]>;
  isData$: ConnectableObservable<boolean>;
  stateManagement: StateManagement<Product> = new StateManagement<Product>();
  addedProduct$: ConnectableObservable<Product>;
  removeProduct$: ConnectableObservable<Product>;
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

    // this.addedProduct$ = Observable.combineLatest(
    //   this.stateManagement.entities$,
    //   this.stateManagement.addEntityId$
    // )
    //   .map(([entities, id]: [{ [index: number]: Product }, number]) => entities[id])
    //   .publishReplay(1);
    // this.addedProduct$.connect();
    //
    // this.removeProduct$ = this.stateManagement.responseData$
    //   .filter(responseData => responseData.type === StateRequests.Remove)
    //   .map(responseData => responseData.value[0])
    //   .publishReplay(1);
    // this.removeProduct$.connect();
  }
  getProducts(): Observable<Product[]> {
    this.stateManagement.getList$.next(this.http.get<Product[]>('products'));
    return this.products$;
  }
  // addProduct(): Observable<Product> {
  //   this.stateManagement.add$.next(this.http.post<Product>('products', this.newAddProduct, httpOptions));
  //   return this.addedProduct$;
  // }
  // deleteProducts(id: number | string): Observable<Product> {
  //   this.stateManagement.remove$.next(this.http.delete<Product>(`products/${id}`, httpOptions).map(() => ({id} as Product)));
  //   return this.removeProduct$;
  // }
}
