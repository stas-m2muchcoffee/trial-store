import * as productsRequestsActions from '../actions';
import { IProductsRequestsState, initialState } from '../states';

export function productsRequestsReducer (
  state: IProductsRequestsState = initialState,
  { type, payload }: productsRequestsActions.Actions,
) {
  switch (type) {
    case productsRequestsActions.ActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case productsRequestsActions.ActionTypes.REQUEST_SUCCESS:
    case productsRequestsActions.ActionTypes.REQUEST_FAIL: {
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
