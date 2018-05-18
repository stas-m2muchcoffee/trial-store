import { ProductsState } from '../products/states';
import { IProductsRequestsState } from '../requests/nested-states/products/states';

export interface AppState {
  readonly products: ProductsState;
  readonly productsRequests: IProductsRequestsState;
}
