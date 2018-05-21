// states
import {
  IProductsRequestsState,
  ICustomersRequestsState,
} from './index';

export interface IRequestsState {
  productsRequestsState?:  IProductsRequestsState;
  customersRequestsState?: ICustomersRequestsState;
}

export interface IRequestsNestedState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const requestsInitialState: IRequestsState = {};
