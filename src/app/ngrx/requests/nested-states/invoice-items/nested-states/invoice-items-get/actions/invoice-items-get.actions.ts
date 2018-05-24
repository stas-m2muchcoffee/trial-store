import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item';
import { type } from '../../../../../../utils/util';


const INVOICE_ITEMS_GET = 'Invoice-items-get';

export const ActionTypes = {
  REQUEST: type(`[${INVOICE_ITEMS_GET}] Request`),
  REQUEST_SUCCESS: type(`[${INVOICE_ITEMS_GET}] Request Success`),
  REQUEST_FAIL: type(`[${INVOICE_ITEMS_GET}] Request Fail`),
};

export class InvoiceItemsGetAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoiceItemsGetSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: InvoiceItem[],
  ) {}
}

export class InvoiceItemsGetFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoiceItemsGetAction |
  InvoiceItemsGetSuccessAction |
  InvoiceItemsGetFailAction;
