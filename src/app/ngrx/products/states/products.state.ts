import { Product } from '../../../core/interfaces/product';

export interface ProductsState {
  entities: { [index: number]: Product };
  collectionIds: number[];
}

export const initialState: ProductsState = {
  entities: {},
  collectionIds: [],
};
