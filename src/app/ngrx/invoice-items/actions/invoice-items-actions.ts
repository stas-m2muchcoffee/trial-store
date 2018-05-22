import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../core/interfaces/invoice-item';


const INVOICE_ITEM = 'Invoice-item';

export const ActionTypes = {
  GET_LIST: `[${INVOICE_ITEM}] getList`,
  GET_LIST_SUCCESSFUL: `[${INVOICE_ITEM}] getListSuccessful`,

  CREATE_INVOICE_ITEM: `[${INVOICE_ITEM}] create`,
  CREATE_INVOICE_ITEM_SUCCESSFUL: `[${INVOICE_ITEM}] createSuccessful`,
};

export class GetListInvoiceItemsAction implements Action {

  readonly type = ActionTypes.GET_LIST;

  constructor(
    public payload: any,
  ) {}
}

export class GetListInvoiceItemsSuccessfulAction implements Action {

  readonly type = ActionTypes.GET_LIST_SUCCESSFUL;

  constructor(
    public payload: InvoiceItem[],
  ) {}
}

export class CreateInvoiceItemAction implements Action {

  readonly type = ActionTypes.CREATE_INVOICE_ITEM;

  constructor(
    public payload: InvoiceItem,
  ) {}
}

export class CreateInvoiceItemSuccessfulAction implements Action {

  readonly type = ActionTypes.CREATE_INVOICE_ITEM_SUCCESSFUL;

  constructor(
    public payload: InvoiceItem,
  ) {}
}

export type Actions = GetListInvoiceItemsAction |
  GetListInvoiceItemsSuccessfulAction |
  CreateInvoiceItemAction |
  CreateInvoiceItemSuccessfulAction;
