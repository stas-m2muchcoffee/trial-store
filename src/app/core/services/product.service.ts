import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8'
  })
};

@Injectable()
export class ProductService {
  products$: ConnectableObservable<Product[]>;
  action$: Observable<Action>;

  receivedProductsSub$: Subject<Observable<Product[]>> = new Subject<Observable<Product[]>>();
  _receivedProducts$: ConnectableObservable<Product[]>;
  addedProductSub$: Subject<Observable<Product>> = new Subject<Observable<Product>>();
  _addedProduct$: ConnectableObservable<Product>;
  deletedProductSub$: Subject<Observable<Product>> = new Subject<Observable<Product>>();
  _deletedProduct$: ConnectableObservable<Product>;
  isData$: ConnectableObservable<boolean>;

  entities$: Observable<{}>;
  ids$: Observable<number[]>;

  private newAddProduct = { name: 'newAddProduct', price: 13 };

  constructor(
    private http: HttpClient
  ) {
    this._receivedProducts$ = this.receivedProductsSub$
      .mergeAll().publishReplay(1);
    this._receivedProducts$.connect();

    this._addedProduct$ = this.addedProductSub$
      .mergeAll().publishReplay(1);
    this._addedProduct$.connect();

    this._deletedProduct$ = this.deletedProductSub$
      .mergeAll().publishReplay(1);
    this._deletedProduct$.connect();

    this.action$ = Observable.merge(
      this._receivedProducts$.map((products) => {
        return { type: 'get', payload: products };
      }),
      this._addedProduct$.map((product) => {
        return { type: 'add', payload: [product] };
      }),
      this._deletedProduct$.map((product) => {
        return { type: 'del', payload: [product] };
      })
    );

    this.isData$ = this.action$.scan((isData: boolean, action: Action) => {
      if (action.type === 'get' || action.type === 'add' || action.type === 'del') {
        return true;
      }
    }, false)
      .publishBehavior(false);
    this.isData$.connect();

    this.entities$ = this.action$.scan((products: {}, { type, payload }: Action) => {
      switch (type) {
        case 'get': {
          return payload.reduce((accumProducts: {}, currentProduct: Product) => {
            return {
              ...accumProducts,
              [currentProduct.id]: currentProduct,
            };
          }, {});
        }
        case 'add': {
          return payload.reduce((accumProducts: {}, currentProduct: Product) => {
            return {
              ...accumProducts,
              [currentProduct.id]: currentProduct,
            };
          }, products);
        }
        case 'del': {
          return payload.reduce((accumProducts: {}, { id }: Product) => {
            delete accumProducts[id];
            return accumProducts;
          }, products);
        }
      }
    }, {});

    this.ids$ = this.action$.scan((ids: number[], { type, payload }: Action) => {
      switch (type) {
        case 'get': {
          return payload.map(product => product.id);
        }
        case 'add': {
          return payload.reduce((accumIds: number[], { id }: Product) => [...accumIds, id], ids);
        }
        case 'del': {
          return payload.reduce((accumIds: number[], currentProduct: Product) =>
            accumIds.filter(id => currentProduct.id !== id)
          , ids);
        }
      }
    }, []);

    this.products$ = Observable.combineLatest(
      this.entities$,
      this.ids$
    )
      .map(([entities, ids]: [{}, number[]]) => {
        return ids.map(id => entities[id]);
      })
      .publishReplay(1);
    this.products$.connect();
  }

  getProduct(id: number | string): Observable<Product> {
    return this.http.get<Product>(`products/${id}`).publishReplay(1);
  }

  getProducts(): Observable<Product[]> {
    this.receivedProductsSub$.next(this.http.get<Product[]>('products'));
    return this.products$;
  }

  addProduct() {
    this.addedProductSub$.next(this.http.post<Product>('products', this.newAddProduct, httpOptions));
  }

  deleteProducts(id) {
    this.deletedProductSub$.next(this.http.delete<Product>(`products/${id}`, httpOptions));
  }
}
