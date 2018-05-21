import { IInvoiceItemsRequestsState, invoiceItemsInitialState } from '../states';
import { getListInvoiceItemsRequestsReducer } from '../nested-states/get-list-invoice-items/reducers';


export function invoiceItemsRequestsReducer(
  state = invoiceItemsInitialState,
  action
): IInvoiceItemsRequestsState {
  return {
    invoiceItemsGetListState: getListInvoiceItemsRequestsReducer(state.invoiceItemsGetListState, action),
  };
}
