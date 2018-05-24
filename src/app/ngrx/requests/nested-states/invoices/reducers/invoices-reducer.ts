import { IInvoicesState, invoicesInitialState } from '../states';
import { invoicesGetReducer } from '../nested-states/invoices-get/reducers';
import { invoiceGetReducer } from '../nested-states/invoice-get/reducers';
import { invoicePostReducer } from '../nested-states/invoice-post/reducers';
import { invoicePutReducer } from '../nested-states/invoice-put/reducers';
import { invoiceDeleteReducer } from '../nested-states/invoice-delete/reducers';

// import {
//   invoiceItemsGetReducer,
//   invoiceItemsPostReducer,
//   invoiceItemsPutReducer,
// } from './index';


export function invoicesReducer(
  state = invoicesInitialState,
  action
): IInvoicesState {
  return {
    invoicesGetState: invoicesGetReducer(state.invoicesGetState, action),
    invoiceGetState: invoiceGetReducer(state.invoiceGetState, action),
    invoicePostState: invoicePostReducer(state.invoicePostState, action),
    invoicePutState: invoicePutReducer(state.invoicePutState, action),
    invoiceDeleteState: invoiceDeleteReducer(state.invoiceDeleteState, action),
  };
}
