import { InvoiceItemsPostActions, InvoiceItemsPostActionTypes } from '../actions';
import { IInvoiceItemsPostState, invoiceItemsPostInitialState } from '../states';

export function invoiceItemsPostReducer (
  state: IInvoiceItemsPostState = invoiceItemsPostInitialState,
  { type, payload }: InvoiceItemsPostActions,
) {
  switch (type) {
    case InvoiceItemsPostActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case InvoiceItemsPostActionTypes.REQUEST_SUCCESS:
    case InvoiceItemsPostActionTypes.REQUEST_FAIL: {
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
