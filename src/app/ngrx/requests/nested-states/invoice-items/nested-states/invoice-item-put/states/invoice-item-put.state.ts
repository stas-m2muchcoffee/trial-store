export interface IInvoiceItemsPutState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceItemsPutInitialState: IInvoiceItemsPutState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
