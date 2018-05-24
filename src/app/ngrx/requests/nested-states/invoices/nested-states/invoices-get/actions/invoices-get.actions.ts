import { Action } from '@ngrx/store';

import { Invoice } from '../../../../../../../core/interfaces/invoice';


const INVOICES_GET = 'Invoices-get';

export const ActionTypes = {
  REQUEST: `[${INVOICES_GET}] Request`,
  REQUEST_SUCCESS: `[${INVOICES_GET}] Request Success`,
  REQUEST_FAIL: `[${INVOICES_GET}] Request Fail`,
};

export class InvoicesGetAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoicesGetSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: Invoice[],
  ) {}
}

export class InvoicesGetFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoicesGetAction |
  InvoicesGetSuccessAction |
  InvoicesGetFailAction;
