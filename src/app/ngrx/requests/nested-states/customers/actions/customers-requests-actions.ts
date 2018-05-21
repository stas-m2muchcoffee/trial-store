import { Action } from '@ngrx/store';

import { Customer } from '../../../../../core/interfaces/customer';


const CUSTOMERS_REQUESTS = 'Customers-requests';

export const CustomersActionTypes = {
  REQUEST: `[${CUSTOMERS_REQUESTS}] Request`,
  REQUEST_SUCCESS: `[${CUSTOMERS_REQUESTS}] Request Success`,
  REQUEST_FAIL: `[${CUSTOMERS_REQUESTS}] Request Fail`,
};

export class GetListCustomersAction implements Action {

  readonly type = CustomersActionTypes.REQUEST;

  constructor(
    public payload?: undefined,
  ) {}
}

export class GetListSuccessCustomersAction implements Action {

  readonly type = CustomersActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: Customer[],
  ) {}
}

export class GetListFailCustomersAction implements Action {

  readonly type = CustomersActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type CustomersActions = GetListCustomersAction |
  GetListSuccessCustomersAction |
  GetListFailCustomersAction;
