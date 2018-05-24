import { Action } from '@ngrx/store';

import { Product } from '../../../../../core/interfaces/product';

import { type } from '../../../../utils/util';


const PRODUCTS_GET = 'Products-get';

export const ActionTypes = {
  REQUEST: type(`[${PRODUCTS_GET}] Request`),
  REQUEST_SUCCESS: type(`[${PRODUCTS_GET}] Request Success`),
  REQUEST_FAIL: type(`[${PRODUCTS_GET}] Request Fail`),
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
