import { Action } from '@ngrx/store';

import { Customer } from '../../../../../core/interfaces/customer';


const CUSTOMERS_GET = 'Customers-get';

export const ActionTypes = {
  REQUEST: `[${CUSTOMERS_GET}] Request`,
  REQUEST_SUCCESS: `[${CUSTOMERS_GET}] Request Success`,
  REQUEST_FAIL: `[${CUSTOMERS_GET}] Request Fail`,
};

export class GetCustomersAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload?: undefined,
  ) {}
}

export class GetCustomersSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: Customer[],
  ) {}
}

export class GetCustomersFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = GetCustomersAction |
  GetCustomersSuccessAction |
  GetCustomersFailAction;
