import { InvoicesGetActions, InvoicesGetActionTypes } from '../actions';
import { IInvoicesGetState, invoicesGetInitialState } from '../states';

export function invoicesGetReducer (
  state: IInvoicesGetState = invoicesGetInitialState,
  { type, payload }: InvoicesGetActions,
) {
  switch (type) {

    case InvoicesGetActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case InvoicesGetActionTypes.REQUEST_SUCCESS:
    case InvoicesGetActionTypes.REQUEST_FAIL: {
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
