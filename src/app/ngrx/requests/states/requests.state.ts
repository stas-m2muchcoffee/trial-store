// states
import {
  IProductsRequestsState,
  ICustomersRequestsState,
  IInvoiceItemsRequestsState,
} from './index';

export interface IRequestsState {
  productsRequestsState?:  IProductsRequestsState;
  customersRequestsState?: ICustomersRequestsState;
  invoiceItemsRequestsState?: IInvoiceItemsRequestsState;
}

export interface IRequestsNestedState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const requestsInitialState: IRequestsState = {};
