import { Product } from '../../../core/interfaces/product';

export interface IProductsState {
  entities: { [index: number]: Product };
  collectionIds: number[];
}

export const initialState: IProductsState = {
  entities: {},
  collectionIds: [],
};
