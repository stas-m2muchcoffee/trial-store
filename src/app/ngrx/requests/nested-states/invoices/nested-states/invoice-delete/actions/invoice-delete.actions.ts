import { Action } from '@ngrx/store';

import { Invoice } from '../../../../../../../core/interfaces/invoice';

import { type } from '../../../../../../utils/util';


const INVOICE_DELETE = 'Invoice-delete';

export const ActionTypes = {
  REQUEST: type(`[${INVOICE_DELETE}] Request`),
  REQUEST_SUCCESS: type(`[${INVOICE_DELETE}] Request Success`),
  REQUEST_FAIL: type(`[${INVOICE_DELETE}] Request Fail`),
};

export class InvoiceDeleteAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoiceDeleteSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: Invoice,
  ) {}
}

export class InvoiceDeleteFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoiceDeleteAction |
  InvoiceDeleteSuccessAction |
  InvoiceDeleteFailAction;
