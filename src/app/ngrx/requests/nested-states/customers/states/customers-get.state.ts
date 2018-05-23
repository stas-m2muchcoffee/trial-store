export interface ICustomersState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const customersInitialState: ICustomersState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
