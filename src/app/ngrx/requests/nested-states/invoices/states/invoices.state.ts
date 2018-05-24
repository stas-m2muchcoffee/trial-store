import {
  IInvoicesGetState,
  IInvoiceGetState,
  IInvoicePostState,
  IInvoicePutState,
  IInvoiceDeleteState,
} from './index';

export interface IInvoicesState {
  invoicesGetState?: IInvoicesGetState;
  invoiceGetState?: IInvoiceGetState;
  invoicePostState?: IInvoicePostState;
  invoicePutState?: IInvoicePutState;
  invoiceDeleteState?: IInvoiceDeleteState;
}

export const invoicesInitialState: IInvoicesState = {};
