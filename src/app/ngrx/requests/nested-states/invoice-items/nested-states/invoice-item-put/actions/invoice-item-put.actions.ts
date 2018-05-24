import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item';

import { type } from '../../../../../../utils/util';


const INVOICE_ITEM_PUT = 'Invoice-item-put';

export const ActionTypes = {
  REQUEST: type(`[${INVOICE_ITEM_PUT}] Request`),
  REQUEST_SUCCESS: type(`[${INVOICE_ITEM_PUT}] Request Success`),
  REQUEST_FAIL: type(`[${INVOICE_ITEM_PUT}] Request Fail`),
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
