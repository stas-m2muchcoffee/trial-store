import { Action } from '@ngrx/store';

import { Product } from '../../../core/interfaces/product';


export const ActionTypes = {
  GET_LIST: '[Product] getList',
  GET_LIST_SUCCESSFUL: '[Product] getListSuccessful',
};

export class GetListProductAction implements Action {

  readonly type = ActionTypes.GET_LIST;
}

export class GetListProductSuccessfulAction implements Action {

  readonly type = ActionTypes.GET_LIST_SUCCESSFUL;

  constructor(
    public payload: Product[],
  ) {}
}

export type Actions = GetListProductAction | GetListProductSuccessfulAction;
