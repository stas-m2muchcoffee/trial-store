import { Product } from '../../../core/interfaces/product';

export interface ProductsState {
  entities: { [id: string]: Product };
  collectionIds: number[];
}

export const initialState: ProductsState = {
  entities: {},
  collectionIds: [],
};
