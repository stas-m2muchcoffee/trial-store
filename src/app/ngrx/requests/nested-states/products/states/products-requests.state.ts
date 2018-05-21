export interface IProductsRequestsState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const productsInitialState: IProductsRequestsState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
