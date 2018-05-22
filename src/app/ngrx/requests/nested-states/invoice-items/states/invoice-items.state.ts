// states
import {
  IInvoiceItemsGetListRequestsState,
  IInvoiceItemsCreateRequestsState,
} from './index';

export interface IInvoiceItemsRequestsState {
  invoiceItemsGetListRequestsState?: IInvoiceItemsGetListRequestsState;
  invoiceItemsCreateRequestsState?: IInvoiceItemsCreateRequestsState;
}

export const invoiceItemsInitialState: IInvoiceItemsRequestsState = {};
