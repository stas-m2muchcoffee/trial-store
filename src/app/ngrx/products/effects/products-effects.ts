import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as productsRequestsActions from '../../requests/nested-states/products/actions';

import * as productsActions from '../actions';

@Injectable()
export class ProductsEffects {

  @Effect()
  productsRequest$: Observable<Action> = this.actions$
  .ofType(productsActions.ActionTypes.GET_LIST)
  .map(() =>
    new productsRequestsActions.GetListProductsAction
  );

  @Effect()
  products$: Observable<Action> = this.actions$
  .ofType<productsActions.Actions>(productsRequestsActions.ActionTypes.REQUEST_SUCCESS)
  .map((action) => new productsActions.GetListProductSuccessfulAction(action.payload));

  constructor(
    private actions$: Actions,
  ) {}
}
