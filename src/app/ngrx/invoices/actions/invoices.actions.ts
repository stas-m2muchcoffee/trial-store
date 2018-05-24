import { Action } from '@ngrx/store';

import { Invoice } from '../../../core/interfaces/invoice';

import { type } from '../../utils/util';


const INVOICE = 'Invoice';

export const ActionTypes = {
  GET_LIST: type(`[${INVOICE}] getList`),
  GET_LIST_SUCCESS: type(`[${INVOICE}] getListSuccess`),

  CREATE: type(`[${INVOICE}] create`),
  CREATE_SUCCESS: type(`[${INVOICE}] createSuccess`),

  UPDATE: type(`[${INVOICE}] update`),
  UPDATE_SUCCESS: type(`[${INVOICE}] updateSuccess`),

  DELETE: type(`[${INVOICE}] delete`),
  DELETE_SUCCESS: type(`[${INVOICE}] deleteSuccess`),

  GET: type(`[${INVOICE}] get`),
  GET_SUCCESS: type(`[${INVOICE}] getSuccess`),
};

export class GetInvoicesAction implements Action {

  readonly type = ActionTypes.GET_LIST;

  constructor(
    public payload?: any,
  ) {}
}

export class GetInvoicesSuccessAction implements Action {

  readonly type = ActionTypes.GET_LIST_SUCCESS;

  constructor(
    public payload: Invoice[],
  ) {}
}

export class CreateInvoiceAction implements Action {

  readonly type = ActionTypes.CREATE;

  constructor(
    public payload: Invoice,
  ) {}
}

export class CreateInvoiceSuccessAction implements Action {

  readonly type = ActionTypes.CREATE_SUCCESS;

  constructor(
    public payload: Invoice[],
  ) {}
}

export class UpdateInvoiceAction implements Action {

  readonly type = ActionTypes.UPDATE;

  constructor(
    public payload: Invoice,
  ) {}
}

export class UpdateInvoiceSuccessAction implements Action {

  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(
    public payload: Invoice[],
  ) {}
}

export class DeleteInvoiceAction implements Action {

  readonly type = ActionTypes.DELETE;

  constructor(
    public payload: Invoice,
  ) {}
}

export class DeleteInvoiceSuccessAction implements Action {

  readonly type = ActionTypes.DELETE_SUCCESS;

  constructor(
    public payload: Invoice[],
  ) {}
}

export class GetInvoiceAction implements Action {

  readonly type = ActionTypes.GET;

  constructor(
    public payload: any,
  ) {}
}

export class GetInvoiceSuccessAction implements Action {

  readonly type = ActionTypes.GET_SUCCESS;

  constructor(
    public payload: Invoice,
  ) {}
}

export type Actions = GetInvoicesAction |
  GetInvoicesSuccessAction |
  CreateInvoiceAction |
  CreateInvoiceSuccessAction |
  UpdateInvoiceAction |
  UpdateInvoiceSuccessAction |
  DeleteInvoiceAction |
  DeleteInvoiceSuccessAction |
  GetInvoiceAction |
  GetInvoiceSuccessAction;
