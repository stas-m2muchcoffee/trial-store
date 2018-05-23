import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item';


const INVOICE_ITEMS_POST = 'Invoice-items-post';

export const ActionTypes = {
  REQUEST: `[${INVOICE_ITEMS_POST}] Request`,
  REQUEST_SUCCESS: `[${INVOICE_ITEMS_POST}] Request Success`,
  REQUEST_FAIL: `[${INVOICE_ITEMS_POST}] Request Fail`,
};

export class InvoiceItemsPostAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoiceItemsPostSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: InvoiceItem,
  ) {}
}

export class InvoiceItemsPostFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoiceItemsPostAction |
  InvoiceItemsPostSuccessAction |
  InvoiceItemsPostFailAction;
