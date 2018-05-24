import { Action } from '@ngrx/store';

import { InvoiceItem } from '../../../core/interfaces/invoice-item';

import { type } from '../../utils/util';


const INVOICE_ITEM = 'Invoice-item';

export const ActionTypes = {
  GET_LIST: type(`[${INVOICE_ITEM}] getList`),
  GET_LIST_SUCCESS: type(`[${INVOICE_ITEM}] getListSuccess`),

  CREATE: type(`[${INVOICE_ITEM}] create`),
  CREATE_SUCCESS: type(`[${INVOICE_ITEM}] createSuccess`),

  UPDATE: type(`[${INVOICE_ITEM}] update`),
  UPDATE_SUCCESS: type(`[${INVOICE_ITEM}] updateSuccess`),

  DELETE: type(`[${INVOICE_ITEM}] delete`),
  DELETE_SUCCESS: type(`[${INVOICE_ITEM}] deleteSuccess`),
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
    public payload: InvoiceItem[],
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
    public payload: InvoiceItem[],
  ) {}
}

export class DeleteInvoiceItemAction implements Action {

  readonly type = ActionTypes.DELETE;

  constructor(
    public payload: InvoiceItem,
  ) {}
}

export class DeleteInvoiceItemSuccessAction implements Action {

  readonly type = ActionTypes.DELETE_SUCCESS;

  constructor(
    public payload: InvoiceItem[],
  ) {}
}

export type Actions = GetInvoiceItemsAction |
  GetInvoiceItemsSuccessAction |
  CreateInvoiceItemAction |
  CreateInvoiceItemSuccessAction |
  UpdateInvoiceItemAction |
  UpdateInvoiceItemSuccessAction |
  DeleteInvoiceItemAction |
  DeleteInvoiceItemSuccessAction;
