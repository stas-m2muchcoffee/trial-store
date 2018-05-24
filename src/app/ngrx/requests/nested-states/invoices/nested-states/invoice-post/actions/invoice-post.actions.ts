import { Action } from '@ngrx/store';

import { Invoice } from '../../../../../../../core/interfaces/invoice';

import { type } from '../../../../../../utils/util';


const INVOICE_POST = 'Invoice-post';

export const ActionTypes = {
  REQUEST: type(`[${INVOICE_POST}] Request`),
  REQUEST_SUCCESS: type(`[${INVOICE_POST}] Request Success`),
  REQUEST_FAIL: type(`[${INVOICE_POST}] Request Fail`),
};

export class InvoicePostAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoicePostSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: Invoice,
  ) {}
}

export class InvoicePostFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoicePostAction |
  InvoicePostSuccessAction |
  InvoicePostFailAction;
