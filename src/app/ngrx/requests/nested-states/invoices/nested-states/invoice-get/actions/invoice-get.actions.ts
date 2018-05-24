import { Action } from '@ngrx/store';

import { Invoice } from '../../../../../../../core/interfaces/invoice';

import { type } from '../../../../../../utils/util';


const INVOICE_GET = 'Invoice-get';

export const ActionTypes = {
  REQUEST: type(`[${INVOICE_GET}] Request`),
  REQUEST_SUCCESS: type(`[${INVOICE_GET}] Request Success`),
  REQUEST_FAIL: type(`[${INVOICE_GET}] Request Fail`),
};

export class InvoiceGetAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoiceGetSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: Invoice,
  ) {}
}

export class InvoiceGetFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoiceGetAction |
  InvoiceGetSuccessAction |
  InvoiceGetFailAction;
