import { Action } from '@ngrx/store';

import { Invoice } from '../../../../../../../core/interfaces/invoice';

import { type } from '../../../../../../utils/util';


const INVOICES_GET = 'Invoices-get';

export const ActionTypes = {
  REQUEST: type(`[${INVOICES_GET}] Request`),
  REQUEST_SUCCESS: type(`[${INVOICES_GET}] Request Success`),
  REQUEST_FAIL: type(`[${INVOICES_GET}] Request Fail`),
};

export class InvoicesGetAction implements Action {

  readonly type = ActionTypes.REQUEST;

  constructor(
    public payload: any,
  ) {}
}

export class InvoicesGetSuccessAction implements Action {

  readonly type = ActionTypes.REQUEST_SUCCESS;

  constructor(
    public payload: Invoice[],
  ) {}
}

export class InvoicesGetFailAction implements Action {

  readonly type = ActionTypes.REQUEST_FAIL;

  constructor(
    public payload: any,
  ) {}
}

export type Actions = InvoicesGetAction |
  InvoicesGetSuccessAction |
  InvoicesGetFailAction;
