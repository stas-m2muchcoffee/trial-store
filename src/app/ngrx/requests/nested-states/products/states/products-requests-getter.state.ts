import { createSelector } from '@ngrx/store';

import { AppState } from '../../../../app-state/app-state';

import { IProductsRequestsState } from './products-requests.state';


// export const getProductsRequestsState = (state: AppState) => state.productsRequests;
export const getProductsRequestsState = (state: AppState) => state.requests;

export const getIsLoadedProductsRequests = createSelector(
  getProductsRequestsState,
  (state: IProductsRequestsState) => state.loaded,
);
