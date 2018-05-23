export interface IInvoiceItemsPostState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceItemsPostInitialState: IInvoiceItemsPostState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
