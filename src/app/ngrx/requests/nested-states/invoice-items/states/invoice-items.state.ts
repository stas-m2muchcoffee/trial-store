import {
  IInvoiceItemsGetState,
  IInvoiceItemPostState,
  IInvoiceItemPutState,
  IInvoiceItemDeleteState,
} from './index';

export interface IInvoiceItemsState {
  invoiceItemsGetState?: IInvoiceItemsGetState;
  invoiceItemPostState?: IInvoiceItemPostState;
  invoiceItemPutState?: IInvoiceItemPutState;
  invoiceItemDeleteState?: IInvoiceItemDeleteState;
}

export const invoiceItemsInitialState: IInvoiceItemsState = {};
