import * as productsRequestsActions from '../actions';
import { IProductsRequestsState, productsInitialState } from '../states';

export function productsRequestsReducer (
  state: IProductsRequestsState = productsInitialState,
  { type, payload }: productsRequestsActions.ProductsActions,
) {
  switch (type) {
    case productsRequestsActions.ProductsActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case productsRequestsActions.ProductsActionTypes.REQUEST_SUCCESS:
    case productsRequestsActions.ProductsActionTypes.REQUEST_FAIL: {
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
