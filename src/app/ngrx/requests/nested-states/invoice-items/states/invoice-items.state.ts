import {
  IInvoiceItemsGetState,
  IInvoiceItemsPostState,
  IInvoiceItemsPutState,
} from './index';

export interface IInvoiceItemsState {
  invoiceItemsGetState?: IInvoiceItemsGetState;
  invoiceItemsPostState?: IInvoiceItemsPostState;
  invoiceItemsPutState?: IInvoiceItemsPutState;
}

export const invoiceItemsInitialState: IInvoiceItemsState = {};
