// states
import {
  IGetListInvoiceItemsRequestsState,
} from './index';

export interface IInvoiceItemsRequestsState {
  invoiceItemsGetListState?: IGetListInvoiceItemsRequestsState;
}

export const invoiceItemsInitialState: IInvoiceItemsRequestsState = {};
