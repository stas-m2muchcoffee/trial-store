import { InvoiceItemDeleteActions, InvoiceItemDeleteActionTypes } from '../actions';
import { IInvoiceItemDeleteState, invoiceItemDeleteInitialState } from '../states';

export function invoiceItemDeleteReducer (
  state: IInvoiceItemDeleteState = invoiceItemDeleteInitialState,
  { type, payload }: InvoiceItemDeleteActions,
) {
  switch (type) {

    case InvoiceItemDeleteActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case InvoiceItemDeleteActionTypes.REQUEST_SUCCESS:
    case InvoiceItemDeleteActionTypes.REQUEST_FAIL: {
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
