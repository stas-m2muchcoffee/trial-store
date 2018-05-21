import { IProductsState } from '../products/states';
import { productsReducer } from '../products/reducers';
import { IRequestsState } from '../requests/states';
import { requestsReducer } from '../requests/reducers';
import { ICustomersState } from '../customers/states';
import { customersReducer } from '../customers/reducers';

export interface AppState {
  readonly products: IProductsState;
  readonly customers: ICustomersState;
  readonly requests: IRequestsState;
}

export const reducers = {
  products: productsReducer,
  customers: customersReducer,
  requests: requestsReducer,
};
