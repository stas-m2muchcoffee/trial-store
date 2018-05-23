export interface IProductsState {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const productsInitialState: IProductsState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};
