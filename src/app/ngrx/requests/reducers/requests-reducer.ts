import { IRequestsState, requestsInitialState } from '../states';

import { productsRequestsReducer } from '../nested-states/products/reducers';
import { customersRequestsReducer } from '../nested-states/customers/reducers';
import { invoiceItemsRequestsReducer } from '../nested-states/invoice-items/reducers';

export function requestsReducer(
  state = requestsInitialState,
  action
): IRequestsState {
  return {
    productsRequestsState: productsRequestsReducer(state.productsRequestsState, action),
    customersRequestsState: customersRequestsReducer(state.customersRequestsState, action),
    invoiceItemsRequestsState: invoiceItemsRequestsReducer(state.invoiceItemsRequestsState, action),
  };
}
