import * as getListInvoiceItemsRequestsActions from '../actions';
import { IGetListInvoiceItemsRequestsState, getListInvoiceItemsInitialState } from '../states';

export function getListInvoiceItemsRequestsReducer (
  state: IGetListInvoiceItemsRequestsState = getListInvoiceItemsInitialState,
  { type, payload }: getListInvoiceItemsRequestsActions.GetListInvoiceItemsActions,
) {
  switch (type) {
    case getListInvoiceItemsRequestsActions.GetListInvoiceItemsActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case getListInvoiceItemsRequestsActions.GetListInvoiceItemsActionTypes.REQUEST_SUCCESS:
    case getListInvoiceItemsRequestsActions.GetListInvoiceItemsActionTypes.REQUEST_FAIL: {
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
