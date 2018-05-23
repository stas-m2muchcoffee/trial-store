export interface IInvoiceItemPostState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceItemPostInitialState: IInvoiceItemPostState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
