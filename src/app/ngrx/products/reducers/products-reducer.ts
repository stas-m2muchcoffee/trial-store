import * as ProductActions from '../actions/products-actions';
import { ProductsState, initialState } from '../states';

export function productReducer(
  state: ProductsState = initialState,
  action,
): ProductsState {
  switch (action.type) {
    case ProductActions.ActionTypes.GET_LIST_SUCCESSFUL:
      return {
        ...state,
        entities: action.payload.reduce((entities, currentProduct) => {
          return { ...entities, [currentProduct.id]: currentProduct}; }, {}),
        collectionIds: action.payload.map(product => product.id),
      };

    default:
      return state;
  }
}
