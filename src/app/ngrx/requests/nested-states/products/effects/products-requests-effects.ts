import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ProductService } from '../../../../../core/services/product.service';

import * as productsActions from '../../../../products/actions';

import * as productsRequestsActions from '../actions';

@Injectable()
export class ProductsRequestsEffects {

  @Effect()
  productsRequests$: Observable<Action> = this.actions$
  .ofType(productsRequestsActions.ActionTypes.REQUEST)
  .switchMap(() =>
    this.productService
    .getProducts()
    .map((products) => new productsRequestsActions.GetListSuccessProductsAction(products))
    .catch((error) => Observable.of(new productsRequestsActions.GetListFailProductsAction(error)))
  );

  // @Effect()
  // products$: Observable<Action> = this.actions$
  // .ofType<productsActions.Actions>(productsRequestsActions.ActionTypes.REQUEST_SUCCESS)
  // .map((action) => new productsActions.GetListProductSuccessfulAction(action.payload));

  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {}
}
