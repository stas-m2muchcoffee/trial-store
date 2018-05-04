import { Product } from './product';

export interface Action {
  type: number;
  payload: Product[];
}
