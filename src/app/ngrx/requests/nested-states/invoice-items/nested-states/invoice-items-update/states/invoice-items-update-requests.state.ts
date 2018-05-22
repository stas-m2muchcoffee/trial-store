export interface IInvoiceItemsUpdateRequestsState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceItemsUpdateInitialState: IInvoiceItemsUpdateRequestsState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
