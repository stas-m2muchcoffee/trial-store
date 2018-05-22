import { IInvoiceItemsRequestsState, invoiceItemsInitialState } from '../states';

import { invoiceItemsGetListRequestsReducer } from '../nested-states/invoice-items-get-list/reducers';
import { invoiceItemsCreateRequestsReducer } from '../nested-states/invoice-items-create/reducers';
import { invoiceItemsUpdateRequestsReducer } from '../nested-states/invoice-items-update/reducers';


export function invoiceItemsRequestsReducer(
  state = invoiceItemsInitialState,
  action
): IInvoiceItemsRequestsState {
  return {
    invoiceItemsGetListRequestsState: invoiceItemsGetListRequestsReducer(state.invoiceItemsGetListRequestsState, action),
    invoiceItemsCreateRequestsState: invoiceItemsCreateRequestsReducer(state.invoiceItemsCreateRequestsState, action),
    invoiceItemsUpdateRequestsState: invoiceItemsUpdateRequestsReducer(state.invoiceItemsUpdateRequestsState, action),
  };
}
