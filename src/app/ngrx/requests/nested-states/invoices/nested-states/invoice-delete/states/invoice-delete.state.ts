export interface IInvoiceDeleteState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceDeleteInitialState: IInvoiceDeleteState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
