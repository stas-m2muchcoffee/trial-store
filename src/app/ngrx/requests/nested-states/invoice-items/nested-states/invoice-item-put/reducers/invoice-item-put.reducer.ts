import { InvoiceItemsPutActions, InvoiceItemsPutActionTypes } from '../actions';
import { IInvoiceItemsPutState, invoiceItemsPutInitialState } from '../states';

export function invoiceItemsPutReducer (
  state: IInvoiceItemsPutState = invoiceItemsPutInitialState,
  { type, payload }: InvoiceItemsPutActions,
) {
  switch (type) {

    case InvoiceItemsPutActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case InvoiceItemsPutActionTypes.REQUEST_SUCCESS:
    case InvoiceItemsPutActionTypes.REQUEST_FAIL: {
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
