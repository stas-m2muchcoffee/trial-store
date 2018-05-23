import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item';


const INVOICE_ITEM_DELETE = 'Invoice-item-delete';

export const ActionTypes = {
  REQUEST: `[${INVOICE_ITEM_DELETE}] Request`,
  REQUEST_SUCCESS: `[${INVOICE_ITEM_DELETE}] Request Success`,
  REQUEST_FAIL: `[${INVOICE_ITEM_DELETE}] Request Fail`,
};

export class InvoiceItemDeleteAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoiceItemDeleteSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: InvoiceItem,
  ) {}
}

export class InvoiceItemDeleteFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoiceItemDeleteAction |
  InvoiceItemDeleteSuccessAction |
  InvoiceItemDeleteFailAction;
