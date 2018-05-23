import { InvoiceItemPutActions, InvoiceItemPutActionTypes } from '../actions';
import { IInvoiceItemPutState, invoiceItemPutInitialState } from '../states';

export function invoiceItemPutReducer (
  state: IInvoiceItemPutState = invoiceItemPutInitialState,
  { type, payload }: InvoiceItemPutActions,
) {
  switch (type) {

    case InvoiceItemPutActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case InvoiceItemPutActionTypes.REQUEST_SUCCESS:
    case InvoiceItemPutActionTypes.REQUEST_FAIL: {
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
