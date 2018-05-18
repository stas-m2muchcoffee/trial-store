import { combineReducers } from '@ngrx/store';

import { IProductsState } from '../products/states';
import { productsReducer } from '../products/reducers';
import { IRequestsNestedState } from '../requests/states';
import { requestsReducer } from '../requests/reducers';

export interface AppState {
  readonly products: IProductsState;
  readonly requests: IRequestsNestedState;
}

export const reducers = {
  products: productsReducer,
  requests: requestsReducer,
};

export const AppReducer = combineReducers(reducers);
