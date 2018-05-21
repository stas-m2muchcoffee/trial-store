export interface IGetListInvoiceItemsRequestsState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const getListInvoiceItemsInitialState: IGetListInvoiceItemsRequestsState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
