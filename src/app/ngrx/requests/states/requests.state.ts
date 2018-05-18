// states
import {
  IProductsRequestsState
} from './index';

export interface IRequestsState {
  productsRequestsState?:  IProductsRequestsState;
}

export interface IRequestsNestedState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const requestsInitialState: IRequestsState = {};
