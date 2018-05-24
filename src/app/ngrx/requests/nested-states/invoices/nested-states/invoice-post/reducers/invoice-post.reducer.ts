import { InvoicePostActions, InvoicePostActionTypes } from '../actions';
import { IInvoicePostState, invoicePostInitialState } from '../states';

export function invoicePostReducer (
  state: IInvoicePostState = invoicePostInitialState,
  { type, payload }: InvoicePostActions,
) {
  switch (type) {
    case InvoicePostActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case InvoicePostActionTypes.REQUEST_SUCCESS:
    case InvoicePostActionTypes.REQUEST_FAIL: {
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
