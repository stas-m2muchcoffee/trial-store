import { Action } from '@ngrx/store';

import { Product } from '../../../core/interfaces/product';


const PRODUCTS_REQUESTS = 'Products-requests';

export const ActionTypes = {
  REQUEST: `[${PRODUCTS_REQUESTS}] Request`,
  REQUEST_SUCCESS: `[${PRODUCTS_REQUESTS}] Request Success`,
  REQUEST_FAIL: `[${PRODUCTS_REQUESTS}] Request Fail`,
};

export class GetListProductsAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload?: undefined,
  ) {}
}

export class GetListSuccessProductsAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: Product[],
  ) {}
}

export class GetListFailProductsAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = GetListProductsAction |
  GetListSuccessProductsAction |
  GetListFailProductsAction;
