import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item';


const GET_LIST_INVOICE_ITEMS_REQUESTS = 'Get-list-invoice-items-requests';

export const InvoiceItemsGetListRequestsActionTypes = {
  REQUEST: `[${GET_LIST_INVOICE_ITEMS_REQUESTS}] Request`,
  REQUEST_SUCCESS: `[${GET_LIST_INVOICE_ITEMS_REQUESTS}] Request Success`,
  REQUEST_FAIL: `[${GET_LIST_INVOICE_ITEMS_REQUESTS}] Request Fail`,
};

export class InvoiceItemsGetListRequestsAction implements Action {

  readonly type = InvoiceItemsGetListRequestsActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoiceItemsGetListRequestsSuccessAction implements Action {

  readonly type = InvoiceItemsGetListRequestsActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: InvoiceItem[],
  ) {}
}

export class InvoiceItemsGetListRequestsFailAction implements Action {

  readonly type = InvoiceItemsGetListRequestsActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type InvoiceItemsGetListActions = InvoiceItemsGetListRequestsAction |
  InvoiceItemsGetListRequestsSuccessAction |
  InvoiceItemsGetListRequestsFailAction;
