import { Action } from '@ngrx/store';

import { Invoice } from '../../../../../../../core/interfaces/invoice';


const INVOICE_PUT = 'Invoice-put';

export const ActionTypes = {
  REQUEST: `[${INVOICE_PUT}] Request`,
  REQUEST_SUCCESS: `[${INVOICE_PUT}] Request Success`,
  REQUEST_FAIL: `[${INVOICE_PUT}] Request Fail`,
};

export class InvoicePutAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: Invoice,
  ) {}
}

export class InvoicePutSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: Invoice,
  ) {}
}

export class InvoicePutFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoicePutAction |
  InvoicePutSuccessAction |
  InvoicePutFailAction;
