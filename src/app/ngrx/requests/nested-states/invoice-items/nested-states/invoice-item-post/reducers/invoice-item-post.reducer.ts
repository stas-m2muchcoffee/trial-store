import { InvoiceItemPostActions, InvoiceItemPostActionTypes } from '../actions';
import { IInvoiceItemPostState, invoiceItemPostInitialState } from '../states';

export function invoiceItemPostReducer (
  state: IInvoiceItemPostState = invoiceItemPostInitialState,
  { type, payload }: InvoiceItemPostActions,
) {
  switch (type) {
    case InvoiceItemPostActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case InvoiceItemPostActionTypes.REQUEST_SUCCESS:
    case InvoiceItemPostActionTypes.REQUEST_FAIL: {
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
