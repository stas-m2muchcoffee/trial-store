import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item';


const INVOICE_ITEM_POST = 'Invoice-item-post';

export const ActionTypes = {
  REQUEST: `[${INVOICE_ITEM_POST}] Request`,
  REQUEST_SUCCESS: `[${INVOICE_ITEM_POST}] Request Success`,
  REQUEST_FAIL: `[${INVOICE_ITEM_POST}] Request Fail`,
};

export class InvoiceItemPostAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoiceItemPostSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: InvoiceItem,
  ) {}
}

export class InvoiceItemPostFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoiceItemPostAction |
  InvoiceItemPostSuccessAction |
  InvoiceItemPostFailAction;
