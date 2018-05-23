// states
import {
  IProductsState,
  ICustomersState,
  IInvoiceItemsState,
} from './index';

export interface IRequestsState {
  productsState?:  IProductsState;
  customersState?: ICustomersState;
  invoiceItemsState?: IInvoiceItemsState;
}

export interface IRequestsNestedState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const requestsInitialState: IRequestsState = {};