import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/publishBehavior';

import { Product } from '../interfaces/product';
import { Action } from '../interfaces/action';
import { StateManagement, StateRequests } from '../state-management';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

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
  removeProduct$: ConnectableObservable<any>;
  private newAddProduct = { name: 'newAddProduct', price: 13 };

  constructor(
    private http: HttpClient
  ) {
    this.isData$ = this.stateManagement.responseData$.scan((isData: boolean, { type }: Action) => {
      if (+type === StateRequests.GetList || +type === StateRequests.Add || +type === StateRequests.Remove || +type === StateRequests.Get) {
        return true;
      }
    }, false)
      .publishBehavior(false);
    this.isData$.connect();

    this.products$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.collectionIds$
    )
      .map(([entities, ids]: [{}, number[]]) => {
        return ids.map(id => entities[id]);
      })
      .publishReplay(1);
    this.products$.connect();

    this.addedProduct$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.addEntityId$
    )
      .map(([entities, id]) => entities[id])
      .publishReplay(1);
    this.addedProduct$.connect();

    this.removeProduct$ = this.stateManagement.responseData$
      .filter(responseData => responseData.type === StateRequests.Remove)
      .map(responseData => responseData.value[0])
      .publishReplay(1);
    this.removeProduct$.connect();
  }

  getProduct(id: number | string): Observable<Product> {
    this.stateManagement.get$.next(this.http.get<Product>(`products/${id}`));
    return this.stateManagement.responseData$
      .filter(responseData => responseData.type === StateRequests.Get)
      .map((responseData) => responseData.value[0]);
  }
  getProducts(): Observable<Product[]> {
    this.stateManagement.getList$.next(this.http.get<Product[]>('products'));
    return this.products$;
  }
  addProduct() {
    this.stateManagement.add$.next(this.http.post<Product>('products', this.newAddProduct, httpOptions));
    return this.addedProduct$;
  }
  deleteProducts(id) {
    this.stateManagement.remove$.next(this.http.delete<Product>(`products/${id}`, httpOptions));
    return this.removeProduct$;
  }
}
