import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { ProductService } from '../../../core/services/product.service';

import * as ProductActions from '../actions';

@Injectable()
export class ProductEffects {

  @Effect()
  products$: Observable<Action> = this.actions$
  .ofType(ProductActions.ActionTypes.GET_LIST)
  .switchMap(() =>
    this.productService
    .getProducts()
    .map((products) => {
      this.productService.isSuccessfulRequest$.next(true);
      return new ProductActions.GetListProductSuccessfulAction(products);
    })
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {}
}
