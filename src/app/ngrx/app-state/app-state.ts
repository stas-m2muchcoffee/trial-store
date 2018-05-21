import { IProductsState } from '../products/states';
import { productsReducer } from '../products/reducers';
import { IRequestsState } from '../requests/states';
import { requestsReducer } from '../requests/reducers';

export interface AppState {
  readonly products: IProductsState;
  readonly requests: IRequestsState;
}

export const reducers = {
  products: productsReducer,
  requests: requestsReducer,
};
