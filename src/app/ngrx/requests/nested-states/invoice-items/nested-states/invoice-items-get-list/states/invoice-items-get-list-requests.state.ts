export interface IInvoiceItemsGetListRequestsState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceItemsGetListInitialState: IInvoiceItemsGetListRequestsState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
