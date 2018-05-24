// states
import {
  IProductsState,
  ICustomersState,
  IInvoicesState,
  IInvoiceItemsState,
} from './index';

export interface IRequestsState {
  productsState?:  IProductsState;
  customersState?: ICustomersState;
  invoicesState?: IInvoicesState;
  invoiceItemsState?: IInvoiceItemsState;
}

export interface IRequestsNestedState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const requestsInitialState: IRequestsState = {};
