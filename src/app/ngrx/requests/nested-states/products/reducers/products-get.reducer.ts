import { ProductsActions, ProductsActionTypes } from '../actions';
import { IProductsState, productsInitialState } from '../states';

export function productsReducer (
  state: IProductsState = productsInitialState,
  { type, payload }: ProductsActions,
) {
  switch (type) {
    case ProductsActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case ProductsActionTypes.REQUEST_SUCCESS:
    case ProductsActionTypes.REQUEST_FAIL: {
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
