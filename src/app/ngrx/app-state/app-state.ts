import { ProductsState } from '../products/states';

export interface AppState {
  readonly products: ProductsState;
}
