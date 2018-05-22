export interface IInvoiceItemsCreateRequestsState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceItemsCreateInitialState: IInvoiceItemsCreateRequestsState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
