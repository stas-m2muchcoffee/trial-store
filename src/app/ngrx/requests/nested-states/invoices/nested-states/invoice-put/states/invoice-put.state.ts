export interface IInvoicePutState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoicePutInitialState: IInvoicePutState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
