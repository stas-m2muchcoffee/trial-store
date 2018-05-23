import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item';


const UPDATE_INVOICE_ITEMS_REQUESTS = 'Create-invoice-items-requests';

export const InvoiceItemsUpdateRequestsActionTypes = {
  REQUEST: `[${UPDATE_INVOICE_ITEMS_REQUESTS}] Request`,
  REQUEST_SUCCESS: `[${UPDATE_INVOICE_ITEMS_REQUESTS}] Request Success`,
  REQUEST_FAIL: `[${UPDATE_INVOICE_ITEMS_REQUESTS}] Request Fail`,
};

export class InvoiceItemsUpdateRequestsAction implements Action {

  readonly type = InvoiceItemsUpdateRequestsActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoiceItemsUpdateRequestsSuccessAction implements Action {

  readonly type = InvoiceItemsUpdateRequestsActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: InvoiceItem[],
  ) {}
}

export class InvoiceItemsUpdateRequestsFailAction implements Action {

  readonly type = InvoiceItemsUpdateRequestsActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type InvoiceItemsUpdateActions = InvoiceItemsUpdateRequestsAction |
  InvoiceItemsUpdateRequestsSuccessAction |
  InvoiceItemsUpdateRequestsFailAction;
