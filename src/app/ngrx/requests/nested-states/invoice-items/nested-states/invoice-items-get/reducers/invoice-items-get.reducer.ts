import { InvoiceItemsGetActions, InvoiceItemsGetActionTypes } from '../actions';
import { IInvoiceItemsGetState, invoiceItemsGetInitialState } from '../states';

export function invoiceItemsGetReducer (
  state: IInvoiceItemsGetState = invoiceItemsGetInitialState,
  { type, payload }: InvoiceItemsGetActions,
) {
  switch (type) {

    case InvoiceItemsGetActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case InvoiceItemsGetActionTypes.REQUEST_SUCCESS:
    case InvoiceItemsGetActionTypes.REQUEST_FAIL: {
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
