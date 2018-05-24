import { InvoiceDeleteActions, InvoiceDeleteActionTypes } from '../actions';
import { IInvoiceDeleteState, invoiceDeleteInitialState } from '../states';

export function invoiceDeleteReducer (
  state: IInvoiceDeleteState = invoiceDeleteInitialState,
  { type, payload }: InvoiceDeleteActions,
) {
  switch (type) {

    case InvoiceDeleteActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case InvoiceDeleteActionTypes.REQUEST_SUCCESS:
    case InvoiceDeleteActionTypes.REQUEST_FAIL: {
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
