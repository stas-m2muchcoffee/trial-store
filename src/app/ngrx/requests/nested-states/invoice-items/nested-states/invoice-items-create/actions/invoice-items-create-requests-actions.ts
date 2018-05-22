import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item';


const CREATE_INVOICE_ITEMS_REQUESTS = 'Create-invoice-items-requests';

export const InvoiceItemsCreateRequestsActionTypes = {
  REQUEST: `[${CREATE_INVOICE_ITEMS_REQUESTS}] Request`,
  REQUEST_SUCCESS: `[${CREATE_INVOICE_ITEMS_REQUESTS}] Request Success`,
  REQUEST_FAIL: `[${CREATE_INVOICE_ITEMS_REQUESTS}] Request Fail`,
};

export class InvoiceItemsCreateRequestsAction implements Action {

  readonly type = InvoiceItemsCreateRequestsActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoiceItemsCreateRequestsSuccessAction implements Action {

  readonly type = InvoiceItemsCreateRequestsActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: InvoiceItem[],
  ) {}
}

export class InvoiceItemsCreateRequestsFailAction implements Action {

  readonly type = InvoiceItemsCreateRequestsActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type InvoiceItemsCreateActions = InvoiceItemsCreateRequestsAction |
  InvoiceItemsCreateRequestsSuccessAction |
  InvoiceItemsCreateRequestsFailAction;
