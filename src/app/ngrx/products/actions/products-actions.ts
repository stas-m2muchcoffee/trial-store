import { Action } from '@ngrx/store';

import { Product } from '../../../core/interfaces/product';


const PRODUCT = 'Product';

export const ActionTypes = {
  GET_LIST: `[${PRODUCT}] getList`,
  GET_LIST_SUCCESSFUL: `[${PRODUCT}] getListSuccessful`,
};

export class GetListProductAction implements Action {

  readonly type = ActionTypes.GET_LIST;

  constructor(
    public payload?: undefined,
  ) {}
}

export class GetListProductSuccessfulAction implements Action {

  readonly type = ActionTypes.GET_LIST_SUCCESSFUL;

  constructor(
    public payload: Product[],
  ) {}
}

export type Actions = GetListProductAction | GetListProductSuccessfulAction;
