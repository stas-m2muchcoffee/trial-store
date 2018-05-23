import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../core/interfaces/invoice-item';


const INVOICE_ITEM = 'Invoice-item';

export const ActionTypes = {
  GET_LIST: `[${INVOICE_ITEM}] getList`,
  GET_LIST_SUCCESS: `[${INVOICE_ITEM}] getListSuccess`,

  CREATE: `[${INVOICE_ITEM}] create`,
  CREATE_SUCCESS: `[${INVOICE_ITEM}] createSuccess`,

  UPDATE: `[${INVOICE_ITEM}] update`,
  UPDATE_SUCCESS: `[${INVOICE_ITEM}] updateSuccess`,
};

export class GetInvoiceItemsAction implements Action {

  readonly type = ActionTypes.GET_LIST;

  constructor(
    public payload: any,
  ) {}
}

export class GetInvoiceItemsSuccessAction implements Action {

  readonly type = ActionTypes.GET_LIST_SUCCESS;

  constructor(
    public payload: InvoiceItem[],
  ) {}
}

export class CreateInvoiceItemAction implements Action {

  readonly type = ActionTypes.CREATE;

  constructor(
    public payload: InvoiceItem,
  ) {}
}

export class CreateInvoiceItemSuccessAction implements Action {

  readonly type = ActionTypes.CREATE_SUCCESS;

  constructor(
    public payload: InvoiceItem,
  ) {}
}

export class UpdateInvoiceItemAction implements Action {

  readonly type = ActionTypes.UPDATE;

  constructor(
    public payload: InvoiceItem,
  ) {}
}

export class UpdateInvoiceItemSuccessAction implements Action {

  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(
    public payload: InvoiceItem,
  ) {}
}

export type Actions = GetInvoiceItemsAction |
  GetInvoiceItemsSuccessAction |
  CreateInvoiceItemAction |
  CreateInvoiceItemSuccessAction |
  UpdateInvoiceItemAction |
  UpdateInvoiceItemSuccessAction;
