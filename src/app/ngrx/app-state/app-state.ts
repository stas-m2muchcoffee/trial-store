import { ProductsState } from '../products/states';
import { IProductsRequestsState } from '../products-requests/states';

export interface AppState {
  readonly products: ProductsState;
  readonly productsRequests: IProductsRequestsState;
}
