import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Product } from '../interfaces/product';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/observable/combineLatest';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/publishReplay';
import {ConnectableObservable} from 'rxjs/observable/ConnectableObservable';

@Injectable()
export class ProductService {
  public products$: Observable<Product[]>;
  _products$: ConnectableObservable<Product[]>;
  transformProduct$: Observable<{}>;
  ids$: Observable<any>;
  // newProducts$: Observable<Product[]>;

  productsTest$: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient
  ) {
    this._products$ = this.productsTest$
      .mergeAll().publishReplay(1);
    this._products$.connect();

    this.transformProduct$ = this._products$.map((products) => {
      return products.reduce((accumProducts, currentProduct) => {
        return {
          ...accumProducts,
          [currentProduct.id]: currentProduct,
        };
      }, {});
    });

    this.ids$ = this._products$.map((products) => {
      return products.map(product => product.id);
    });

    this.products$ = Observable.combineLatest(
      this.transformProduct$,
      this.ids$
    )
      .map(([transformProduct, ids]) => {
        return ids.map(id => transformProduct[id]);
      });
  }

  getProduct(id: number | string): Observable<Product> {
    return this.http.get<Product>(`products/${id}`).publishLast().refCount();
  }

  getProducts() {
    this.productsTest$.next(this.http.get<Product>('products'));
    return this.products$;
  }
}
