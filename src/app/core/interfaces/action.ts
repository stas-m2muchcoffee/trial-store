import { Product } from './product';

export interface Action {
  type: string;
  payload: Product[];
}
