import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as productsRequests from '../../requests/nested-states/products/actions';
import * as products from '../actions';

@Injectable()
export class ProductsEffects {

  @Effect()
  productsGetRequest$: Observable<Action> = this.actions$
  .ofType(products.ActionTypes.GET_LIST)
  .map(() =>
    new productsRequests.GetProductsAction
  );

  @Effect()
  products$: Observable<Action> = this.actions$
  .ofType<productsRequests.ProductsActions>(
    productsRequests.ProductsActionTypes.REQUEST_SUCCESS
  )
  .map((action) =>
    new products.GetProductsSuccessAction(action.payload)
  );

  constructor(
    private actions$: Actions,
  ) {}
}
