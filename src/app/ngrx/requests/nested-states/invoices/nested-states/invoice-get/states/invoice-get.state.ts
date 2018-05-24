export interface IInvoiceGetState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceGetInitialState: IInvoiceGetState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
