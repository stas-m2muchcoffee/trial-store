import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../../../../../core/interfaces/invoice-item';


const GET_LIST_INVOICE_ITEMS_REQUESTS = 'Get-list-invoice-items-requests';

export const GetListInvoiceItemsActionTypes = {
  REQUEST: `[${GET_LIST_INVOICE_ITEMS_REQUESTS}] Request`,
  REQUEST_SUCCESS: `[${GET_LIST_INVOICE_ITEMS_REQUESTS}] Request Success`,
  REQUEST_FAIL: `[${GET_LIST_INVOICE_ITEMS_REQUESTS}] Request Fail`,
};

export class GetListInvoiceItemsAction implements Action {

  readonly type = GetListInvoiceItemsActionTypes.REQUEST;

  constructor(
    public payload?: undefined,
  ) {}
}

export class GetListInvoiceItemsSuccessAction implements Action {

  readonly type = GetListInvoiceItemsActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: InvoiceItem[],
  ) {}
}

export class GetListInvoiceItemsFailAction implements Action {

  readonly type = GetListInvoiceItemsActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type GetListInvoiceItemsActions = GetListInvoiceItemsAction |
  GetListInvoiceItemsSuccessAction |
  GetListInvoiceItemsFailAction;
