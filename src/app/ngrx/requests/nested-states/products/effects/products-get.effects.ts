import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ProductService } from '../../../../../core/services/product.service';

import {
  ProductsActionTypes,
  GetProductsSuccessAction,
  GetProductsFailAction,
} from '../actions';

@Injectable()
export class ProductsRequestsEffects {

  @Effect()
  productsGetRequests$: Observable<Action> = this.actions$
  .ofType(ProductsActionTypes.REQUEST)
  .switchMap(() =>
    this.productService
    .getProducts()
    .map((products) => new GetProductsSuccessAction(products))
    .catch((error) => Observable.of(new GetProductsFailAction(error)))
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {}
}
