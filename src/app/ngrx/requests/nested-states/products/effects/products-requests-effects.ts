import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ProductService } from '../../../../../core/services/product.service';

import * as productsRequestsActions from '../actions';

@Injectable()
export class ProductsRequestsEffects {

  @Effect()
  productsRequests$: Observable<Action> = this.actions$
  .ofType(productsRequestsActions.ProductsActionTypes.REQUEST)
  .switchMap(() =>
    this.productService
    .getProducts()
    .map((products) => new productsRequestsActions.GetListSuccessProductsAction(products))
    .catch((error) => Observable.of(new productsRequestsActions.GetListFailProductsAction(error)))
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {}
}
