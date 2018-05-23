import { IInvoiceItemsState, invoiceItemsInitialState } from '../states';
import { invoiceItemsGetReducer } from '../nested-states/invoice-items-get/reducers';
import { invoiceItemsPostReducer } from '../nested-states/invoice-item-post/reducers';
import { invoiceItemsPutReducer } from '../nested-states/invoice-item-put/reducers';
import { invoiceItemDeleteReducer } from '../nested-states/invoice-item-delete/reducers';

// import {
//   invoiceItemsGetReducer,
//   invoiceItemsPostReducer,
//   invoiceItemsPutReducer,
// } from './index';


export function invoiceItemsReducer(
  state = invoiceItemsInitialState,
  action
): IInvoiceItemsState {
  return {
    invoiceItemsGetState: invoiceItemsGetReducer(state.invoiceItemsGetState, action),
    invoiceItemsPostState: invoiceItemsPostReducer(state.invoiceItemsPostState, action),
    invoiceItemsPutState: invoiceItemsPutReducer(state.invoiceItemsPutState, action),
    invoiceItemDeleteState: invoiceItemDeleteReducer(state.invoiceItemDeleteState, action),
  };
}
