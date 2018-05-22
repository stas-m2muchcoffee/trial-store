import * as invoiceItemsCreateRequestsActions from '../actions';
import { IInvoiceItemsCreateRequestsState, invoiceItemsCreateInitialState } from '../states';

export function invoiceItemsCreateRequestsReducer (
  state: IInvoiceItemsCreateRequestsState = invoiceItemsCreateInitialState,
  { type, payload }: invoiceItemsCreateRequestsActions.InvoiceItemsCreateActions,
) {
  switch (type) {
    case invoiceItemsCreateRequestsActions.InvoiceItemsCreateRequestsActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case invoiceItemsCreateRequestsActions.InvoiceItemsCreateRequestsActionTypes.REQUEST_SUCCESS:
    case invoiceItemsCreateRequestsActions.InvoiceItemsCreateRequestsActionTypes.REQUEST_FAIL: {
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
