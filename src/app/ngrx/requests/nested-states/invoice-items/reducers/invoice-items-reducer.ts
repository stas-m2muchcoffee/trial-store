import { IInvoiceItemsState, invoiceItemsInitialState } from '../states';
import { invoiceItemsGetReducer } from '../nested-states/invoice-items-get/reducers';
import { invoiceItemPostReducer } from '../nested-states/invoice-item-post/reducers';
import { invoiceItemPutReducer } from '../nested-states/invoice-item-put/reducers';
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
    invoiceItemPostState: invoiceItemPostReducer(state.invoiceItemPostState, action),
    invoiceItemPutState: invoiceItemPutReducer(state.invoiceItemPutState, action),
    invoiceItemDeleteState: invoiceItemDeleteReducer(state.invoiceItemDeleteState, action),
  };
}
