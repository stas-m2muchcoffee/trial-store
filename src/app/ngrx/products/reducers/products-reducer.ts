import * as ProductActions from '../actions/products-actions';
import { ProductsState, initialState } from '../states';

export function productsReducer(
  state: ProductsState = initialState,
  {type, payload}: ProductActions.Actions,
): ProductsState {
  switch (type) {
    case ProductActions.ActionTypes.GET_LIST_SUCCESSFUL: {
      const entities = payload.reduce((accEntities, currentProduct) =>
          ({...accEntities, [currentProduct.id]: currentProduct}),
        {}
      );
      const collectionIds = payload.map(product => product.id);
      return {
        ...state,
        entities,
        collectionIds,
      };
    }
    default: {
      return state;
    }
  }
}
