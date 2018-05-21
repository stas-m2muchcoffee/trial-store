import { Action } from '@ngrx/store';

import { Customer } from '../../../core/interfaces/customer';


const CUSTOMER = 'Customer';

export const ActionTypes = {
  GET_LIST: `[${CUSTOMER}] getList`,
  GET_LIST_SUCCESSFUL: `[${CUSTOMER}] getListSuccessful`,
};

export class GetListCustomerAction implements Action {

  readonly type = ActionTypes.GET_LIST;

  constructor(
    public payload?: undefined,
  ) {}
}

export class GetListCustomerSuccessfulAction implements Action {

  readonly type = ActionTypes.GET_LIST_SUCCESSFUL;

  constructor(
    public payload: Customer[],
  ) {}
}

export type Actions = GetListCustomerAction | GetListCustomerSuccessfulAction;
