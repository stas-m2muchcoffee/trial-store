import { Action } from '@ngrx/store';

import { Customer } from '../../../core/interfaces/customer';

import { type } from '../../utils/util';


const CUSTOMER = 'Customer';

export const ActionTypes = {
  GET_LIST: type(`[${CUSTOMER}] getList`),
  GET_LIST_SUCCESS: type(`[${CUSTOMER}] getListSuccess`),
};

export class GetCustomersAction implements Action {

  readonly type = ActionTypes.GET_LIST;

  constructor(
    public payload?: undefined,
  ) {}
}

export class GetCustomersSuccessAction implements Action {

  readonly type = ActionTypes.GET_LIST_SUCCESS;

  constructor(
    public payload: Customer[],
  ) {}
}

export type Actions = GetCustomersAction |
  GetCustomersSuccessAction;
