export interface IInvoiceItemDeleteState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceItemDeleteInitialState: IInvoiceItemDeleteState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
