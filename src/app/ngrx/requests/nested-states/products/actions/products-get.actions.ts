import { Action } from '@ngrx/store';

import { Product } from '../../../../../core/interfaces/product';


const PRODUCTS_GET = 'Products-get';

export const ActionTypes = {
  REQUEST: `[${PRODUCTS_GET}] Request`,
  REQUEST_SUCCESS: `[${PRODUCTS_GET}] Request Success`,
  REQUEST_FAIL: `[${PRODUCTS_GET}] Request Fail`,
};

export class GetProductsAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload?: undefined,
  ) {}
}

export class GetProductsSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: Product[],
  ) {}
}

export class GetProductsFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = GetProductsAction |
  GetProductsSuccessAction |
  GetProductsFailAction;
