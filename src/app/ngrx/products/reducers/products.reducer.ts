import { Actions, ActionTypes } from '../actions';
import { IProductsState, initialState } from '../states';

export function productsReducer(
  state: IProductsState = initialState,
  {type, payload}: Actions,
): IProductsState {
  switch (type) {

    case ActionTypes.GET_LIST_SUCCESS: {
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
