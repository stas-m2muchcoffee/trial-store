// states
import {
  IInvoiceItemsGetListRequestsState,
  IInvoiceItemsCreateRequestsState,
  IInvoiceItemsUpdateRequestsState,
} from './index';

export interface IInvoiceItemsRequestsState {
  invoiceItemsGetListRequestsState?: IInvoiceItemsGetListRequestsState;
  invoiceItemsCreateRequestsState?: IInvoiceItemsCreateRequestsState;
  invoiceItemsUpdateRequestsState?: IInvoiceItemsUpdateRequestsState;
}

export const invoiceItemsInitialState: IInvoiceItemsRequestsState = {};
