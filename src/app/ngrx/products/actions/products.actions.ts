import { Action } from '@ngrx/store';

import { Product } from '../../../core/interfaces/product';


const PRODUCT = 'Product';

export const ActionTypes = {
  GET_LIST: `[${PRODUCT}] getList`,
  GET_LIST_SUCCESS: `[${PRODUCT}] getListSuccessful`,
};

export class GetProductsAction implements Action {

  readonly type = ActionTypes.GET_LIST;

  constructor(
    public payload?: undefined,
  ) {}
}

export class GetProductsSuccessAction implements Action {

  readonly type = ActionTypes.GET_LIST_SUCCESS;

  constructor(
    public payload: Product[],
  ) {}
}

export type Actions = GetProductsAction |
  GetProductsSuccessAction;
