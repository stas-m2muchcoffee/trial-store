export interface IInvoicePostState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoicePostInitialState: IInvoicePostState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
