export interface IInvoicesGetState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoicesGetInitialState: IInvoicesGetState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
