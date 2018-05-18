export interface IProductsRequestsState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const initialState: IProductsRequestsState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
