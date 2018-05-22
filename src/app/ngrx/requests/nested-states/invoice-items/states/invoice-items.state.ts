// states
import {
  IInvoiceItemsGetListRequestsState,
} from './index';

export interface IInvoiceItemsRequestsState {
  invoiceItemsGetListRequestsState?: IInvoiceItemsGetListRequestsState;
}

export const invoiceItemsInitialState: IInvoiceItemsRequestsState = {};
