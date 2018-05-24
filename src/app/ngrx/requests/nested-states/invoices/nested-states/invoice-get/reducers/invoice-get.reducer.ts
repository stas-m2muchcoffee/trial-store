import { InvoiceGetActions, InvoiceGetActionTypes } from '../actions';
import { IInvoiceGetState, invoiceGetInitialState } from '../states';

export function invoiceGetReducer (
  state: IInvoiceGetState = invoiceGetInitialState,
  { type, payload }: InvoiceGetActions,
) {
  switch (type) {

    case InvoiceGetActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case InvoiceGetActionTypes.REQUEST_SUCCESS:
    case InvoiceGetActionTypes.REQUEST_FAIL: {
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
