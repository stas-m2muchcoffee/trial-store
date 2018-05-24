import { Action } from '@ngrx/store';

import { Product } from '../../../core/interfaces/product';

import { type } from '../../utils/util';


const PRODUCT = 'Product';

export const ActionTypes = {
  GET_LIST: type(`[${PRODUCT}] getList`),
  GET_LIST_SUCCESS: type(`[${PRODUCT}] getListSuccessful`),
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
