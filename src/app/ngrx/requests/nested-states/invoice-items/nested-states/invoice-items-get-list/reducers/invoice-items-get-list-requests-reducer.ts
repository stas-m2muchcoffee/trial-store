import * as invoiceItemsGetListRequestsActions from '../actions';
import { IInvoiceItemsGetListRequestsState, invoiceItemsGetListInitialState } from '../states';

export function invoiceItemsGetListRequestsReducer (
  state: IInvoiceItemsGetListRequestsState = invoiceItemsGetListInitialState,
  { type, payload }: invoiceItemsGetListRequestsActions.InvoiceItemsGetListActions,
) {
  switch (type) {
    case invoiceItemsGetListRequestsActions.InvoiceItemsGetListRequestsActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case invoiceItemsGetListRequestsActions.InvoiceItemsGetListRequestsActionTypes.REQUEST_SUCCESS:
    case invoiceItemsGetListRequestsActions.InvoiceItemsGetListRequestsActionTypes.REQUEST_FAIL: {
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
