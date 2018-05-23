export interface IInvoiceItemsGetState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceItemsGetInitialState: IInvoiceItemsGetState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
