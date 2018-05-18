import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as ProductActions from '../actions';
import * as ProductsRequestsActions from '../../requests/nested-states/products/actions';
import 'rxjs/add/operator/filter';

@Injectable()
export class ProductsEffects {

  @Effect()
  products$: Observable<Action> = this.actions$
  .ofType(ProductActions.ActionTypes.GET_LIST)
  .map(() =>
    new ProductsRequestsActions.GetListProductsAction
  );

  constructor(
    private actions$: Actions,
  ) {}
}
