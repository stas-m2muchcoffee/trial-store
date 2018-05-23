import {
  IInvoiceItemsGetState,
  IInvoiceItemsPostState,
  IInvoiceItemsPutState,
  IInvoiceItemDeleteState,
} from './index';

export interface IInvoiceItemsState {
  invoiceItemsGetState?: IInvoiceItemsGetState;
  invoiceItemsPostState?: IInvoiceItemsPostState;
  invoiceItemsPutState?: IInvoiceItemsPutState;
  invoiceItemDeleteState?: IInvoiceItemDeleteState;
}

export const invoiceItemsInitialState: IInvoiceItemsState = {};
