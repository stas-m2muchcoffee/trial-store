import { InvoicePutActions, InvoicePutActionTypes } from '../actions';
import { IInvoicePutState, invoicePutInitialState } from '../states';

export function invoicePutReducer (
  state: IInvoicePutState = invoicePutInitialState,
  { type, payload }: InvoicePutActions,
) {
  switch (type) {

    case InvoicePutActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case InvoicePutActionTypes.REQUEST_SUCCESS:
    case InvoicePutActionTypes.REQUEST_FAIL: {
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
