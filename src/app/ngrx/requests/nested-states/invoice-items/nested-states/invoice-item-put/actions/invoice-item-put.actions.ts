import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item';


const INVOICE_ITEM_PUT = 'Invoice-item-put';

export const ActionTypes = {
  REQUEST: `[${INVOICE_ITEM_PUT}] Request`,
  REQUEST_SUCCESS: `[${INVOICE_ITEM_PUT}] Request Success`,
  REQUEST_FAIL: `[${INVOICE_ITEM_PUT}] Request Fail`,
};

export class InvoiceItemPutAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoiceItemPutSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: InvoiceItem,
  ) {}
}

export class InvoiceItemPutFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoiceItemPutAction |
  InvoiceItemPutSuccessAction |
  InvoiceItemPutFailAction;
