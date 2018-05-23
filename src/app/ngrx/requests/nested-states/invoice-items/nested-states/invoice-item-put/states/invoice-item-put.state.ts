export interface IInvoiceItemPutState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceItemPutInitialState: IInvoiceItemPutState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
