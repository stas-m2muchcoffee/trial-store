export interface ICustomersRequestsState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const customersInitialState: ICustomersRequestsState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
