import * as productActions from '../actions/products-actions';
import { IProductsState, initialState } from '../states';

export function productsReducer(
  state: IProductsState = initialState,
  {type, payload}: productActions.Actions,
): IProductsState {
  switch (type) {
    case productActions.ActionTypes.GET_LIST_SUCCESSFUL: {
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
