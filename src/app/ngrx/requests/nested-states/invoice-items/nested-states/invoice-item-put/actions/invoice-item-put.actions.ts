import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item';


const INVOICE_ITEMS_PUT = 'Invoice-items-put';

export const ActionTypes = {
  REQUEST: `[${INVOICE_ITEMS_PUT}] Request`,
  REQUEST_SUCCESS: `[${INVOICE_ITEMS_PUT}] Request Success`,
  REQUEST_FAIL: `[${INVOICE_ITEMS_PUT}] Request Fail`,
};

export class InvoiceItemsPutAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoiceItemsPutSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: InvoiceItem[],
  ) {}
}

export class InvoiceItemsPutFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoiceItemsPutAction |
  InvoiceItemsPutSuccessAction |
  InvoiceItemsPutFailAction;
