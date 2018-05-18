import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';

import { Store } from '@ngrx/store';

import { AppState } from '../../ngrx/app-state/app-state';
import * as productsActions from '../../ngrx/products/actions';
import * as productsGetterState from '../../ngrx/products/states/products-getter.state';
import * as productsRequestsGetterState from '../../ngrx/products-requests/states/products-requests-getter.state';

import { Product } from '../interfaces/product';

@Injectable()
export class ProductService {

  products$: Observable<Product[]>;

  isData$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {
    this.isData$ = this.store.select(productsRequestsGetterState.getIsLoadedProductsRequests);

    this.products$ = this.store.select(productsGetterState.getProducts)
    .withLatestFrom(this.isData$)
    .filter(([products , isData]) => isData)
    .map(([products, isData]) => products);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('products');
  }

  dispatchGetListProductAction(): Observable<Product[]> {
    this.store.dispatch(new productsActions.GetListProductAction);
    return this.products$;
  }
}
