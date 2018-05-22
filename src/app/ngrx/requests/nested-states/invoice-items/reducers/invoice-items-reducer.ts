import { IInvoiceItemsRequestsState, invoiceItemsInitialState } from '../states';
import { invoiceItemsGetListRequestsReducer } from '../nested-states/invoice-items-get-list/reducers';


export function invoiceItemsRequestsReducer(
  state = invoiceItemsInitialState,
  action
): IInvoiceItemsRequestsState {
  return {
    invoiceItemsGetListRequestsState: invoiceItemsGetListRequestsReducer(state.invoiceItemsGetListRequestsState, action),
  };
}
