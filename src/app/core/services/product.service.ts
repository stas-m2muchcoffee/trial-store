import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';

import { Product } from '../interfaces/product';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/merge';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8'
  })
};

@Injectable()
export class ProductService {
  products$: Observable<Product[]>;
  action$: Observable<any>;

  receivedProductsSub$: Subject<any> = new Subject<any>();
  _receivedProducts$: ConnectableObservable<Product[]>;
  addedProductSub$: Subject<any> = new Subject<any>();
  _addedProduct$: ConnectableObservable<Product>;
  deletedProductSub$: Subject<any> = new Subject<any>();
  _deletedProduct$: ConnectableObservable<Product>;

  entities$: Observable<{}>;
  ids$: Observable<any>;

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
        return { type: 'add', payload: product };
      }),
      this._deletedProduct$.map((product) => {
        return { type: 'del', payload: product };
      })
    );

    this.entities$ = this.action$.scan((products, action) => {
      switch (action.type) {
        case 'get': {
          return action.payload.reduce((accumProducts, currentProduct) => {
            return {
              ...accumProducts,
              [currentProduct.id]: currentProduct,
            };
          }, {});
        }
        case 'add': {
          products[action.payload.id] = action.payload;
          return products;
        }
        case 'del': {
          delete products[action.payload.id];
          return products;
        }
      }
    }, {});

    this.ids$ = this.action$.scan((ids, action) => {
      switch (action.type) {
        case 'get': {
          return action.payload.map(product => product.id);
        }
        case 'add': {
          ids.push(action.payload.id);
          return ids;
        }
        case 'del': {
          ids.splice(ids.indexOf(action.payload.id), 1);
          return ids;
        }
      }
    }, []);

    this.products$ = Observable.combineLatest(
      this.entities$,
      this.ids$
    )
      .map(([entities, ids]) => {
        return ids.map(id => entities[id]);
      });
  }

  getProduct(id: number | string): Observable<Product> {
    return this.http.get<Product>(`products/${id}`).publishReplay(1);
  }

  getProducts() {
    this.receivedProductsSub$.next(this.http.get<Product>('products'));
    return this.products$;
  }

  addProduct() {
    this.addedProductSub$.next(this.http.post<Product>('products', this.newAddProduct, httpOptions));
  }

  deleteProducts(id) {
    this.deletedProductSub$.next(this.http.delete<Product>(`products/${id}`, httpOptions));
  }
}
