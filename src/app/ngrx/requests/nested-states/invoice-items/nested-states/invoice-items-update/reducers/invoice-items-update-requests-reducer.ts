import * as invoiceItemsUpdateRequestsActions from '../actions';
import { IInvoiceItemsUpdateRequestsState, invoiceItemsUpdateInitialState } from '../states';

export function invoiceItemsUpdateRequestsReducer (
  state: IInvoiceItemsUpdateRequestsState = invoiceItemsUpdateInitialState,
  { type, payload }: invoiceItemsUpdateRequestsActions.InvoiceItemsUpdateActions,
) {
  switch (type) {
    case invoiceItemsUpdateRequestsActions.InvoiceItemsUpdateRequestsActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case invoiceItemsUpdateRequestsActions.InvoiceItemsUpdateRequestsActionTypes.REQUEST_SUCCESS:
    case invoiceItemsUpdateRequestsActions.InvoiceItemsUpdateRequestsActionTypes.REQUEST_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        status: 'success',
        data: payload,
      };
    }

    default: {
      return state;
    }
  }
}
