import { IRequestsState, requestsInitialState } from '../states';
import { invoiceItemsReducer } from '../nested-states/invoice-items/reducers';
import { productsReducer } from '../nested-states/products/reducers';
import { customersReducer } from '../nested-states/customers/reducers';
import { invoicesReducer } from '../nested-states/invoices/reducers';

// import {
//   productsReducer,
//   customersReducer,
//   invoiceItemsReducer,
// } from './index';


export function requestsReducer(
  state = requestsInitialState,
  action
): IRequestsState {
  return {
    productsState: productsReducer(state.productsState, action),
    customersState: customersReducer(state.customersState, action),
    invoicesState: invoicesReducer(state.invoicesState, action),
    invoiceItemsState: invoiceItemsReducer(state.invoiceItemsState, action),
  };
}
