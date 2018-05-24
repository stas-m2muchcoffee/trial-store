import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item';

import { type } from '../../../../../../utils/util';


const INVOICE_ITEM_DELETE = 'Invoice-item-delete';

export const ActionTypes = {
  REQUEST: type(`[${INVOICE_ITEM_DELETE}] Request`),
  REQUEST_SUCCESS: type(`[${INVOICE_ITEM_DELETE}] Request Success`),
  REQUEST_FAIL: type(`[${INVOICE_ITEM_DELETE}] Request Fail`),
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
