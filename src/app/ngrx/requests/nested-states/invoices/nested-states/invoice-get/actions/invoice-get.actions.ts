import { Action } from '@ngrx/store';

import { Invoice } from '../../../../../../../core/interfaces/invoice';


const INVOICE_GET = 'Invoice-get';

export const ActionTypes = {
  REQUEST: `[${INVOICE_GET}] Request`,
  REQUEST_SUCCESS: `[${INVOICE_GET}] Request Success`,
  REQUEST_FAIL: `[${INVOICE_GET}] Request Fail`,
};

export class InvoiceGetAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoiceGetSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: Invoice,
  ) {}
}

export class InvoiceGetFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoiceGetAction |
  InvoiceGetSuccessAction |
  InvoiceGetFailAction;
