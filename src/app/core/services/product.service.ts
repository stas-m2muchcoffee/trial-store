import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/filter';

import { Store } from '@ngrx/store';

import { AppState } from '../../ngrx/app-state/app-state';
import * as ProductsActions from '../../ngrx/products/actions';
import * as ProductsGetterState from '../../ngrx/products/states/products-getter.state';

import { Product } from '../interfaces/product';

@Injectable()
export class ProductService {

  products$: Observable<Product[]>;

  isData$: ConnectableObservable<boolean>;
  isSuccessfulRequest$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {
    this.isData$ = this.isSuccessfulRequest$
    .publishBehavior(false);
    this.isData$.connect();

    this.products$ = this.store.select(ProductsGetterState.getProducts)
    .filter(products => !!products.length);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('products');
  }

  dispatchGetListProductAction(): Observable<Product[]> {
    this.store.dispatch(new ProductsActions.GetListProductAction);
    return this.products$;
  }
}
